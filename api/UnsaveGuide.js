import React from 'react'

export const UnsaveGuide = async(guideid, userid) => {
    console.log("Unsave:", guideid, userid)

    const resp = await fetch('https://v-guide.herokuapp.com/api/accounts/removesavedguide/'+userid, {
        method: 'PUT',
        headers: {
            "Accept" : "*/*",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(guideid)
    });
    return resp
}
