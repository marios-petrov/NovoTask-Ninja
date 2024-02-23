import { signal } from 'https://cdn.jsdelivr.net/npm/preact-htm-signals-standalone@0.0.16/+esm'

/**
 * Any component that uses a signal is redraw when the signal changes
 */

/**@type {{value:number}} */
export const monthSig = signal(1)  // stores the current month show on calender

/**@type {{value:number}} */
export const yearSig = signal(2024)  // stores the current year shown on calender

/**@type {{value:number}} */
export const dateSig = signal(null)  // stores the current date shown on calender

/**@type {{value: {id:number, type:string,title:string,time:number,freq:string,desc:string}[]}} */
export const tasksSig = signal([])

/**@type {{value:[string, number]}} */
export const selectedDate = signal(['MONTH', '15'])  // used to determine the Events popup to show

/**@type {{value:number}} */
export const semSig = signal(0)  // used t determine the sem to show Spring or fall

/**@type {{value:{open:boolean, type:string,message:string}}} */
export const messageSig = signal({ open: false, type: '', message: "" })  // used to show and hide care and lunch messages
