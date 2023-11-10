'use client'
import { useEffect, useState } from 'react'
import { Popover } from '@typeform/embed-react'

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
          open='scroll'
          openValue={80}
          autoClose    
          keepSession
          buttonProps={{
            ariaLabel: 'Typeform Button',
            }}
        />
    </div>
  )
}

export default TypeformSubmission;