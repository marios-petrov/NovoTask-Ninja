import { html, render, useState } from 'https://cdn.jsdelivr.net/npm/preact-htm-signals-standalone@0.0.16/+esm'
import { dateSig, monthSig, selectedDate, tasksSig, yearSig } from './store.js';
import { getDaysInMonth, getEventInDay, getStartDayOfMonth } from './days.js';

const freq = {
    once: "🌟 Once",
    daily: "🌞 Daily",
    weekly: "📅 Weekly",
    weekdays: "📆 Weekdays",
    weekends: "🎉 Weekends",
    yearly: "📅  Yearly"
}
const types = {
    'school': "🏫",
    'recreational': "⛹️",
    'health': "🌱",
    'other': "🌐",
    'thesis': "📚",
    'todo': "✅",
}

// Represent a row in the EventsDisplay componenet
export const TaskView = ({ task }) => {
    const [openDelete, setOpenDelete] = useState(false)
    const typeIcon = types[task.type]
    const freqIcon = freq[task.freq]
    // draw the row, with task, name, type, date, frequency etc
    const deleteTask = () => {
        tasksSig.value = tasksSig.value.filter(t => t !== task)
    }
    const closeDelete = () => {
        setOpenDelete(false)
    }
    const showDelete = () => {
        setOpenDelete(true)
    }
    if (openDelete && task.hint !== 'no-save') {
        return html`
        <div>
            <div>${task.hint ? "no-save" : `Delete ${task.title.substring(0, 10)}...?`}</div>
            <div class='m-delete' >
                <div onClick=${deleteTask} class='btn btn-outline-primary' >
                    YES
                </div>
                <div onClick=${closeDelete} class='btn btn-outline-primary' >
                    NO
                </div>
            </div>
        </div>    
        `
    }
    return html`
    <div  class='m-tv' >
        <div class='m-delete-icon' onClick=${showDelete} > ${task.hint === 'no-save' ? "" : "❌"}</div>
        <div class='m-tv-header' >
            <div>${typeIcon}</div>
            <div>${task.title}</div>
        </div>
        <div>
            <div>${task.desc}</div>
            <div class='m-tv-date' >${freqIcon} <br /> ${(new Date(task.time)).toString()}</div>
        </div>
    </div>
    `
}

/**
 * This carries the Events for a given selected day
 * Tasks - list of tasks for the day
 * Type - type of task school, recration, health etc(determines the Icon)
 * Day -  day of the month
 * Month - the month
 * @param {} param0 
 * @returns 
 */
export const EventsDisplay = ({ tasks, type, day, month, time }) => {
    // order task from latest to oldest(created time)
    tasks.sort(t => -t.time)
    // for days without tasks or whose date is not selected, don't draw events 
    if (tasks.length == 0 || selectedDate.value[0] !== type
        || selectedDate.value[1] !== day) {
        return null
    }
    // For SEM view we need to check for selected month too, too avoid drawing the calender mutiple times
    if (type == 'SEM' && selectedDate.value[2] !== month) {
        return null
    }
    // For WEEk view we need to check for selected month too, too avoid drawing the calender mutiple times
    if (type == 'WEEK' && selectedDate.value[2] !== time) {
        return null
    }
    // draw the card with selected tasks
    return html`
    <div class='m-event-display' >
        <div class='m-ed-header' >Tasks ${tasks.length}</div>
        ${tasks.map(t => {
        return html`
            <${TaskView} task=${t}  />    
            `
    })}
    </div>
    `
}

// This is one cell of a Month
const MonthDayView = ({ day }) => {
    // Get task in this day
    let tasks = getEventInDay(yearSig.value, monthSig.value, day)
    // when cell is clicked mark it as selected(will make the EventDisplay for this to show)
    const dayClicked = () => {
        dateSig.value = day
        selectedDate.value = ['MONTH', day]
    }
    // if this is selected, make it blue
    let extraClasses = day === dateSig.value ? " btn btn-primary " : ""
    // add more classes if this has task (orange background etc)
    extraClasses += tasks.length > 0 ? " m-with-tasks " : ""
    // draw the cell
    return html`
    <div class='m-day grid-item ${extraClasses}' onClick=${dayClicked} >
        <div>${day}</div>
        <${EventsDisplay} tasks=${tasks} type="MONTH" day=${day}   />
    </div >
    `
}
export const MonthCalender = () => {

    // Get date values for each cell of the month
    function getGridData() {
        const gridData = []
        // Get start day(SUN-SAT) of this month
        const startDay = getStartDayOfMonth(yearSig.value, monthSig.value)
        let noOfDays = getDaysInMonth(monthSig.value)
        // Mark all cells as unused
        for (let i = 0; i <= 34; i++) {
            gridData.push('-')
        }
        // fill in used cells by the month
        let pos = startDay
        for (let i = 0; i < noOfDays; i++) {
            gridData[pos] = `${i + 1} `
            pos++
            if (pos > 34) {
                pos = 0
            }
        }
        return gridData
    }
    const gridData = getGridData()
    // Draw the static Headers, then uses gridData to draw the cells with dates
    return html`
    <div class="grid-container" >
        <div class="grid-item day-names">SUN</div>
        <div class="grid-item day-names">MON</div>
        <div class="grid-item day-names">TUE</div>
        <div class="grid-item day-names">WED</div>
        <div class="grid-item day-names">THU</div>
        <div class="grid-item day-names">FRI</div>
        <div class="grid-item day-names">SAT</div>

        <!--For each cell in the griddata, Draw a MonthDayView for it -->
        ${gridData.map((d, i) => {
        return html`
                <${MonthDayView} day=${d} />
            `
    })
        }    
    </div > `
}



