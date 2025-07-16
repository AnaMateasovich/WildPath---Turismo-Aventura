import { createContext, useState } from "react";

const BookingContext = createContext()

export const BookingProvider = ({ children }) => {

   const [bookingData, setBookingData] = useState({
    selectedPackageId: null,
    selectedDate: null,
    spots: 1,
    pricePerPerson: 0,
    totalPrice: 0,
    contactData: {},
  });


    return (
        <BookingContext.Provider value={{ bookingData, setBookingData }}>

            {children}
        </BookingContext.Provider>
    )
}