import { monthSig, tasksSig, yearSig } from "./store.js";

/**
 * A module for date helpers
 */

// a definition of months and day in them
export const daysAndMonths = [
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

/** Return no of days in a given month */
export const getDaysInMonth = (month) => {
    if (month === 1) {
        if (yearSig.value % 4 == 0) {
            return 29
        } else {
            return 28
        }
    }
    return daysAndMonths[month][0]
}
/** Return the name of a given month */
export const getMonthName = (month) => {
    return daysAndMonths[month][1]
}

/** Get the start day(SUN-SAT) of a given day */
export function getStartDayOfMonth(year, month) {
    const firstDayOfMonth = new Date(year, month, 1);
    return firstDayOfMonth.getDay();
}

/** Get the day name of a given date */
export const getDateName = (year, month, date) => {
    const startDay = getStartDayOfMonth(year, month)
    const pos = (date + startDay - 1) % 7
    const dateName = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][pos]
    return dateName
}

/** Divides the hours in a day into interval minutes */
export const getTimes = (startHr, interVal) => {
    const times = []
    for (let i = 0; i < 24; i++) {
        let hr = startHr + i
        if (hr > 23) {
            hr -= 24
        }
        // Divide 1 hr to using interval and store the times
        for (let min = 0; min < 60; min += interVal) {
            let minStr = min < 10 ? ('0' + min) : min
            let hrStr = hr < 10 ? ('0' + hr) : hr
            let time = Number(`${hr}.${min}`).toFixed(2)
            time = time.replace('.', ":")
            time = time.length === 3 ? '0' + time : time
            times.push(`${hrStr}:${minStr}`)
        }
    }
    return times
}
/** A function to filter events and only return relevant on for a given day */
export const getEventInDay = (year, month, day) => {
    // The date to check events for
    const date = new Date(year, month, day, 0, 0, 0, 0)
    const foundTasks = []
    tasksSig.value.forEach(task => {
        // Date event was set
        const taskDate = new Date(task.time)
        const startTime = date.getTime()
        const oneDay = 0 //1 * 24 * 60 * 60 * 100
        // If this task happens once, its only  valid for time slice it lies in
        if (task.freq === 'once') {
            const dayDuration = 24 * 60 * 60 * 1000
            const endTime = startTime + dayDuration
            // check if task lies with the day's start and end times
            if (startTime <= task.time && task.time <= endTime) {
                foundTasks.push(task)
            }
        }
        // if the event happens daily
        if (task.freq === 'daily') {
            // Check if current day's time is >= tasks time
            if (startTime >= task.time) {
                foundTasks.push(task)
            }
        }
        // if the event happens  weekly 
        if (task.freq === 'weekly') {
            // check if day is past the event create time, and the Day(SUN-SAT) in both match
            if (startTime >= (task.time - oneDay)) {
                if (taskDate.getDay() === date.getDay()) {
                    foundTasks.push(task)
                }
            }
        }
        // if if happens yearly
        if (task.freq === 'yearly') {
            // check if day is after task create date, and the month and date match
            if (startTime >= (task.time - oneDay)) {
                if (taskDate.getDate() === date.getDate() && taskDate.getMonth() == date.getMonth()) {
                    foundTasks.push(task)
                }
            }
        }
        // if it happens weekdays
        if (task.freq === 'weekdays') {
            // check if day is a that task day
            if (startTime >= (task.time - oneDay)) {
                // check the day is (MON_FRI)
                if ([1, 2, 3, 4, 5].includes(date.getDay())) {
                    foundTasks.push(task)
                }
            }
        }
        if (task.freq === 'weekends') {
            // check if day is a that task day
            if (startTime >= (task.time - oneDay)) {
                // check the day is (SAT_SUN)
                if ([0, 6].includes(date.getDay())) {
                    foundTasks.push(task)
                }
            }
        }
    })
    return foundTasks
}

/**
 * Get events for a specific time of the day(USED BY WEEK AND DAY VIEWS)
 * @param {*} day 
 * @param {*} timeStr 
 * @param {*} duration 
 * @returns 
 */
export const getEventsForTime = (day, timeStr, duration = 30) => {
    let tasks = []
    if (day != null) {
        tasks = getEventInDay(yearSig.value, monthSig.value, day)
        const hr = Number(timeStr.split(":")[0])
        const min = Number(timeStr.split(":")[1])
        tasks = tasks.filter(t => {
            const dateTime = new Date()
            dateTime.setTime(t.time)
            if (dateTime.getHours() === hr) {
                if (dateTime.getMinutes() >= min && dateTime.getMinutes() <= (min + duration))
                    return true
            } else {
                return false
            }

        })
    }
    return tasks
}
