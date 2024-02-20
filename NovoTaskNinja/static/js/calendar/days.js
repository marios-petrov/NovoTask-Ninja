import { monthSig, tasksSig, yearSig } from "./store.js";


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

export const getMonthName = (month) => {
    return daysAndMonths[month][1]
}

export function getStartDayOfMonth(year, month) {
    const firstDayOfMonth = new Date(year, month, 1);
    return firstDayOfMonth.getDay();
}

export const getDateName = (year, month, date) => {
    const startDay = getStartDayOfMonth(year, month)
    const pos = (date + startDay - 1) % 7
    const dateName = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][pos]
    return dateName
}


export const getTimes = (startHr, interVal) => {
    const times = []
    for (let i = 0; i < 24; i++) {
        let hr = startHr + i
        if (hr > 23) {
            hr -= 24
        }
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

export const getEventInDay = (year, month, day) => {
    const date = new Date(year, month, day, 0, 0, 0, 0)
    const foundTasks = []
    tasksSig.value.forEach(task => {
        const taskDate = new Date(task.time)
        const startTime = date.getTime()
        const oneDay = 0 //1 * 24 * 60 * 60 * 100
        if (task.freq === 'once') {
            const dayDuration = 24 * 60 * 60 * 1000
            const endTime = startTime + dayDuration
            if (startTime <= task.time && task.time <= endTime) {
                foundTasks.push(task)
            }
        }
        if (task.freq === 'daily') {
            if (startTime >= task.time) {
                foundTasks.push(task)
            }
        }
        if (task.freq === 'weekly') {
            if (startTime >= (task.time - oneDay)) {
                if (taskDate.getDay() === date.getDay()) {
                    foundTasks.push(task)
                }
            }
        }
        if (task.freq === 'yearly') {
            if (startTime >= (task.time - oneDay)) {
                if (taskDate.getDate() === date.getDate() && taskDate.getMonth() == date.getMonth()) {
                    foundTasks.push(task)
                }
            }
        }
        if (task.freq === 'weekdays') {
            if (startTime >= (task.time - oneDay)) {
                if ([1, 2, 3, 4, 5].includes(date.getDay())) {
                    foundTasks.push(task)
                }
            }
        }
        if (task.freq === 'weekends') {
            if (startTime >= (task.time - oneDay)) {
                if ([0, 6].includes(date.getDay())) {
                    foundTasks.push(task)
                }
            }
        }
    })
    return foundTasks
}

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
