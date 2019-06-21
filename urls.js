/*
 * Coded by Brad Just on 5/23/19.
 * Purpose: Defines links to google web apps and other online connections for easy access in the app.
 * Notable Features: None
 */

const Urls = {
  CalendarAPP: 'https://script.google.com/macros/s/AKfycbzc5reXkJl9WDpipHGEZZIyhOT4fhqNBdOsBBHnKm_6U2mfcvQ/exec', // Google web app that imports events from a google calendar
  ParticipationAPP: 'https://script.google.com/macros/s/AKfycbx9bEWvRGoQxigk6MBSTrJ_9g66EaY_-VYg_NYFj3KzFSsWczIQ/exec', // Google web app that reads participation info from a Google Sheet
  RsvpApp: 'https://script.google.com/macros/s/AKfycbyXR9W7iKwYeU1GpgHt1zDurPcPr6NYN5APGZWnPfV4qzv5aRE/exec', // Google web app that submits an RSVP Google Form
  SignInApp: 'https://script.google.com/macros/s/AKfycbzJiiTk-J8WR0i7J-_5gyjM4CzcvHEjFfN_0slOE_-heiXxgTQ/exec', // Google web app that submits a Sign In Google Form
  UpdateApp: 'https://script.google.com/macros/s/AKfycbzTFY8kvyU4jId_Vx1z6x5Ze4Wq2vUsOJaIrV5q68NQDi8WlwQ/exec', // Google web app that updates participation info in a Google Sheet
  iOSGoogleClientId: '288639392105-bdfe4696dj003fo0ujh7lph3ph28skqp.apps.googleusercontent.com', // iOS Google clientId for Google Sign Ins
  androidGoogleClientId: '288639392105-lqf62ku7s20nje7duik4l2ac0t1o4far.apps.googleusercontent.com', // Android Google clientId for Google Sign Ins
  ErrorEmail: 'https://script.google.com/macros/s/AKfycbykr2cXmNZosOU7omZEDs9G5iNbygvIwklh5aUeeCg8xYLJsqY/exec', // Google we app that sends admin an email with information about app crashes
}
export { Urls };
