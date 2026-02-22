const STORAGE_KEY = 'taskmaster.v2';
const DAY_MS = 24 * 60 * 60 * 1000;

const appState = {
    goals: [],
    lastCompletedDate: null,
    streak: 0,
    totalCompletedTasks: 0
};

const ui = {
    goalForm: null,
    goalInput: null,
    taskInput: null,
    pledgeInput: null,
    goalList: null,
    emptyState: null,
    hud: null,
    popup: null,
    donationPopup: null,
    donationTrackLabel: null
};

const FRIEND_BANDCAMP_PICKS = [
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/bits' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/bottom-quark-53-edo' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/branch-plants-of-me-2' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/chaotic-eval-2' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/chowning' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/dang-birbs-2' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/denisovan-embassy' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/discrete-music-2' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/donkology' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/egg-rolling-2' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/egg-rolling-3' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/enceladus' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/enumerate' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/epsilon-2' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/floordiv' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/have-you-heard-2' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/import-os' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/import-subprocess' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/inoremap-jk-esc' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/jiang-2' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/kylie-minilogue-34-edo' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/luigi' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/midi-solutions' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/negative-vibes-only-2' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/negative-vibes-only-3' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/oneshotted' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/public-void' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/qeqqata-2' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/raise-valueerror' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/relationship-tree-2' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/return' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/sf-fitness-53-edo' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/sorted' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/str-replace' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/strange-stars' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/suibian-2' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/supersonic' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/telling-my-kids-this-was-vibe-coding' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/unfalse' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/veridical' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/vibe-coding' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/when-you-dream-do-you-dream-the-sound' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/white-sands-31-edo' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/xenocryst' },
    { artist: 'R Tyler', type: 'track', url: 'https://rtyler.bandcamp.com/track/yield' },
    { artist: 'R Tyler', type: 'album', url: 'https://rtyler.bandcamp.com/album/arctangent-hoots-by-the-nudibranch' },
    { artist: 'R Tyler', type: 'album', url: 'https://rtyler.bandcamp.com/album/egg-rolling' },
    { artist: 'R Tyler', type: 'album', url: 'https://rtyler.bandcamp.com/album/live-code-volume-1' },
    { artist: 'R Tyler', type: 'album', url: 'https://rtyler.bandcamp.com/album/live-code-volume-2' },
    { artist: 'R Tyler', type: 'album', url: 'https://rtyler.bandcamp.com/album/live-code-volume-3' },
    { artist: 'R Tyler', type: 'album', url: 'https://rtyler.bandcamp.com/album/pandaform-tripartite' },
    { artist: 'R Tyler', type: 'album', url: 'https://rtyler.bandcamp.com/album/rsync' },
    { artist: 'R Tyler', type: 'album', url: 'https://rtyler.bandcamp.com/album/when-you-dream-do-you-dream-the-sound' },
    { artist: 'XMachina', type: 'track', url: 'https://xmachina.bandcamp.com/track/cheap-words' },
    { artist: 'XMachina', type: 'album', url: 'https://xmachina.bandcamp.com/album/a-million-knives' },
    { artist: 'XMachina', type: 'album', url: 'https://xmachina.bandcamp.com/album/a-senile-animal' },
    { artist: 'XMachina', type: 'album', url: 'https://xmachina.bandcamp.com/album/a-walk-with-love-death' },
    { artist: 'XMachina', type: 'album', url: 'https://xmachina.bandcamp.com/album/descalator' },
    { artist: 'XMachina', type: 'album', url: 'https://xmachina.bandcamp.com/album/pinkus-abortion-technician' },
    { artist: 'XMachina', type: 'album', url: 'https://xmachina.bandcamp.com/album/soft-spoken-secrets' },
    { artist: 'XMachina', type: 'album', url: 'https://xmachina.bandcamp.com/album/youre-living-all-over-me' },
];

let lastDonationPickIndex = -1;

function uid() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function prettifySlug(url) {
    const slug = url.split('/').filter(Boolean).pop() || 'random-pick';
    return slug
        .split('-')
        .map((part) => (part.length ? part[0].toUpperCase() + part.slice(1) : part))
        .join(' ');
}

function pickRandomFriendPick() {
    let i = Math.floor(Math.random() * FRIEND_BANDCAMP_PICKS.length);
    if (FRIEND_BANDCAMP_PICKS.length > 1 && i === lastDonationPickIndex) {
        i = (i + 1 + Math.floor(Math.random() * (FRIEND_BANDCAMP_PICKS.length - 1))) % FRIEND_BANDCAMP_PICKS.length;
    }
    lastDonationPickIndex = i;
    return FRIEND_BANDCAMP_PICKS[i];
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
        const parsed = JSON.parse(raw);
        appState.goals = Array.isArray(parsed.goals) ? parsed.goals : [];
        appState.lastCompletedDate = parsed.lastCompletedDate || null;
        appState.streak = Number.isInteger(parsed.streak) ? parsed.streak : 0;
        appState.totalCompletedTasks = Number.isInteger(parsed.totalCompletedTasks) ? parsed.totalCompletedTasks : 0;
    } catch (e) {
        console.warn('Unable to load saved data:', e);
    }
}

function createGoal(goalText, firstTaskText, pledge) {
    return {
        id: uid(),
        title: goalText,
        createdAt: Date.now(),
        pledge: Number(pledge) || 0,
        tasks: [createTask(firstTaskText)],
        completed: false
    };
}

function createTask(text) {
    return {
        id: uid(),
        text,
        done: false,
        subtasks: []
    };
}

function calculateGoalProgress(goal) {
    let total = 0;
    let done = 0;

    goal.tasks.forEach((task) => {
        total += 1;
        if (task.done) done += 1;

        task.subtasks.forEach((subtask) => {
            total += 1;
            if (subtask.done) done += 1;
        });
    });

    if (!total) return 0;
    return Math.round((done / total) * 100);
}

function getNextPenaltyTime(goal) {
    const daysElapsed = Math.floor((Date.now() - goal.createdAt) / DAY_MS);
    const nextPenaltyAt = goal.createdAt + ((daysElapsed + 1) * DAY_MS);
    return nextPenaltyAt;
}

function formatCountdown(ms) {
    if (ms <= 0) return '00:00:00';
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateStreak() {
    const today = new Date().toDateString();
    if (appState.lastCompletedDate === today) return;

    const yesterday = new Date(Date.now() - DAY_MS).toDateString();
    appState.streak = appState.lastCompletedDate === yesterday ? appState.streak + 1 : 1;
    appState.lastCompletedDate = today;
}

function completeGoalIfDone(goal) {
    const progress = calculateGoalProgress(goal);
    if (progress === 100 && !goal.completed) {
        goal.completed = true;
    }
}

function renderHud() {
    const activeGoals = appState.goals.filter(g => !g.completed).length;
    const completedGoals = appState.goals.filter(g => g.completed).length;

    ui.hud.innerHTML = `
        <div class="hud-item">Streak: <strong>${appState.streak} day${appState.streak === 1 ? '' : 's'}</strong></div>
        <div class="hud-item">Tasks cleared: <strong>${appState.totalCompletedTasks}</strong></div>
        <div class="hud-item">Goals active: <strong>${activeGoals}</strong></div>
        <div class="hud-item">Goals completed: <strong>${completedGoals}</strong></div>
    `;
}

function renderGoals() {
    if (!appState.goals.length) {
        ui.goalList.innerHTML = '';
        ui.emptyState.style.display = 'block';
        renderHud();
        return;
    }

    ui.emptyState.style.display = 'none';

    ui.goalList.innerHTML = appState.goals.map(goal => {
        const progress = calculateGoalProgress(goal);
        const nextPenalty = getNextPenaltyTime(goal);
        const countdown = formatCountdown(nextPenalty - Date.now());
        const overdueDays = Math.max(0, Math.floor((Date.now() - goal.createdAt) / DAY_MS));
        const suggestedDonation = overdueDays * goal.pledge;

        return `
        <li class="goal-card ${goal.completed ? 'goal-done' : ''}">
            <div class="goal-header">
                <strong>${goal.title}</strong>
                <span class="goal-progress">${progress}%</span>
            </div>

            <div class="progress-bar"><span style="width:${progress}%"></span></div>

            <div class="goal-meta">
                <span>Pledge/day: $${goal.pledge.toFixed(2)}</span>
                <span>Penalty countdown: ${goal.completed ? 'COMPLETE' : countdown}</span>
                <span>Suggested donation so far: $${suggestedDonation.toFixed(2)}</span>
            </div>

            <ul class="task-list">
                ${goal.tasks.map(task => `
                    <li>
                        <label>
                            <input data-action="toggle-task" data-goal-id="${goal.id}" data-task-id="${task.id}" type="checkbox" ${task.done ? 'checked' : ''}>
                            <span class="${task.done ? 'done' : ''}">${task.text}</span>
                        </label>

                        <ul class="subtask-list">
                            ${task.subtasks.map(subtask => `
                                <li>
                                    <label>
                                        <input data-action="toggle-subtask" data-goal-id="${goal.id}" data-task-id="${task.id}" data-subtask-id="${subtask.id}" type="checkbox" ${subtask.done ? 'checked' : ''}>
                                        <span class="${subtask.done ? 'done' : ''}">${subtask.text}</span>
                                    </label>
                                </li>
                            `).join('')}
                        </ul>

                        <div class="row-inline">
                            <input type="text" data-input="subtask" data-goal-id="${goal.id}" data-task-id="${task.id}" placeholder="Add subtask" maxlength="100">
                            <button data-action="add-subtask" data-goal-id="${goal.id}" data-task-id="${task.id}">+ subtask</button>
                        </div>
                    </li>
                `).join('')}
            </ul>

            <div class="row-inline">
                <input type="text" data-input="task" data-goal-id="${goal.id}" placeholder="Add task" maxlength="100">
                <button data-action="add-task" data-goal-id="${goal.id}">+ task</button>
                <button data-action="remove-goal" data-goal-id="${goal.id}">Archive</button>
            </div>
        </li>
        `;
    }).join('');

    renderHud();
}

function bindEvents() {
    ui.goalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const goalText = ui.goalInput.value.trim();
        const firstTaskText = ui.taskInput.value.trim();
        const pledge = parseFloat(ui.pledgeInput.value || '0');

        if (!goalText || !firstTaskText || Number.isNaN(pledge) || pledge < 0) return;

        appState.goals.unshift(createGoal(goalText, firstTaskText, pledge));
        saveState();
        renderGoals();
        ui.goalForm.reset();
        ui.pledgeInput.value = '5';
    });

    ui.goalList.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const action = btn.dataset.action;
        const goalId = btn.dataset.goalId;
        const taskId = btn.dataset.taskId;

        const goal = appState.goals.find(g => g.id === goalId);
        if (!goal) return;

        if (action === 'add-task') {
            const input = ui.goalList.querySelector(`input[data-input="task"][data-goal-id="${goalId}"]`);
            const text = input?.value.trim();
            if (!text) return;
            goal.tasks.push(createTask(text));
            input.value = '';
        }

        if (action === 'add-subtask') {
            const task = goal.tasks.find(t => t.id === taskId);
            if (!task) return;
            const input = ui.goalList.querySelector(`input[data-input="subtask"][data-goal-id="${goalId}"][data-task-id="${taskId}"]`);
            const text = input?.value.trim();
            if (!text) return;
            task.subtasks.push({ id: uid(), text, done: false });
            input.value = '';
        }

        if (action === 'remove-goal') {
            appState.goals = appState.goals.filter(g => g.id !== goalId);
        }

        completeGoalIfDone(goal);
        saveState();
        renderGoals();
    });

    ui.goalList.addEventListener('change', (e) => {
        const input = e.target;
        if (input.tagName !== 'INPUT' || input.type !== 'checkbox') return;

        const action = input.dataset.action;
        const goal = appState.goals.find(g => g.id === input.dataset.goalId);
        if (!goal) return;

        if (action === 'toggle-task') {
            const task = goal.tasks.find(t => t.id === input.dataset.taskId);
            if (!task) return;
            const wasDone = task.done;
            task.done = input.checked;

            if (!wasDone && task.done) {
                appState.totalCompletedTasks += 1;
                updateStreak();
            }

            if (!task.done && task.subtasks.length) {
                task.subtasks.forEach(st => { st.done = false; });
            }
        }

        if (action === 'toggle-subtask') {
            const task = goal.tasks.find(t => t.id === input.dataset.taskId);
            if (!task) return;
            const subtask = task.subtasks.find(st => st.id === input.dataset.subtaskId);
            if (!subtask) return;

            const wasDone = subtask.done;
            subtask.done = input.checked;
            if (!wasDone && subtask.done) {
                appState.totalCompletedTasks += 1;
                updateStreak();
            }

            const allSubtasksDone = task.subtasks.length > 0 && task.subtasks.every(st => st.done);
            if (allSubtasksDone) {
                task.done = true;
            }
        }

        completeGoalIfDone(goal);
        saveState();
        renderGoals();
    });

    document.getElementById('openDonation').addEventListener('click', () => {
        ui.donationPopup.style.display = 'block';
        ui.donationTrackLabel.textContent = '';
    });

    document.getElementById('donateFriendProject').addEventListener('click', () => {
        const pick = pickRandomFriendPick();
        const displayTitle = prettifySlug(pick.url);
        ui.donationTrackLabel.textContent = `Opening random ${pick.type}: ${displayTitle} — ${pick.artist}`;
        window.open(pick.url, '_blank', 'noopener,noreferrer');
    });

    document.getElementById('closeDonation').addEventListener('click', () => {
        ui.donationPopup.style.display = 'none';
    });

    if (localStorage.getItem('dontShowPopup') !== 'true') {
        ui.popup.style.display = 'block';
    }

    document.getElementById('closePopup').addEventListener('click', () => {
        ui.popup.style.display = 'none';
        if (document.getElementById('dontShowAgain').checked) {
            localStorage.setItem('dontShowPopup', 'true');
        }
    });
}

function tick() {
    renderGoals();
}

document.addEventListener('DOMContentLoaded', () => {
    ui.goalForm = document.getElementById('goalForm');
    ui.goalInput = document.getElementById('goalInput');
    ui.taskInput = document.getElementById('taskInput');
    ui.pledgeInput = document.getElementById('dollarValue');
    ui.goalList = document.getElementById('goalList');
    ui.emptyState = document.getElementById('emptyState');
    ui.hud = document.getElementById('hud');
    ui.popup = document.getElementById('popup');
    ui.donationPopup = document.getElementById('donationPopup');
    ui.donationTrackLabel = document.getElementById('donationTrackLabel');

    loadState();
    bindEvents();
    renderGoals();

    setInterval(tick, 1000);
});