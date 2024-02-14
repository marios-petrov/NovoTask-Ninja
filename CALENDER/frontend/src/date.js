
let month = 1
let year = 2024

let dateLabel = null
let selectedDate = [2024, 1, null]

const daysAndMonths = [
    [31, "January"],
    [28, "February"],
    [31, "March"],
    [30, "April"],
    [31, "May"],
    [30, "June"],
    [31, "July"],
    [31, "August"],
    [30, "September"],
    [31, "October"],
    [30, "November"],
    [31, "December"]
];
document.addEventListener("DOMContentLoaded", () => {
    const nextButton = document.querySelector("#next-month")
    const prevButton = document.querySelector("#prev-month")
    const dayNos = document.querySelectorAll(".day-no")
    dateLabel = document.querySelector("#date-label")

    nextButton.addEventListener('click', nextClicked)
    prevButton.addEventListener('click', prevClicked)
    dayNos.forEach(d => d.addEventListener('click', dayClicked))
    updateUI()
})

function dayClicked(e) {
    const elem = e.target
    const date = elem.getAttribute('date')
    selectedDate = [year, month, date]
    updateUI()
}

function getStartDayOfMonth(year, month) {
    const firstDayOfMonth = new Date(year, month, 1);
    return firstDayOfMonth.getDay();
}

function updateUI() {
    dateLabel.innerText = `${daysAndMonths[month][1]} ${year}`
    const startDay = getStartDayOfMonth(year, month)
    let noOfDays = daysAndMonths[month][0]
    if (month === 1) { //if feb
        noOfDays = year % 4 === 0 ? 29 : 28
    }
    // clear the calender
    for (let i = 0; i <= 34; i++) {
        const elem = document.querySelector(`#d${i}`)
        elem.innerText = '-'
        elem.classList.remove('btn')
        elem.classList.remove('btn-primary')
    }
    let grid = startDay
    for (let i = 0; i < noOfDays; i++) {
        const elem = document.querySelector(`#d${grid}`)
        elem.innerText = i + 1
        elem.setAttribute('date', i + 1)
        if (selectedDate[2] === `${i + 1}`) {
            elem.classList.add('btn')
            elem.classList.add('btn-primary')
        }
        grid++
        if (grid > 34) {
            grid = 0
        }
    }
}
function nextClicked() {
    console.log("Next")
    month++
    if (month > 11) {
        month = 0
        year++
    }
    updateUI()
}

function prevClicked() {
    console.log("Prev")
    month--
    if (month < 0) {
        month = 11
        year--
    }
    updateUI()
}

