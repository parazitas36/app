import React from 'react'

export const GetGuideById = async(id) => {
    const resp = await fetch('http:localhost:5000/api/guides/'+id, {
        method: 'GET',
        headers: {
            "Accept" : "*/*"
        }
    });
    const json = await resp.json();
    return json
}
