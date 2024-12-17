
import {CurrentUserContext} from "./Context.js";
import {useEffect, useState} from "react";
import {Authorization} from "../AxiosConfig.js";





export const CurrentUser =({children}) => {



const [CurrentUser,SetCurrentUser]=useState([])
const [refreshToken,setRefreshToken] = useState(false)
    const token = localStorage.getItem("auth_token");

    const CheckIfAdmin=async ()=>{

        try {
         const response=await Authorization(token)
            SetCurrentUser(response.data)
        } catch (err) {
            console.error("Logout failed", err);
            localStorage.removeItem("auth_token");
        }

    }



    useEffect(()=>{
        CheckIfAdmin().then()

    },[refreshToken])




    return (
        <CurrentUserContext.Provider value={{
            token,
            CurrentUser,
            refreshToken,setRefreshToken
        }}>
            {children}

        </CurrentUserContext.Provider>
    );
}

