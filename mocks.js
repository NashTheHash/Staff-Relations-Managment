//WHERE I MOCK FIREBASE AND OTHER FUNCTIONS SO I DON'T HAVE TO DEAL WITH THEM DURING UNIT TESTS


/* MOCKING FIREBASE */


jest.mock("./src/firebaseInit.js", () => ({

    signInWithEmailAndPassword: function(auth, email, password){

        //THIS USER IS IN THE REALTIME DB
        if (auth && email == "anemail@email.com"){
            const mockUser = { uid: "uid" };
            const mockUserCred = { user: mockUser };
            return mockUserCred;
        }

        //THESE ARE NOT IN THE REALTIME DB BUT COULD BE IN THE FIRESTORE DB
        else if (auth){
            if (email == "email_not@realtime.db" || email == "email_not@firestore.db"){

                const mockUser = { uid: undefined };
                const mockUserCred = { user: mockUser };
                return mockUserCred;
            }
        }
        throw "Invalid authentication";
    }
}));


jest.mock("./src/database-imports.js", () => ({

    equalTo: function(property){ return },

    get: function(userRef){

        if (userRef == "validRef"){ return mockSnapshot }
        if (userRef == "invalidRef"){ return mockFailedSnapshot }
        if (userRef == "invalidQuery"){ return mockEmptySnapshot }

        const promise = new Promise((resolve) => {
            resolve(mockSnapshot);
        });
        return promise;
    },

    orderByChild: function(property){
        
        if(property == 'email'){
            return "roleChangeEmail";
        }
    },

    query: function(collection, subcollection1, subcollection2){

        if (collection == "allNotifsRef"){ return "allNotifsRef" }
        else if (subcollection1 == "exists"){ return "ref" }
        else if (subcollection1 == "DNE"){ return "noRef" }
        else if (subcollection2 == "invalidQuery"){ return "invalidQuery" }
        else if (subcollection1 == "roleChangeEmail"){ return "roleChangeEmailQuery" }
        return;
    },

    ref: function(database, text){

        if (text == "users/null"){ throw "ID not found" }
        if (text == "users/uid"){ return "validRef" }
        if (text == "users/undefined"){ return "invalidRef" }
        return "ref";
    },

    update: async function(ref, object){ return }
}))


jest.mock("./src/firestore-imports.js", () => ({

    addDoc: function(reference, object){ return },

    collection: function(database, collection, value1, subcollection1, value2, subcollection2){

        if(database == "carWashBookingsRef"){ return "carWashSlotRef" }
        if (database == "carWashBookedRef"){ return "carWashBookedRef" }
        if (collection == "meals"){ return "populateMealsRef" }
        if (collection == "users/poorNetwork/timesheets"){ throw "Network Error" }

        if(subcollection1 == "daySlotBookings"){
            if (subcollection2 == "bookedSlots"){
                return "allNotifsRef";
            }
            else return "ref"
        }
        
        let dest = collection.slice(14);

        if(dest ==  "mealOrders" || dest == "carwashBookings" || collection ==  "feedbackNotifications"){
            return "allNotifsRef";
        }
        return;
    },

    doc: function(database, collection, field){

        if (collection == "carWashBookings" && field == "1969-04-20-Sunday"){
            return "carWashBookingsRef";
        }

        if (database == "carWashSlotRef"){ return "carWashBookedRef" }
        if (collection == "08:00"){ return "slotBookingRef" }
        return;
    },

    getDoc: async function(reference){
        if (reference == "slotBookingRef"){ return mockFailedSnapshot }
        return mockDoc },

    getDocs: async function(reference){
    
        if (reference == "ref" ){ return { docs: mockDocs } }
        if (reference == "carWashBookedRef"){ return { size: 6 } }
        if (reference == "noRef"){ return mockEmptyDoc }
        if (reference == "populateMealsRef"){ return mockDocs }

        if (reference == "allNotifsRef"){

            const mockBookingDoc = {
                data: function(){ return "fullOfBookings" }
            };
            return [ mockBookingDoc ];
        }
        const set = new Set();
        return set;
    },

    setDoc: async function(){ return },
    updateDoc: async function(){ return },
    where: function(field, regex, fieldVal){

        if (fieldVal == "email_not@realtime.db"){ return "exists" }
        else if (fieldVal == "email_not@firestore.db"){ return "DNE" }

        const equation = field + regex + fieldVal;
        if (equation == "requester==invalid_query@database.com"){
            throw "Querying error";
        }
        return;
    }
}));


/* MOCKING FIREBASE_FUNCTIONS */


jest.mock("./src/firebase_functions.js", () => ({

    doBooking: function(){ return }
}))


/* MOCKING OTHER FUNCTIONS */


jest.mock("./src/functions.js", () => ({

    areInputsSelected: function(dateInput, dietSelect){
        
        if (dietSelect.value == "" || dateInput.value == ""){
            return false;
        }
        return true;
    },

    ChangeWindow: function(role){ return },
    getDayName: function(year, month, day){ return "Monday" },
    renderMeals: function(querySnapshot, usersList){ return },
    SetLoginError: function(error){ return "errorMesaage" }
}));


/* MOCKING FIREBASE OBJECTS */


const mockData = { id: "id", role: "role" };

const mockDoc = {

    id: "id",
    exists: function(){ return true },
    data: function(){
        return { data: mockData, diet: "diet", meal: "meal" };
    }
}

const mockEmptyDoc = { empty: true }
const mockDocs = [ mockDoc ];

const mockSnapshot = {

    exists: function(){ return true },
    val: function(){ return mockData }
};

const mockEmptySnapshot = {
    then: function(){ throw Error("error") }
}

const mockFailedSnapshot = {

    exists: function(){ return false },
    val: function(){ return false }
}


const mockFunctions = require('./firebase/functions.js');
const mockFirebaseFunctions = require('./firebase/firebase_functions.js');

export{ mockFunctions, mockFirebaseFunctions };

