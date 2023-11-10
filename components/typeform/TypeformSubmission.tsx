'use client'
import { useEffect, useState } from 'react'
import { Popover } from '@typeform/embed-react'
import { LuAmpersand } from 'react-icons/lu'

const TypeformSubmission = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div id='typeform' className="">
        <Popover 
          id="UR7SpT93" 
          open='time'
          openValue={60000}
          autoClose    
          keepSession
          tooltip='&nbsp&nbspGet Listed'
          customIcon='https://github.com/ionic-team/ionicons/blob/main/src/svg/add-circle.svg'
          buttonProps={{
            ariaLabel: 'Typeform Button',
            }}
        />
    </div>
  )
}

export default TypeformSubmission;