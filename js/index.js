{
    let regex = document.cookie.match(new RegExp('(^| )sessionToken=([^;]+)'));
    if (regex != null) {
        let token = regex[2];

        document.getElementById("logout").addEventListener("click", function() {
            document.cookie = "sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            document.location.href = "login.html";
        });

        function deleteUser(username) {
            let postData = new URLSearchParams();
            postData.append('token', token);
            postData.append('username', username);
            fetch("https://restarter.zirk.eu/userDelete", {
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
                updateUserInfos();
            })
            .catch(error => console.error("Error while deleting user: " + error));
        }

        function updateUserInfos() {
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
                    str += user.username + ": " + user.permissions + (user.permissions !== -1 ? ' <button onclick="deleteUser(\'' + user.username + '\')">Delete</button>' : '') + "<br/>";
                });
                document.getElementById("userList").innerHTML = str;
            })
            .catch(error => document.getElementById("userList").innerHTML = error);
        }

        updateUserInfos();

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
    }
}