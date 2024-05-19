import Sidebar from '../../shared/sidebar/Sidebar'
import { useHS_Dispatch, useHS_Selector } from '../../redux/hooks'
import { useEffect } from 'react'
import { change } from '../../redux/dashboard/dashboardSlice'
import DashboardHome from './pages/DashboardHome'
import DashboardExample from './pages/DashboardExample'
import CreateShifts from './pages/CreateShifts'
import PopupBox from '../../components/modals/PopupBox'
import { CANNOT_CREATE_SHIFT, CannotCreateShiftText, USER_NOT_FOUND, UserNotFoundShiftText } from '../../constants'
import AvailableShifts from './pages/AvailableShifts'

export default function Dashboard({pagetorender}: PageToRenderProps) {

  const pageToRender = useHS_Selector(state => state.dashboard.option)
  const userData = useHS_Selector(state => state.user)
  const shiftSubmitProcess = useHS_Selector(state => state.shiftSubmit)

  const dispatch = useHS_Dispatch()

  const renderPage = () => {
    switch(pageToRender){
      case "Home":
        return <DashboardHome/>
      case "CreateShifts":
        return <CreateShifts/>
      case "AvailableShifts":
        return <AvailableShifts/>
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

  const renderShiftProcess = () => {
    if(shiftSubmitProcess.done){
      if(shiftSubmitProcess.success){
        return <PopupBox type="success" message={shiftSubmitProcess.message} closebt/>
      }
      else{
        switch(shiftSubmitProcess.submitres){
          case CANNOT_CREATE_SHIFT:
            return <PopupBox type="error" message="Could not create Shift" moreinfo={CannotCreateShiftText} closebt/>
          case USER_NOT_FOUND:
            return <PopupBox type="error" message="User not found!" moreinfo={UserNotFoundShiftText} closebt/>
          default:
            return <PopupBox type="error" message="Error" moreinfo="Something went wrong or invalid format found" closebt/>
        }
      }
    }
    else{
      return <PopupBox type="loading"/>
    }
  }

  return (
    <div className='flex min-h-screen min-w-screen bg-slate-200'>
      {userData.currentUser != null ? (
        <>
        {shiftSubmitProcess.start && (
            renderShiftProcess()
        )}
        <Sidebar/>
        {renderPage()}
        </>
      ) : (<>
      {window.location.href = "/"}
      </>)}
    </div>
  )
}