{
    let regex = document.cookie.match(new RegExp('(^| )sessionToken=([^;]+)'));
    if (regex != null) {
        let token = regex[2];

        document.getElementById("createButton").addEventListener("click", function() {
            document.getElementById("createStatus").innerHTML = "Loading...";
            let postData = new URLSearchParams();
            postData.append('username', document.getElementById("username").value);
            postData.append('permissions', document.getElementById("permissions").value);
            postData.append('token', token);
            fetch("https://restarter.zirk.eu/userAddRequest", {
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
                document.getElementById("createStatus").innerHTML = "User created. Url: https://admin.zirk.eu/createUser?token=" + result.token;
            })
            .catch(error => document.getElementById("createStatus").innerHTML = error);
        });

        { /// Load users
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
}