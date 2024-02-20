import { html, render, useState, useEffect } from 'https://cdn.jsdelivr.net/npm/preact-htm-signals-standalone@0.0.16/+esm'
import { dateSig, monthSig, yearSig } from './store.js'
import { getDateName, getDaysInMonth, getEventInDay, getEventsForTime, getStartDayOfMonth, getTimes } from './days.js'
import { EventsDisplay } from './MonthCalender.js'
import { selectedDate } from './store.js'

const DaysRow = ({ title }) => {
    const date = dateSig.value || 1
    const prevClicked = () => {
        let newDate = date - 7
        if (newDate < 0) {
            monthSig.value--
            if (monthSig.value < 0) {
                yearSig.value--
                monthSig.value = 11
            }
            newDate = getDaysInMonth(monthSig.value)
        }
        dateSig.value = newDate
    }

    const nextClicked = () => {
        let newDate = date + 7
        if (newDate > getDaysInMonth(monthSig.value)) {
            newDate = 1
            monthSig.value++
            if (monthSig.value > 11) {
                yearSig.value++
                monthSig.value = 0
            }
        }
        dateSig.value = newDate
    }
    return html`
    <div class='day-day-select'  >
        <div  onClick=${prevClicked} >⬅️</div>
        <div class='d-month-name' >${title}</div>
        <div  onClick=${nextClicked} >➡️</div>
    </div>
    `
}

export const WeekCalender = () => {
    const getWeekRange = () => {
        const dateTime = new Date(yearSig.value, monthSig.value, dateSig.value)
        let startDay = dateTime.getDate()
        startDay = startDay - dateTime.getDay()
        if (startDay < 0) {
            startDay = 0
        }
        const newDateTime = new Date(yearSig.value, monthSig.value, startDay)
        let startPos = newDateTime.getDay()

        let endDay = startDay + 6
        if (endDay > getDaysInMonth(monthSig.value)) {
            endDay = getDaysInMonth(monthSig.value)
        }
        const endDateTime = new Date(yearSig.value, monthSig.value, endDay)
        let endPos = endDateTime.getDay()

        const grid = []
        for (let i = 0; i <= 6; i++) {
            grid.push(null)
        }
        for (let i = startPos; i <= endPos; i++) {
            grid[i] = startDay + i
        }
        const days = ["SUN", "MON", 'TUE', 'WED', 'THU', 'FRI', 'SAT']
        return { weekGrid: grid, rangeLabel: `${days[startPos]} ${startDay} - ${days[endPos]} ${endDay} ` }
    }

    const { weekGrid, rangeLabel } = getWeekRange()
    const times = getTimes(7, 30)

    return html`
    <div class="day-body"  >
            <${DaysRow} title=${rangeLabel} />
            <table class='' >
                <tr class='' >
                    <th>Time</th>
                    <th>SUN</th>
                    <th>MON</th>
                    <th>TUES</th>
                    <th>WED</th>
                    <th>THU</th>
                    <th>FRI</th>
                    <th>SAT</th>
                </tr>
                ${times.map(t => {
        const tasksList = weekGrid.map(d => getEventsForTime(d, t))
        const dayNames = weekGrid.map(d => d ? d : '-')


        return html`
                    <tr class=''> 
                        <td class='day-event-time' >${t}</td>
                        ${dayNames.map((d, i) => {
            const tasks = tasksList[i]
            const dayClicked = () => {
                dateSig.value = d
                selectedDate.value = ['WEEK', d, t]
            }
            const extraClass = tasks.length > 0 ? " w-with-tasks " : ""
            return html`
                        <td class='w-day-event ${extraClass}' onClick=${dayClicked} >
                            <div class='w-cell' >${tasks.length || '-'}</div>
                            <${EventsDisplay} tasks=${tasks} type="WEEK" day=${weekGrid[i]} time=${t}  />
                        </td>
                            `
        })}
                    </tr>
                    `
    })}
            </table>
    </div>`
}



