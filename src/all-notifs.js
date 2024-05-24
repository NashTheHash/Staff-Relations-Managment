import { auth } from './firebaseInit.js';

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
<<<<<<< HEAD
import { GetCurrentUserCarWashBookings, GetCurrentUserMealBookings, SendHome, HandleFeedback } from './firebase_functions.js';
=======

import { GetCurrentUserCarWashBookings, GetCurrentUserMealBookings, SendHome, GetCurrentUserFeedbackNotifications } from './firebase_functions.js';

>>>>>>> 00227f7f0b8cff742f15f9d08a3ca79520b7fb5a
import { CheckUserAuthenticated, CreateMealNotificationElements, CreateCarWashNotificationElement, PopulateNotifications, CreateFeedbackNotificationElement } from './functions.js';





document.addEventListener("DOMContentLoaded", function() {



    //function to get current user and their id

    onAuthStateChanged(auth, async () => {



        const user = CheckUserAuthenticated(auth);

        

        const homebtn = document.getElementById('home');

        homebtn.addEventListener('click', () => {

            SendHome(user);            

        });



        // Fetch the current user's meal bookings for the current day from the database

        const currentUserMealBookings = await GetCurrentUserMealBookings(user);



        // Create HTML elements dynamically for each meal booking notification

        const mealNotificationElements = CreateMealNotificationElements(currentUserMealBookings);



        // Fetch the current user's car wash bookings for the current day from the database

        const currentUserCarWashBookings = await GetCurrentUserCarWashBookings(user);



        // Create HTML elements dynamically for each car wash booking notification

        const carWashNotificationElements = CreateCarWashNotificationElement(currentUserCarWashBookings);

<<<<<<< HEAD
        const feedbackNotification = await HandleFeedback(user)
=======
>>>>>>> 00227f7f0b8cff742f15f9d08a3ca79520b7fb5a

        //get current feedback
        const currentFeedbackNotification = await GetCurrentUserFeedbackNotifications(user.email);
        //create the notification element
        const feedbackNotificationElement = CreateFeedbackNotificationElement(currentFeedbackNotification);

        const notificationContainer = document.getElementById('NotificationContainer');

<<<<<<< HEAD
        // Combine notification elements for both meal and car wash bookings
        const combinedNotificationElements = [...mealNotificationElements, ...carWashNotificationElements, ...feedbackNotificationElements];
=======
>>>>>>> 00227f7f0b8cff742f15f9d08a3ca79520b7fb5a


        // Combine notification elements for both meal and car wash bookings

        const combinedNotificationElements = [...mealNotificationElements, ...carWashNotificationElements, ... feedbackNotificationElement];



        

        PopulateNotifications(notificationContainer, combinedNotificationElements);

    });



    //some code to make the notifications heading highligt when the mouse hovers over it

    document.getElementById('heading').addEventListener('mouseover', function() {

        this.classList.add('permanent');

    });

});  