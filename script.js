document.getElementById('startButton').addEventListener('click', showExplanationScreen);
document.getElementById('proceedButton').addEventListener('click', startDemoSession);
document.getElementById('restartButton').addEventListener('click', showWelcomeScreen);
document.getElementById('proceedToPhase1Button').addEventListener('click', startGame);
document.getElementById('proceedToPhase2Button').addEventListener('click', proceedToPhase2);

let userInput = '';  // Global variable to store the user's input
let startTime;  // Variable to store the start time of the stopwatch
let timerInterval;  // Variable to store the timer interval
let waitingForKeyPress = false;  // Flag to indicate if we are waiting for the key press
let spacePressCount = 0;  // Counter for space bar presses
let demoAttempts = 0;  // Counter for demo attempts
let gamePhase = 1;  // Track the current phase of the game
let correctKey;  // Store the correct key for resetting the squares

function showExplanationScreen() {
    console.log('startButton clicked');
    userInput = document.getElementById('userInput').value;
    if (userInput.length === 4) {
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('explanationScreen').style.display = 'flex';
    } else {
        alert('Please enter a four-character string.');
    }
}

function startDemoSession() {
    console.log('proceedButton clicked');
    document.getElementById('explanationScreen').style.display = 'none';
    document.getElementById('demoScreen').style.display = 'block';
    demoAttempts = 0;
    gamePhase = 0;  // Set to demo phase
    startDemoAttempt();
}

function startDemoAttempt() {
    const canvas = document.getElementById('demoCanvas');
    const ctx = canvas.getContext('2d');
    const redSquareImage = new Image();
    const greenSquareImage = new Image();

    redSquareImage.src = 'plainRed.png';  // Ensure the path is correct
    greenSquareImage.src = 'plainGreen.png';  // Ensure the path is correct

    const squareWidth = 200;
    const squareHeight = 200;
    const xPos = (canvas.width - squareWidth) / 2;
    const yPos = (canvas.height - squareHeight) / 2;

    ctx.drawImage(redSquareImage, xPos, yPos, squareWidth, squareHeight);
    setTimeout(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
        ctx.drawImage(greenSquareImage, xPos, yPos, squareWidth, squareHeight);
        startStopwatch();
        waitingForKeyPress = true;
    }, Math.random() * 3000 + 2000);  // Random delay between 2000ms (2 seconds) and 5000ms (5 seconds)
}

// Function to handle key presses during the demo session
document.addEventListener('keydown', function (event) {
    if (gamePhase === 0 && event.code === 'Space') {
        if (waitingForKeyPress) {
            clearInterval(timerInterval);
            clearConsole();
            const elapsedTime = Date.now() - startTime;
            console.log(`Reaction Time: ${elapsedTime} ms`);
            waitingForKeyPress = false;
            demoAttempts++;
            if (demoAttempts < 2) {
                startDemoAttempt();
            } else {
                document.getElementById('demoScreen').style.display = 'none';
                document.getElementById('readyScreen').style.display = 'block';
            }
        } else {
            document.getElementById('demoMessage').textContent = 'False press';
            console.log('False press');
        }
    }
});

function startGame() {
    console.log('proceedToPhase1Button clicked');
    document.getElementById('readyScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    gamePhase = 1;  // Set to phase 1
    initializeGame(userInput);
}

function showWelcomeScreen() {
    console.log('restartButton clicked');
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('explanationScreen').style.display = 'none';
    document.getElementById('welcomeScreen').style.display = 'flex';
    clearInterval(timerInterval);  // Stop the timer if it's running
    document.getElementById('message').textContent = '';  // Clear any messages
    spacePressCount = 0;  // Reset the space bar press count
    demoAttempts = 0;  // Reset demo attempts
    gamePhase = 1;  // Reset to the first phase of the game
}

function showNewInstructionScreen() {
    console.log('new instructions screen');
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('newInstructionScreen').style.display = 'flex';
    document.getElementById('message').textContent = '';  // Clear any messages
}

function proceedToPhase2() {
    console.log('Proceed to phase 2');
    gamePhase = 2;  // Transition to the second phase
    document.getElementById('newInstructionScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    startSecondPhase();  // Start the second phase
}

function initializeGame(userInput) {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Load images for both phases
    const redSquareImage = new Image();
    redSquareImage.src = 'plainRed.png';  // Ensure the path is correct

    const greenSquareImage = new Image();
    greenSquareImage.src = 'plainGreen.png';  // Ensure the path is correct

    const fourRedSquares = new Image();
    fourRedSquares.src = 'fourRedSquares.png';  // Ensure the path is correct

    const fourSquares_first_green = new Image();
    fourSquares_first_green.src = 'fourSquares_first_green.png';  // Ensure the path is correct

    const fourSquares_second_green = new Image();
    fourSquares_second_green.src = 'fourSquares_second_green.png';  // Ensure the path is correct

    const fourSquares_third_green = new Image();  // New image
    fourSquares_third_green.src = 'fourSquares_third_green.png';  // Ensure the path is correct

    const fourSquares_fourth_green = new Image();  // New image
    fourSquares_fourth_green.src = 'fourSquares_fourth_green.png';  // Ensure the path is correct

    // Calculate the new size for the images
    const squareWidth = 200;  // Set fixed size for the squares
    const foursquareWidth = 800;  // Set fixed size for the squares
    const squareHeight = 200;

    // Calculate the position to center the image
    const xPos = (canvas.width - squareWidth) / 2;
    const fourxPos = (canvas.width - foursquareWidth) / 2;
    const yPos = (canvas.height - squareHeight) / 2;

    // Function to start the process of the first phase (red and green squares)
    function startFirstPhase() {
        ctx.drawImage(redSquareImage, xPos, yPos, squareWidth, squareHeight);
        setTimeout(function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
            ctx.drawImage(greenSquareImage, xPos, yPos, squareWidth, squareHeight);
            startStopwatch();
            waitingForKeyPress = true;
        }, Math.random() * 3000 + 2000);  // Random delay between 2000ms (2 seconds) and 5000ms (5 seconds)
    }

    // Start the initial phase
    redSquareImage.onload = startFirstPhase;
    redSquareImage.onerror = function () {
        console.error("Failed to load redSquareImage.");
    };

    greenSquareImage.onerror = function () {
        console.error("Failed to load greenSquareImage.");
    };

    fourRedSquares.onerror = function () {
        console.error("Failed to load fourRedSquares.");
    };

    fourSquares_first_green.onerror = function () {
        console.error("Failed to load fourSquares_first_green.");
    };

    fourSquares_second_green.onerror = function () {
        console.error("Failed to load fourSquares_second_green.");
    };

    fourSquares_third_green.onerror = function () {
        console.error("Failed to load fourSquares_third_green.");
    };

    fourSquares_fourth_green.onerror = function () {
        console.error("Failed to load fourSquares_fourth_green.");
    };

    // Event listener for the key press
    document.addEventListener('keydown', function (event) {
        const validKeys = ['A', 'S', 'K', 'L'];
        if (gamePhase === 1 && event.code === 'Space') {
            spacePressCount++;
            if (spacePressCount >= 4) {
                showNewInstructionScreen();
                return;
            }
            if (waitingForKeyPress) {
                clearInterval(timerInterval);
                clearConsole();
                const elapsedTime = Date.now() - startTime;
                console.log(`Reaction Time: ${elapsedTime} ms`);
                waitingForKeyPress = false;
                ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
                startFirstPhase();  // Restart the first phase
            } else {
                document.getElementById('message').textContent = 'False press';
                console.log('False press');
            }
        } else if (gamePhase === 2 && validKeys.includes(event.key.toUpperCase())) {
            if (waitingForKeyPress) {
                const pressedKey = event.key.toUpperCase();
                if (pressedKey === correctKey) {
                    clearInterval(timerInterval);
                    clearConsole();
                    const elapsedTime = Date.now() - startTime;
                    console.log(`Right key pressed: ${pressedKey}, supposed to press: ${correctKey}, Reaction Time: ${elapsedTime} ms`);
                    waitingForKeyPress = false;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
                    ctx.drawImage(fourRedSquares, fourxPos, yPos, foursquareWidth, squareHeight);
                    setTimeout(startSecondPhase, Math.random() * 3000 + 2000);  // Random delay before restarting phase 2
                } else {
                    console.log(`Wrong key pressed: ${pressedKey}, supposed to press: ${correctKey}`);
                }
            }
        } else if (gamePhase === 0 && event.code === 'Space') {
            if (waitingForKeyPress) {
                clearInterval(timerInterval);
                clearConsole();
                const elapsedTime = Date.now() - startTime;
                console.log(`Reaction Time: ${elapsedTime} ms`);
                waitingForKeyPress = false;
                demoAttempts++;
                if (demoAttempts < 2) {
                    startDemoAttempt();
                } else {
                    document.getElementById('demoScreen').style.display = 'none';
                    document.getElementById('readyScreen').style.display = 'block';
                }
            } else {
                document.getElementById('demoMessage').textContent = 'False press';
                console.log('False press');
            }
        }
    });
}

// Function to start the process of the second phase (base image and random image)
function startSecondPhase() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const fourRedSquares = new Image();
    const fourSquares_first_green = new Image();
    const fourSquares_second_green = new Image();
    const fourSquares_third_green = new Image();  // New image
    const fourSquares_fourth_green = new Image();  // New image

    fourRedSquares.src = 'fourRedSquares.png';
    fourSquares_first_green.src = 'fourSquares_first_green.png';
    fourSquares_second_green.src = 'fourSquares_second_green.png';
    fourSquares_third_green.src = 'fourSquares_third_green.png';  // New image
    fourSquares_fourth_green.src = 'fourSquares_fourth_green.png';  // New image

    const foursquareWidth = 800;
    const squareHeight = 200;
    const fourxPos = (canvas.width - foursquareWidth) / 2;
    const yPos = (canvas.height - squareHeight) / 2;

    ctx.drawImage(fourRedSquares, fourxPos, yPos, foursquareWidth, squareHeight);
    setTimeout(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
        const randomImage = getRandomImage();
        ctx.drawImage(randomImage.image, fourxPos, yPos, foursquareWidth, squareHeight);
        correctKey = randomImage.key;  // Assign the correct key based on the displayed image
        console.log(`Press ${correctKey} to reset the squares`);
        startStopwatch();
        waitingForKeyPress = true;
    }, Math.random() * 3000 + 2000);  // Random delay between 2000ms (2 seconds) and 5000ms (5 seconds)
}

function getRandomImage() {
    const images = [
        { image: 'fourSquares_first_green.png', key: 'A' },
        { image: 'fourSquares_second_green.png', key: 'S' },
        { image: 'fourSquares_third_green.png', key: 'K' },  // New image
        { image: 'fourSquares_fourth_green.png', key: 'L' }   // New image
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    const selectedImage = images[randomIndex];
    const image = new Image();
    image.src = selectedImage.image;
    return { image: image, key: selectedImage.key };
}

function startStopwatch() {
    startTime = Date.now();
    timerInterval = setInterval(updateStopwatch, 10);  // Update the stopwatch every 10ms
}

function updateStopwatch() {
    const elapsedTime = Date.now() - startTime;
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

    const formattedTime = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
    // console.log(formattedTime);  // Log the formatted time for debugging or further processing
}

function pad(number) {
    return number.toString().padStart(2, '0');
}

// Function to clear the console
function clearConsole() {
    console.clear();
}
