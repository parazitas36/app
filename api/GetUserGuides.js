import React from 'react'

export const GetUserGuides = async (userid) => {
    const resp = await fetch('https://v-guide.herokuapp.com/api/guides/createdguides/' + userid, {
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
