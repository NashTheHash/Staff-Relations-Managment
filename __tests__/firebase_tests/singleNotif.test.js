import { DisplaySingleNotification } from "../../src/firebase_functions";


describe("DisplaySingleNotification Functionality", () => {

    let consoleSpy;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        console.error.mockRestore();
    });

    it("Throws an error if the input auth is invalid", async () => {

        const error = new Error("Cannot read properties of null (reading 'currentUser')", { details: "Type Error" })
        await DisplaySingleNotification(null);
        expect(consoleSpy).toHaveBeenCalledWith("Error fetching bookings: ", error)
    })

    it("Throws an error if the input auth has an invalid user property", async () => {

        const mockAuth = { currentUser: null }
        await DisplaySingleNotification(mockAuth);
        expect(consoleSpy).toHaveBeenCalledWith("User not authenticated");
    });

    it("Throws an error if the input auth has an valid user property with an invalid ID", async () => {

        const mockAuth = { currentUser: { uid: null } };
        await DisplaySingleNotification(mockAuth);
        expect(consoleSpy).toHaveBeenCalledWith("User ID not available");
    });

    it("Successfully sets notification element with meal booking if input auth is valid", async () => {

        const mockAuth = { currentUser: { uid: "validID" } };
        const documentSpy = jest.spyOn(document, "getElementById").mockImplementation(() => {
            return { innerHTML: "" }
        })
    
        await DisplaySingleNotification(mockAuth);
        expect(documentSpy).toHaveBeenCalledTimes(1)
        document.getElementById.mockRestore();
    });

    it("Successfully sets notification element with car booking if input auth is valid and meal booking is empty", async () => {

        const mockAuth = { currentUser: { uid: "onlyCarID" } };
        const documentSpy = jest.spyOn(document, "getElementById").mockImplementation(() => {
            return { innerHTML: "" }
        })
    
        await DisplaySingleNotification(mockAuth);
        expect(documentSpy).toHaveBeenCalledTimes(1)
        document.getElementById.mockRestore();
    });

    it("Successfully sets notification element with feedback request if input auth is valid and carwash booking is empty", async () => {

        const mockAuth = { currentUser: { uid: "onlyFeedbackID" } };
        const documentSpy = jest.spyOn(document, "getElementById").mockImplementation(() => {
            return { innerHTML: "" }
        })
    
        await DisplaySingleNotification(mockAuth);
        expect(documentSpy).toHaveBeenCalledTimes(1)
        document.getElementById.mockRestore();
    });
})