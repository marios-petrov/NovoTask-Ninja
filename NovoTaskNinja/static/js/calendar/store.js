import { signal } from 'https://cdn.jsdelivr.net/npm/preact-htm-signals-standalone@0.0.16/+esm'

/**
 * Any component that uses a signal is redraw when the signal changes
 */

/**@type {{value:number}} */
export const monthSig = signal(1)

/**@type {{value:number}} */
export const yearSig = signal(2024)

/**@type {{value:number}} */
export const dateSig = signal(null)

/**@type {{value: {id:number, type:string,title:string,time:number,freq:string,desc:string}[]}} */
export const tasksSig = signal([])

/**@type {{value:[string, number]}} */
export const selectedDate = signal(['MONTH', '15'])

/**@type {{value:number}} */
export const semSig = signal(0)

/**@type {{value:{open:boolean, type:string,message:string}}} */
export const messageSig = signal({ open: false, type: '', message: "" })
