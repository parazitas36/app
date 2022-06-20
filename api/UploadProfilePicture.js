import React from 'react'

export const UploadProfilePicture = async(photo, uid) => {
    const formData = new FormData();
    formData.append('file',
                    {
                        uri: photo.assets[0].uri,
                        type: photo.assets[0].type + '',
                        name: photo.assets[0].fileName + '',
                    }
                )
    console.log(photo);
    const resp = await fetch('https://v-guide.herokuapp.com/api/accounts/uploadphoto/' + uid, {
        method: 'POST',
        headers: {
            "Accept" : "*/*",
            "Content-Type": "multipart/form-data"
        },
        body: formData
    });
    return resp;
}