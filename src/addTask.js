import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
//import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, addDoc , getDocs, doc} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
//import { FirebaseLogin } from './functions.js'
import {  ref, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";


document.addEventListener("DOMContentLoaded", function() {
  // Your JavaScript code here

const firebaseConfig = {
    apiKey: "AIzaSyCdhEnmKpeusKPs3W9sQ5AqpN5D62G5BlI",
    authDomain: "staff-relations-management.firebaseapp.com",
    databaseURL: "https://staff-relations-management-default-rtdb.firebaseio.com",
    projectId: "staff-relations-management",
    storageBucket: "staff-relations-management.appspot.com",
    messagingSenderId: "5650617468",
    appId: "1:5650617468:web:4892625924b0cf6b3ee5f9",
    measurementId: "G-7J5915RDP9"
};






const app = initializeApp(firebaseConfig);
const realtimDB = getDatabase(app);
const auth = getAuth();
const db = getFirestore(app);
const realtimeDb = getDatabase(app);

const user = auth.currentUser;


onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        //console.log("User ID:", user.uid); // Log the user ID
        const userRef = ref(realtimeDb, 'users/' + user.uid);
        //console.log(user.uid);
        const snapshot = await get(userRef);
        const userData = snapshot.val();
        //console.log(userData);

        
      } catch (error) {
        console.error("Error fetching user data:", error);
        
      }
    } else {
      console.log("User is signed out");
      
    }
  


//code to go to the add task


     //const back = document.getElementById("back");

    //event listener to the button
    //back.addEventListener("click", function() {
        // Navigate the user to a new HTML page
    //    window.location.href = "timesheet.html";
    //});
    

    document.getElementById("timesheetForm").addEventListener("submit", async function(event) {
      event.preventDefault(); 
  
      //Get input 
      var fullName = document.getElementById("fullName").value;
      var email = document.getElementById("email").value;
      var date = document.getElementById("date").value;
      var startTime = document.getElementById("startTime").value;
      var endTime = document.getElementById("endTime").value;
      var totalHours = document.getElementById("totalHours").value;
      var projectCode = document.getElementById("projectCode").value;
      var taskDescription = document.getElementById("taskDescription").value;
	
	
	//console.log(email);
	//console.log(date);
	//console.log(startTime);
      //Store data in Firestore
      //console.log(user);
      try {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            if (userId) {
                //Adding the timesheet to the user's timesheets subcollection with auto-generated ID
                
                const timesheetsRef = collection(db, `users/${userId}/timesheets`);
                //console.log(timesheetsRef)
                await addDoc(timesheetsRef, {
                    fullName: fullName,
                    email: email,
                    date: date,
                    startTime: startTime,
                    endTime: endTime,
                    projectCode: projectCode,
                    taskDescription: taskDescription,
                    totalHours: totalHours
                });
                console.log("Timesheet added successfully");
                window.location.href = "timesheet.html";
            } else {
                console.error("User ID not available");
            }
        } else {
            console.error("User not authenticated");
        }
    } catch (error) {
        console.error("Error adding timesheet: ", error);
    }
  });
  //end of add task input
  

  });
  });