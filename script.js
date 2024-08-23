let tasks = [];
let activeTimer = null;
let startTime = null;

document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const confirmationPopup = document.getElementById('confirmationPopup');
    const taskDetails = document.getElementById('taskDetails');
    const confirmTask = document.getElementById('confirmTask');
    const cancelTask = document.getElementById('cancelTask');

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const taskInput = document.getElementById('taskInput');
        const pledgeValue = document.getElementById('dollarValue');
        const pledgeError = document.getElementById('pledgeError');
        const taskText = taskInput.value.trim();
        const pledge = parseFloat(pledgeValue.value);
        
        if (taskText && !isNaN(pledge) && pledge >= 1) {
            pledgeError.textContent = '';
            
            // Show task details in the confirmation popup
            taskDetails.innerHTML = `
                <p><strong>Task:</strong> ${taskText}</p>
                <p><strong>Daily Pledge:</strong> $${pledge.toFixed(2)}</p>
            `;

            // Show the confirmation popup
            confirmationPopup.style.display = 'block';
        } else if (pledge < 1) {
            pledgeError.textContent = 'Daily pledge must be at least $1.';
        }
    });

    confirmTask.addEventListener('click', function() {
        const taskInput = document.getElementById('taskInput');
        const pledgeValue = document.getElementById('dollarValue');
        
        const task = {
            text: taskInput.value.trim(),
            pledge: parseFloat(pledgeValue.value),
            createdAt: new Date(),
            isWorking: false,
            elapsedTime: 0
        };
        
        tasks.push(task);
        updateTaskList();
        
        // Hide the confirmation popup
        confirmationPopup.style.display = 'none';
        
        // Reset the form
        taskForm.reset();
    });

    cancelTask.addEventListener('click', function() {
        // Hide the confirmation popup without adding the task
        confirmationPopup.style.display = 'none';
    });

    document.getElementById('dollarValue').addEventListener('input', function(e) {
        const pledgeError = document.getElementById('pledgeError');
        if (this.value < 1) {
            pledgeError.textContent = 'Daily pledge must be at least $1.';
        } else {
            pledgeError.textContent = '';
        }
    });

    if (localStorage.getItem('dontShowPopup') !== 'true') {
        document.getElementById('popup').style.display = 'block';
    }

    document.getElementById('closePopup').addEventListener('click', function() {
        document.getElementById('popup').style.display = 'none';
        
        if (document.getElementById('dontShowAgain').checked) {
            localStorage.setItem('dontShowPopup', 'true');
        }
    });
});

function updateTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = tasks.map((task, index) => `
        <li class="${task.isWorking ? 'working' : ''}">
            <div class="task-container">
                <div class="task-info">
                    <strong>${task.text}</strong><br>
                    Daily Pledge: $${task.pledge.toFixed(2)}<br>
                    <div class="timer-container">
                        <span>Time Active:</span>
                        <div class="timer" id="timer-${index}">${formatTime(task.elapsedTime)}</div>
                    </div>
                    <div class="task-buttons">
                        <button onclick="workOnTask(${index})">${task.isWorking ? 'Pause Task' : 'Initiate Task'}</button>
                        <button onclick="removeTask(${index})">Complete Work</button>
                    </div>
                </div>
            </div>
        </li>
    `).join('');
}

function removeTask(index) {
    if (tasks[index].isWorking) {
        stopTimer();
    }
    tasks.splice(index, 1);
    updateTaskList();
}

function workOnTask(index) {
    if (tasks[index].isWorking) {
        stopTimer();
        tasks[index].isWorking = false;
    } else {
        tasks.forEach((task, i) => {
            if (task.isWorking) {
                stopTimer();
                task.isWorking = false;
            }
        });
        tasks[index].isWorking = true;
        startTimer(index);
    }
    updateTaskList();
}

function startTimer(index) {
    if (activeTimer) {
        clearInterval(activeTimer);
    }
    startTime = Date.now();
    activeTimer = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000) + tasks[index].elapsedTime;
        document.getElementById(`timer-${index}`).textContent = formatTime(elapsedSeconds);
    }, 1000);
}

function stopTimer() {
    if (activeTimer) {
        clearInterval(activeTimer);
        activeTimer = null;
        const activeTaskIndex = tasks.findIndex(task => task.isWorking);
        if (activeTaskIndex !== -1) {
            tasks[activeTaskIndex].elapsedTime += Math.floor((Date.now() - startTime) / 1000);
        }
    }
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}