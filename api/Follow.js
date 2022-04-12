import React from 'react'

export const Follow = async(creatorid, userid) => {
    console.log("Save:", creatorid, userid)
    const resp = await fetch('https://v-guide.herokuapp.com/api/accounts/follow/'+userid, {
        method: 'PUT',
        headers: {
            "Accept" : "*/*",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(creatorid)
    });
    console.log(resp)
    return resp;
}
