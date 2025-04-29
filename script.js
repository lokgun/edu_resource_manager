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
    document.getElementById("login").classList.add("hidden");
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

// Task Assignment
function assignTask() {
    const name = document.getElementById("taskName").value;
    const classroom = document.getElementById("taskClassroom").value;
    if (name && classroom) {
        tasks.push({ name, classroom });
        updateTaskTable();
        clearInputs("taskName", "taskClassroom");
    }
}

// Schedule
function addSchedule() {
    const className = document.getElementById("schedClass").value;
    const teacher = document.getElementById("schedTeacher").value;
    const room = document.getElementById("schedRoom").value;
    const startTime = document.getElementById("schedStartTime").value;
    const endTime = document.getElementById("schedEndTime").value;
    if (className && teacher && room && startTime && endTime) {
        schedule.push({ className, teacher, room, startTime, endTime });
        updateTables();
        clearInputs("schedClass", "schedTeacher", "schedRoom", "schedStartTime", "schedEndTime");
    }
}

// CRUD: Students
function addStudent() {
    const name = document.getElementById("studentName").value.trim();
    const id = document.getElementById("studentID").value;
    const room = document.getElementById("studentRoom").value;
    if (name && id && room && !users[name]) {
        students.push({ name, id, room });
        users[name] = { password: "student123", role: "Student" };
        updateTables();
        clearInputs("studentName", "studentID", "studentRoom");
    } else {
        alert("Invalid or duplicate student name!");
    }
}

function editStudent(index) {
    const oldName = students[index].name;
    const newName = prompt("New Name:", oldName);
    const newID = prompt("New ID:", students[index].id);
    const newRoom = prompt("New Room:", students[index].room);
    if (newName && newID && newRoom && (!users[newName] || newName === oldName)) {
        delete users[oldName];
        users[newName] = { password: "student123", role: "Student" };
        students[index] = { name: newName, id: newID, room: newRoom };
        updateTables();
    }
}

function deleteStudent(index) {
    const studentName = students[index].name;
    delete users[studentName];
    students.splice(index, 1);
    updateTables();
}

// CRUD: Teachers
function addTeacher() {
    const name = document.getElementById("teacherName").value.trim();
    if (name && !users[name]) {
        teachers.push({ name });
        users[name] = { password: "teach123", role: "Teacher" };
        updateTeacherTable();
        clearInputs("teacherName");
    } else {
        alert("Invalid or duplicate teacher name!");
    }
}

function editTeacher(index) {
    const oldName = teachers[index].name;
    const newName = prompt("New Teacher Name:", oldName);
    if (newName && newName !== oldName && !users[newName]) {
        delete users[oldName];
        users[newName] = { password: "teach123", role: "Teacher" };
        teachers[index] = { name: newName };
        updateTeacherTable();
    }
}

function deleteTeacher(index) {
    const teacherName = teachers[index].name;
    delete users[teacherName];
    teachers.splice(index, 1);
    updateTeacherTable();
}

// CRUD: Resources
function addResource() {
    const name = document.getElementById("resourceName").value;
    if (name) {
        resources.push({ name });
        updateResourceTable();
        clearInputs("resourceName");
    }
}

function editResource(index) {
    const newName = prompt("New Resource Name:", resources[index].name);
    if (newName) {
        resources[index] = { name: newName };
        updateResourceTable();
    }
}

function deleteResource(index) {
    resources.splice(index, 1);
    updateResourceTable();
}

// Helpers
function clearInputs(...ids) {
    ids.forEach(id => document.getElementById(id).value = "");
}

function updateTaskTable() {
    const table = document.getElementById("taskTable");
    table.innerHTML = "<tr><th>Task</th><th>Classroom</th><th>Actions</th></tr>";
    tasks.forEach((task, index) => {
        const row = table.insertRow();
        row.innerHTML = `<td>${task.name}</td><td>${task.classroom}</td><td><button onclick="tasks.splice(${index}, 1); updateTaskTable()">Delete</button></td>`;
    });
}

function updateScheduleTable() {
    const table = document.getElementById("scheduleTable");
    table.innerHTML = "<tr><th>Class</th><th>Teacher</th><th>Room</th><th>Start Time</th><th>End Time</th><th>Actions</th></tr>";
    schedule.forEach((sched, index) => {
        const row = table.insertRow();
        row.innerHTML = `<td>${sched.className}</td><td>${sched.teacher}</td><td>${sched.room}</td><td>${sched.startTime}</td><td>${sched.endTime}</td><td><button onclick="schedule.splice(${index}, 1); updateTables()">Delete</button></td>`;
    });
}

function updateStudentTable() {
    const table = document.getElementById("studentTable");
    table.innerHTML = "<tr><th>Name</th><th>ID</th><th>Room</th><th>Actions</th></tr>";
    students.forEach((student, index) => {
        const row = table.insertRow();
        row.innerHTML = `<td>${student.name}</td><td>${student.id}</td><td>${student.room}</td><td><button onclick="editStudent(${index})">Edit</button> <button onclick="deleteStudent(${index})">Delete</button></td>`;
    });
}

function updateTeacherTable() {
    const table = document.getElementById("teacherTable");
    table.innerHTML = "<tr><th>Teacher</th><th>Actions</th></tr>";
    teachers.forEach((teacher, index) => {
        const row = table.insertRow();
        row.innerHTML = `<td>${teacher.name}</td><td><button onclick="editTeacher(${index})">Edit</button> <button onclick="deleteTeacher(${index})">Delete</button></td>`;
    });
}

function updateResourceTable() {
    const table = document.getElementById("resourceTable");
    table.innerHTML = "<tr><th>Resource</th><th>Actions</th></tr>";
    resources.forEach((resource, index) => {
        const row = table.insertRow();
        row.innerHTML = `<td>${resource.name}</td><td><button onclick="editResource(${index})">Edit</button> <button onclick="deleteResource(${index})">Delete</button></td>`;
    });
}

function updateRoomAssignmentTable() {
    const table = document.getElementById("roomAssignmentTable");
    table.innerHTML = "<tr><th>Room</th><th>Students</th><th>Teachers</th></tr>";

    let rooms = [];
    if (currentRole === "Admin") {
        rooms = [...new Set([...students.map(s => s.room), ...schedule.map(s => s.room)])];
    } else {
        rooms = [...new Set(schedule.filter(s => s.teacher === currentUser).map(s => s.room))];
    }

    rooms.forEach(room => {
        const studentNames = students
            .filter(s => s.room === room)
            .map(s => s.name)
            .join("\n") || "None";
        const teacherNames = schedule
            .filter(s => s.room === room)
            .map(s => s.teacher)
            .join(", ") || "None";
        const row = table.insertRow();
        row.innerHTML = `<td>${room}</td><td class="student-list">${studentNames}</td><td>${teacherNames}</td>`;
    });
}

function updateStudentCoursesTable() {
    const table = document.getElementById("studentCoursesTable");
    table.innerHTML = "<tr><th>Class</th><th>Teacher</th><th>Room</th><th>Start Time</th><th>End Time</th></tr>";

    const student = students.find(s => s.name === currentUser);
    if (student) {
        const studentRoom = student.room;
        const studentCourses = schedule.filter(s => s.room === studentRoom);
        studentCourses.forEach(course => {
            const row = table.insertRow();
            row.innerHTML = `<td>${course.className}</td><td>${course.teacher}</td><td>${course.room}</td><td>${course.startTime}</td><td>${course.endTime}</td>`;
        });
    }
}

function updateTables() {
    updateTaskTable();
    updateScheduleTable();
    updateStudentTable();
    updateTeacherTable();
    updateResourceTable();
    updateRoomAssignmentTable();
    updateStudentCoursesTable();
}