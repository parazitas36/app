import React from 'react'

export const GetCreatorGuides = async (userid) => {
    const resp = await fetch('http://localhost:5000/api/guides/creatorguides/' + userid, {
        method: 'GET',
        headers: {
            "Accept": "*/*"
        }
    });
    if (resp.status === 200) {
        const json = await resp.json();
        return json
    } else {
        return [];
    }

}
