import { FC } from 'react'

const DataBar: FC<{ status: number }> = ({ status }) => {
  return (
    <div className='absolute bottom-0 left-0 h-12 w-full bg-red-600 grid place-content-center z-10'>
      {status === 2 && <span className='text-white'>There are no ring busses</span>}
      {status === 3 && <span className='text-white'>Could not get data</span>}
    </div>
  )
}
export default DataBar
