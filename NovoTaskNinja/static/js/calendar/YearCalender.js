import { html, render, useState } from 'https://cdn.jsdelivr.net/npm/preact-htm-signals-standalone@0.0.16/+esm'
import { selectedDate, semSig, yearSig } from './store.js';
import { getDaysInMonth, getEventInDay, getMonthName } from './days.js';
import { dateSig } from './store.js';
import { EventsDisplay } from './MonthCalender.js';

/**
 *  WIll display the Month version of the calender
 */
export const MonthView = ({ month }) => {

    // determines the day 0-5 (SUN - SAT) of the month
    function getStartDayOfMonth(year, month) {
        const firstDayOfMonth = new Date(year, month, 1);
        return firstDayOfMonth.getDay();
    }
    // returns a list 
    function getGridData() {
        const gridData = []
        const startDay = getStartDayOfMonth(yearSig.value, month)
        let noOfDays = getDaysInMonth(month)
        // clear the calender
        for (let i = 0; i <= 34; i++) {
            gridData.push('')
        }
        let pos = startDay
        for (let i = 0; i < noOfDays; i++) {
            gridData[pos] = `${i + 1}`
            pos++
            if (pos > 34) {
                pos = 0
            }
        }
        return gridData
    }
    const gridData = getGridData()
    return html`
    <div>
        <div class='y-month-name' >${getMonthName(month)}</div>
        <div class="y-month-grid ">
            <div class="y-month-day day-names">S</div>
            <div class="y-month-day day-names">M</div>
            <div class="y-month-day day-names">T</div>
            <div class="y-month-day day-names">W</div>
            <div class="y-month-day day-names">T</div>
            <div class="y-month-day day-names">F</div>
            <div class="y-month-day day-names">S</div>

            <!-- Dates for February 2024 -->
            ${gridData.map((day, i) => {
        const tasks = getEventInDay(yearSig.value, month, day)
        const dayClicked = () => {
            dateSig.value = day
            selectedDate.value = ['SEM', day, month]
        }
        const extraClasses = (day !== '' && tasks.length > 0) ? " s-with-tasks " : ""
        return html`
                <div class='y-month-day ${extraClasses}' onClick=${dayClicked} >
                    ${day}
                    <${EventsDisplay} tasks=${tasks} type="SEM" day=${day} month=${month}  />
                </div>`
    })}  
        </div>  
    </div>`
}

export const SemCalender = () => {
    const sem = semSig.value
    const setSem = (val) => {
        semSig.value = val
    }
    const months = (sem === 0) ? [0, 1, 2, 3, 4] : [7, 8, 9, 10, 11]
    console.log('sem', sem)
    return html`
    <div class='' >
        <div class='y-sems' >
            <div class=" sbtn-outline-primary  ${sem === 0 ? 'y-selected' : ''}" onClick=${() => setSem(0)} >Spring</div>
            <div class=" sbtn-outline-primary  ${sem === 1 ? 'y-selected' : ''}" onClick=${() => setSem(1)} >Fall</div>
        </div>
        <div class='y-body' >
            ${months.map((i) => {
        return html`
                <${MonthView} month=${i} />
                `
    })}
        </div>
    </div>`
}



