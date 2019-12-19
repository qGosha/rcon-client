import React from 'react'
import axios from 'axios'
axios.defaults.xsrfCookieName = "CSRF-TOKEN";

axios.defaults.xsrfHeaderName = "X-CSRF-Token";

axios.defaults.withCredentials = true;
const login = () => {
    axios.post('http://localhost:3001/api/v1/login', {
        email: 'qwer@awert.yu',
        password: '123456'
    }).then( res => console.log(res))
}

const users = () => {
    axios.get('http://localhost:3001/api/v1/users').then( res => console.log(res))
}
export const Button = () => {
    return (
        <>
        <button onClick={login}>Login</button>
        <button onClick={users}>Users</button>

        </>
    )
}