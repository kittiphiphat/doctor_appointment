"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from "lucide-react";
import { toast } from "sonner";
import GlobalApi from "@/app/_utils/GlobalApi";  // ใช้ GlobalApi
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const generateTimeSlots = () => {
  const slots = [];
  for (let i = 8; i <= 12; i++) {
    slots.push(`${i}:00 AM`, `${i}:30 AM`);
  }
  for (let i = 1; i <= 7; i++) {
    slots.push(`${i}:00 PM`, `${i}:30 PM`);
  }
  return slots;
};

function BookAppointment({ doctor }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot] = useState(generateTimeSlots());
  const [selectedTime, setSelectedTime] = useState(null);
  const [note, setNote] = useState("");
  const { user } = useKindeBrowserClient();

  const isPastDay = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    day.setHours(0, 0, 0, 0);
    return day < today;
  };

  const saveBooking = () => {
    // ตรวจสอบข้อมูลก่อนทำการบันทึก
    if (!selectedTime || !date || !doctor || !note) {
      toast("Please make sure all fields are filled correctly.");
      return;
    }

    const data = {
      data: {
        UserName: user.given_name + " " + user.family_name,
        Email: user.email,
        Time: selectedTime,
        Date: date,
        doctor: doctor.id,
        Note: note,
      },
    };

 
  GlobalApi.bookAppointment(data)
    .then((resp) => {
      console.log(resp);
      if (resp) {
        return GlobalApi.sendEmail(data);
      } else {
        toast("Booking Confirmation sent on Email");
      }
    })
    .then((emailResp) => {
      if (emailResp) {
        console.log(emailResp);
        toast("Email sent successfully!");
      }
    })
    .catch((err) => {
      console.error("Error processing booking:", err);
      toast("Something went wrong, please try again.");
    });

      
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="relative w-full px-6 py-3 mt-4 rounded-full text-white font-semibold overflow-hidden group hover:bg-[#2ca5b5] transition duration-300">
            <span className="relative z-10">Book Appointment</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-4xl sm:max-w-5xl w-full px-6 sm:px-8 py-8 max-h-[90vh] overflow-auto shadow-lg rounded-xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl sm:text-3xl font-bold text-primary">
              Book <span className="font-bold text-[#33b9cb]">Appointment</span>
            </DialogTitle>
            <DialogDescription className="text-center text-gray-500 text-sm font-semibold">
              Please select your date and time.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-3">
            {/* Date Selection */}
            <div className="flex flex-col gap-3">
              <h2 className="flex items-center gap-3 text-lg sm:text-xl font-semibold text-gray-700">
                <CalendarDays className="text-[#33b9cb] h-6 w-6" />
                Select Date
              </h2>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={isPastDay}
                  className="sm:max-w-4xl px-8 py-6 text-center rounded-lg border shadow-lg"
                />
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="flex flex-col gap-3">
              <h2 className="flex items-center gap-2 text-lg sm:text-xl justify-center font-semibold text-gray-700">
                <Clock className="text-[#33b9cb] h-5 w-5" />
                Select Time Slot
              </h2>

              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-2 border-2 p-2 rounded-xl border-[#e5e7eb] shadow-sm">
                {timeSlot.map((time, index) => (
                  <button
                    key={index}
                    className={`w-full h-10 text-[1rem] rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                      selectedTime === time
                        ? "bg-[#33b9cb] text-white shadow-md border-[#33b9cb]"
                        : "hover:bg-[#eaf7f9] text-gray-700 border-[#d1d5db] hover:border-[#33b9cb]"
                    }`}
                    onClick={() => setSelectedTime(time)}
                    aria-selected={selectedTime === time}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <p className="text-center text-sm text-gray-600">
                  Selected Time: <strong className="text-[#33b9cb]">{selectedTime}</strong>
                </p>
              )}
            </div>

            {/* Note Input */}
            <div className="col-span-1 sm:col-span-2">
              <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-700">
                Note
              </label>
              <textarea
                id="note"
                rows={3}
                className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#33b9cb]"
                placeholder="Enter any note or reason for the appointment..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="sm:justify-end mt-3 flex gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="text-red-500 border-red-500 hover:text-white hover:bg-red-500"
              >
                Close
              </Button>
            </DialogClose>
            <Button
              type="button"
              disabled={!(date && selectedTime)}
              onClick={saveBooking}
              variant="outline"
              className="text-[#33b9cb] border-[#33b9cb] hover:text-white hover:bg-[#33b9cb]"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BookAppointment;
