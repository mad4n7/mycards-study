'use client'
import { hsvaToHex, getContrastingColor } from '@uiw/color-convert'
import Swatch from '@uiw/react-color-swatch'
import React, { useState } from 'react'

interface IColorsSwatch {
  colors: string[]
  onSelect: (s: string) => void
}

function Point(props: { color?: string; checked?: boolean }) {
  if (!props.checked) return null
  const currentColor = props.color ?? '#fff'
  return (
    <div
      style={{
        height: 5,
        width: 5,
        borderRadius: '50%',
        backgroundColor: getContrastingColor(currentColor),
      }}
    />
  )
}

const ColorsSwatch: React.FC<IColorsSwatch> = ({ colors, onSelect }) => {
  const [hex, setHex] = useState('#fff')
  return (
    <Swatch
      colors={colors}
      color={hex}
      rectProps={{
        children: <Point />,
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
      onChange={(hsvColor) => {
        setHex(hsvaToHex(hsvColor))
        onSelect(hsvaToHex(hsvColor))
      }}
    />
  )
}

export default ColorsSwatch
