export const API_URL = "http://localhost:3000"


// Sign up
export const EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS"
export const PASSWORD_LENGTH_FAILURE = "PASSWORD_LENGTH_FAILURE"
export const PW_CRITERIA_FAILURE = "PW_CRITERIA_FAILURE"

export const EmailAlreadyExistsText = "An account already exists with this email."
export const PasswordLengthFailure = "Passwords should be a minimum length of 8 characters. The maximum is 256 characters."
export const PassCriteriaFailureText = "Passwords must contain uppercase and lowercase characters and should also include numbers and special symbols like !@#$%^&*()_+-=[]{}|\\:;\"'<>.,.?/"

// Log in
export const USER_NOT_FOUND = "USER_NOT_FOUND"
export const INCORRECT_PASSWORD = "INCORRECT_PASSWORD"

export const UserNotFoundText = "An user associated with this email does not exist."
export const IncorrectPasswordText = "Password entered was not correct!"

// Shifts

export const CANNOT_CREATE_SHIFT = "CANNOT_CREATE_SHIFT"
export const EMPTY_SHIFT_ID = "EMPTY_SHIFT_ID"
export const SHIFT_ID_DOESNOTEXIST = "SHIFT_ID_DOESNOTEXIST"
export const SHIFT_ALREADY_BOOKED = "SHIFT_ALREADY_BOOKED"

export const CannotCreateShiftText = "Cannot create shift due to invalid format or missing attributes."
export const UserNotFoundShiftText = "An user account was not found relating to the signed in user."

export const EmptyShiftIdText = "Shift id was empty to book. Did you select one?"
export const ShiftIdNotExistText = "This shift does not exist."
export const ShiftAlreadyBooked = "This shift has been already booked."
