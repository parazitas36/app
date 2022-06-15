import React from 'react'

export const GetFollowing = async (userid) => {
    const resp = await fetch('http://localhost:5000/api/accounts/following/' + userid, {
        method: 'GET',
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
    });
    if (resp.status === 200) {
        const json = await resp.json();
        return json
    } else {
        return [];
    }

}
