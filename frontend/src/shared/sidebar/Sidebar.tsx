import SideOption from './SideOption'
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export default function Sidebar() {
  return (
    <>
      <div className='dummyside hidden lg:flex flex-col min-h-screen w-[255px] p-[16px] me-14'>
        <div className={`dummydiv flex w-[202px] h-10 items-center rounded-xl ps-3 cursor-pointer mb-3`}>
        </div>
      </div>
      <SimpleBar className='hidden lg:flex flex-col min-h-screen w-[255px] bg-slate-100 border-e border-e-[#3c3e39] p-[16px] fixed' forceVisible="y" autoHide={true} style={{height: "100vh"}}>
          <div className="flex flex-col me-5 mb-2">
            <SideOption option="Home"/>
            <SideOption option="Trending"/>
            <SideOption option='Explore'/>
          </div>
          <div className="flex w-full justify-between items-center rounded-xl p-2 mb-1">
            <span className='text-transparent'>end div</span>
          </div>
      </SimpleBar>
    </>
  )
}
