import { atom } from "recoil";

export interface AuthModalFace {
    open: boolean,
    view : "login" | "signup" | "resetpassword"
}

const defaultModalState: AuthModalFace = {
    open: false,
    view : "login"
}

export const authModalState = atom<AuthModalFace>({
    key: "authModalState",
    default : defaultModalState
})



