export interface LoginFormValues {
  email: string;
  password: string;
  userType: string;
}

export enum ActionType {
  REGISTRATION = "REGISTRATION",
  PASSWORD_RESET = "PASSWORD_RESET",
}

export interface OTPFormValues {
  email: string;
  action: ActionType;
}

export interface OTPVerifyFormValues {
  email: string;
  otp: number;
}
