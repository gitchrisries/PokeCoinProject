import React, {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {UsersApi} from "../clients/pokecoin/src";
import _apiClient from "../helpers/globals";

const userApi = new UsersApi(_apiClient);

export const LoggedContext = React.createContext({});

export const LoggedContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const token = _apiClient?.authentications['token']?.apiKey

    useQuery(['auth'],
        async () => {
            setIsLoading(true);
            return await userApi.authMeGet()
        }, {
            onSuccess: () => {setIsLoading(false); setLoggedIn(true); },
            onError: () => {setIsLoading(false); setLoggedIn(false); },
            enabled: !!token
        }
    );

    return (
        <LoggedContext.Provider
            value={{
                loggedIn,
                isLoading
            }}
        >
            {children}
        </LoggedContext.Provider>
    );
}