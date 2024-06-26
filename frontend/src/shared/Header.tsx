import Navbar from './Navbar'

export default function Header() {
  return (
    <>
    <div className="flex flex-col sticky min-w-screen useroboto z-10 top-0 left-0 selection:bg-gray-200 bg-slate-100">
      <div className='flex h-14'>
        <Navbar/>
      </div>
      <hr className='border-0 h-[1px] bg-slate-300'/>
    </div>
    </>
  )
}