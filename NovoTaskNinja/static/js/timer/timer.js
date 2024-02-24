// Execute when the window has finished loading
window.onload = function () {
    // Initialize time values
    let minutes = 0;
    let seconds = 0;
    let tens = 00;
    // Get references to the elements where time values will be displayed
    let appendMinutes = document.querySelector('#minutes');
    let appendTens = document.querySelector('#tens');
    let appendSeconds = document.querySelector('#seconds');
    // Get references to the control buttons
    let startBtn = document.querySelector('#start');
    let stopBtn = document.querySelector('#stop');
    let resetBtn = document.querySelector('#reset');
    // Variable to store the interval ID
    let Interval;

    // Function to start or continue the timer
    const startTimer = () => {
        tens++; // Increment the tens counter
        if (tens <= 9) {
            appendTens.innerHTML = '0' + tens; // Add leading zero if necessary
        }
        if (tens > 9) {
            appendTens.innerHTML = tens; // Update tens display
        }

        if (tens > 99) {
            seconds++; // Increment seconds after 100 tens
            appendSeconds.innerHTML = '0' + seconds; // Update seconds display and reset tens
            tens = 0;
            appendTens.innerHTML = '00';
        }

        if (seconds > 9) {
            appendSeconds.innerHTML = seconds; // Update seconds display without leading zero
        }

        if (seconds > 59) {
            minutes++; // Increment minutes after 60 seconds
            appendMinutes.innerHTML = '0' + minutes; // Update minutes display and reset seconds
            seconds = 0;
            appendSeconds.innerHTML = '00';
        }
    };

    // Start button event listener to start or resume the timer
    startBtn.onclick = () => {
        clearInterval(Interval); // Clear any existing intervals to avoid duplicates
        Interval = setInterval(startTimer, 10); // Start the timer with an interval of 10 milliseconds
    };

    // Stop button event listener to pause the timer
    stopBtn.onclick = () => {
        clearInterval(Interval); // Clear the interval to pause the timer
    };

    // Reset button event listener to reset the timer values and display
    resetBtn.onclick = () => {
        clearInterval(Interval); // Clear the interval to stop the timer
        // Reset all time values and update their displays
        tens = '00';
        seconds = '00';
        minutes = '00';
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
        appendMinutes.innerHTML = minutes;
    };
};
