import React from 'react'

export const SetInvisible = async(guideid) => {
    console.log("Save:", guideid)
    const resp = await fetch('https://v-guide.herokuapp.com/api/guides/setinvisible/'+guideid, {
        method: 'PUT',
        headers: {
            "Accept" : "*/*",
            "Content-Type" : "application/json"
        }
    });
    console.log(resp)
    return resp;
}
