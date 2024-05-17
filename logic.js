// Get references to the boxes
const greenBox = document.getElementById('greenBox');
const redBox = document.getElementById('redBox');
const cubes = [document.getElementById('cube1'), document.getElementById('cube2'),
document.getElementById('cube3'), document.getElementById('cube4')];

let isGreenActive = false; // Flag to allow reset only after space bar press
let timer; // Timer variable
let successCounter = 0; // How many successes did the subject made

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const gameArea = document.getElementById('gameArea');
    const welcomeMessage = document.getElementById('welcomeMessage');

    startButton.addEventListener('click', () => {
        welcomeMessage.style.display = 'none'; // Hide the welcome message
        startButton.style.display = 'none'; // Hide the start button
        gameArea.style.display = 'flex'; // Show the game area

        // Now start the game
        randomSwitch();
    });
});

function singleGreenBox() {
    greenBox.style.display = 'block';
    redBox.style.display = 'none';
    cubes.forEach(cube => cube.style.display = 'none');
}

function singleRedBox() {
    greenBox.style.display = 'none';
    redBox.style.display = 'block';
    cubes.forEach(cube => cube.style.display = 'none');
}

function multipleRedBox() {
    greenBox.style.display = 'none';
    redBox.style.display = 'none';
    cubes.forEach(cube => cube.style.display = 'block');
}

function randomSwitch() {
    if (successCounter < 3) {
        const randomTime = Math.floor(Math.random() * 3000) + 2000; // Random time between 2 and 5 seconds
        setTimeout(() => {
            const random = Math.random(); // Generate a random number between 0 and 1
            if (random < 0.5) {
                singleGreenBox();
                isGreenActive = true;
                startTimer();
            } else {
                singleRedBox();
                isGreenActive = false;
            }
            randomSwitch(); // Call again after the random time
        }, randomTime);
    } else {
        multipleCubesRandomSwitch();
    }
}

function multipleCubesRandomSwitch() {
    const randomTime = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000; // Random time between 2s and 5s
    setTimeout(() => {
        multipleRedBox(); // Ensure all cubes are red first
        // Randomly select one cube to turn green
        const randomNumber = Math.floor(Math.random() * cubes.length);
        cubes.forEach((cube, index) => {
            if (index === randomNumber) {
                cube.classList.remove('red');
                cube.classList.add('green');
            } else {
                cube.classList.remove('green');
                cube.classList.add('red');
            }
        });
        isGreenActive = true; // Set flag to true after making a cube green
    }, randomTime);
}


function startTimer() {
    const startTime = Date.now();
    const intervalId = setInterval(() => {
        if (!isGreenActive) {
            clearInterval(intervalId);
            const endTime = Date.now();
            const elapsedTime = endTime - startTime;
            console.log(`Time elapsed: ${elapsedTime} ms`);
        }
    }, 100);
}

document.addEventListener('keydown', (event) => {
    if (event.key === ' ' && isGreenActive) {
        successCounter++;
        isGreenActive = false; // Reset flag to false immediately after processing
        cubes.forEach(cube => {
            cube.classList.remove('green');
            cube.classList.add('red');
        });

        if (successCounter < 3) {
            randomSwitch(); // Continue with one cube switching
        } else {
            multipleCubesRandomSwitch(); // Handle multiple cubes
        }
    }
});
