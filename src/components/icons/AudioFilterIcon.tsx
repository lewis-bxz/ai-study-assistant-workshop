import React from 'react'

export type AudioFilterIconProps = React.SVGAttributes<SVGElement>

export const AudioFilterIcon: React.FC<AudioFilterIconProps> = ({
  ...props
}) => {
  return (
    <svg
      width="32px"
      height="32px"
      viewBox="-4 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fillRule="evenodd" clipRule="evenodd">
        <path
          d="M5.151.012c-2.802 0-5.073 2.272-5.073 5.073v53.842c0 2.802 2.272 5.073 5.073 5.073h45.774c2.803 0 5.075-2.271 5.075-5.073v-38.606l-18.903-20.309h-31.946z"
          fill="#379FD3"
        />
        <path
          d="M56 20.357v1h-12.8s-6.312-1.26-6.128-6.707c0 0 .208 5.707 6.003 5.707h12.925z"
          fill="#2987C8"
        />
        <path
          d="M37.097.006v14.561c0 1.656 1.104 5.791 6.104 5.791h12.8l-18.904-20.352z"
          opacity=".5"
          fill="#ffffff"
        />
        <path
          d="M29.798 34.036l-14.165 1.814v13.438c-.738-.205-1.628-.243-2.531-.064-2.009.394-3.325 1.702-2.938 2.918.386 1.215 2.325 1.88 4.333 1.48 1.764-.348 2.994-1.397 3.005-2.473h.002v-10.74l10.422-1.288v8.306c-.75-.212-1.655-.251-2.572-.068-2.03.399-3.357 1.718-2.969 2.947.389 1.229 2.35 1.897 4.379 1.499 1.849-.366 3.116-1.494 3.031-2.621v-15.148z"
          fill="#ffffff"
        />
      </g>
    </svg>
  )
}
