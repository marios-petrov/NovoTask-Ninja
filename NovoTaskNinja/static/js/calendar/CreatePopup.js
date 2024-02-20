import { html, render, useState, useRef, useEffect } from 'https://cdn.jsdelivr.net/npm/preact-htm-signals-standalone@0.0.16/+esm'
import { messageSig, tasksSig } from './store.js';
import { addTask } from './database.js';
import { getCareMessage } from './database.js';

const CreatePopup = ({ closePopup, open }) => {

    useEffect(() => {
        if (!open) return
        // Get the current date and time
        const currentDate = new Date();
        // Format the date as "YYYY-MM-DD" for the date input
        const formattedDate = currentDate.toISOString().split('T')[0];
        document.getElementById('cp-date').value = formattedDate;
        // Format the time as "HH:mm" for the time input
        const formattedTime = currentDate.toTimeString().slice(0, 5);
        document.getElementById('cp-time').value = formattedTime;
    }, [open])

    const save = () => {
        try {
            const title = document.querySelector('#cp-title').value.trim()
            const type = document.querySelector('#cp-type').value.trim()
            const date = document.querySelector('#cp-date').value.trim()
            const time = document.querySelector('#cp-time').value.trim()
            const desc = document.querySelector('#cp-desc').value.trim()
            const freq = document.querySelector('#cp-freq').value.trim()

            if (title.length == 0 || type.length == 0 || date.length == 0 || time.length == 0 ||
                desc.length == 0 || freq.length == 0) {
                console.log("Missing date")
                return
            }
            const dateTime = (new Date(`${date} ${time}`)).getTime()
            addTask({ title, type, desc, freq, time: dateTime })
            // clear the fields
            document.querySelector('#cp-title').value = ""
            document.querySelector('#cp-type').value = ""
            document.querySelector('#cp-desc').value = ""
            document.querySelector('#cp-freq').value = ""
            // create popup
            messageSig.value = {
                open: true,
                message: getCareMessage(),
                type: 'Care Message',
            }
        } catch (e) {
            console.warn("Save error")
        }
    }

    if (!open) {
        return null
    }
    return html`
    <div class='cp-body'>
      <div class='cp-content'>
        <div class='cp-header'>
          <div onClick=${closePopup}>✖</div>
        </div>
        <div class='cp-items'>
          <div class='cp-item-row cp-slim'>
            <input type='text' placeholder='Add title' class='cp-input' id='cp-title' />
          </div>
          <div class='cp-item-row'>
            <div>🔍 Task Type</div>
            <select placeholder='Task type' class='cp-input' id='cp-type' >
              <option value='school'>🏫  School Event</option>
              <option value='recreational'>⛹️  Recreational</option>
              <option value='health'>🌱  Health & Well-being</option>
              <option value='other'>🌐  Other</option>
              <option value='thesis'>📚  Thesis Link</option>
              <option value='todo'>✅  TODO</option>
              <option value='yearly'>📅  Yearly</option>
            </select>
          </div>
          <div class='cp-item-row'>
            <div>📅 Date</div>
            <input type='date' id='dateInput' placeholder='Select date and time' class='cp-input' id='cp-date' />
          </div>
          <div class='cp-item-row'>
            <div>🕒 Time</div>
            <input type='time' id='timeInput' placeholder='Select date and time' class='cp-input' id='cp-time' />
          </div>
          <div class='cp-item-row cp-slim'>
        <select placeholder='Task type' class='cp-input' id='cp-freq' >
            <option value="once">🌟 Once</option>
            <option value="daily">🌞 Daily</option>
            <option value="weekly">📅 Weekly</option>
            <option value="weekdays">📆 Weekdays</option>
            <option value="weekends">🎉 Weekends</option>
        </select>
        </div>
        <div class='cp-item-row'>
            <textarea type='text' placeholder='Add description' rows='4' class='cp-input' id='cp-desc' ></textarea>
        </div>
        <div class='cp-buttons' >
          <button class='btn btn-danger cp-save' onClick=${closePopup} >Close</button>
          <button class='btn btn-primary cp-save' onClick=${save} >Save</button>
        </div>
        </div>
      </div>
    </div>
  `;

}


export default CreatePopup