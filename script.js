const pages = ["home", "players", "tasks", "player-details"];
const buttons = {
  home: document.getElementById("btn-home"),
  players: document.getElementById("btn-players"),
  tasks: document.getElementById("btn-tasks"),
};

const mainContent = document.getElementById("main-content");
const playerCards = document.getElementById("player-cards");
const playerDetailsSection = document.getElementById("player-details");
const detailName = document.getElementById("detail-player-name");
const detailPosition = document.getElementById("detail-position");
const detailNumber = document.getElementById("detail-number");
const detailPlayed = document.getElementById("detail-played");
const detailNickname = document.getElementById("detail-nickname");
const taskForm = document.getElementById("task-form");
const tasksUl = document.getElementById("tasks-ul");
const closeDetailsBtn = document.getElementById("close-task-form-btn");
const userForm = document.getElementById("user-form");
const summaryContainer = document.getElementById("summary-container");
const welcomeMessage = document.getElementById("welcome-message");
const homeFormContainer = document.getElementById("home-form-container");  // <--- التعريف المفقود

let currentPlayerName = null;

const players = [
  { name: "Riyadh Mahrez", position: "midfielder", number: 7, isPlayed: true, isCaptain: false, nickname: "Riy", tasks: [] },
  { name: "Jamie Vardy", position: "forward", number: 9, isPlayed: true, isCaptain: false, nickname: "Vardinho", tasks: [] },
  { name: "Kasper Schmeichel", position: "goalkeeper", number: 1, isPlayed: true, isCaptain: true, nickname: "Kasper", tasks: [] },
  { name: "Wilfred Ndidi", position: "midfielder", number: 25, isPlayed: true, isCaptain: false, nickname: "The Rock", tasks: [] },
  { name: "Caglar Soyuncu", position: "defender", number: 4, isPlayed: false, isCaptain: false, nickname: "Cag", tasks: [] },
  { name: "Your Player", position: "midfielder", number: 22, isPlayed: true, isCaptain: false, nickname: "YP", tasks: [] },
];

const playersDropdown = document.getElementById("players-dropdown");

function showPage(pageId) {
  pages.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("hidden", id !== pageId);
  });
}

function setPlayerCards() {
  const filter = playersDropdown.value;

  let filteredPlayers = [];
  switch (filter) {
    case "played":
      filteredPlayers = players.filter(p => p.isPlayed);
      break;
    case "forward":
      filteredPlayers = players.filter(p => p.position === "forward");
      break;
    case "midfielder":
      filteredPlayers = players.filter(p => p.position === "midfielder");
      break;
    case "defender":
      filteredPlayers = players.filter(p => p.position === "defender");
      break;
    case "goalkeeper":
      filteredPlayers = players.filter(p => p.position === "goalkeeper");
      break;
    case "all":
    default:
      filteredPlayers = [...players];
      break;
  }

  if (filteredPlayers.length === 0) {
    playerCards.innerHTML = `<p style="color:#f44336; text-align:center;">No players found for this filter.</p>`;
    return;
  }

  playerCards.innerHTML = filteredPlayers
    .map(
      (player) => `
    <article class="player-card" role="listitem" tabindex="0" aria-label="Player ${player.name}">
      <h2>${player.isCaptain ? "(Captain) " : ""}${player.name}</h2>
      <p>Position: ${player.position}</p>
      <p>Number: ${player.number}</p>
      <p>Played: ${player.isPlayed ? "Yes" : "No"}</p>
      <p>Nickname: ${player.nickname || "N/A"}</p>
      <button class="btn-detail" data-player="${player.name}" aria-label="See details of ${player.name}">Details</button>
    </article>`
    )
    .join("");
}

function showPlayerDetails(playerName) {
  const player = players.find(p => p.name === playerName);
  if (!player) return;

  currentPlayerName = playerName;

  detailName.textContent = (player.isCaptain ? "(Captain) " : "") + player.name;
  detailPosition.textContent = `Position: ${player.position}`;
  detailNumber.textContent = `Number: ${player.number}`;
  detailPlayed.textContent = `Played: ${player.isPlayed ? "Yes" : "No"}`;
  detailNickname.textContent = `Nickname: ${player.nickname || "N/A"}`;

  loadTasksForPlayer();

  showPage("player-details");
}

function loadTasksForPlayer() {
  const storedTasks = JSON.parse(localStorage.getItem("playerTasks")) || {};
  const tasks = storedTasks[currentPlayerName] || [];
  renderTasks(tasks);
}

function renderTasks(tasks) {
  if (tasks.length === 0) {
    tasksUl.innerHTML = "<li>No tasks added yet.</li>";
    return;
  }
  tasksUl.innerHTML = tasks
    .map(
      (task, idx) =>
        `<li>${task} <button class="delete-task-btn" data-index="${idx}" aria-label="Delete task: ${task}">&times;</button></li>`
    )
    .join("");
}

function saveTasks(tasks) {
  const storedTasks = JSON.parse(localStorage.getItem("playerTasks")) || {};
  storedTasks[currentPlayerName] = tasks;
  localStorage.setItem("playerTasks", JSON.stringify(storedTasks));
}

buttons.home.addEventListener("click", () => {
  showPage("home");
});
buttons.players.addEventListener("click", () => {
  showPage("players");
  setPlayerCards();
});
buttons.tasks.addEventListener("click", () => {
  showPage("tasks");
});

playersDropdown.addEventListener("change", setPlayerCards);

playerCards.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-detail")) {
    const playerName = e.target.dataset.player;
    showPlayerDetails(playerName);
  }
});

closeDetailsBtn.addEventListener("click", () => {
  showPage("players");
  setPlayerCards();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = taskForm["task-text"];
  const value = input.value.trim();
  if (!value) return;

  const storedTasks = JSON.parse(localStorage.getItem("playerTasks")) || {};
  const tasks = storedTasks[currentPlayerName] || [];

  tasks.push(value);
  saveTasks(tasks);
  renderTasks(tasks);

  input.value = "";
  input.focus();
});

tasksUl.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-task-btn")) {
    const idx = Number(e.target.dataset.index);
    const storedTasks = JSON.parse(localStorage.getItem("playerTasks")) || {};
    const tasks = storedTasks[currentPlayerName] || [];

    if (idx >= 0 && idx < tasks.length) {
      tasks.splice(idx, 1);
      saveTasks(tasks);
      renderTasks(tasks);
    }
  }
});

userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = userForm["first-name"].value.trim();
  const lastName = userForm["last-name"].value.trim();
  const notRobot = userForm["not-robot"].checked;

  if (!notRobot) {
    alert("Please confirm you are not a robot.");
    return;
  }

  welcomeMessage.textContent = `Welcome, ${firstName} ${lastName}!`;
  homeFormContainer.classList.add("hidden");
  summaryContainer.classList.remove("hidden");
  userForm.reset();
  summaryContainer.scrollIntoView({ behavior: "smooth" });
});

window.addEventListener("load", () => {
  showPage("home");
  setPlayerCards();
});
// Elements for the general tasks form and list
const generalTaskForm = document.getElementById("general-task-form");
const generalTaskInput = document.getElementById("general-task-text");
const generalTasksUl = document.getElementById("general-tasks-ul");

// Function to load general tasks from localStorage
function loadGeneralTasks() {
  // Get tasks from localStorage or empty array if none
  const stored = JSON.parse(localStorage.getItem("generalTasks")) || [];
  // Render tasks on the page
  renderGeneralTasks(stored);
  return stored;
}

// Function to render tasks inside the list
function renderGeneralTasks(tasks) {
  if (tasks.length === 0) {
    // Show message if no tasks available
    generalTasksUl.innerHTML = "<li>No general tasks added yet.</li>";
    return;
  }
  // Generate list items with delete buttons for each task
  generalTasksUl.innerHTML = tasks
    .map(
      (task, idx) =>
        `<li>${task} <button class="delete-general-task-btn" data-index="${idx}" aria-label="Delete task: ${task}">&times;</button></li>`
    )
    .join("");
}

// Function to save tasks array to localStorage
function saveGeneralTasks(tasks) {
  localStorage.setItem("generalTasks", JSON.stringify(tasks));
}

// Handle new task submission
generalTaskForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submit behavior
  const value = generalTaskInput.value.trim();
  if (!value) return; // Ignore empty input

  // Load current tasks, add the new one, then save and re-render
  const tasks = loadGeneralTasks();
  tasks.push(value);
  saveGeneralTasks(tasks);
  renderGeneralTasks(tasks);

  // Clear input and focus for next entry
  generalTaskInput.value = "";
  generalTaskInput.focus();
});

// Handle deleting a task (event delegation on the list)
generalTasksUl.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-general-task-btn")) {
    const idx = Number(e.target.dataset.index);
    const tasks = loadGeneralTasks();

    if (idx >= 0 && idx < tasks.length) {
      // Remove the task at index and update storage and UI
      tasks.splice(idx, 1);
      saveGeneralTasks(tasks);
      renderGeneralTasks(tasks);
    }
  }
});

// Load tasks when page loads (if tasks page is visible)
window.addEventListener("load", () => {
  if (!document.getElementById("tasks").classList.contains("hidden")) {
    loadGeneralTasks();
  }
});

// Also load tasks when navigating to the tasks page via nav buttons
buttons.tasks.addEventListener("click", () => {
  showPage("tasks");
  loadGeneralTasks();
});

