# Football Team Manager

## Description
This is a responsive web application built with **HTML**, **CSS**, and **JavaScript** for managing a football team. It allows users to navigate between pages (Home, Players, Tasks, Player Details), filter players by position or playing status, view detailed player profiles, manage player-specific tasks and general tasks with persistent storage using `localStorage`.

## Features

- **Multi-Page Navigation:**  
  Switch easily between Home, Players, Tasks, and Player Details pages without reloading the page.

- **Player Filtering:**  
  Filter players by categories such as Played, Forward, Midfielder, Defender, Goalkeeper, or view all.

- **Player Details & Tasks:**  
  View detailed information for each player, including name, position, number, nickname, and captain status.  
  Add, list, and delete tasks specific to each player.

- **General Tasks Management:**  
  Add, view, and delete tasks that are not assigned to any specific player, useful for team-wide tasks.

- **Data Persistence:**  
  All tasks and user inputs are saved locally in the browser’s `localStorage`, preserving data between sessions.

- **Responsive Design:**  
  Layout adapts smoothly to different screen sizes for optimal usability on desktop and mobile devices.

- **Accessibility:**  
  ARIA roles, keyboard navigability, and clear focus styles improve accessibility.

## Technologies Used

- **HTML5** for structured markup and semantic elements.  
- **CSS3** using Flexbox, Grid, and custom styles for responsive and modern UI.  
- **JavaScript (ES6+)** for DOM manipulation, event handling, and managing application state.  
- **localStorage API** for persistent data storage across browser sessions.

## How It Works

### Navigation  
The app uses JavaScript to switch visibility between the main pages dynamically (`home`, `players`, `tasks`, and `player-details`) without reloading the page, enhancing user experience.

### Player List and Filtering  
Players are stored in a JavaScript array of objects. The UI dynamically generates player cards based on the selected filter from a dropdown menu. Filtering criteria include position and play status.

### Player Details and Task Management  
Clicking on a player card opens a detailed view with the player’s info and a form to add personal tasks. Tasks can be added or removed, and they are saved per player in `localStorage` under a structured key.

### General Tasks  
Separate from player-specific tasks, users can manage a general task list. These tasks are stored and retrieved from `localStorage` as well.

### User Interaction  
- Forms include validation and interactive feedback.  
- Buttons and inputs have ARIA labels for screen readers.  
- Keyboard accessibility is ensured by focus management and tab indexing.

## Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yahmadi45/football-team-manager.git
2.Open the project folder.

3.Open index.html in any modern browser (Chrome, Firefox, Edge, etc.).

*********Usage Instructions****
Use the navigation buttons on top to move between pages.

On the Players page, select filters to view specific player groups.

Click Details on a player card to see more info and manage that player's tasks.

Add new tasks via the input forms; tasks will appear instantly and be saved.

Switch to the Tasks page to manage general team tasks.

Your data stays saved even if you refresh or close the browser.

*********Project Structure************
index.html: Main HTML file containing all page sections.

styles.css: CSS file with styling rules for layout and visuals.

script.js: JavaScript file handling functionality, event listeners, and localStorage.

Future Improvements
Add user authentication for personalized data.

Implement backend storage (database) for persistent cloud saving.

Enhance UI with animations and transitions.

Add task prioritization and deadlines.

License
This project is licensed under the MIT License.


