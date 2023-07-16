const doPost = async (url, data) => {
    if (localStorage.getItem("accessToken") === null) {
        window.location.href = "/login";
    }
    const params = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "access-token": localStorage.getItem("accessToken")
        },
        body: JSON.stringify(data)
    }
    let response = await fetch(url, params);
    let json = await response.json();
    if (response.status === 401) {
        await refreshAccessToken();
        response = await fetch(url, params);
        json = await response.json();
        return json;
    }
    return json;
}

const doGet = async (url) => {
    const params = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "access-token": localStorage.getItem("accessToken")
        }
    }
    const response = await fetch(url, params);
    let json = await response.json();
    if (response.status === 401) {
        await refreshAccessToken();
        const response = await fetch(url, params);
        json = await response.json();
        return json;
    }
    return json;
}

const refreshAccessToken = async () => {
    const response = await fetch("http://localhost/auth/refresh-token", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "refresh-token": localStorage.getItem("refreshToken")
        }
    });
    if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.payload.accessToken);
        localStorage.setItem("refreshToken", data.payload.refreshToken);
    } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("authenticated");
        window.location.href = "/login";
    }
}

export {doPost, doGet};