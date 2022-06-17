import React from 'react'

export const ChangePassword = async(oldpassword, newPassword, userid) => {
    const resp = await fetch('https://v-guide.herokuapp.com/api/accounts/changepassword/'+userid, {
        method: 'PUT',
        headers: {
            "Accept" : "*/*",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "NewPassword" : newPassword,
            "OldPassword" : oldpassword
        })
    });
    if(resp.status !== 200){
        return null
    }
    return resp;
}