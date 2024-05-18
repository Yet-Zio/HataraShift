
export default function Navbar() {

  return (
    <nav className="flex w-full items-center ps-3">
      <div className="flex items-center">
        <img src="/favicon.png" className='hover:cursor-pointer w-[32px] h-[32px]' onClick={() => {window.location.href = "/"}}/>
        <span className='text-2xl text-slate-900 ms-2 hover:cursor-pointer select-none font-bold' onClick={() => {window.location.href = "/"}}>HataraShift</span>
      </div>
    </nav>
  )
}