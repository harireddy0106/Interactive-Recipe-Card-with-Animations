// Toggle Ingredients
const ingredientsBtn = document.getElementById('toggle-ingredients');
const stepsBtn = document.getElementById('toggle-steps');
const ingredients = document.getElementById('ingredients');
const steps = document.getElementById('steps');

ingredientsBtn.addEventListener('click', () => {
    ingredients.classList.toggle('visible');
    ingredientsBtn.textContent = ingredients.classList.contains('visible') ? 'Hide Ingredients' : 'Show Ingredients';
});

stepsBtn.addEventListener('click', () => {
    steps.classList.toggle('visible');
    stepsBtn.textContent = steps.classList.contains('visible') ? 'Hide Steps' : 'Show Steps';
});

// Step Progression
const startCookingBtn = document.getElementById('start-cooking');
const cancelBtn = document.getElementById('cancel');
const printBillBtn = document.getElementById('print-bill');
const stepItems = document.querySelectorAll('#steps li');
let currentStep = 0;
let cookingStatus = document.getElementById('cooking-status');
let timerDisplay = document.getElementById('timer');
let timerInterval;
let elapsedSeconds = 0;

startCookingBtn.addEventListener('click', () => {
    // Show ongoing cooking status
    cookingStatus.classList.remove('hidden');
    cookingStatus.textContent = 'Cooking in progress...'; // Update to show cooking is in progress

    if (currentStep < stepItems.length) {
        stepItems[currentStep].classList.add('highlight');
        document.querySelector('.progress').style.width = `${(currentStep + 1) / stepItems.length * 100}%`;
        currentStep++;
    } else {
        clearInterval(timerInterval); // Stop the timer when cooking is completed
        cookingStatus.textContent = 'Cooking is completed'; // Update the cooking status message
        alert('You have completed all the steps!');
        document.getElementById('time-bill').textContent = `Cooking time: ${elapsedSeconds} seconds.`;
        document.getElementById('bill').classList.remove('hidden');
        printBillBtn.classList.remove('hidden');
    }

    // Start timer
    if (!timerInterval) {
        startTimer();
    }

    // Show cancel button
    cancelBtn.classList.remove('hidden');
});

// Timer function
function startTimer() {
    timerDisplay.classList.remove('hidden');
    timerInterval = setInterval(() => {
        elapsedSeconds++;
        timerDisplay.textContent = `Elapsed Time: ${elapsedSeconds} seconds`;
    }, 1000);
}

// Cancel Cooking Process
cancelBtn.addEventListener('click', () => {
    // Use confirm() to show a dialog with both OK and Cancel options
    const confirmCancel = confirm('Are you sure you want to cancel the cooking process?');

    if (confirmCancel) {
        clearInterval(timerInterval); // Clear existing timer
        timerInterval = null; // Reset timer interval reference
        currentStep = 0; // Reset step count
        document.querySelector('.progress').style.width = '0%'; // Reset progress bar
        stepItems.forEach(step => step.classList.remove('highlight')); // Remove highlights
        cookingStatus.classList.add('hidden'); // Hide cooking status
        timerDisplay.classList.add('hidden'); // Hide timer display
        cookingStatus.textContent = ''; // Clear status text
        elapsedSeconds = 0; // Reset elapsed time
        printBillBtn.classList.add('hidden'); // Hide print button
        document.getElementById('bill').classList.add('hidden'); // Hide bill
        alert('Cooking has been canceled.'); // Notify user
        location.reload(); // Refresh the page
    } else {
        // If user selects "Cancel", do nothing and continue the cooking process
        alert('Continuing cooking process.');
    }
});

// Print Bill
printBillBtn.addEventListener('click', () => {
    window.print();
});

// making process
const button = document.getElementById('making-process');
const making = document.getElementById('Making');

button.addEventListener('click', () => {
    making.classList.toggle('hidden');
    button.textContent = making.classList.contains('hidden') ? 'Making Process Videos' : 'Hide Languages';
});