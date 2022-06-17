import React from 'react'

export const ChangeNames = async(newFName, newLName, userid) => {
    const resp = await fetch('https://v-guide.herokuapp.com/api/accounts/'+userid, {
        method: 'PUT',
        headers: {
            "Accept" : "*/*",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "firstname" : newFName,
            "lastname" : newLName
        })
    });
    if(resp.status !== 200){
        return null
    }
    return resp;
}