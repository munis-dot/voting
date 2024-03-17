export function convertUnixTimestamp(unixTimestamp) {
    const milliseconds = unixTimestamp * 1000;

    const dateObject = new Date(milliseconds);

    // const formattedDate = dateObject.toLocaleString(); 

    return dateObject;
}

function formatTime(hours, minutes, seconds) {
    // Add leading zeros if needed
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

export function startCountdown(targetTime) {
    // Get the current time
    const currentTime = new Date().getTime();

    // Calculate the remaining time in milliseconds
    let remainingTime = targetTime - currentTime;

    // Convert milliseconds to seconds
    remainingTime = Math.floor(remainingTime / 1000);

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    // Format the remaining time
    const formattedTime = formatTime(hours, minutes, seconds);

    // Output the formatted time
    console.log("Remaining time:", formattedTime);

    // Update the timer every second
    setTimeout(() => {
        startCountdown(targetTime);
    }, 1000);
}


