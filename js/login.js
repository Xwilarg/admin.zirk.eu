document.getElementById("loginButton").addEventListener("click", function() {
    document.getElementById("loginStatus").innerHTML = "Loading...";
    let postData = new URLSearchParams();
    postData.append('username', document.getElementById("username").value);
    postData.append('password', document.getElementById("password").value);
    fetch("https://restarter.zirk.eu/login", {
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
        let date = new Date();
        document.cookie = "sessionToken=" + result.token + "; expires=" + new Date(date.getFullYear() + 10, date.getMonth(), date.getDay());
    })
    .catch(error => document.getElementById("loginStatus").innerHTML = error);
});

let regex = document.cookie.match(new RegExp('(^| )sessionToken=([^;]+)'));
if (regex != null) {
    let token = regex[2];
    let postData = new URLSearchParams();
    postData.append('token', token);
    fetch("https://restarter.zirk.eu/tokenCheck", {
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
        console.log("Already logged in");
    })
    .catch(error => {
        console.error("Can't login using stored token.");
        document.cookie = "sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    });
}