{
    let regex = document.cookie.match(new RegExp('(^| )sessionToken=([^;]+)'));
    if (regex != null) {
        let token = regex[2];
        let postData = new URLSearchParams();
        postData.append('token', token);
        fetch("https://restarter.zirk.eu/userList", {
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
            let str = "";
            result.users.forEach(function(user) {
                str += user.username + ": " + user.permissions + "<br/>";
            });
            document.getElementById("userList").innerHTML = str;
        })
        .catch(error => document.getElementById("userList").innerHTML = error);
    }
}