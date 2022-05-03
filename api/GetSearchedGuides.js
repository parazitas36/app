import React from 'react'

export const GetSearchedGuides = async(searchInput, category) => {
    const resp = await fetch('http://localhost:5000/api/guides/searched', {
        method: 'Post',
        headers: {
            "Accept" : "*/*",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "Category" : category,
            "SearchInput" : searchInput
        })
            // "Category" : searchInput,
            // "SearchInput" : category
    });
    const res = await resp.json();
    console.log(res.length)
    if(resp.status === 200){
        return res;
    }else{
        return null
    }
}
