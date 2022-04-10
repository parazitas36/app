import React from 'react'

export const GetGuideById = async(id) => {
    const resp = await fetch('https://v-guide.herokuapp.com/api/guides/'+id, {
        method: 'GET',
        headers: {
            "Accept" : "*/*"
        }
    });
    const json = await resp.json();
    return json
}
