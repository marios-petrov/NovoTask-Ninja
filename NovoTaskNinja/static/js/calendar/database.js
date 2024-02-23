/**
 * contains utility functions and default data for the page
 */

import { useEffect } from 'https://cdn.jsdelivr.net/npm/preact-htm-signals-standalone@0.0.16/+esm'
import { tasksSig } from "./store.js"

/** Creates a unique random no for task IDS */
export const getUID = () => {
    return Math.floor(Math.random() * 100000)
}

/** Adds a new task with to the store,adds an id to it */
export const addTask = (task) => {
    // Adding a unique ID to the task
    task = { ...task, id: getUID() }
    // Updating the tasksSig value by adding the new task
    tasksSig.value = [task, ...tasksSig.value];
}

/** Clears a task by using ID(not used for now) */
export const removeTask = (id) => {
    // Filtering out the task with the specified ID
    tasksSig.value = tasksSig.value.filter(t => t.id !== id);
}

/**A custom hook that maintains tasks, by loading and storing them */
export const useTasks = () => {
    // hook that runs when component(HOME) mounts
    useEffect(() => {
        // Retrieve tasks from local storage & adds in default tasks
        const tasksStr = localStorage.getItem('tasks');
        if (tasksStr) {
            // Parse stored tasks and add default tasks
            let allTasks = JSON.parse(tasksStr);
            allTasks = [...allTasks, ...defaultTasks];
            // Update tasksSig value with the combined tasks
            tasksSig.value = allTasks;
            console.log("Loaded tasks", tasksSig.value.length);
        } else {
            // If no stored tasks, set default tasks
            tasksSig.value = [...defaultTasks];
        }
    }, []);

    // Hook that runs when taskSig.value changes(so when task are added or removed)
    useEffect(() => {
        // it stores the task from the user to localstorage
        return () => {
            // Filter out tasks with 'no-save' hint and save to local storage
            const toSaveTasks = tasksSig.value.filter(t => t.hint !== 'no-save');
            localStorage.setItem('tasks', JSON.stringify(toSaveTasks));
            console.log('saved');
        }
    }, [tasksSig.value]);
}

/**
 * Messages to show the user, to inform him to go for lunch
 */
export const hamMessages = [
    "It's date for a delicious meal at HAM! Treat yourself.",
    "Feeling hungry? HAM is waiting for you! Enjoy your lunch.",
    "Don't forget to grab a bite at HAM. Your taste buds will thank you!",
    "Lunchtime alert! HAM has something special for you.",
    "Craving something tasty? Head to HAM and satisfy your appetite."
]

/**
 * Chooses one Ham message randomly and returns it
 * @returns 
 */
export const getHAMMessage = () => {
    const pos = Math.floor(Math.random() * hamMessages.length)
    return hamMessages[pos]
}

/**
 * Care messages to send to user to encourage them to take breaks
 */
export const careMessages = [
    "Remember to take a deep breath and stretch. Your well-being matters!",
    "A short break can do wonders for your productivity. Take a moment for yourself.",
    "Don't forget to give your eyes a break. Look away from the screen and blink a few times.",
    "Taking breaks isn't a luxury; it's a necessity. Step away and recharge!",
    "Feeling stressed? A brisk walk can clear your mind and boost your energy.",
    "Your health is a priority. Take a break, go for a walk, and come back refreshed.",
    "Take a moment to enjoy some fresh air. A short walk can make a big difference.",
    "Sitting for too long? Stand up, stretch, and take a stroll around. Your body will thank you.",
    "Breaks aren't a sign of weakness; they're a sign of self-care. Treat yourself to a short pause.",
    "A change of scenery can do wonders. Step outside for a breath of fresh air.",
    "Listen to your body. If you need a break, take it. Your work will still be here when you return.",
    "Your mind functions better when it gets a chance to relax. Step away and rejuvenate.",
    "Taking breaks isn't slacking off; it's a smart strategy for long-term success.",
    "Feeling overwhelmed? A short walk can help clear your mind and reduce stress.",
    "A break may be the missing piece to solve that problem you've been pondering. Take a breather!",
]

/**
 * Returns on of the Care messages randomly to the users
 */
export const getCareMessage = () => {
    const pos = Math.floor(Math.random() * careMessages.length)
    return careMessages[pos]
}

/**
 * a definition for all the default tasks to show tho the user 
 */
export const defaultTasks = [
    { // in time, input day + 1 (bc 00:00), will show 1 day back on calendar
        "title": "January Interterm Begins",
        "date": "2024-01-04",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
        "time": [8, 30],
    },
    {
        "title": "January ISP Drop/Add Deadline",
        "date": "2024-01-06",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
        "time": [0, 0],
    },
    {
        "title": "Martin Luther King Jr. Day (No Classes; Offices Closed)",
        "date": "2024-01-16",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Baccalaureate Exam Report Due (for January Degree Conferral)",
        "date": "2024-01-20",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "New Student Move-In Day",
        "date": "2024-01-23",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Orientation for New Students",
        "date": "2024-01-25",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Mini-Classes",
        "date": "2024-01-26",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Mini-Classes",
        "date": "2024-01-27",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Report For-Credit Full-Term and Mod 1 Internships in Handshake Deadline",
        "date": "2024-01-27",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "January Interterm Ends",
        "date": "2024-01-27",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "January Degree Conferral",
        "date": "2024-01-27",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Spring Classes Begin",
        "date": "2024-01-30",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Spring Off-Campus Study (OCS) Contract and Tuition Waiver Deadline",
        "date": "2024-01-30",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Residency Reclassification Application Deadline",
        "date": "2024-02-03",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Contract Submission Deadline",
        "date": "2024-02-08",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Late Contract Submission Period ($50 Fee)",
        "date": "2024-02-09",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Late Contract Submission Period ($50 Fee)",
        "date": "2024-02-10",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Last Day for 100% Tuition Refund",
        "date": "2024-02-10",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Tuition and Fees Payment Deadline ($100 Penalty)",
        "date": "2024-02-10",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Presidents Day (No Classes; Offices Closed)",
        "date": "2024-02-20",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Data Structures",
        "date": "2024-02-24",
        "freq": "weekly",
        "type": "school",
        "hint": "no-save",
        "time": [13, 0],
    },
    {
        "title": "Last Day for 25% Tuition Refund",
        "date": "2024-02-24",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Financial Aid Unit Drop Grace Period Deadline",
        "date": "2024-02-24",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Report For-Credit Mod 2 Internships in Handshake Deadline",
        "date": "2024-03-16",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Final Payment Due on Payment Plans ($100 Penalty)",
        "date": "2024-03-16",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Module I Ends",
        "date": "2024-03-16",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Spring Break[STARTS]",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Spring Break[ENDS",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Module II Begins",
        "date": "2024-03-26",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Deadline to Request Readmission for Fall Semester",
        "date": "2024-04-02",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Thesis Prospectus Submission Deadline (6th Term)",
        "date": "2024-04-02",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Off-Campus Study (OCS) Declaration Deadline",
        "date": "2024-04-02",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Provisional AOC (PAOC) Submission Deadline (5th Term)",
        "date": "2024-04-02",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Fall Semester Registration Begins",
        "date": "2024-04-04",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Advising Day",
        "date": "2024-04-05",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Contract Renegotiation Deadline",
        "date": "2024-04-20",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Baccalaureate/Reading Days (No Classes)",
        "date": "2024-04-23",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Baccalaureate/Reading Days (No Classes)",
        "date": "2024-04-24",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Baccalaureate/Reading Days (No Classes)",
        "date": "2024-04-25",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Spring Classes End",
        "date": "2024-05-11",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Baccalaureate Examination Reports Due",
        "date": "2024-05-11",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Evaluation Submission Deadline (potential graduates)",
        "date": "2024-05-14",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Reading Days (No Classes)",
        "date": "2024-05-14",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Reading Days (No Classes)",
        "date": "2024-05-15",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Certification Submission Deadline (potential graduates)",
        "date": "2024-05-15",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Final Exams/Advising",
        "date": "2024-05-16",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Commencement (May, Aug, Jan degree conferrals included)",
        "date": "2024-05-18",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Evaluation Submission Deadline (students on probation)",
        "date": "2024-05-22",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Contract Certification Deadline (students on probation)",
        "date": "2024-05-23",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Memorial Day (Offices Closed)",
        "date": "2024-05-28",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Interterm ISP Evaluation Deadline",
        "date": "2024-05-30",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
    {
        "title": "Evaluation and Contract Submission Deadline",
        "date": "2024-05-30",
        "freq": "yearly",
        "type": "school",
        "hint": "no-save",
    },
].map(t => {
    const date = new Date(t.date)
    const time = t.time
    if (time) {
        date.setFullYear(date.getFullYear() - 1)
        date.setHours(time[0])
        date.setMinutes(time[1])
        console.log(time[0], time[1])
    } else {
        date.setHours(0)
        date.setMinutes(0)
    }
    return { ...t, time: date.getTime() }
})


