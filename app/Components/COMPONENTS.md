# Components Folder

  This folder contains all of the source code for the screens in the app. They are grouped in folders with
  other files that have similar functionality.

## ErrorPage

  Contains one file with the screen that users are directed to in the case of an app error. The screen sends
  an email to the admin notifying them of the failure.

## EventRequirements

  Contains one file with the screen rendering UHP and SJ requirement information for honors students.

## EventsList

  Contains three files that work together to (1) render the list of events students can attend and (2) individual
  event information.

  - EventsList.js - Creates the structure of the screen containing the scrolling list of events. A Flatlist is defined
    here which renders all of the events in a scrolling format.
  - ListItems.js - Defines the structure and formatting of the items to be rendered by the Flatlist in EventsList.js
  - IndivEventScreen.js - Provides the template which is filled out with event information stored in the list item
    that was tapped on by the user. The data is formatted in a readable way.

## General

  Contains one file with a generic screen with the Mission Church as background that can display a simple message
  to users.

## Icons

  Contains three custom defined icons to be used in the app. All of the icons are Expo vector icons customized in
  some way.

  - angle-left.js - renders a chevron like character if the user is running ios and an arrow if they are running
    Android. When the icon is pressed, the app navigates the user the the previous screen in the stack.
  - plus.js - renders a plus icon whose size and opacity are dynamic.
  - settingsCog.js - renders a white cog that when pressed navigates the user to the settings screen of the app.

## LocationCheck

  Contains two files that give a user the ability to sign into an event or rsvp for an event.

  - LocationCheck.js - After a user presses sign in on the IndivEventScreen.js screen, they are navigated to
    this screen which checks to see if the user is in the same geographic location as the event. If they are,
    their sign in will be accepted and recorded with a Google Form. If they are not, their sign in attempt will
    still be noted with a Google Form so the user can receive credit in case of an error in the app's
    location check.
  - RSVP.js - If an event is happening in the future, the user will be directed to this screen which will record
    the user's interest in an rsvp Google Form.

## ParticipationHome

  Contains five files all related to user participation.

  - EventStickyLogic.js - Contains a template for the UHP and SJ information rendered in "sticky note" format on the
  ParticipationStatus.js screen.
  - ParticipationFAQ.js - Screen that renders the app/uhp FAQ
  - ParticipationHome - Home screen for the app. Links to event information, the participation FAQ, user participation status info, and event requirements info.
  - ParticipationStatus - Renders the "sticky notes" displaying a user's participation info. I.e. the user's UHP status
  and their SJ status.
  - PostIt.js - Similar to EventStickyLogic.js, provides a template for all of the information on ParticipationFAQ.js
  to be rendered in a homogenous way.

## Settings

  Contains one file with links to the info found on the settings screen. Currently just a sign out button.

## StartPage

  Contains the start page of the app where a user is signed in using Google Sign-In and where all the app's assets are
  initially loaded.
