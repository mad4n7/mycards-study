import React from 'react'

interface PrimaryButtonProps {
  children: React.ReactNode
  onClick: () => void
  highlight?: boolean
  disabled?: boolean
  tabIndex?: number
}

const PrimaryButton = ({
  onClick,
  children,
  highlight = false,
  disabled = false,
  tabIndex = 0,
}: PrimaryButtonProps) => {
  return (
    <>
      <button
        type="button"
        className={`${highlight ? 'bg-indigo-500' : 'bg-slate-900'} 
          ${disabled ? 'cursor-not-allowed bg-indigo-400' : ''}
          border-2 border-indigo-500 rounded-md active:border-slate-900  
          px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

export default PrimaryButton
