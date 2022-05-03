import React from 'react'

export const GetUserResponse = async(userId, guideId) => {
    const resp = await fetch('https://v-guide.herokuapp.com/api/responses/'+ guideId +'/userresponse/' + userId, {
        method: 'GET',
        headers: {
            "Accept" : "*/*",
            "Content-Type" : "application/json"
        }
    });
    console.log(resp.status)
    if(resp.status !== 200){
        return null;
    }
    const json = await resp.json();
    return json;
}
