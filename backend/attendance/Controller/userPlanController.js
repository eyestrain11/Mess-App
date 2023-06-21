import UserPlan from "../Modals/userPlan.js";
import User from "../../User/Models/User.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import moment from "moment";

export const updateConsent = asyncHandler(async (req, res) => {
    var { userId, date, breakfast, lunch, dinner } = req.body;

    var date = new Date(date);
    
    date = moment(date).utcOffset("+05:30").startOf("day").toDate();
    console.log(date);
  
    const updatedObject = { date, breakfast, lunch, dinner };
    const updateConsent = await User.updateOne(
      { userId },
      {
        $set: {
          "isavailable.$[elemX]": updatedObject,
        },
      },
      {
        arrayFilters: [{ "elemX.date": date }],
      }
    );
    console.log("updated ", updateConsent);
    res.json({ message: `${userId} consent status updated` });
  });



  export const getConsent = asyncHandler(async (req, res) => {
    var data = JSON.parse(req.params.obj);

    var date = data.date;
    console.log(date);
    var userId = data.userId;
    // var planId = data.planId;
    date = moment(date).utcOffset("+05:30").startOf("day").toDate();
    console.log(date);
  
    const getConsent = await User.findOne(
      { userId, "isavailable.date": date },
      {
        _id: 0,
        isavailable: { $elemMatch: { date: date } },
      }
    );
    console.log(getConsent);
    res.json(getConsent);
  });

  export const getUserTodayPlan = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    var today_date = new Date();
    today_date = moment(today_date).utcOffset("+05:30").startOf("day").toDate();
    console.log(today_date);
    const user = await User.find(
      {
        userId: userId,
        start_date: { $lte: today_date },
        end_date: { $gte: today_date },
        "isavailable.date": today_date,
      },
      {
        _id: 0,
        userId: 1,
        // fees: 1,
        // fee_status: 1,
        isavailable: { $elemMatch: { date: today_date } },
      }
    );
    
    if (!user) {
      return res.status(400).json({ message: "No users found" });
    }
  
    res.json(user);
  });


  export const getTodayStudents = asyncHandler(async (req, res) => {
    const type = req.params.type;
    
    var today_date = new Date();

    console.log(today_date);
    
    today_date = moment(today_date).utcOffset("0").startOf("day").toDate();

    // moment(today_date).format('YYYY-MM-DD');

    
  
    
    var user;

    console.log(today_date);
    
    if (type === "Breakfast") {
      user = await User.aggregate([
        {
          $match: {
            // start_date: { $lte: today_date },
            // end_date: { $gte: today_date },
            $and : [
            {role: 0},
            {isavailable: {
              $elemMatch: {
                date: today_date,
                breakfast: true,
              },
            }}]
          },
        },
        {
          $group: {
            _id: "$_id",
            userId: { $first: "$userId" },
            name: { $first: "$name" },
            email: { $first: "$email" },
          },
        },
        {
          $sort: { userId: 1 },
        },
      ]);
    }
    if (type === "Lunch") {
      user = await User.aggregate([
        {
          $match: {
            // start_date: { $lte: today_date },
            // end_date: { $gte: today_date },
            $and : [
              {role: 0},
              {isavailable: {
                $elemMatch: {
                  date: today_date,
                  breakfast: true,
                },
              }}]
          },
        },
        {
          $group: {
            _id: "$_id",
            userId: { $first: "$userId" },
            name: { $first: "$name" },
            email: { $first: "$email" },
          },
        },
        {
          $sort: { userId: 1 },
        },
      ]);
    }
    if (type === "Dinner") {
      user = await User.aggregate([
        {
          $match: {
            // start_date: { $lte: today_date },
            // end_date: { $gte: today_date },
            $and : [
              {role: 0},
              {isavailable: {
                $elemMatch: {
                  date: today_date,
                  breakfast: true,
                },
              }}]
          },
        },
        {
          $group: {
            _id: "$_id",
            userId: { $first: "$userId" },
            name: { $first: "$name" },
            email: { $first: "$email" },
          },
        },
        {
          $sort: { userId: 1 },
        },
      ]);
    }
  
    if (!user) {
      return res.status(400).json({ message: "No users found" });
    }
  
    res.json(user);
  });



  export const getUserCurrentPlan = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    // const userId = 2002
    console.log(userId);
    const today_date = moment()
      .utcOffset("+05:30")
      .add(1, "days")
      .startOf("day")
      .toDate();
    // const today_date = moment().format()
    // today_date.setDate(today_date.getDate()+1)
    console.log(today_date);
    const user = await User.find({
      userId: userId,
      // start_date: { $lte: today_date },
      // end_date: { $gte: today_date },
    });
    // console.log(user);
    if (!user) {
      return res.status(400).json(user);
    }
  
    res.json(user[0]);
  });


