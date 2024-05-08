import React, {useEffect, useState} from 'react';
import api from "../../api/api.js";

function SettingsPage(){
    const[user,setUser]=useState({

    });

    useEffect(() => {
        getData()
    }, []);

    const getData=()=>{
        api.get(`/user/getuser/${localStorage.getItem('_userId')}`)
            .then(response=>setUser(response.data))
            .catch(error=>console.error(error))
    }
    return (
       <div><h1>Settings page</h1>

           {JSON.stringify(user)}</div>
    );

}


export default SettingsPage;