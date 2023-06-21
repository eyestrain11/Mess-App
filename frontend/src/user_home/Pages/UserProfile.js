import React, { useState } from "react";
import useAuth from "../../Auth/useAuth";
import hackerPic from "../../Svg/hacker.png";
import moment from 'moment'
import { useEffect } from "react";
import axios from "../../API/axios";

 const UserProfile = () => {

  const { auth } = useAuth();

  const [refund,setRefund] = useState(0);

  useEffect(() => {
    const getData = async (e) => {
      try {

        const userId = auth.userId;
        var responseB = await axios.get(`/users/getRefundB/${userId}`, {
          withCredentials: true,
        });
        var responseL = await axios.get(`/users/getRefundL/${userId}`, {
          withCredentials: true,
        });
        var responseD = await axios.get(`/users/getRefundD/${userId}`, {
          withCredentials: true,
        });
        setRefund(responseB.data+responseL.data+responseD.data);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
    
},[]);
  
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          {/* ---------------------------------------------------------------------------------------------- */
          /*                                     Left part : information                                    */
          /* ---------------------------------------------------------------------------------------------- */}
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center ">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {auth.userId}
              <br className="hidden lg:inline-block" />
              {auth.name}
            </h1>
            <span className="mb-4 leading-relaxed">
              Hello user, with MessC you can make your daily meal choices in the 'Meal Choice' section, can see the weekly 
              menu in the 'Weekly Menu' section and should follow the rules in the 'Rules' section.
            </span>
            <span className="my-2 bg-blue-300 p-2 w-[15rem] rounded shadow-xl leading-relaxed">
              Email : {auth.email}
            </span>
            <span className="my-2 leading-relaxed w-[15rem] bg-green-300 p-2 rounded shadow-xl ">
              Mobile No : {auth.mobileno}
            </span>
            <span className="my-2 bg-cyan-300 p-2 w-[15rem] rounded shadow-xl leading-relaxed">
              Monthly Refund : Rs. {refund*50}
            </span>
          </div>

          {/* ---------------------------------------------------------------------------------------------- */
          /*                                       Right part : Image                                       */
          /* ---------------------------------------------------------------------------------------------- */}
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 ">
            <img
              className="object-cover object-center rounded max-h-[60vh]"
              alt="hero"
              src={hackerPic}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;