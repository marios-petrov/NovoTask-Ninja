import { html, render, useState, useRef, useEffect } from 'https://cdn.jsdelivr.net/npm/preact-htm-signals-standalone@0.0.16/+esm'
import { getHAMMessage } from "./database.js"
import { messageSig } from './store.js'


/**
 * A Recursive function that runs a function each day at 11am
 * @param {*} callback the function to run
 */
function runAt11AM(callback) {
    // current date
    const now = new Date();
    // current date 11am
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0, 0, 0); // Set the target time to 11 AM (24 hr clock) (hr, min, sec, ms)
    // milliseconds to 11 am
    const timeUntil11AM = targetTime - now;

    if (timeUntil11AM > 0) {
        // Set a timeout to run the callback at 11 AM
        console.info(`Lunch message to pop in ${(timeUntil11AM / 1000).toFixed(0)}s  `)
        setTimeout(() => {
            callback();
            // Schedule the next run for the next day
            runAt11AM(callback);
        }, timeUntil11AM);
    } else {
        // If it's already past 11 AM today, schedule it for 11 AM tomorrow
        const timeUntilNext11AM = 24 * 60 * 60 * 1000 - (now - targetTime);
        console.info(`Lunch message to pop in ${(timeUntilNext11AM / 1000).toFixed(0)}s  `)
        setTimeout(() => {
            callback();
            // Schedule the next run for the next day
            runAt11AM(callback);
        }, timeUntilNext11AM);
    }
}

/**
 * Show the popup for care messages and HAM lunch reminders
 * @returns 
 */
export const MessagePopup = () => {
    // Auto hide duration for a Popup
    const POPUP_DURATION = 3
    // the message to show
    const message = messageSig.value.message
    
    // Set getHAM message to run every 11am
    useEffect(() => {
        runAt11AM(() => {
            console.log("pop")
            messageSig.value = {
                type: 'Go For Lunch',
                message: getHAMMessage(),
                open: true,
            }
        })
    }, [])

    // Hook to set outoclose when a message is open
    useEffect(() => {
        if (messageSig.value.open) {
            setTimeout(() => {
                close()
            }, POPUP_DURATION * 1000);
        }
    }, [messageSig.value.open])

    // closes a message
    const close = () => {
        messageSig.value = { ...messageSig.value, open: false }
    }
    
    // only show message is its open
    if (!messageSig.value.open) {
        return null
    }
    
    // draw the message on the bottom left corner
    return html`
        <div class='mp-body' >
            <div class='mp-header' > 
                <div>${messageSig.value.type} </div>
                <div class='mp-close' onClick=${close} >X</div>
            </div>
            <div>${message}</div>
        </div>
    `
}
