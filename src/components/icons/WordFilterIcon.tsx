import React from 'react'

export type WordFilterIconProps = React.SVGAttributes<SVGElement>

export const WordFilterIcon: React.FC<WordFilterIconProps> = ({ ...props }) => {
  return (
    <svg
      width="32px"
      height="32px"
      viewBox="0 0 56 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.112.011c-2.802 0-5.073 2.273-5.073 5.074v53.841c0 2.803 2.272 5.074 5.073 5.074h45.775c2.801 0 5.074-2.271 5.074-5.074v-38.605l-18.904-20.31h-31.945z"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#3C8CEA"
      />
      <path
        d="M10.133 37.439h21.564v2.059h-21.564zm0 4.801h21.564v2.057h-21.564zm0 4.801h21.564v2.057h-21.564zm0 4.8h12.233v2.058h-12.233z"
        fill="#ffffff"
      />
      <g fillRule="evenodd" clipRule="evenodd">
        <path
          d="M55.96 20.377v1h-12.799s-6.312-1.26-6.129-6.707c0 0 .208 5.707 6.004 5.707h12.924z"
          fill="#2D6FE4"
        />
        <path
          d="M37.058.025v14.561c0 1.656 1.104 5.791 6.104 5.791h12.799l-18.903-20.352z"
          opacity=".5"
          fill="#ffffff"
        />
      </g>
    </svg>
  )
}
