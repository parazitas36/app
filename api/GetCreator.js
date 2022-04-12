import React from 'react'

export const GetCreator = async(id) => {
    const resp = await fetch('https://v-guide.herokuapp.com/api/accounts/'+id, {
        method: 'GET',
        headers: {
            "Accept" : "*/*"
        }
    });
    return resp
}
