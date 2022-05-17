import React from 'react'

export const SetVisible = async(guideid) => {
    console.log("Save:", guideid)
    const resp = await fetch('https://v-guide.herokuapp.com/api/guides/setvisible/'+guideid, {
        method: 'PUT',
        headers: {
            "Accept" : "*/*",
            "Content-Type" : "application/json"
        }
    });
    console.log(resp)
    return resp;
}
