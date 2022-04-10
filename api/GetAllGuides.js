import React from 'react'

export const GetAllGuides = async() => {
    const resp = await fetch('http:localhost:5000/api/guides', {
        method: 'GET',
        headers: {
            "Accept" : "*/*"
        }
    });
    const json = await resp.json();
    return json
}
