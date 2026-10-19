
// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed
let currentScene = "backyard";

// Then, we create an object that stores the data for each scene,
const scenes = {
  // See "backyard" for the first example
  backyard: {
    title: "Location: Backyard",
    character: "Interviewee:Grandma",
    text: "Text: well what I remember happening is that Darcie went inside to play with her pretend kitchen, I heard her neighbor mention he was really hungry, and the dog ran around really quickly",
    // you can choose how many choices to include
    // each choice can have text, an action, and/or nextScene
    choices: [
      {
        text: "Chase after the dog (-10 HP)",
        action: function () {
          updateHealth(-10);
        },
        nextScene: "entrance"
      },
      {
        text: "Ask about the neighbor",
        nextScene: "hallway"
      },
      {
          text: "Pick up the brass key",
          action: function () {
            pickUpItem("brass key");
          },
          nextScene: "hallway"
      }
    ]
  },

  MainHall: {
    title: "Location: Main Hall",
    img: "//add image",
    text: "well what I remember...",
    choices: [
      {
        text: "Ask the Tycoon",
        nextScene: "ballroom"
      },
         {
        text: "Ask the mistress",
        nextScene: "libary"
      },
      {
        text: "Go upstairs",
        nextScene: "stairs"
      },
      { text: "Search the room", // fix this so there's a pop up
     

      }
    ]
  },

  ballroom: {
    title: "The Ballroom",
    img: "//add image",
    text: "The ballroom is grand and elegant...",
    choices: [
      {
        text: "Go to dinning room",
        nextScene: "dinningRoom"
      },
      {
        text: "Go back to main hall",
        nextScene: "MainHall"
      },
      { text: "Search the room"
        
      }
    ]
  },

   libary: {
    title: "The Library",
    img: "//add image",
    text: "The library is filled with old books.",
    choices: [
      {
        text: "Go to study",
        nextScene: "study"
      },
      {
        text: "Go back to main hall",
        nextScene: "MainHall"
      },
      {
        text: "Search the room"
      }
    ]
  },

  study: {
    title: "The Study",
    img: "//add image",
    text: "The study is quiet and filled with books.",
    choices: [
      {
        text: "go back to liabry",
        nextScene: "libary"
      },
      {
        text: "go to bastment",
        nextScene: "bastment"
      },
      { 
        text: "Search the room"
      }
    ]
  },
bastment: {
    title: "The Bastment",
    img: "//add image",
    text: "You died",
   
  

   solution: {
    title: "The solution",
    text: "You solved the mystery!",
    
  }
};

// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields 
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name') 
// in the function itself, but that would be very wordy 
// and make the code harder to read
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
const characterName = document.getElementById("character-name");

// Then, we create a function to update the scene,
function updateScene(sceneName) {

  //This update the variable currentScene with the new scene passed as a parameter
  currentScene = sceneName;

  //This accesses the scene object based on the scene name
  const scene = scenes[sceneName];

  // Here, for each html element, you change the textContent to match
  // the appropriate text from the scene object
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  characterName.textContent = scene.character;

  // Clear the old buttons before creating new ones
  choicesContainer.innerHTML = "";

  // Loop through each choice in the scene, connecting an action and nextScene if included
  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", function () {
      if (choice.action) {
        choice.action();
      }

      if (choice.nextScene) {
        updateScene(choice.nextScene);
      }
    });

    choicesContainer.appendChild(button);
  });
}

// This updates the screen with the current scene
updateScene(currentScene);


// --------------------------------------------------
// HEALTH
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// Either customize the name from health to steps, stress, etc...
// OR
// create a copy of each step for each additional state you want to track throughout the game
// --------------------------------------------------

// Create a variable for health
let health = 100;

// Display current health
const healthDisplay = document.getElementById("health-display");

// Create a function to update health 
function updateHealth(amount) {
  health += amount;
  healthDisplay.textContent = health;
}

// This refreshes the health display
updateHealth(0);

// --------------------------------------------------
// INVENTORY
// Read through the comments below to see what this section does
//
// For now, you are probably leaving this section as is. 
// --------------------------------------------------

// Create a variable for inventory
let inventory = [];

// Display current inventory
const inventoryDisplay = document.querySelector("#inventory-display");
const messageDisplay = document.getElementById("message-display");

// Create a function to update inventory 
function pickUpItem(itemName) {
    // Add itemName to the inventory array
    // Show the updated inventory on the page
  inventory.push(itemName);
  inventoryDisplay.textContent = inventory.join(", ");
}

// --------------------------------------------------
// CONDITIONAL 
// Depending on how you want to implement the conditional logic, you may 
// simply adjust the names below or you may need to expand upon this section
// --------------------------------------------------

// Create a function that checks if the inventory contains one item and if so shows the win condition scene.
function unlockDoor() {
  if (inventory.includes("brass key")) {
    updateScene("solution");
  } else {
    messageDisplay.textContent = "The door is locked.";
  }
}
