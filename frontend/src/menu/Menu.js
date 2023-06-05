import React, { useState, useEffect } from 'react';
import axios from "./axios";
import Alert from "./Alert";
import Selection from "./Selection";

const Menu = () => {
  // menu part
  const [alert, setalert] = useState({
    mode: false,
    message: "",
    type: "bg-[red]",
  });
  const [day, setDay] = useState("");

  const [menuB, setMenuB] = useState([]);
  const [menuL, setMenuL] = useState([]);
  const [menuD, setMenuD] = useState([]);
  const [menuS, setMenuS] = useState([]);

  // fetch data for menu
  useEffect(() => {
    const getData = async (e) => {
      try {
        const response = await axios.get(`/menu/getMenu/${day}`, {
          withCredentials: true,
        });

        setMenuB(response.data.menu[0].menu_breakfast);
        setMenuL(response.data.menu[0].menu_lunch);
        setMenuD(response.data.menu[0].menu_dinner);
        setMenuS(response.data.menu[0].special_menu);
        console.log(response.data);
        // alert(response.data.message);
      } catch (err) {
        setMenuB([]);
        setMenuL([]);
        setMenuD([]);
        setMenuS([]);
        console.log(err);
      }
    };

    getData();
  }, [day]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // if button enabled with JS hack
    const l1 = menuB.length > 0;
    const l2 = menuL.length > 0;
    const l3 = menuD.length > 0;
    // if (!l1 || !l2 || !l3) {
    // console.log(
    // "Breakfast Lunch and Dinner atleat have one value if not than write None"
    // );
    // return;
    // }
    try {
      const response = await axios.post(
        "/menu/addMenu",
        JSON.stringify({
          menu_day: day,
          menu_breakfast: menuB,
          menu_lunch: menuL,
          menu_dinner: menuD,
          special_menu: menuS,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(JSON.stringify(response?.data));
      // const message = response.data.message;
      // console.log(response.data);
      //clear state and controlled inputs
      setDay("");
      setMenuB([]);
      setMenuL([]);
      setMenuD([]);
      setMenuS([]);
      setalert({
        mode: true,
        message: "Menu Updated",
        type: "bg-green-400",
      });
    } catch (err) {
      if (!err?.response) {
        const message = err.response.data.message;
        setalert({
          mode: true,
          message: message,
          type: "bg-[red]",
        });
      } else if (err.response?.status === 409) {
        const message = err.response.data.message;
        setalert({
          mode: true,
          message: message,
          type: "bg-[red]",
        });
      } else {
        const message = err.response.data.message;
        setalert({
          mode: true,
          message: message,
          type: "bg-[red]",
        });
      }
    }
  };

  return (
    <div>
      {alert.mode ? <Alert alert={alert} setalert={setalert} /> : ""}
        <div className="p-3 mt-1 flex flex-col justify-between min-h-[85vh] ">
          <h1 className="text-[2rem] text-center">Add the Menu</h1>

          {/* ---------------------------------------------------------------------------------------------- */
          /*                                           Day select                                           */
          /* ---------------------------------------------------------------------------------------------- */}

          <div className="dayselect flex gap-3 mt-4 w-[100%] items-center justify-center">
            <select
              id="day"
              name="menu_day"
              class="bg-gray-50 border p-2 rounded w-[16rem]"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option selected>Choose a Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">WednesDay</option>
              <option value="Thursday">ThursDay</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>

          {/* ---------------------------------------------------------------------------------------------- */
          /*                                            menu part                                           */
          /* ---------------------------------------------------------------------------------------------- */}

          <div className="menu flex flex-row flex-wrap gap-7  min-h-[40vh] p-3">
            <Selection thing={"Breakfast"} setMenu={setMenuB} Menu={menuB} />
            <Selection thing={"Lunch"} setMenu={setMenuL} Menu={menuL} />
            <Selection thing={"Dinner"} setMenu={setMenuD} Menu={menuD} />
            <Selection
              thing={"SpecialDinner"}
              setMenu={setMenuS}
              Menu={menuS}
            />
          </div>

          {/* ---------------------------------------------------------------------------------------------- */
          /*                                           submit part                                          */
          /* ---------------------------------------------------------------------------------------------- */}

          <div className="menusubmit flex justify-center">
            <button
              type="button"
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none text-3xl focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 hover:border-2 hover:border-black"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
    </div>
  );
};

export default Menu;
