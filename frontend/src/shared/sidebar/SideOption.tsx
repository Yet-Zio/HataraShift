import { Binoculars, House, TrendUp } from "@phosphor-icons/react";
import { useHS_Dispatch, useHS_Selector } from "../../redux/hooks";
import { change } from "../../redux/dashboard/dashboardSlice";
import { useNavigate } from "react-router-dom";

export default function SideOption({option}: SideOptProps) {

  const selectedOption = useHS_Selector(state => state.dashboard.option)
  const dispatch = useHS_Dispatch()
  const navigate = useNavigate()

  const SideIcon = () => {
    switch (option) {
        case "Home":
            return <House size={24} />
        case "Trending":
            return <TrendUp size={24} weight="fill"/>
        case "Explore":
            return <Binoculars size={24} />
        default:
            return <House size={32} />
    }
  }

  return (
    <div className={`flex w-full h-10 ${selectedOption === option ? "bg-slate-300": "bg-transparent"} items-center hover:bg-slate-300 rounded-xl ps-3 cursor-pointer mb-3`}
      onClick={() => {
        dispatch(change(option))
        navigate(`/dashboard/${option.toLowerCase()}`)
        }}>
        {SideIcon()}
        <span className="ms-3 text-base text-black useinter">{option}</span>
    </div>
  );
}
