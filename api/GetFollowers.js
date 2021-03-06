import React from 'react'

export const GetFollowers = async (userid) => {
    const resp = await fetch('https://v-guide.herokuapp.com/api/accounts/followers/' + userid, {
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
