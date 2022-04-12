import React from 'react'

export const SaveGuide = async(guideid, userid) => {
    console.log("Save:", guideid, userid)
    const resp = await fetch('https://v-guide.herokuapp.com/api/accounts/saveguide/'+userid, {
        method: 'PUT',
        headers: {
            "Accept" : "*/*",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(guideid)
    });
    console.log(resp)
    return resp;
}
