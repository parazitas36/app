import React from 'react'

export const GetSearchedGuides = async(searchInput, category) => {
    const resp = await fetch('https://v-guide.herokuapp.com/api/guides/searched', {
        method: 'Post',
        headers: {
            "Accept" : "*/*",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "Category" : category,
            "SearchInput" : searchInput
        })
    });
    
    if(resp.status === 200){
        const res = await resp.json();
        return res;
    }else{
        return []
    }
}
