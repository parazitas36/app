import React from 'react'

export const GetAllGuides = async() => {
    const resp = await fetch('https://v-guide.herokuapp.com/api/guides', {
        method: 'GET',
        headers: {
            "Accept" : "*/*"
        }
    });
    const json = await resp.json();
    return json
}
