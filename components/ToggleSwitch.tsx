import React, { ChangeEvent } from 'react'

type ToggleSwitchProps = {
  setChecked: Function
}

export default function ToggleSwitch({setChecked}: ToggleSwitchProps) {
 
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked)
  }

  return (
    <label className="inline-flex relative items-center cursor-pointer">
        <input onChange={handleChange} type="checkbox" className="sr-only peer " defaultChecked={true}/>
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        <span className="ml-2 text-sm md:text-base">Auto Search</span>
    </label>
  )
}