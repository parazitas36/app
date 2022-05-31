export const UpdateGuide = async(blocks, title, description, creatorID, latitude, longtitude, city, category, publish, price, guideId) => {
    const formData = new FormData();
    for (var i = 0; i < blocks.length; i++) {
        switch (blocks[i].type) {
            case "Text":
                formData.append("Texts", blocks[i].object);
                formData.append("Blocks", JSON.stringify({
                    ID: i,
                    Type: "Text"
                }));
                break
            case "Video":
                formData.append('Videos',
                    {
                        uri: blocks[i].object.assets[0].uri,
                        type: blocks[i].object.assets[0].type + '',
                        name: blocks[i].object.assets[0].fileName + '',
                    }
                );
                formData.append("Blocks", JSON.stringify({
                    ID: i,
                    Type: "Video"
                }));
                break;
            case "Videouri":
                    formData.append('VideosUris', blocks[i].object);
                    formData.append("Blocks", JSON.stringify({
                        ID: i,
                        Type: "Videouri"
                    }));
                    break;
            case "Image":
                formData.append('Images',
                    {
                        uri: blocks[i].object.assets[0].uri,
                        type: blocks[i].object.assets[0].type + '',
                        name: blocks[i].object.assets[0].fileName + ''
                    }
                );
                formData.append("Blocks", JSON.stringify({
                    ID: i,
                    Type: "Image"
                }));
                break;
            case "Imageuri":
                    formData.append('ImagesUris', blocks[i].object);
                    formData.append("Blocks", JSON.stringify({
                        ID: i,
                        Type: "Imageuri"
                    }));
                    break;
        }
    }

    formData.append('Title', title);
    formData.append('Description', description);
    formData.append('Language', 'LT');
    formData.append('Price', price);
    formData.append('CreatorId', creatorID);
    formData.append('latitude', latitude);
    formData.append('longtitude', longtitude);
    formData.append('City', city);
    formData.append('Visible', publish);
    formData.append('Category', category);
    formData.append('GuideId', guideId);

    console.log(formData);

    // const resp = await fetch("https://v-guide.herokuapp.com/api/guides" + guideId, {
    const resp = await fetch("http://localhost:5000/api/guides", {
        method: 'PUT',
        headers: {
        'Content-Type': 'multipart/form-data',
        "Connection": "keep-alive" },
        body: formData
    });
    return resp;
}