{
    var url = new URL(window.location.href);
    let postData = new URLSearchParams();
    postData.append('urlToken', url.searchParams.get("token"));
    fetch("https://restarter.zirk.eu/userAddRequestData", {
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
    .then(response => {
        document.getElementById("userData").innerHTML = response.username;
    })
    .catch(error => {
        document.getElementById("userData").innerHTML = error;
    });

    document.getElementById("createButton").addEventListener("click", function() {
        document.getElementById("createButton").innerHTML = "Loading...";
        let postData = new URLSearchParams();
        postData.append('urlToken', url.searchParams.get("token"));
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
                return response.json();
            }
            throw new Error("HTTP " + response.status);
        })
        .then(result => {
            document.location.href = "login.html";
        })
        .catch(error => document.getElementById("createButton").innerHTML = error);
    });
}