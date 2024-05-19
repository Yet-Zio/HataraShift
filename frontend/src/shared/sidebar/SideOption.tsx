import { CalendarCheck, CalendarDot, CalendarDots, CalendarX, House, Sparkle } from "@phosphor-icons/react";
import { useHS_Dispatch, useHS_Selector } from "../../redux/hooks";
import { change } from "../../redux/dashboard/dashboardSlice";
import { useNavigate } from "react-router-dom";

export default function SideOption({option, name}: SideOptProps) {

  const selectedOption = useHS_Selector(state => state.dashboard.option)
  const dispatch = useHS_Dispatch()
  const navigate = useNavigate()

  const SideIcon = () => {
    switch (option) {
        case "Home":
            return <House size={24} />
        case "CreateShifts":
            return <Sparkle size={24}/>
        case "AvailableShifts":
            return <CalendarDots size={24}/>
        case "BookShifts":
            return <CalendarDot size={24}/>
        case "BookedShifts":
            return <CalendarCheck size={24}/>
        case "CancelShifts":
            return <CalendarX size={24}/>
        default:
            return <House size={24} />
    }
  }

  return (
    <div className={`flex w-full h-10 ${selectedOption === option ? "bg-slate-200": "bg-transparent"} items-center hover:bg-slate-200 rounded-xl ps-3 cursor-pointer mb-3`}
      onClick={() => {
        dispatch(change(option))
        navigate(`/dashboard/${option.toLowerCase()}`)
        }}>
        {SideIcon()}
        <span className="ms-3 text-base text-black useinter">{name}</span>
    </div>
  );
}
