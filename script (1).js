function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const users = { "admin": "admin123" };
    if (users[username] === password) {
        document.getElementById("login").classList.add("hidden");
        document.getElementById("dashboard").classList.remove("hidden");
    } else {
        alert("Invalid credentials");
    }
}

function logout() {
    console.log("Starting logout");
    const loginElement = document.getElementById("login");
    if (loginElement) {
        loginElement.classList.remove("hidden");
        console.log("Login shown");
    } else {
        console.error("Login element not found");
    }
    const dashboardElement = document.getElementById("dashboard");
    if (dashboardElement) {
        dashboardElement.classList.add("hidden");
        console.log("Dashboard hidden");
    } else {
        console.error("Dashboard element not found");
    }
    console.log("Logout completed");
}

// Example assign function (placeholder)
function assignTask() {
    console.log("Assign button clicked");
    // Add task assignment logic here
}