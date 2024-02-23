import { html, render, useState, useEffect } from 'https://cdn.jsdelivr.net/npm/preact-htm-signals-standalone@0.0.16/+esm'
import { dateSig, monthSig, selectedDate, yearSig } from './store.js'
import { getDateName, getDaysInMonth, getEventsForTime, getStartDayOfMonth, getTimes } from './days.js'
import { EventsDisplay } from './MonthCalender.js'

/**
 * The header for the day calender to move between days and show current date
 * @returns Component
 */
const DaysRow = () => {
    const noDays = getDaysInMonth(monthSig.value)
    const date = dateSig.value || 1
    const dateName = getDateName(yearSig.value, monthSig.value, date)

    // move to the previous day
    const prevClicked = () => {
        if (date === 1) {
            return
        }
        dateSig.value--
    }
    // move to the next day
    const nextClicked = () => {
        if (date >= noDays) {
            return
        }
        dateSig.value++
    }
    return html`
    <div class='day-day-select'  >
        <div  onClick=${prevClicked} >⬅️</div>
        <div class='d-month-name' >${dateName} ${date}</div>
        <div  onClick=${nextClicked} >➡️</div>
    </div>
    `
}

export const DayCalender = () => {
    // splits the hrs in a day in 30minute intervals
    const times = getTimes(7, 30)
    // draws all the hours and the events in each

    return html`
    <div class="day-body"  >
            <${DaysRow} />
            <div class='day-event-rows' >
                <div class='day-event-row header' >
                    <div>Time</div>
                    <div>Events</div>
                </div>
                ${times.map(t => {
        const tasks = getEventsForTime(dateSig.value, t)
        // when on day event is click show the Tasks popup
        const dayClicked = () => {
            selectedDate.value = ['WEEK', dateSig.value, t]
        }
        // extra classes incase this date has tasks
        const extraClass = tasks.length > 0 ? " day-with-tasks " : ""
        return html`
                    <div class='day-event-row' onClick=${dayClicked} > 
                        <div class='day-event-time' >${t}</div>
                        <div class='day-event-items ${extraClass} ' >
                            ${tasks.length || '-'}
                            <${EventsDisplay} tasks=${tasks} type="WEEK" day=${dateSig.value} time=${t}  />
                        </div>
                    </div>
                    `
    })}
            </div>
    </div>`
}



