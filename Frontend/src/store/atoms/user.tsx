import { atom } from "recoil";

export const userState = atom<userStateTemplate>({
        key: 'userState', // unique ID (with respect to other atoms/selectors)
        default: {
                isLoading: true,
                userDetails: null //email of user/admin 
        }, // default value (aka initial value)
});

interface userStateTemplate {
        isLoading: boolean,
        userDetails: {
                token: string,
                username: string
        } | null
}