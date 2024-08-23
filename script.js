let tasks = [];
let activeTimer = null;
let startTime = null;

document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const taskInput = document.getElementById('taskInput');
    const pledgeValue = document.getElementById('dollarValue');
    const emailInput = document.getElementById('email');
    const pledgeError = document.getElementById('pledgeError');
    const taskText = taskInput.value.trim();
    const pledge = parseFloat(pledgeValue.value);
    const email = emailInput.value.trim();
    
    if (taskText && !isNaN(pledge) && pledge >= 1 && email) {
        pledgeError.textContent = '';
        const task = {
            text: taskText,
            pledge: pledge,
            email: email,
            createdAt: new Date(),
            isWorking: false,
            elapsedTime: 0
        };
        tasks.push(task);
        updateTaskList();
        
        taskInput.value = '';
        pledgeValue.value = '';
        emailInput.value = '';
    } else if (pledge < 1) {
        pledgeError.textContent = 'Daily pledge must be at least $1.';
    }
});

document.getElementById('dollarValue').addEventListener('input', function(e) {
    const pledgeError = document.getElementById('pledgeError');
    if (this.value < 1) {
        pledgeError.textContent = 'Daily pledge must be at least $1.';
    } else {
        pledgeError.textContent = '';
    }
});

function updateTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const daysSinceCreation = Math.floor((new Date() - task.createdAt) / (1000 * 60 * 60 * 24));
        const totalPledge = (daysSinceCreation * task.pledge).toFixed(2);
        li.className = task.isWorking ? 'working' : '';
        li.innerHTML = `
            <div class="task-container">
                <div class="task-info">
                    <strong>${task.text}</strong><br>
                    Daily Pledge: $${task.pledge.toFixed(2)}<br>
                    Time Active: ${formatTime(task.elapsedTime)}<br>
                    <div class="task-buttons">
                        <button onclick="workOnTask(${index})">${task.isWorking ? 'Pause Work' : 'Initiate Work'}</button>
                        <button onclick="removeTask(${index})">Complete Work</button>
                    </div>
                </div>
                <div class="timer" id="timer-${index}">${formatTime(task.elapsedTime)}</div>
            </div>
        `;
        taskList.appendChild(li);
    });
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