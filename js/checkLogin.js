{
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
                return response.text();
            }
            throw new Error("HTTP " + response.status);
        })
        .then(_ => {
            // Token still valid, nothing to do
        })
        .catch(error => {
            document.cookie = "sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            document.location.href = "login.html";
        });
    }
    else
    {
        document.location.href = "login.html";
    }
}