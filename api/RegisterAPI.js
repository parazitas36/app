import React from 'react'

export const RegisterAPI = async(data) => {
    console.log(JSON.stringify(data))
    const resp = await fetch('https://v-guide.herokuapp.com/api/accounts/register', {
        method: 'POST',
        headers: {
            "Accept" : "*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return resp;
}
