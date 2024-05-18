
export default function Navbar() {

  return (
    <nav className="flex w-full items-center ps-3">
      <div className="flex items-center">
        <span className='text-2xl text-black ms-2 hover:cursor-pointer select-none' onClick={() => {window.location.href = "/"}}>Hatara<span className='text-gray'>Shift</span></span>
      </div>
    </nav>
  )
}