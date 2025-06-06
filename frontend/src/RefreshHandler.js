import React, { useEffect } from 'react'
import { replace, useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({setIsAuthenticated}) {
    const location = useLocation();
    const naviagte=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setIsAuthenticated(true);
            if(location.pathname==='/' ||
                location.pathname==='/login' ||
                location.pathname=='/signup'
            ){
                naviagte('/home',{replace : false});
            }
        }
    },[location, naviagte, setIsAuthenticated])
    return (
    null
    )
}

export default RefreshHandler
