import React from 'react'

export const LoginAPI = async(data) => {
    const resp = await fetch('https://v-guide.herokuapp.com/api/accounts/login', {
        method: 'POST',
        headers: {
            "Accept" : "*/*",
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    });
    return resp;
}
