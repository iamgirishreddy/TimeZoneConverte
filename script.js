const convertTime = () => {
    const inputDate = document.getElementById("inputDate").value;
    const inputTime = document.getElementById("inputTime").value;
    const selectedTimeZone = document.getElementById("timeZoneSelect").value;
    if (!inputDate) {
        displayError("Date not selected. Using current date for conversion.");
    }
    const convertedTimings = convertToAllTimeZones(inputDate, inputTime, selectedTimeZone);
    displayTimings(convertedTimings, selectedTimeZone);
    displayCurrentTimes();
};

const convertToAllTimeZones = (inputDate, inputTime, selectedTimeZone) => {
    let dateTimeString;
    if (inputDate) {
        dateTimeString = `${inputDate}T${inputTime}`;
    } else {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        dateTimeString = `${year}-${month}-${day}T${inputTime}`;
    }
    const inputDateTime = new Date(dateTimeString);
    const estDate = formatDate(inputDateTime, "America/New_York");
    const cstDate = formatDate(inputDateTime, "America/Chicago");
    const pstDate = formatDate(inputDateTime, "America/Los_Angeles");
    const istDate = formatDate(inputDateTime, "Asia/Kolkata");

    const estTime = formatTime(inputDateTime, "America/New_York");
    const cstTime = formatTime(inputDateTime, "America/Chicago");
    const pstTime = formatTime(inputDateTime, "America/Los_Angeles");
    const istTime = formatTime(inputDateTime, "Asia/Kolkata");

    return { estTime, cstTime, pstTime, istTime, estDate, cstDate, pstDate, istDate };
};

const displayTimings = (timings, selectedTimeZone) => {
    const outputTimings = document.getElementById("outputTimings");
    outputTimings.innerHTML = `
        <div class="date-section">
            ${selectedTimeZone !== "est" ? 
            `<div class="timezone">
                <h3>EST</h3>
                <p>${timings.estDate}</p>
                <p>${timings.estTime}</p>
            </div>` : ''}
            ${selectedTimeZone !== "cst" ? 
            `<div class="timezone">
                <h3>CST</h3>
                <p>${timings.cstDate}</p>
                <p>${timings.cstTime}</p>
            </div>` : ''}
            ${selectedTimeZone !== "pst" ? 
            `<div class="timezone">
                <h3>PST</h3>
                <p>${timings.pstDate}</p>
                <p>${timings.pstTime}</p>
            </div>` : ''}
            ${selectedTimeZone !== "ist" ? 
            `<div class="timezone">
                <h3>IST</h3>
                <p>${timings.istDate}</p>
                <p>${timings.istTime}</p>
            </div>` : ''}
        </div>
    `;
};


const displayError = (error) => {
    const outputTimings = document.getElementById("outputTimings");
    outputTimings.innerHTML = `<p style="color: red;">${error}</p>`;
};

const formatDate = (dateTime, timeZone) => {
    const options = { timeZone: timeZone, year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return dateTime.toLocaleDateString("en-US", options);
};

const formatTime = (dateTime, timeZone) => {
    const options = { timeZone: timeZone, hour: 'numeric', minute: 'numeric', hour12: false };
    return dateTime.toLocaleTimeString("en-US", options);
};

const displayCurrentTimes = () => {
    const currentTimesSection = document.getElementById("currentTimes");
    const updateTime = () => {
        const currentTime = new Date();
        currentTimesSection.innerHTML = `
            <div class="current-times-section">
                <div class="timezone">
                    <h3>EST</h3>
                    <p>${formatTime(currentTime, "America/New_York")}</p>
                </div>
                <div class="timezone">
                    <h3>CST</h3>
                    <p>${formatTime(currentTime, "America/Chicago")}</p>
                </div>
                <div class="timezone">
                    <h3>PST</h3>
                    <p>${formatTime(currentTime, "America/Los_Angeles")}</p>
                </div>
                <div class="timezone">
                    <h3>IST</h3>
                    <p>${formatTime(currentTime, "Asia/Kolkata")}</p>
                </div>
            </div>
        `;
    };
    updateTime(); // Call the function immediately to display the time on load
    setInterval(updateTime, 1000); // Update the time every second (1000 milliseconds)
};


// Call displayCurrentTimes once the page loads
window.onload = () => {
    displayCurrentTimes();
};



