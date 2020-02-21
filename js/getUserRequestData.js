{
    var url = new URL(window.location.href);
    let postData = new URLSearchParams();
    let urlToken = url.searchParams.get("token");
    postData.append('urlToken', urlToken);
    fetch("https://restarter.zirk.eu/userAddRequestData", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: postData
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("HTTP " + response.status);
    })
    .then(response => {
        document.getElementById("userData").innerHTML = response.username;
    })
    .catch(_ => {
        document.location.href = "login.html";
    });

    document.getElementById("createButton").addEventListener("click", function() {
        document.getElementById("createStatus").innerHTML = "Loading...";
        let postData = new URLSearchParams();
        postData.append('urlToken', urlToken);
        postData.append('password', document.getElementById("password").value);
        fetch("https://restarter.zirk.eu/userAdd", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: postData
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error("HTTP " + response.status);
        })
        .then(_ => {
            document.location.href = "login.html";
        })
        .catch(error => document.getElementById("createStatus").innerHTML = error);
    });
}