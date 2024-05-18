import Navbar from './Navbar'

export default function Header() {
  return (
    <>
    <div className="flex flex-col sticky min-w-screen z-10 top-0 left-0 selection:bg-gray-200 bg-gradient-to-r from-gray-300 to-gray-400">
      <div className='flex h-14'>
        <Navbar/>
      </div>
      <hr className='border-0 h-[1px] bg-[#444444]'/>
    </div>
    </>
  )
}