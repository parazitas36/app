import React from 'react'

export const GetCreatorGuides = async (userid) => {
    const resp = await fetch('https://v-guide.herokuapp.com/api/guides/creatorguides/' + userid, {
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
