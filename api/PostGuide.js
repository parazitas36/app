export const PostGuide = async(blocks, title, description, creatorID, latitude, longtitude, city, category, publish, price) => {
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

    const resp = await fetch("https://v-guide.herokuapp.com/api/guides", {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data',
        "Connection": "keep-alive" },
        body: formData
    });
    return resp;
}