/*
The Million Dollar Game Idea - Web App
File name: generate.js
Author: Dylan Belyk
*/

// Text input fields
const genreField = document.getElementById('genre-field');
const mechanicField = document.getElementById('mechanic-field');
const themeField = document.getElementById('theme-field');

// Dice icons
const genreDice = document.getElementById('genre-dice');
const mechanicDice = document.getElementById('mechanic-dice');
const themeDice = document.getElementById('theme-dice');
const paletteDice = document.getElementById('palette-dice');

// Color palette swatch divs
const swatch1 = document.getElementById('color-swatch-1');
const swatch2 = document.getElementById('color-swatch-2');
const swatch3 = document.getElementById('color-swatch-3');
const swatch4 = document.getElementById('color-swatch-4');
const swatch5 = document.getElementById('color-swatch-5');

// Color palette labels
const label1 = document.getElementById('color-label-1');
const label2 = document.getElementById('color-label-2');
const label3 = document.getElementById('color-label-3');
const label4 = document.getElementById('color-label-4');
const label5 = document.getElementById('color-label-5');

// Event listeners used for copying hexcode to clipboard when swatch is clicked
swatch1.addEventListener('click', () => { copyClipboard('color-swatch-1'); });
swatch2.addEventListener('click', () => { copyClipboard('color-swatch-2'); });
swatch3.addEventListener('click', () => { copyClipboard('color-swatch-3'); });
swatch4.addEventListener('click', () => { copyClipboard('color-swatch-4'); });
swatch5.addEventListener('click', () => { copyClipboard('color-swatch-5'); }); 

// Event listeners used for single field and dice icon re-rolls
genreField.addEventListener('click', () => { rollGenre(); })
mechanicField.addEventListener('click', () => { rollMechanic(); })
themeField.addEventListener('click', () => { rollTheme(); })

genreDice.addEventListener('click', () => { rollGenre(); })
mechanicDice.addEventListener('click', () => { rollMechanic(); })
themeDice.addEventListener('click', () => { rollTheme(); })
paletteDice.addEventListener('click', () => { rollColorPallet(); })

// Generate button to generate new fields
document.getElementById("generate-button").addEventListener("click", generateIdeas);

var genreNum, mechanicNum, themeNum, paletteNum = "";

const popupWindow = document.getElementById('popup');

// String array of genre values
const genreValues = ["Action", "Adventure", "Puzzle", "Role-Playing Game", "Simulation", 
    "Strategy", "Sports", "MMO", "MMORPG", "Fighting", "Horror", "Idle", "Party", 
    "Trivia", "Sandbox", "Roguelike", "Battle Royale", "Tower Defense", "MOBA", 
    "Virtual Pet", "First-Person Shooter", "Survival", "Visual Novel", "Platformer", 
    "Top-Down Shooter", "City Builder", "Farming", "Flight", "Arcade", "Educational", 
    "Side Scroller", "Text-Based", "Clicker", "Racing", "Cooking", "Point and Click",
    "Puzzle Platformer"];

// String array of mechanic values
const mechanicValues = ["Time Manipulation", "Soft Body Physics", "Procedural Generation", 
    "Permadeath", "Dynamic Weather", "Parkour/Movement", "Music/Rhythm", "Invisibility", 
    "No Weapons", "Superpowers", "Infinite World", "Finite World", "Finance System", 
    "Trading System", "Multiplayer", "Virtual Reality", "One Life", "Miniature", "Corruption",
    "Multiple Realities", "No Enemies", "Real Physics", "Exaggerated Physics", "A Single Resource",
    "1 HP", "Moral Dilemmas", "Stealth", "Morality System", "Unconventional Movement"];

// String array of theme values
const themeValues = ["Superhero", "Post-Apocalypse", "Pirate", "Modern-Day", "Futuristic", 
    "Mars", "Space", "The Moon", "Fantasy", "Dark Fantasy", "Cyberpunk", "Mythology", "Dystopia", 
    "Science Fiction", "Prehistoric", "Zombie", "Steampunk", "Utopia", "Ancient Rome", 
    "Jungle", "Medieval", "Wilderness", "City", "Cave", "Spooky", "Ocean", "Deep Sea", 
    "Fairy Tale", "Alternate Reality", "Mafia", "Western", "War", "Another Universe", "Apocalypse",
    "Robotic", "Ancient Babylon", "Ancient Egypt", "Underground", "Ancient Greece", "Deserted Island",
    "Candy Land", "Ancient China", "Haunted", "Mayan Civilization", "Jurassic", "Cyberspace", "Alien",
    "Viking", "Neo-Noir", "Noir", "The Amazon", ""];

// Color pallet arrays
const paletteValues = [
    ["#014c90", "#d3291c", "#ffff00", "#ff7f00", "#63b8ff"],
    ["#ff2626", "#fff98b", "#5eb07c", "#2d9667", "#33725f"],
    ["#302c0f", "#939465", "#b1b19d", "#ab7956", "#582206"],
    ["#3d0e6f", "#532187", "#6d37a5", "#8f5dc3", "#b288dd"],
    ["#984033", "#8e2a48", "#7d1236", "#642067", "#4a124e"],
    ["#fad7ea", "#f87bbe", "#f24879", "#e02d48", "#c71919"],
    ["#f9f6f0", "#e6e0d4", "#c9baa1", "#b19e85", "#867763"],
    ["#faf4f0", "#b6d0e7", "#e7cdb6", "#fbd0c6", "#2e2924"],
    ["#eab651", "#97993d", "#446839", "#214132", "#112125"],
    ["#fff2cc", "#fcbb42", "#ff7400", "#660000", "#2f011c"],
    ["#7a3f3f", "#fff7de", "#725a45", "#c07133", "#eaae7f"],
    ["#fae9e7", "#f1c1bc", "#c67777", "#8b5959", "#5c4444"],
    ["#b4dffd", "#9bbdd4", "#7995a7", "#4f616c", "#374249"],
    ["#25294b", "#d84141", "#f4f7cd", "#444444", "#000000"],
    ["#61454d", "#715250", "#756458", "#536a67", "#6b716c"],
    ["#f9d567", "#c4b074", "#aba48b", "#808080", "#636470"],
    ["#f9dae4", "#feebf1", "#e2e1e5", "#cdeeed", "#83d6d5"],
    ["#e3e0e9", "#859394", "#bab2d4", "#9388ad", "#82ad88"],
    ["#8a99b7", "#afddff", "#bcbcbc", "#9fa1ac", "#6e99ca"],
    ["#a94d63", "#ddbb63", "#efb0b0", "#4b4b4b", "#776b94"],
    ["#e4e2df", "#c6c3bf", "#787f9f", "#4c5881", "#575a77"],
    ["#2a4f17", "#38761d", "#55933b", "#7ab260", "#b1ea99"],
    ["#feb480", "#eca27a", "#da9075", "#c77e6f", "#b56c69"],
    ["#191919", "#351c75", "#8fce00", "#b45f06", "#f1c232"],
    ["#5d9e48", "#96b760", "#e23a3a", "#e8e4e4", "#a47053"],
    ["#fdd413", "#f6a716", "#91bf7e", "#1cafec", "#216a8d"],
    ["#ec0075", "#ff5b00", "#f6884c", "#ffdf2b", "#2ce5b7"],
    ["#ffe9e9", "#fdffc8", "#d8ffdc", "#d5eeff", "#f6e3ff"],
    ["#41d8ca", "#c7e3e5", "#f4f3d4", "#f9d7c5", "#f4a2a9"],
    ["#f24545", "#98db5a", "#34b443", "#88f0b9", "#fb8b00"],
    ["#ffb51c", "#ff8c52", "#ff6b6b", "#ff83bd", "#f9bdd5"],
    ["#aff8ef", "#bce8fa", "#e2e3fd", "#fce2fd", "#fde2f0"],
    ["#fdff80", "#ffec00", "#ffd862", "#ffc925", "#e7ae00"],
    ["#16537e", "#45818e", "#d7b98a", "#f44336", "#990000"],
    ["#ffe894", "#fad16b", "#c7a261", "#5a4532", "#221111"],
    ["#fade11", "#fe679a", "#a811fc", "#6c0afb", "#110920"],
    ["#e7b69a", "#e79a9a", "#df8a8a", "#cb7373", "#b66464"],
    ["#f7d452", "#bf706b", "#b23e36", "#733e3e", "#2b2323"],
    ["#e27272", "#d56694", "#ba60ae", "#a060ba", "#7e60ba"],
    ["#1d4427", "#516832", "#305159", "#ada77b", "#9da88d"],
    ["#ecbe67", "#655332", "#f9f266", "#6fa35a", "#7c2a2a"],
    ["#19191b", "#3c3b47", "#424e59", "#5c7370", "#81a0a6"],
    ["#94e10d", "#acd318", "#c1c828", "#b3a332", "#917931"],
];

// Clear fields everytime page loads
document.addEventListener('DOMContentLoaded', function() {
    genreField.value = '';
    mechanicField.value = '';
    themeField.value = '';
    paletteField.value = '';
  });

// Function to generate new outputs for each field
function generateIdeas() {
    // Generate random numbers for each field
    rollGenre(); // Generate a random genre
    rollMechanic(); // Generate a random mechanic
    rollTheme(); // Generate a random theme
    rollColorPalette(); // Generate a random color palette
} 

// Roll functions to generate seperate field values
function rollGenre() {
    genreNum = Math.floor(Math.random() * genreValues.length);
    genreField.value = genreValues[genreNum];
}

function rollMechanic() {
    mechanicNum = Math.floor(Math.random() * mechanicValues.length);
    mechanicField.value = mechanicValues[mechanicNum];
}

function rollTheme() {
    themeNum = Math.floor(Math.random() * themeValues.length);
    themeField.value = themeValues[themeNum];
}

function rollColorPalette() {
    paletteNum = Math.floor(Math.random() * paletteValues.length);
    // Color palette fields - div background color
    swatch1.style.backgroundColor = paletteValues[paletteNum][0]; // Swatch 1
    swatch2.style.backgroundColor = paletteValues[paletteNum][1]; // Swatch 2
    swatch3.style.backgroundColor = paletteValues[paletteNum][2]; // Swatch 3
    swatch4.style.backgroundColor = paletteValues[paletteNum][3]; // Swatch 4
    swatch5.style.backgroundColor = paletteValues[paletteNum][4]; // Swatch 5
    // Color palette fields - hex code label text
    label1.textContent = paletteValues[paletteNum][0]; // Label 1
    label2.textContent = paletteValues[paletteNum][1]; // Label 2
    label3.textContent = paletteValues[paletteNum][2]; // Label 3
    label4.textContent = paletteValues[paletteNum][3]; // Label 4
    label5.textContent = paletteValues[paletteNum][4]; // Label 5
}

// Function to copy swatch hex to clipboard and display popup
function copyClipboard(swatch) {
    // Get div that was clicked and remove blank space
    var copyHex = document.getElementById(swatch).textContent.replace(/\s/g, ''); 
    
    popupWindow.textContent = "Hex copied to clipboard: " + copyHex;
    // Re-add exit popup button HTML
    popupWindow.innerHTML += `<span id="close-button" onclick="this.parentElement.style.visibility='hidden';">&times;</span>`

    navigator.clipboard.writeText(copyHex)
        .then(() => console.log('Text copied to clipboard'), 
            popupWindow.style.visibility = 'visible', popupWindow.style.opacity = '1', // Display popup window

            setTimeout(() => {
                hidePopup();
            }, 2000)) // Time that popup stays visible

        .catch(error => console.error('Error copying text to clipboard:', error));
}

// Function to fade popup out
function hidePopup() {
    const faceSpeed = 0.02; // Speed that div fades out
    let currentOpacity = 1;
    
    const intervalId = setInterval(() => {
        currentOpacity -= faceSpeed;
        popupWindow.style.opacity = currentOpacity;
        // Remove popup once fully faded out
        if (currentOpacity <= 0) {
            popupWindow.classList.visibility= 'hidden';
            popupWindow.style.opacity = 0;
            clearInterval(intervalId);
        }
    });
}
