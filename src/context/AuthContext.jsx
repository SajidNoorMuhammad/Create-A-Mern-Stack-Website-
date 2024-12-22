import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AppRoutes } from "../constant/constant";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            const token = Cookies.get('token')
            getUser(token)
        }
    }, [user])

    const getUser = () => {
        axios.get(AppRoutes.myInfo, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        }).then((res) => {
            setUser(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
