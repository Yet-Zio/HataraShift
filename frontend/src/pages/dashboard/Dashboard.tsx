import Sidebar from '../../shared/sidebar/Sidebar'
import { useHS_Dispatch, useHS_Selector } from '../../redux/hooks'
import { useEffect } from 'react'
import { change } from '../../redux/dashboard/dashboardSlice'
import DashboardHome from './pages/DashboardHome'
import DashboardExample from './pages/DashboardExample'
import CreateShifts from './pages/CreateShifts'
import PopupBox from '../../components/modals/PopupBox'
import { CANNOT_CREATE_SHIFT, CannotCreateShiftText, EMPTY_SHIFT_ID, EmptyShiftIdText, SHIFT_ALREADY_BOOKED, SHIFT_ID_DOESNOTEXIST, ShiftAlreadyBooked, ShiftIdNotExistText, USER_NOT_FOUND, UserNotFoundShiftText } from '../../constants'
import AvailableShifts from './pages/AvailableShifts'
import BookShifts from './pages/BookShifts'
import BookedShifts from './pages/BookedShifts'
import CancelShifts from './pages/CancelShifts'

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
        return <BookShifts/>
      case "BookedShifts":
        return <BookedShifts/>
      case "CancelShifts":
        return <CancelShifts/>
      default:
        return <DashboardHome/>
    }
  }

  useEffect(() => {
    if(pagetorender){
      dispatch(change(pagetorender))
    }
    document.title = "Dashboard"
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
          case EMPTY_SHIFT_ID:
            return <PopupBox type="error" message="Error: Empty Shift ID!" moreinfo={EmptyShiftIdText} closebt/>
          case SHIFT_ID_DOESNOTEXIST:
            return <PopupBox type="error" message="Error: Shift does not exist" moreinfo={ShiftIdNotExistText} closebt/>
          case SHIFT_ALREADY_BOOKED:
            return <PopupBox type="error" message="Error: Shift already booked" moreinfo={ShiftAlreadyBooked} closebt/>
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
    <div className='flex min-h-screen min-w-screen bg-slate-200 useroboto'>
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