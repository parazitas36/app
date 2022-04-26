import React from 'react'

export const GetSavedGuides = async(userid) => {
    const resp = await fetch('https://v-guide.herokuapp.com/api/guides/savedguides/'+userid, {
        method: 'GET',
        headers: {
            "Accept" : "*/*"
        }
    });
    const json = await resp.json();
    return json
}
