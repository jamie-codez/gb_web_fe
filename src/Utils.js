const doPost = async (url, data) => {
    return await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "access-token": localStorage.getItem("accessToken")
            },
            body: JSON.stringify(data)
        }
    )
        .then(response => response.json())
        .then(data => data)
        .catch(err => console.log(err));

}

const doGet = async (url) => {
    return await fetch(url, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "access-token": localStorage.getItem("accessToken")
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data[0])
            return data
        })
        .catch(err => console.log(err));
}

export {doPost, doGet};