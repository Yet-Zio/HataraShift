type PopupBoxType = "success" | "error" | "warning" | "info" | "loading"

interface PopupBoxProps{
    type: PopupBoxType
    message?: string
    moreinfo?: string
    closebt?: boolean
    setSignupProcess?: Function
    setLoginProcess?: Function
}

type SideOptions = 'Home' | 'CreateShifts' | 'AvailableShifts' | 'BookShifts' | 'BookedShifts' | 'CancelShifts'

interface PageToRenderProps{
    pagetorender: SideOptions
}

interface SideOptProps{
    option: string,
    name?: string
}