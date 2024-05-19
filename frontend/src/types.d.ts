type PopupBoxType = "success" | "error" | "warning" | "info" | "loading"

interface PopupBoxProps{
    type: PopupBoxType
    message?: string
    moreinfo?: string
    closebt?: boolean
    setSignupProcess?: Function
    setLoginProcess?: Function
}