export const PostGuide = (blocks, title, description) => {
    if(blocks.length === 0){
        alert('Add at least one block!');
        return;
    }

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
    formData.append('Price', 0.00);

    fetch("http:localhost:5000/api/files/test", {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData
    });
}