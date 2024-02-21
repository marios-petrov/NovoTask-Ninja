import { html, render, useState, useRef, useEffect } from 'https://cdn.jsdelivr.net/npm/preact-htm-signals-standalone@0.0.16/+esm'

import { WeekCalender } from './WeekCalender.js'
import { DayCalender } from './DayCalender.js'
import { MonthCalender } from './MonthCalender.js'
import { SemCalender } from './YearCalender.js'
import { dateSig, monthSig } from './store.js'
import { yearSig } from './store.js'
import { getMonthName } from './days.js'
import CreatePopup from './CreatePopup.js'
import { useTasks } from './database.js'
import { MessagePopup } from './MessagePopup.js'

/**
 * This is the scheduler page
 */
const Home = () => {
    // The type of VIEW to show, set versions of state update it and redraws the UI
    const [viewType, setViewType] = useState('MONTH')
    const [createPopupOpen, setCreatePopupOpen] = useState(false)
    const dateTitleRef = useRef()

    // This is a custome hook, it managed the tasks, like loads and saves them has when they chnage or app loads
    useTasks()

    // updates timer
    useEffect(() => {
        setInterval(() => {
            try {
                const time = new Date()
                let hrs = time.getHours()
                let min = time.getMinutes()
                hrs = hrs < 10 ? ('0' + hrs) : hrs
                min = min < 10 ? ('0' + min) : min

                document.querySelector('#time').innerText = `${hrs}:${min}`
            } catch (e) {
                console.log(e)
            }
        }, 1000)
    }, [])

    // THis hook, runs once when app loads and sets date to current date
    useEffect(() => {
        dateSig.value = (new Date()).getDate()
    }, [])

    // This hook runs when yearSig or monthSig chnages and chnages the title of the date on the calender
    useEffect(() => {
        dateTitleRef.current.innerText = `${getMonthName(monthSig.value)} ${yearSig.value}`
    }, [yearSig.value, monthSig.value])

    // Closes the create task popup
    function closePopup() {
        setCreatePopupOpen(false)
    }

    // Opens the create task popup
    function openPopup() {
        setCreatePopupOpen(true)
    }

    // Next month clicked
    function nextClicked() {
        monthSig.value++
        if (monthSig.value > 11) {
            monthSig.value = 0
            yearSig.value++
        }
    }

    // prev month clicked
    function prevClicked() {
        monthSig.value--
        if (monthSig.value < 0) {
            monthSig.value = 11
            yearSig.value--
        }
    }

    // This is component, and draw one of the buttons for changing the VIew Type(DAY, WEEK ,etc)
    const ViewButton = ({ view }) => {

        // When the button is clicked, chnage view to its type
        const clicked = () => {
            setViewType(view)
        }
        // add more classes if this is the current view
        const extraClasses = view === viewType ? 'bg-primary' : ''
        // draw the actual view button
        return html`
            <button type="button" class=${`btn btn-outline-primary ${extraClasses}`}
            onClick=${clicked}
            >
                ${view.toUpperCase()}
            </button>
        `
    }
    // this draws the scheduler page
    return html`
      <div class="body-cont">
        <!--NAV SECTION-->
        <div class=" col-3 nav-section ">
            <div class="bg-primary nav-links">
                <div class="nav-divider">Novo-Planning</div>
                <div><a href="../../NovoTaskNinja/calendar/">🗓️ Calendar</a></div>
                <div><a href="../../NovoTaskNinja/ncfhours/">📚 NCF Hours</a></div>
                <div><a href="../../NovoTaskNinja/todo/">📝 To-Do</a></div>
                <div><a href="../../NovoTaskNinja/dontkillmefood/">🍔 Don't Kill Me Food</a></div>
                <div class="nav-divider">Novo-Gadgets</div>
                <div><a href="../../NovoTaskNinja/timer/">⏲️ Timer</a></div>
                <div><a href="../../NovoTaskNinja/cycreq/">🚸 CYC/AOC Tracker</a></div>
                <div><a href="../../NovoTaskNinja/surprise/"><img src="../../static/images/magicwand.png" alt="Surprise" style="display: block; margin-left: auto; margin-right: auto;"/></a></div>     
                <img src="../../static/images/logo.png"/>  <!-- Same directory name within template, note if referencing bc it made me waste a lot of time-->

                

            </div>
            
        </div>
        
        <!--MAIN SECTION-->
        <div class="main ">
            <div class="buttons">
                <${ViewButton} view="DAY"  />
                <${ViewButton} view="WEEK"  />
                <${ViewButton} view="MONTH"  />
                <${ViewButton} view="SEM"  />
            </div>
            <div class='create-title' >
                <div class="create-button " onClick=${openPopup} > 📝 new </div>
                <div class="date-row text-primary ">
                    <div  onClick=${prevClicked} >⬅️</div>
                    <h2 class="" ref=${dateTitleRef} >February 2024</h2>
                    <div  onClick=${nextClicked} >➡️</div>
                </div>
            </div>
            <!--This is a cnditional render, and draw only the current view -->
            <div class='calender-view' >
                ${viewType === 'WEEK' && html`
                    <${WeekCalender}   />
                `}
                ${viewType === 'DAY' && html`
                    <${DayCalender}   />
                `}
                ${viewType === 'MONTH' && html`
                    <${MonthCalender}   />
                `}
                ${viewType === 'SEM' && html`
                    <${SemCalender}   />
                `}
            </div>
        </div>

        <!-- WILL SHOW CREATE POPUP -->
        <${CreatePopup} open=${createPopupOpen} closePopup=${closePopup} />
        <${MessagePopup}  />

    </div>
    `

}


render(html`<${Home} /> `, document.body)
