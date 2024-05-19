import Sidebar from '../../shared/sidebar/Sidebar'
import { useHS_Dispatch, useHS_Selector } from '../../redux/hooks'
import { useEffect } from 'react'
import { change } from '../../redux/dashboard/dashboardSlice'
import DashboardHome from './pages/DashboardHome'
import DashboardExample from './pages/DashboardExample'

export default function Dashboard({pagetorender}: PageToRenderProps) {

  const pageToRender = useHS_Selector(state => state.dashboard.option)
  const userData = useHS_Selector(state => state.user)
  const dispatch = useHS_Dispatch()

  const renderPage = () => {
    switch(pageToRender){
      case "Home":
        return <DashboardHome/>
      case "CreateShifts":
        return <DashboardExample/>
      case "AvailableShifts":
        return <DashboardExample/>
      case "BookShifts":
        return <DashboardExample/>
      case "BookedShifts":
        return <DashboardExample/>
      case "CancelShifts":
        return <DashboardExample/>
      default:
        return <DashboardHome/>
    }
  }

  useEffect(() => {
    if(pagetorender){
      dispatch(change(pagetorender))
    }
  })

  return (
    <div className='flex min-h-screen min-w-screen bg-slate-200'>
      {userData.currentUser != null ? (
        <>
        <Sidebar/>
        {renderPage()}
        </>
      ) : (<>
      {window.location.href = "/"}
      </>)}
    </div>
  )
}