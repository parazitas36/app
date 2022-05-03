import React from 'react'

export const SendResponse = async(guideId, userId, text, rating) => {
    const resp = await fetch('https://v-guide.herokuapp.com/api/responses', {
        method: 'POST',
        headers: {
            "Accept" : "*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text : text,
            rating : rating,
            gId : guideId,
            uId : userId
        })
    });
    return resp;
}
