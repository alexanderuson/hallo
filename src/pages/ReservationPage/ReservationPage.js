import React, { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const ReservationPage = () => {
  const calendarRef = useRef(null);
  const formRef = useRef(null);

  const [showCalendar, setShowCalendar] = useState(true);
  const [newReservation, setNewReservation] = useState(null);

  // Example data for available bookings
  const availableBookings = [
    // Add more available bookings here
  ];

  const nonAvailableBookings = [
    // Add more non-available bookings here
  ];

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.addEventSource(availableBookings);
      calendarApi.addEventSource(nonAvailableBookings);
    }
  }, [availableBookings, nonAvailableBookings]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here

    // After successful form submission, set showCalendar to true to show the calendar
    setShowCalendar(true);

    // Extract the reservation data from the form (you'll need to adapt this based on your form structure)
    const reservationData = {
      // Extract form data here
      // For example:
      name: e.target.name.value,
      // ...
    };

    // Construct a new event object with your reservation data
    const newEvent = {
      title: "New Reservation",
      start: reservationData.dateTime,
      // Add other relevant properties
    };

    setNewReservation(newEvent);

    // Optionally, you can add logic to update the calendar events here

    // Reset the form
    formRef.current.reset();
  };

  const handleCancel = () => {
    formRef.current.reset();
    setShowCalendar(true);
  };

  const eventRender = ({ event, el }) => {
    if (nonAvailableBookings.some((booking) => booking.start === event.start)) {
      el.classList.add("non-available-event");
    }

    if (newReservation && event.start === newReservation.start) {
      el.classList.add("highlighted-reservation");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
        Make a Reservation
      </h1>

      <div className="w-full max-w-5xl dark:bg-gray-700 dark:text-white rounded-lg p-8 shadow-lg dark:shadow-blue-500 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Available Bookings</h2>
          <div className="max-w-lg">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={availableBookings}
              height="auto"
              aspectRatio={1.5}
              eventRender={eventRender}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          {showCalendar ? (
            <button
              onClick={() => setShowCalendar(false)}
              className="px-6 py-3 bg-gray-900 dark:bg-blue-500 text-white font-semibold rounded-full hover:scale-105 transform transition duration-300 ease-in-out mb-4"
            >
              Create Reservation
            </button>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Reservation Form</h2>
              <form
                ref={formRef}
                method="POST"
                target="_blank"
                className="text-gray-900 dark:text-black"
                onSubmit={handleFormSubmit}
                >
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="mt-1 p-2 w-full rounded-lg border-gray-300 focus:ring focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="mt-1 p-2 w-full rounded-lg border-gray-300 focus:ring focus:ring-blue-500 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="contact" className="block text-sm font-medium dark:text-white">
                    Contact
                  </label>
                  <input
                    type="text"
                    name="contact"
                    id="contact"
                    required
                    className="mt-1 p-2 w-full rounded-lg border-gray-300 focus:ring focus:ring-blue-500 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="numberOfPersons" className="block text-sm font-medium dark:text-white">
                    Number of Persons
                  </label>
                  <input
                    type="number"
                    name="numberOfPersons"
                    id="numberOfPersons"
                    required
                    className="mt-1 p-2 w-full rounded-lg border-gray-300 focus:ring focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="tableType" className="block text-sm font-medium dark:text-white">
                    Table Type
                  </label>
                  <select
                    name="tableType"
                    id="tableType"
                    required
                    className="mt-1 p-2 w-full rounded-lg border-gray-300 focus:ring focus:ring-blue-500 dark:text-white"
                  >
                    <option value="NonVIP">Non-VIP</option>
                    <option value="SemiVIP">Semi-VIP</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="dateTime" className="block text-sm font-medium dark:text-white">
                    Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    name="dateTime"
                    id="dateTime"
                    required
                    className="mt-1 p-2 w-full rounded-lg border-gray-300 focus:ring focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="notes" className="block text-sm font-medium dark:text-white">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    id="notes"
                    rows="4"
                    className="mt-1 p-2 w-full rounded-lg border-gray-300 focus:ring focus:ring-blue-500"
                  ></textarea>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gray-900 dark:bg-blue-500 text-white font-semibold rounded-full hover:scale-105 transform transition duration-300 ease-in-out"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full hover:scale-105 transform transition duration-300 ease-in-out"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          .non-available-event {
            background-color: #ffcccc;
            border-color: #ff0000;
            color: #ff0000;
          }

          .highlighted-reservation {
            background-color: #aaffaa;
            border-color: #00ff00;
            color: #00ff00;
          }
        `}
      </style>
    </div>
  );
};

export default ReservationPage;