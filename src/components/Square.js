import React from 'react'

function Square({val,chooseSquare}) {
  return (
    <div onClick={chooseSquare} className=' active:bg-green-400 basis-1/3 hover:bg-teal-300 cursor-pointer h-full border-2 border-black grid justify-center items-center text-3xl text-black  font-sans '>
        {val}
    </div>
  )
}

export default Square