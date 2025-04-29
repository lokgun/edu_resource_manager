
// Initial data
const users = {
    "admin": { password: "admin123", role: "Admin" }
};
let currentRole = "";
let currentUser = "";
let tasks = [];
let students = [];
let resources = [];
let teachers = [];
let schedule = [{ className: "CS101", teacher: "Dr. Ahmed", room: "Room 5", startTime: "10:00", endTime: "11:00" }];

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    if (users[username] && users[username].password === password) {
        currentRole = users[username].role;
        currentUser = username;
        document.getElementById("login").classList.add("hidden");
        document.getElementById("dashboard").classList.remove("hidden");
        document.getElementById("userRole").textContent = currentRole;

        if (currentRole === "Admin") {
            document.getElementById("taskSection").classList.remove("hidden");
            document.getElementById("scheduleSection").classList.remove("hidden");
            document.getElementById("studentSection").classList.remove("hidden");
            document.getElementById("teacherSection").classList.remove("hidden");
            document.getElementById("resourceSection").classList.remove("hidden");
            document.getElementById("roomAssignmentSection").classList.remove("hidden");
        } else if (currentRole === "Teacher") {
            document.getElementById("studentSection").classList.remove("hidden");
            document.getElementById("roomAssignmentSection").classList.remove("hidden");
        } else if (currentRole === "Student") {
            document.getElementById("studentCoursesSection").classList.remove("hidden");
        }
        updateTables();
    } else {
        alert("Invalid credentials! Admin login: admin/admin123");
    }
}

function logout() {
    document.getElementById("login").classList.remove("hidden");
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("taskSection").classList.add("hidden");
    document.getElementById("scheduleSection").classList.add("hidden");
    document.getElementById("studentSection").classList.add("hidden");
    document.getElementById("teacherSection").classList.add("hidden");
    document.getElementById("resourceSection").classList.add("hidden");
    document.getElementById("roomAssignmentSection").classList.add("hidden");
    document.getElementById("studentCoursesSection").classList.add("hidden");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    currentUser = "";
    currentRole = "";
}

// ... remaining JavaScript functions (assignTask, addSchedule, CRUD, updateTables, etc.)
// Due to size, only the head of the script is included here.
