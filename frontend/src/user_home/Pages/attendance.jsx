import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import axios from "../../API/axios";
import useAuth from "../../Auth/useAuth";
import ConsentModal from "../Components/ConsentModal";
var isBetween = require("dayjs/plugin/isBetween");


const Attendance = () => {
    const [consentModal, setConsentModal] = useState(false);
    const [consentDate, setConsentDate] = useState(null);
    const [currPlan, setCurrPlan] = useState(null);
  
    const { auth } = useAuth();
    dayjs.extend(isBetween);


    // today date start date and end date 

    const [today, setToday] = useState({
        month: 6,
        year: 2023,
      });
    
      const [start, setStart] = useState({
        date: null,
        month: null,
        year: null,
      });
      const [end, setEnd] = useState({
        date: null,
        month: null,
        year: null,
      });


    // Page start and end

    const [entry, setEntry] = useState([]);

  // set start date and end date of this page
  var start_date_page = dayjs()
    .month(today.month - 1)
    .year(today.year)
    .startOf("month")
    .startOf("week")
    .format();
  var end_date_page = dayjs()
    .month(today.month - 1)
    .year(today.year)
    .endOf("month")
    .endOf("week")
    .format();


    // Array of dates of current page

    var arr = getDatesInRange(new Date(start_date_page), new Date(end_date_page));

    function getDatesInRange(d1, d2) {
      const date = new Date(d1);
      const dates = [];
      while (date <= d2) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      return dates;
    }

    // fetching data 

    
  useEffect(() => {
    const getData = async (e) => {
      try {
        // const userId = auth.userId;
        // const userId = 2007;
        const userId = 2002;
        const response = await axios.get(`/dailyentry/getuserentry/${userId}`, {
          withCredentials: true,
        });

        // console.log("Entry ", response.data.attendance);
        setEntry(response.data.attendance);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
},[]);




useEffect(() => {
  const getCurrentPlan = async () => {
    const userId = 2002;
    // const userId = 2007;

    try {
      const planResponse = await axios.get(
        `/userplan/getusercurrentplan/${userId}`,
        {
          withCredentials: true,
        }
      );

      var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

const curr_start = dayjs(firstDay);
// console.log(curr_start);
const curr_end = dayjs(lastDay);
      // console.log("Curr Plan ",dayjs(planResponse.data.start_date).get("date"));
      console.log("Curr Plan ", planResponse.data);
      setStart({
        date: curr_start.get("date"),
        month: curr_start.get("month"),
        year: curr_start.get("year"),
      });

      setEnd({
        date: curr_end.get("date"),
        month: curr_end.get("month"),
        year: curr_end.get("year"),
      });
      setCurrPlan(planResponse.data);
    } catch (error) {}
  };
  // console.log("Fetching current plan data");
  getCurrentPlan();
}, []);



const setConsent = (item) => {
    console.log("item", item);
    setConsentDate(item);
    setConsentModal(true);
    // console.log("item", consentDate);
  };

  var bg_big = "bg-gray-100";
  var bg = "bg-red-500";
  var consent = false;




// Mapping over whole array of dates of month 

const content = arr.map((item, index) => {

 // check is date is current plan
  // console.log(item);

    var from = dayjs()
      .year(start.year)
      .month(start.month)
      .date(start.date)
      .format();
    var to = dayjs()
      .year(end.year)
      .month(end.month)
      .date(end.date)
      .endOf("day")
      .format();

    var check = dayjs()
      .year(item.getFullYear())
      .month(item.getMonth())
      .date(item.getDate())
      .format();

    var today = dayjs().format();

    // console.log(check);

    if (check >= from && check <= to) {
        bg_big = "bg-lime-300";
      } else {
        bg_big = "bg-black";
      }

      if (check >= today) {
        consent = true;
      } else {
        consent = false;
      }

    //   Make every date in dailyentry arr true if its in plan

    var breakfast = false;
    var lunch = false;
    var dinner = false;

    for (let index = 0; index < entry.length; index++) {
      var entrydate = new Date(entry[index].date);
      entrydate = dayjs()
        .year(entrydate.getFullYear())
        .month(entrydate.getMonth())
        .date(entrydate.getDate())
        .format();


      if (entrydate === check) {
        if (entry[index].menu.breakfast) {
          breakfast = true;
        }
        if (entry[index].menu.lunch) {
          lunch = true;
        }
        if (entry[index].menu.dinner) {
          dinner = true;
        }
        break;
      }
    }


    return item.getMonth() !== today.month -1 ? (
        <div className={` cursor-pointer flex w-[30px]  md:w-full mt-[1px] md:mt-4 justify-center`}>
          <button
            onClick={
              consent
                ? () => setConsent(item)
                : () => {
                    consent = false;
                  }
            }
          >
            <div
              className={`${bg_big} rounded w-[40px] h-[40px] md:w-[50px] md:h-[50px] flex md:gap-2 flex-col gap-2 items-center justify-center`}
            >
              <p
                className={`text-base text-gray-600   rounded-circle flex items-center justify-center w-[30px] h-[30px]"
              `}
              >
                {item.getDate()}
              </p>
              <span className="flex gap-1 mb-[3px] md:mb-0">
                {breakfast ? (
                  <div className="w-[0.5rem] h-[0.5rem]  bg-pink-400 rounded-full border-[1px] border-black"></div>
                ) : (
                  ""
                )}
                {lunch ? (
                  <div className="w-[0.5rem] h-[0.5rem] bg-[aqua] rounded-full border-[1px] border-black"></div>
                ) : (
                  ""
                )}
                {dinner ? (
                  <div className="w-[0.5rem] h-[0.5rem] bg-red-800 rounded-full border-[1px] border-black"></div>
                ) : (
                  ""
                )}
              </span>
            </div>
          </button>
        </div>
      ) : (
        <div className={`md:px-2 md:py-2 p-[2px] cursor-pointer max-w-[20px] md:mb-4  flex md:w-full justify-center `}>
          <button
            onClick={
              consent
                ? () => setConsent(item)
                : () => {
                    consent = false;
                  }
            }
          >
            <div
              className={`${bg_big} rounded w-[50px] h-[50px] flex flex-col  md:gap-2 items-center justify-center`}
            >
              <p
                className={`text-lg font-semibold text-black  rounded-circle flex items-center justify-center w-[30px] h-[30px]"
              `}
              >
                {item.getDate()}
              </p>
              <span className="flex gap-1">
                {breakfast ? (
                  <div className="w-[0.5rem] h-[0.5rem] border-[1px] border-black bg-pink-400 rounded-full"></div>
                ) : (
                  ""
                )}
                {lunch ? (
                  <div className="w-[0.5rem] h-[0.5rem] bg-[aqua] rounded-full border-[1px] border-black"></div>
                ) : (
                  ""
                )}
                {dinner ? (
                  <div className="w-[0.5rem] h-[0.5rem] bg-red-800 rounded-full border-[1px] border-black"></div>
                ) : (
                  ""
                )}
              </span>
            </div>
          </button>
        </div>
      );
    });



    // Increase the month 

    const incrementmonth = () => {
        if (today.month === 12) {
          setToday({
            month: 1,
            year: today.year + 1,
          });
        } else {
          setToday({
            month: today.month + 1,
            year: today.year,
          });
        }
    };

    const decrement = () => {
        if (today.month === 1) {
          setToday({
            month: 12,
            year: today.year - 1,
          });
        } else {
          setToday({
            month: today.month - 1,
            year: today.year,
          });
        }
      };

      const monthname = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      return (
        <>
          {consentModal ? (
            <ConsentModal
              setEditmodal={setConsentModal}
              consentDate={consentDate}
              userId={2002}
              planId={502}
            />
          ) : (
            ""
          )}
          <div className="flex items-center justify-center py-3 px-2 md:py-8  md:px-4 ">
            <div className=" max-w-[80%] min-h-[75vh] md:max-w-[90%] w-full shadow-2xl border-[1.6px] rounded-2xl border-gray-500  ">
              <div className="md:py-12  md:px-5  py-4 px-2 flex flex-col   rounded-2xl min-h-[75vh] bg-slate-100">
                <div className="px-4 md:px-8 flex flex-wrap items-center justify-between flex-[2]">
                  <span
                    tabIndex={0}
                    className="focus:outline-none  text-base font-bold  text-gray-800"
                  >
                    {monthname[today.month]} - {today.year}
                  </span>
                  <div className="flex items-center">
                    <button
                      className="inline-flex items-center px-2 py-1 md:px-4 md:py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900"
                      onClick={() => decrement()}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span className="hidden md:block">Prev</span>
                    </button>
    
                    <button
                      className="m-2 inline-flex items-center px-2 py-1 md:px-4 md:py-2 text-sm font-medium text-white bg-gray-800 border-0 border- border-gray-700 rounded-none hover:bg-gray-900 "
                      onClick={() =>
                        setToday({
                          month: dayjs().month() + 1,
                          year: dayjs().year(),
                        })
                      }
                    >
                      {" "}
                      <span className="text-sm md:text-sm"> current </span>
                    </button>
    
                    <button
                      className="inline-flex items-center px-2 py-1 md:px-4 md:py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 "
                      onClick={() => incrementmonth()}
                    >
                      <span className="hidden md:block">Next</span>
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 ml-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
    
                <div className="grid items-center grid-cols-7 max-w-full	justify-between pt-12 overflow-x-auto flex-[8] ">
                  <div className=" w-[30px] md:w-full  mb-3 flex justify-center">
                    <p className="text-lg  text-center text-gray-800 font-semibold">
                      Su
                    </p>
                  </div>
                  <div className="w-[30px] md:w-full mb-3 flex justify-center">
                    <p className="text-lg  text-center text-gray-800 font-semibold">
                      mo
                    </p>
                  </div>
                  <div className="w-[30px] md:w-full mb-3 flex justify-center">
                    <p className="text-lg  text-center text-gray-800 font-semibold">
                      tu
                    </p>
                  </div>
                  <div className="w-[30px] md:w-full mb-3 flex justify-center">
                    <p className="text-lg  text-center text-gray-800 font-semibold">
                      wed
                    </p>
                  </div>
                  <div className="w-[30px] md:w-full mb-3 flex justify-center">
                    <p className="text-lg  text-center text-gray-800 font-semibold">
                      thu
                    </p>
                  </div>
                  <div className="w-[30px] md:w-full mb-3 flex justify-center">
                    <p className="text-lg  text-center text-gray-800 font-semibold">
                      Fri
                    </p>
                  </div>
                  <div className="w-[30px] md:w-full mb-3 flex justify-center">
                    <p className="text-lg  text-center text-gray-800 font-semibold">
                      Sat
                    </p>
                  </div>
    
                  {content}
                </div>
                <hr className="bg-black mt-3" />
                <div className="info  flex flex-col md:w-full max-w-[75%]  mx-3 mt-4 px-10">
                  <div className="flex flex-row flex-wrap gap-4 md:gap-12 m-1">
                    <div className="flex flex-row gap-2">
                      {" "}
                      <div className="md:min-h-[25px] max-h-[12px] min-w-[12px] md:min-w-[25px] md:mt-0  mt-[6px] rounded-xl bg-pink-400 "></div>{" "}
                      <span className="text-base text-black font-semibold">
                        {" "}
                        BreakFast
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      {" "}
                      <div className="md:min-h-[25px] max-h-[12px] min-w-[12px] md:min-w-[25px] md:mt-0  mt-[6px] rounded-xl bg-[aqua] "></div>{" "}
                      <span className="text-base text-black font-semibold">
                        {" "}
                        Lunch
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      {" "}
                      <div className="md:min-h-[25px] max-h-[12px] min-w-[12px] md:min-w-[25px] md:mt-0  mt-[6px] rounded-xl bg-red-800 "></div>{" "}
                      <span className="text-base text-black font-semibold">
                        {" "}
                        Dinner
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      {" "}
                      <div className="md:min-h-[25px] max-h-[12px] min-w-[12px] md:min-w-[25px] md:mt-0  mt-[6px] rounded-xl bg-lime-300 "></div>{" "}
                      <span className="text-base text-black font-semibold">
                        {" "}
                        Current Plan
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    };
    
    export default Attendance;