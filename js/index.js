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

        function startProgram(name) {
            document.getElementById("restartStatus").innerHTML = "Loading...";
            let postData = new URLSearchParams();
            postData.append('token', token);
            postData.append('name', name);
            fetch("https://restarter.zirk.eu/programStart", {
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
                document.getElementById("restartStatus").innerHTML = "Done";
            })
            .catch(error => console.error(error));
        }

        function stopProgram(name) {
            document.getElementById("restartStatus").innerHTML = "Loading...";
            let postData = new URLSearchParams();
            postData.append('token', token);
            postData.append('name', name);
            fetch("https://restarter.zirk.eu/programStop", {
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
                document.getElementById("restartStatus").innerHTML = "Done";
            })
            .catch(error => console.error(error));
        }

        function restartProgram(name) {
            document.getElementById("restartStatus").innerHTML = "Loading...";
            let postData = new URLSearchParams();
            postData.append('token', token);
            postData.append('name', name);
            fetch("https://restarter.zirk.eu/programRestart", {
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
                document.getElementById("restartStatus").innerHTML = "Done";
            })
            .catch(error => console.error(error));
        }

        function updateProgramInfos() {
            let postData = new URLSearchParams();
            postData.append('token', token);
            fetch("https://restarter.zirk.eu/programList", {
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
                result.processes.forEach(function(process) {
                    str += process.name + ", is stopped: " + process.isStopped + '<br/><textarea cols="100" rows="20">' + process.stdout + '</textarea><br/>' +
                    '<button onclick="startProgram(\'' + process.name + '\')">Start</button>' +
                    '<button onclick="stopProgram(\'' + process.name + '\')">Stop</button>' +
                    '<button onclick="restartProgram(\'' + process.name + '\')">Restart</button><br/><br/>';
                });
                document.getElementById("programList").innerHTML = str;
            })
            .catch(error => document.getElementById("programList").innerHTML = error);
        }

        updateUserInfos();
        updateProgramInfos();

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

        document.getElementById("programButton").addEventListener("click", function() {
            document.getElementById("programStatus").innerHTML = "Loading...";
            let postData = new URLSearchParams();
            postData.append('path', document.getElementById("path").value);
            postData.append('token', token);
            fetch("https://restarter.zirk.eu/programAdd", {
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
                document.getElementById("programStatus").innerHTML = "";
                document.getElementById("path").value = "";
                updateProgramInfos();
            })
            .catch(error => document.getElementById("programStatus").innerHTML = error);
        });
    }
}