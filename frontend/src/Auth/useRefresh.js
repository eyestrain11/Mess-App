import useAuth from "./useAuth"
import axios, { axiosPrivate } from "../API/axios";

const useRefresh = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {

        const response = await axiosPrivate.get("/auth/refresh" , {
            withCredntials:true
        })

        setAuth({"userId":response.data.userId,"name":response.data.name,"email":response.data.email ,"mobileno":response.data.mobileno, "role":response.data.role, "accessToken":response.data.accessToken});
    }
    return refresh;
}

export default useRefresh;