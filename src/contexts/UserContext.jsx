import React from "react";
import ApiClient from "../clients/pokecoin/src/ApiClient";
import {UsersApi} from "../clients/pokecoin/src";

const url = 'http://localhost:3000'

export const UserContext = React.createContext({});

export const UserContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [userData, setUserData] = React.useState({username: '', password: ''});
    const [error, setError] = React.useState(null);
    const [token,setToken] = React.useState('');

    const callback1 = (error,data,response) => {
        setIsLoading(false);
        if(error){
            setError(error);
            return;
        }
        else if(data.username){
            return;
        }
        else if(data.token){
            localStorage.setItem('token',data.token);
            setToken(data.token)
        }
        console.log('resp: '+response.text);
        console.log('data: '+data.username);
        console.log('error: '+error);
    };

    const handleRegister = () => {
        setIsLoading(true);
        const apiClient = new ApiClient(url);
        new UsersApi(apiClient).authRegisterPost({'body':userData},callback1);
    };

    /*const retrieveProducts = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("https://fakestoreapi.com/products");
            const json = await response.json();
            setProducts(json);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };*/

    React.useEffect(() => {
        handleRegister();
    }, [userData]);

    return (
        <UserContext.Provider
            value={{
                isLoading,
                error,
                userData
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
