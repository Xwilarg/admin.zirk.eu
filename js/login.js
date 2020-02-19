document.getElementById("loginButton").addEventListener("click", function() {
    let postData = new FormData();
    postData.append('username', document.getElementById("username").value);
    postData.append('password', document.getElementById("password").value);
    fetch("https://restarter.zirk.eu/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: postData
    });
});