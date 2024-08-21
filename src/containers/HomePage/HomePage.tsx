import { ChatMessages } from '@/components/ChatMessages'
import { ChatSessionsDialog } from '@/components/ChatSessionsDialog'
import {
  PdfFilterIcon,
  VideoFilterIcon,
  WordFilterIcon,
} from '@/components/icons'
import { AudioFilterIcon } from '@/components/icons/AudioFilterIcon'
import { ImageFilterIcon } from '@/components/icons/ImageFilterIcon'
import { MessageBar } from '@/components/MessageBar'
import { Search } from '@/components/Search'
import { SearchFilterItem } from '@/components/SearchFilters'
import { ChatLayout } from '@/layouts/ChatLayout/Chat.layout'
import { useSaveChatSessions } from '@/queries/useSaveChatSession'
import { useSearch } from '@/queries/useSearch'
import { ApiChatMessage, chatApi } from '@/services/api'
import { ChatSession } from '@/services/local-storage'
import { FileType } from '@/types/data.types'
import { populateDirs } from '@/utils/populateDirs.util'
import React, { useEffect, useMemo, useState, useTransition } from 'react'

export type HomePageProps = React.HTMLProps<HTMLDivElement>

export const HomePage: React.FC<HomePageProps> = ({ className, ...props }) => {
  const [query, setQuery] = useState('')
  const [prompt, setPrompt] = useState('')
  const [filters, setFilters] = useState<Array<SearchFilterItem>>([
    {
      name: 'document',
      icon: <WordFilterIcon />,
      title: 'Docs',
      toggled: false,
    },
    { name: 'pdf', icon: <PdfFilterIcon />, title: 'PDF', toggled: false },
    {
      name: 'image',
      icon: <ImageFilterIcon />,
      title: 'Image',
      toggled: false,
    },
    {
      name: 'audio',
      icon: <AudioFilterIcon />,
      title: 'MP3/Audio',
      toggled: false,
    },
    {
      name: 'video',
      icon: <VideoFilterIcon />,
      title: 'MP4/Video',
      toggled: false,
    },
  ])
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [messages, setMessages] = useState<ApiChatMessage[]>([])
  const [generating, setGenerating] = useState(false)
  const saveChatSessions = useSaveChatSessions()
  const filterNameList: string[] = useMemo(
    () => filters.filter((item) => !!item.toggled).map((item) => item.name),
    [filters],
  )

  const search = useSearch(
    { query, filters: filterNameList },
    {
      cacheTime: 0,
      enabled: false,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )

  const fileList = useMemo(
    () => populateDirs(search.data?.files || []),
    [search.data],
  )

  const onFilterChange = (filterList: SearchFilterItem[]) => {
    setFilters(filterList)
  }

  const onSearch = async () => {
    search.refetch()
  }

  const onSelectSession = (newSession: ChatSession) => {
    setMessages(newSession.history)
    setSelectedFiles(newSession.files)
  }

  const onPrompt = async (prompt: string) => {
    setGenerating(true)
    setMessages((value) => [
      ...value,
      {
        role: 'user',
        message: prompt,
      },
    ])

    const { message } = await chatApi({
      prompt,
      files: fileList.filter((f) => selectedFiles.includes(f.id)),
      history: messages,
    })

    setGenerating(false)
    setMessages((value) => [...value, message])
    setPrompt('')
  }

  useEffect(() => {
    setSelectedFiles([])
  }, [search.data])

  useEffect(() => {
    onSearch()
  }, [])

  useEffect(() => {
    if (messages.length > 0)
      saveChatSessions({
        sessionName: messages[0].message,
        history: messages,
        files: selectedFiles,
      })
  }, [messages])

  useEffect(() => {
    search.refetch()
  }, [filterNameList])

  return (
    <ChatLayout
      messageBar={
        <MessageBar
          hide={selectedFiles.length === 0}
          prompt={prompt}
          onPromptChange={setPrompt}
          onSubmit={(prompt) => onPrompt(prompt)}
          loading={generating}
          disabled={generating}
        />
      }
    >
      <ChatSessionsDialog onSelectSession={onSelectSession} />
      <Search
        compact={messages.length > 0}
        searching={search.isFetching}
        query={query}
        filters={filters}
        onQueryChange={(v) => setQuery(v)}
        onFilterChange={onFilterChange}
        onSearch={onSearch}
        results={fileList}
        onSelect={(selected) => setSelectedFiles(selected)}
        selectedFiles={selectedFiles}
      />

      <ChatMessages
        className="py-[20px]"
        data={messages.map((msg) => ({
          role: msg.role,
          message: msg.message,
        }))}
      />
    </ChatLayout>
  )
}
