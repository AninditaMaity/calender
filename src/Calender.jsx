import React, { useContext, useState,useEffect } from "react";
import { CalenderContext } from "./App";
import dayjs from "dayjs";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { BiSolidDownArrow } from "react-icons/bi";
export default function Calender() {
  const { showCalender, setShowCalender, selectedDate,setSelectedDate,setDateInput }=useContext(CalenderContext);
  const [showYear, setshowYear] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs());

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  const firstdayOfMonth = currentDate.startOf("M").day();
  const daysOfMonth = currentDate.daysInMonth();

  const previousMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };
  const nextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };
  const dateClick = (e) => {
    const newDate = currentDate.set("date", e.target.id);
    setCurrentDate(newDate);
    setSelectedDate(newDate.format("DD-MM-YYYY"));
    setShowCalender(false);
    setDateInput(false);
    
  };
  const yearClicked = (e) => {
    const newDate = currentDate.set("year", e.target.id);
    setCurrentDate(newDate);
    setshowYear(false);
   
  };
  const year = () => {
    const years = [];
    for (let i = 1900; i < 2100; i++) {
      years.push(
        <div className="rounded-full hover:bg-zinc-200 px-2 p-1" key={i} id={i} onClick={yearClicked}>{i}</div>
      );
    }
    
    return years;
  };
  const monthdate = () => {
    const days = [];
    for (let i = 0; i < firstdayOfMonth; i++) {
      days.push(<div key={`e-${i}`}></div>);
    }
    for (let i = 1; i <= daysOfMonth; i++) {
      
      days.push(
        <div
          key={i}
          id={i}
          className={`size-[30px] flex justify-center items-center text-sm
           ${
             currentDate.date() === i 
               ? "bg-[#1976d2] rounded-full text-white"
               : ""
           }
          `}
          onClick={dateClick}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  useEffect(() => {
    if (selectedDate) {
      // const date=selectedDate.split("-")[1]+"-"+selectedDate.split("-")[0]+"-"+selectedDate.split("-")[2];
      const dateDate=selectedDate.split("-")[0];
      const dateMonth=selectedDate.split("-")[1];
      const dateYear=selectedDate.split("-")[2];
       console.log(dateDate,dateMonth,dateYear);
      if(dateDate!==undefined&& dateMonth===undefined &&dateYear===undefined){
        // setCurrentDate(dayjs().date(dateDate));
        // console.log(`${dayjs().year()}-${dayjs().month()}-${dateDate}`)
        setCurrentDate(dayjs(`${dayjs().year()}-${dayjs().month()}-${dateDate}`))
      }
      else if(dateDate!==undefined&& dateMonth!==undefined &&dateYear===undefined){
        // console.log(`${dayjs().year()}-${dateMonth}-${dateDate}`);
        //setCurrentDate(dayjs().date(dateDate));
        // setCurrentDate(dayjs().month(dateMonth));
        setCurrentDate(dayjs(`${dayjs().year()}-${dateMonth}-${dateDate}`))
      }
      if(dateDate!==undefined&& dateMonth!==undefined &&dateYear!==undefined){
        // console.log(`${dateYear}-${dateMonth}-${dateDate}`);
        // setCurrentDate(dayjs().date(dateDate));
        // setCurrentDate(dayjs().month(dateMonth));
        // setCurrentDate(dayjs().year(dateYear));
        setCurrentDate(dayjs(`${dateYear}-${dateMonth}-${dateDate}`))
      }
      // setCurrentDate(dayjs(date,"DD-MM-YYYY"));
    }
  }, [selectedDate])
  //  console.log(currentDate);

  return (
    <div>
      {showCalender && (
        <div className="rounded-2xl shadow-lg mt-1 p-3 w-72">
          <div className="flex justify-between p-2">
            <div className="flex items-center justify-between">
              <p className="mr-3">{currentDate.format("MMMM YYYY")} </p>
              <div className="p-1 rounded-full hover:bg-zinc-300">
                <BiSolidDownArrow
                  className=""
                  onClick={() => setshowYear(!showYear)}
                />
              </div>
            </div>
            <div className="flex items-center">
              <IoIosArrowBack onClick={previousMonth} />
              <IoIosArrowForward onClick={nextMonth} />
            </div>
          </div>
          {showYear && (
            <div className="grid grid-cols-3 gap-3 place-items-center my-3 h-[200px] overflow-y-auto ">
              {year()}
            </div>
          )}
          {!showYear && (
            <div className="grid grid-cols-7 grid-rows-6 gap-1 place-items-center my-3">
              {weekdays.map((day, index) => (
                <div key={index} className="font-medium">
                  {day}
                </div>
              ))}
              {monthdate()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
