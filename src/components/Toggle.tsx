'use client'
import React, { useState } from 'react'

interface ToggleProps {
  onToggle: (isActive: boolean) => void
  defaultState?: boolean
}

const Toggle: React.FC<ToggleProps> = ({ onToggle, defaultState = true }) => {
  const [isActive, setIsActive] = useState(defaultState)

  const toggle = () => {
    setIsActive(!isActive)
    onToggle(!isActive)
  }

  return (
    <button
      onClick={toggle}
      className={`${
        isActive ? 'bg-green-500' : 'bg-gray-200'
      } p-2 rounded-full w-12 h-6 flex items-center ${
        isActive ? 'justify-end' : 'justify-start'
      } cursor-pointer`}
      aria-label={isActive ? 'Toggle on' : 'Toggle off'}
    >
      <div className="bg-white w-6 h-6 rounded-full shadow-md transition"></div>
    </button>
  )
}

export default Toggle
