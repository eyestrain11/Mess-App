import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  // Label,
  // Pie,
  // PieChart,
  // Sector,
  // Cell,
  // LineChart,
  // Legend,
  // Line,
} from "recharts";
import hackerPic from "../../Svg/hacker.png";
import axios from "../../API/axios";

import useAuth from '../../Auth/useAuth';



function Home() {
  const { auth } = useAuth();

  // const COLORS = ["#005298", "#004e40", "#ff0000"];
  const color1 = "#009d7f";
  const color2 = "#005298";
  const color3 = "#ff0000";
  // const [data, setData] = useState(null);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  console.log(data1);

  useEffect(() => {
    const getData = async (e) => {
      // if button enabled with JS hack
      try {
        const response = await axios.get("/userplan/getAllStudent/Breakfast", {
          withCredentials: true,
        });
        // console.log(data);console.log("ji");
        console.log("Get All User", response.data);
        setData1(response.data);

        console.log(data1);
        // console.log(JSON.stringify(response));
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async (e) => {
      // if button enabled with JS hack
      try {
        const response = await axios.get("/userplan/getAllStudent/Lunch", {
          withCredentials: true,
        });
        // console.log(data);console.log("ji");
        console.log("Get All User", response.data);
        setData2(response.data);

        console.log(data2);
        // console.log(JSON.stringify(response));
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async (e) => {
      // if button enabled with JS hack
      try {
        const response = await axios.get("/userplan/getAllStudent/Dinner", {
          withCredentials: true,
        });
        // console.log(data);console.log("ji");
        console.log("Get All User", response.data);
        setData3(response.data);

        console.log(data3);
        // console.log(JSON.stringify(response));
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);


  return (
    <div className="mainbar " styleName="stripe">
      <div className="m-main">
        <div className="m-title">
          <span className="text-[2rem] text-[#009d7f] h2 border-b-2 border-black pb-2 text-center">
            DASHBOARD
          </span>
        </div>
        <div>
      <section className="text-gray-600 body-font" style={{width : "1000px"}}>
        <div className="container mx-auto flex px-100 py-100 md:flex-row flex-col items-center">
          {/* ---------------------------------------------------------------------------------------------- */
          /*                                     Left part : information                                    */
          /* ---------------------------------------------------------------------------------------------- */}
          <div className="lg:flex-grow md:w-1/2 lg:pr-10 md:pr-10 flex flex-col md:items-start md:text-left mb-100 md:mb-0 items-center ">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {/* {auth.userId} */}
              <br className="hidden lg:inline-block" />
              {auth.name}
            </h1>
            <span className="mb-4 leading-relaxed">
              You can add the Menu and new Users signing up in the mess.<br />
              You can also edit the details of the users.<br />
              You can also see the number of students coming in breakfast lunch and dinner each day respectively;
             </span>
            <span className="my-2 bg-blue-300 p-3 w-[15rem] rounded shadow-xl leading-relaxed">
              Email : {auth.email}
            </span>
            <span className="my-2 leading-relaxed w-[15rem] bg-green-300 p-3 rounded shadow-xl ">
              Mobile No : {auth.mobileno}
            </span>
            {/* <span className="my-5 mb-0 leading-relaxed">
              The below graph is showing the number of new students signed up each day in a month:
             </span> */}
          </div>

          {/* ---------------------------------------------------------------------------------------------- */
          /*                                       Right part : Image                                       */
          /* ---------------------------------------------------------------------------------------------- */}
          {/* <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 ">
            <img
              className="object-cover object-center rounded max-h-[30vh]"
              alt="hero"
              src={hackerPic}
            />
          </div> */}
          <div className="flex items-center gap-[0rem]">
          <div className="card-container ">
            <div className="piecard bg-gray-200 shadow-xl w-[35rem] h-[15rem] pt-[1rem] px-[1rem] flex items-center mt-[1.5rem] rounded-[1rem] justify-around">
            
              <ResponsiveContainer width="100%" aspect={3}>
                <AreaChart
                  className=""
                  data={data1}
                  
                  stroke="black"
                  margin={{ top: 30, right: 30, left: 5, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id={`color${color1}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={color1}
                        stopOpacity={4}
                      ></stop>
                      <stop
                        offset="75%"
                        stopColor={color1}
                        stopOpacity={0.25}
                      ></stop>
                    </linearGradient>
                  </defs>
                  <XAxis
                    className=""
                    dataKey="date"
                    label={{
                      value: "Date",
                      // position: "bottom",
                      offset: 10,
                      margin: 10,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Breakfast",
                      angle: -90,
                      // position: "insideLeft",
                    }}
                  />
                  <CartesianGrid strokeDasharray="5 5" />
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#5F0A87s"
                    fillOpacity={1}
                    // fill="url(#colorPv)"

                    activeDot={{ r: 8 }}
                    fill={`url(#color${color1})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* <Piecard /> */}
          {/* <Piecard /> */}
        </div>
        </div>
      </section>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-100 py-100000 md:flex-row flex-col items-center">
          {/* ---------------------------------------------------------------------------------------------- */
          /*                                     Left part : information                                    */
          /* ---------------------------------------------------------------------------------------------- */}
          <div className="flex items-center gap-[1rem]">
          <div className="card-container ">
            <div className="piecard bg-gray-200 shadow-xl w-[35rem] h-[15rem] pt-[1rem] px-[1rem] flex items-center mt-[1rem] rounded-[1rem] justify-around"
            style={{width : "500px"}}>
            
              <ResponsiveContainer width="100%" aspect={3}>
                <AreaChart
                  className=""
                  data={data2}
                  
                  stroke="black"
                  margin={{ top: 30, right: 30, left: 5, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id={`color${color2}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={color2}
                        stopOpacity={4}
                      ></stop>
                      <stop
                        offset="75%"
                        stopColor={color2}
                        stopOpacity={0.25}
                      ></stop>
                    </linearGradient>
                  </defs>
                  <XAxis
                    className=""
                    dataKey="date"
                    label={{
                      value: "Date",
                      // position: "bottom",
                      offset: 10,
                      margin: 10,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Lunch",
                      angle: -90,
                      // position: "Lunch",
                    }}
                  />
                  <CartesianGrid strokeDasharray="5 5" />
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#5F0A87s"
                    fillOpacity={1}
                    // fill="url(#colorPv)"

                    activeDot={{ r: 8 }}
                    fill={`url(#color${color2})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* <Piecard /> */}
          {/* <Piecard /> */}
        </div>

          {/* ---------------------------------------------------------------------------------------------- */
          /*                                       Right part : Image                                       */
          /* ---------------------------------------------------------------------------------------------- */}
          {/* <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 ">
            <img
              className="object-cover object-center rounded max-h-[30vh]"
              alt="hero"
              src={hackerPic}
            />
          </div> */}
          <div className="flex items-center gap-[0rem]">
          <div className="card-container ">
            <div className="piecard bg-gray-200 shadow-xl w-[35rem] h-[15rem] pt-[1rem] px-[1rem] flex items-center mt-[1.5rem] rounded-[1rem] justify-around"
            style={{width : "500px"}}>
            
              <ResponsiveContainer width="100%" aspect={3}>
                <AreaChart
                  className=""
                  data={data3}
                  
                  stroke="black"
                  margin={{ top: 30, right: 30, left: 5, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id={`color${color3}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={color3}
                        stopOpacity={4}
                      ></stop>
                      <stop
                        offset="75%"
                        stopColor={color3}
                        stopOpacity={0.25}
                      ></stop>
                    </linearGradient>
                  </defs>
                  <XAxis
                    className=""
                    dataKey="date"
                    label={{
                      value: "Date",
                      // position: "bottom",
                      offset: 10,
                      margin: 10,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Dinner",
                      angle: -90,
                      // position: "insideLeft",
                    }}
                  />
                  <CartesianGrid strokeDasharray="5 5" />
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#5F0A87s"
                    fillOpacity={1}
                    // fill="url(#colorPv)"

                    activeDot={{ r: 8 }}
                    fill={`url(#color${color3})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* <Piecard /> */}
          {/* <Piecard /> */}
        </div>
        </div>
      </section>
        
      </div>
    </div>
   </div>
  );
}

export default Home;

// import React, { useState, useEffect } from "react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Label,
//   Pie,
//   PieChart,
//   Sector,
//   Cell,
//   LineChart,
//   Legend,
//   Line,
// } from "recharts";

// import axios from "../../API/axios";

// function Dashboad() {
//   const COLORS = ["#005298", "#004e40", "#ff0000"];
//   const color2 = "#009d7f";
//   const color1 = "#005298";
//   const color3 = "#ff0000";
//   // const [data, setData] = useState(null);
//   const [data1, setData1] = useState([]);
//   const [data2, setData2] = useState([]);
//   const [data3, setData3] = useState([]);
//   console.log(data1);

//     useEffect(() => {
//     const getData = async (e) => {
//       // if button enabled with JS hack
//       try {
//         const response = await axios.get("/userplan/getAllStudent/Breakfast", {
//           withCredentials: true,
//         });
//         // console.log(data);console.log("ji");
//         console.log("Get All User", response.data);
//         setData1(response.data);

//         console.log(data1);
//         // console.log(JSON.stringify(response));
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     getData();
//   }, []);

//   useEffect(() => {
//     const getData = async (e) => {
//       // if button enabled with JS hack
//       try {
//         const response = await axios.get("/userplan/getAllStudent/Lunch", {
//           withCredentials: true,
//         });
//         // console.log(data);console.log("ji");
//         console.log("Get All User", response.data);
//         setData2(response.data);

//         console.log(data2);
//         // console.log(JSON.stringify(response));
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     getData();
//   }, []);

//   useEffect(() => {
//     const getData = async (e) => {
//       // if button enabled with JS hack
//       try {
//         const response = await axios.get("/userplan/getAllStudent/Dinner", {
//           withCredentials: true,
//         });
//         // console.log(data);console.log("ji");
//         console.log("Get All User", response.data);
//         setData3(response.data);

//         console.log(data3);
//         // console.log(JSON.stringify(response));
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     getData();
//   }, []);
//   return (
//     <div className="mainbar ">
//       <div className="m-main">
//         <div className="m-title">
//           <span className="text-[2rem] text-[#009d7f] h2 border-b-2 border-black pb-2 text-center">
//             DASHBOARD
//           </span>
//         </div>
        
//         <div className="card-container ">
//             <div className="piecard bg-gray-200 shadow-xl w-[37rem] h-[20rem] pt-[5rem] px-[1rem] flex items-center mt-[1.5rem] rounded-[1rem] justify-around">
            
//               <ResponsiveContainer width="100%" aspect={3}>
//                 <AreaChart
//                   className=""
//                   data={data1}
                  
//                   stroke="black"
//                   margin={{ top: 30, right: 30, left: 5, bottom: 0 }}
//                 >
//                   <defs>
//                     <linearGradient
//                       id={`color${color1}`}
//                       x1="0"
//                       y1="0"
//                       x2="0"
//                       y2="1"
//                     >
//                       <stop
//                         offset="0%"
//                         stopColor={color1}
//                         stopOpacity={4}
//                       ></stop>
//                       <stop
//                         offset="75%"
//                         stopColor={color1}
//                         stopOpacity={0.25}
//                       ></stop>
//                     </linearGradient>
//                   </defs>
//                   <XAxis
//                     className=""
//                     dataKey="date"
//                     label={{
//                       value: "Date",
//                       // position: "bottom",
//                       offset: 10,
//                       margin: 10,
//                     }}
//                   />
//                   <YAxis
//                     label={{
//                       value: "Student no.",
//                       angle: -90,
//                       position: "insideLeft",
//                     }}
//                   />
//                   <CartesianGrid strokeDasharray="5 5" />
//                   {/* <CartesianGrid strokeDasharray="3 3" /> */}
//                   <Tooltip />
//                   <Area
//                     type="monotone"
//                     dataKey="value"
//                     stroke="#5F0A87s"
//                     fillOpacity={1}
//                     // fill="url(#colorPv)"

//                     activeDot={{ r: 8 }}
//                     fill={`url(#color${color1})`}
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* <Piecard /> */}
//           {/* <Piecard /> */}
//         </div>
//           <div className="card-container ">
//             <div className="piecard bg-gray-200 shadow-xl w-[37rem] h-[20rem] pt-[5rem] px-[1rem] flex items-center mt-[1.5rem] rounded-[1rem] justify-around">
            
//               <ResponsiveContainer width="100%" aspect={3}>
//                 <AreaChart
//                   className=""
//                   data={data2}
                  
//                   stroke="black"
//                   margin={{ top: 30, right: 30, left: 5, bottom: 0 }}
//                 >
//                   <defs>
//                     <linearGradient
//                       id={`color${color2}`}
//                       x1="0"
//                       y1="0"
//                       x2="0"
//                       y2="1"
//                     >
//                       <stop
//                         offset="0%"
//                         stopColor={color2}
//                         stopOpacity={4}
//                       ></stop>
//                       <stop
//                         offset="75%"
//                         stopColor={color2}
//                         stopOpacity={0.25}
//                       ></stop>
//                     </linearGradient>
//                   </defs>
//                   <XAxis
//                     className=""
//                     dataKey="date"
//                     label={{
//                       value: "Date",
//                       // position: "bottom",
//                       offset: 10,
//                       margin: 10,
//                     }}
//                   />
//                   <YAxis
//                     label={{
//                       value: "Student no.",
//                       angle: -90,
//                       position: "insideLeft",
//                     }}
//                   />
//                   <CartesianGrid strokeDasharray="5 5" />
//                   {/* <CartesianGrid strokeDasharray="3 3" /> */}
//                   <Tooltip />
//                   <Area
//                     type="monotone"
//                     dataKey="value"
//                     stroke="#5F0A87s"
//                     fillOpacity={1}
//                     // fill="url(#colorPv)"

//                     activeDot={{ r: 8 }}
//                     fill={`url(#color${color2})`}
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="card-container ">
//             <div className="piecard bg-gray-200 shadow-xl w-[37rem] h-[20rem] pt-[5rem] px-[1rem] flex items-center mt-[1.5rem] rounded-[1rem] justify-around">
            
//               <ResponsiveContainer width="100%" aspect={3}>
//                 <AreaChart
//                   className=""
//                   data={data3}
                  
//                   stroke="black"
//                   margin={{ top: 30, right: 30, left: 5, bottom: 0 }}
//                 >
//                   <defs>
//                     <linearGradient
//                       id={`color${color3}`}
//                       x1="0"
//                       y1="0"
//                       x2="0"
//                       y2="1"
//                     >
//                       <stop
//                         offset="0%"
//                         stopColor={color3}
//                         stopOpacity={4}
//                       ></stop>
//                       <stop
//                         offset="75%"
//                         stopColor={color3}
//                         stopOpacity={0.25}
//                       ></stop>
//                     </linearGradient>
//                   </defs>
//                   <XAxis
//                     className=""
//                     dataKey="date"
//                     label={{
//                       value: "Date",
//                       // position: "bottom",
//                       offset: 10,
//                       margin: 10,
//                     }}
//                   />
//                   <YAxis
//                     label={{
//                       value: "Student no.",
//                       angle: -90,
//                       position: "insideLeft",
//                     }}
//                   />
//                   <CartesianGrid strokeDasharray="5 5" />
//                   {/* <CartesianGrid strokeDasharray="3 3" /> */}
//                   <Tooltip />
//                   <Area
//                     type="monotone"
//                     dataKey="value"
//                     stroke="#5F0A87s"
//                     fillOpacity={1}
//                     // fill="url(#colorPv)"

//                     activeDot={{ r: 8 }}
//                     fill={`url(#color${color3})`}
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* <Piecard /> */}
//           {/* <Piecard /> */}
//         {/* </div> */}
//         {/* // </div> */}
//       </div>
//     </div>
//     // </div>
//   );
// }

// export default Dashboad;
