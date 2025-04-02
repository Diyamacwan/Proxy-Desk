document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode Toggle
    const modeToggle = document.getElementById("mode-toggle");
    if (modeToggle) {
        modeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            modeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
        });
    }

    // Search Proxy Table
    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const filter = searchInput.value.toLowerCase();
            const rows = document.querySelectorAll("#proxyTable tbody tr");
            rows.forEach(row => {
                row.style.display = row.textContent.toLowerCase().includes(filter) ? "" : "none";
            });
        });
    }

    // Login Form Submission
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const id = document.getElementById("id").value;
            const password = document.getElementById("password").value;

            
            // Simulate authentication (Replace with API call)
            
                alert("Login successful!");
                window.location.href = "profile.html";
            
        });
    }

    // Profile Form Submission
    const profileForm = document.getElementById("profileForm");

     // Collect data from profile page form
    //  const userData = {
    //     gender: document.getElementById('gender').value,
    //     state: document.getElementById('state').value,
    //     city: document.getElementById('city').value,
    //     address: document.getElementById('address').value
    // };

    // Store data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

    if (profileForm) 
        
        {

        profileForm.addEventListener("submit", function (event) 
        {
            event.preventDefault();
            const formData = new FormData(profileForm);
            const data = Object.fromEntries(formData.entries());
            console.log("Profile updated:", data);
            alert("Profile updated successfully!");
            window.location.href="faculty_home.html";
        }
    );
    }

 

    // Leave Form Submission
    const leaveForm = document.getElementById("leaveForm");
    if (leaveForm) {
        leaveForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Leave request submitted successfully!");
        });
    }

    // Logout Confirmation
    const logoutBtn = document.getElementById("yes");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            alert("Logged out successfully!");
            window.location.href = "index.html";
        });
    }

    // Cancel Logout
    const cancelLogout = document.getElementById("cancel");
    if (cancelLogout) {
        cancelLogout.addEventListener("click", function () {
            window.history.back();
        });
    }
});

// Function to update request status dynamically
function updateStatus(button, status) {
    let row = button.closest("tr");
    let statusCell = row.querySelector(".status");

    statusCell.textContent = status;
    statusCell.style.fontWeight = "bold";

    if (status === "Approved") {
        statusCell.style.color = "green";
    } else {
        statusCell.style.color = "red";
    }

    // Disable buttons after decision
    row.querySelectorAll("button").forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = 0.5;
        btn.style.cursor = "not-allowed";
    });
}

// Sample Timetable Data
const timetableData = {
    "ABM": {
        "2025-03-12": [
            { time: "9:10 - 10:10", subject: "Mathematics", status: "Booked" },
            { time: "10:10 - 11:10", subject: "Physics", status: "Free" }
        ]
    },
    "AJS": {
        "2025-03-12": [
            { time: "9:10 - 10:10", subject: "Chemistry", status: "Free" },
            { time: "10:10 - 11:10", subject: "Biology", status: "Booked" }
        ]
    }
};

// Function to Check Timetable
function checkTimetable() {
    const faculty = document.getElementById("faculty-select").value;
    const date = document.getElementById("date").value;

    if (faculty === "" || date === "") {
        alert("Please select a faculty and a date.");
        return;
    }

    // Display Selected Details
    document.getElementById("selectedFaculty").textContent = faculty;
    document.getElementById("selectedDate").textContent = date;

    const timetableContainer = document.getElementById("timetable-container");
    const timetableBody = document.getElementById("timetable-body");
    timetableBody.innerHTML = ""; // Clear previous results

    if (timetableData[faculty] && timetableData[faculty][date]) {
        timetableData[faculty][date].forEach(entry => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${entry.time}</td>
                <td>${entry.subject}</td>
                <td class="${entry.status === 'Booked' ? 'status-booked' : 'status-free'}">${entry.status}</td>
            `;

            timetableBody.appendChild(row);
        });

        timetableContainer.style.display = "block"; // Show timetable
    } else {
        timetableContainer.style.display = "block";
        timetableBody.innerHTML = `<tr><td colspan="3">No timetable found for this date.</td></tr>`;
    }
}
// Sample Faculty Timetable Based on Weekdays
const timetableByDay = {
    "Monday": [
        { name: "Dr. Arpita  Shah", id: "APS", freeSlots: "2:20 - 4:20", workload: "4" },
        { name: "Prof. Ritesh Patel", id: "RIP", freeSlots: "10:10 - 11:10 , 2:20 - 3:20", workload: "4" },
        { name: "Dr.Nikita Bhatt", id: "NBH", freeSlots: "12:10 - 2:10", workload: "4" },
        { name: "Prof. Ronak Patel", id: "RRP", freeSlots: "9:10 - 10:10, 12:10 - 1:10,3:20 - 4:20",workload: "3" }

       
    ],
    "Tuesday": [
        { name: "Dr.Ayushi Chouhan", id: "APC", freeSlots:"12:10 - 2:10" , workload: "4" },
        { name: "Prof.Krunal Maheriya", id: "KJM", freeSlots: "1:10 - 2:10", workload: "S" },
        { name: "Prof. Ritesh Patel", id: "RIP", freeSlots: "9:10 - 12:10 , 12:10 - 1:10", workload: "3" }
    ],
    "Wednesday": [
        { name: "Dr. Sneha Padhiar", id: "SAP", freeSlots: "10:10 - 11:10,2:20 - 3:20", workload: "4" },
        { name: "Prof.Muskan Dave", id: "MCD", freeSlots: "9:10 - 10:10, 12:10 - 1:10,3:20 - 4:20",workload: "3" },
        { name: "Prof. Ronak N Patel", id: "RNP", freeSlots: " 12:10 - 1:10,3:20 - 4:20",workload: "4" }

    ],
    "Thursday": [
        { name: "Dr.Ayushi Chouhan", id: "APC", freeSlots: "2:20 - 4:20", workload: "4" },
        { name: "Dr.Nikita Bhatt", id: "NBH", freeSlots: "12:10 - 2:10", workload: "4" }

    ],
    "Friday": 
    [{ name: "Prof. Ritesh Patel", id: "RIP", freeSlots: "10:10 - 11:10 , 2:20 - 3:20", workload: "4" },
        { name: "Dr.Nikita Bhatt", id: "NBH", freeSlots: "12:10 - 2:10", workload: "4" },
        { name: "Prof.Muskan Dave", id: "MCD", freeSlots: "9:10 - 10:10, 12:10 - 1:10,3:20 - 4:20",workload: "3" }

      
    ],
    "Saturday": [
      
        { name: "Prof.Krunal Maheriya", id: "KJM", freeSlots: "9:10 - 11:10", workload: "4" },
        { name: "Prof. Ritesh Patel", id: "RIP", freeSlots: "2:20 - 4:20", workload: "4" },
        { name: "Prof.Muskan Dave", id: "MCD", freeSlots: "3:20 - 4:20",workload: "5" }

    ]
};

// Function to Get Day Name from Date
function getDayOfWeek(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Function to Check Timetable
function checkTimetable() {
    const dateInput = document.getElementById("date").value;

    if (dateInput === "") {
        alert("Please select a date.");
        return;
    }

    const selectedDay = getDayOfWeek(dateInput);
    document.getElementById("selectedDay").textContent = selectedDay;

    const timetableContainer = document.getElementById("timetable-container");
    const timetableBody = document.getElementById("timetable-body");
    timetableBody.innerHTML = ""; // Clear previous results

    if (timetableByDay[selectedDay]) {
        timetableByDay[selectedDay].forEach(entry => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${entry.name}</td>
                <td>${entry.id}</td>
                <td class="${entry.freeSlots > 2 ? 'status-free' : 'status-busy'}">${entry.freeSlots} </td>
                <td>${entry.workload}</td>
            `;
            timetableBody.appendChild(row);
        });

        timetableContainer.style.display = "block";
    } else {
        timetableContainer.style.display = "block";
        timetableBody.innerHTML = `<tr><td colspan="4">No timetable available for this day.</td></tr>`;
    }
}
// Sign-in Form Submission
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect data from sign-in form
    const userData = {
        username: document.getElementById('username').value,
        id: document.getElementById('id').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    // Store data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

    // Redirect to profile page
    window.location.href = 'profile.html';
});

// Profile Page - Load Data
document.addEventListener('DOMContentLoaded', function () {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
        document.getElementById('name').value = userData.username || '';
        document.getElementById('id').value = userData.id || '';
        document.getElementById('password').value = userData.password || '';
        document.getElementById('email').value = userData.email || '';   
    }
});
// Leave Form Submission
document.addEventListener("DOMContentLoaded", function () {
    const leaveForm = document.getElementById("leaveForm");
    
    if (leaveForm) {
        leaveForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Collecting form data
            const leaveType = document.getElementById("leaveType").value;
            const startDate = document.getElementById("startDate").value;
            const endDate = document.getElementById("endDate").value;
            const reason = document.getElementById("reason").value;

            if (!leaveType || !startDate || !endDate || !reason) {
                alert("Please fill in all fields before submitting.");
                return;
            }

            // Simulate storing leave request (Replace with API integration if needed)
            const leaveRequest = {
                type: leaveType,
                startDate: startDate,
                endDate: endDate,
                reason: reason,
                status: "Pending"
            };

            localStorage.setItem("leaveRequest", JSON.stringify(leaveRequest));

            alert("Leave request submitted successfully!");
            leaveForm.reset(); // Clear form after submission
        });
    }
});
