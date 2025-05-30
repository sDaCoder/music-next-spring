import PlayerArea from '@/components/PlayerArea/PlayerArea'
import React from 'react'

const Player: React.FC = () => {
  return (
    <>
      <div className='h-[100vh] flex items-center'>
        <PlayerArea />
      </div>
    </>
  )
}

export default Player