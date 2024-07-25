import logo from "./logo.svg";
import "./App.css";
import { SlCalender } from "react-icons/sl";
import { createContext, useState } from "react";
import Calender from "./Calender";
export const CalenderContext=createContext();
function App() {
  const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19\d{2}|20\d{2})$/;
  const [showCalender, setShowCalender] = useState(false);
  const[dateInput,setDateInput]=useState(false);
  const [selectedDate,setSelectedDate]=useState(null);
  

  return (
    <div className="p-5 flex flex-col items-center mt-40">
      <h1 className="text-3xl font-semibold mb-5 border-b border-black">Calender</h1>
      <div className="flex justify-between items-center border p-1 px-2 w-60 rounded hover:border-zinc-500 mt-10">
        <input type="text" placeholder="dd-mm-yyyy" className="px-2" style={{outline:'none'}} value={selectedDate} onChange={(e)=>{
          if(regex.test(e.target.value)){
            setSelectedDate(e.target.value);
            setDateInput(false);
          }
          else{
            setSelectedDate(e.target.value);
            setDateInput(true);
          }
        }}/>
        <SlCalender onClick={() => setShowCalender(!showCalender)} />
      </div>
      {dateInput && <div className="text-red-600 text-sm  mt-1">Incorrect date input. Date should be between 01-01-1900 to 31-12-2099</div>}
      <CalenderContext.Provider value={{showCalender,setShowCalender,selectedDate,setSelectedDate,setDateInput}}>
      <Calender />
      </CalenderContext.Provider>
      
      {/* <input type="date"/> */}
    </div>
  );
}

export default App;
