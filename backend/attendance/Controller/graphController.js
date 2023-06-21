import UserPlan from "../Modals/userPlan.js";
import User from "../../User/Models/User.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import moment from "moment";


  export const getAllStudents = asyncHandler(async (req, res) => {
    const today_dat = moment().utcOffset("+05:30").startOf('month').startOf('week').toDate()
    var today_date = new Date() ;

    var arr = getDatesInRange(today_dat, today_date);

    function getDatesInRange(d1, d2) {
      const date = new Date(d1);
      const dates = [];
      while (date <= d2) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      return dates;
    }

    var obc = {};
    var index=0;
    var ans=[];

    async function loadData(){
     for(let item of arr){

      let users = await User.aggregate([
        {
          $match: {
            isavailable: {
              $elemMatch: {
                date: item,
                breakfast: true,
              },
            },
          },
        },
      ]);
      console.log(index,users.length);

      var key = moment(item).startOf('date').get('date')
      
      obc[index]=users.length;
      ans[index]={"date":key, "value":users.length}
      if(index===11) console.log(users)
      index++;
      if(index===arr.length) res.json(ans);
      
     }
    }

    loadData();

    console.log(ans);

    
     



  //   console.log(today_date);
    
  //   today_date = moment(today_date).utcOffset("0").startOf("day").toDate();
  //   const end_date1 = moment().utcOffset("+05:30").endOf('month').endOf('week').toDate()
  //   const users = await User.aggregate([
  //       {
  //           $match: {
  //               $and : [
  //               {"role" : 0}, 
  //               // {"isavailable": {
  //               //               "$elemMatch": {
  //               //                 "date": {$lte : today_date},
  //               //                 "breakfast": true,
  //               //               },
  //               //             },   
  //               //         },
  //               {"createdAt" :  {$lte : today_date}}
  //                       ]  
  //           }
            
  //       },
  //           // {
  //           //     $unwind : {path:'$role'}
  //           // },
  //           // {
  //           //     $group : {
  //           //         _id: "$isavailable.breakfast",
  //           //         Users : { $push : '$'}
  //           //     }
  //           // },
  //           {
  //               $group : {
  //                   _id:"$createdAt"
  //                   ,
  //                   // count:{$count: {}}
  //               }
  //           }
  //       ]
  //       )


  //   //    const users = await User.aggregate([
  //   //       {
  //   //         $match: {
  //   //           // start_date: { $lte: today_date },
  //   //           // end_date: { $gte: today_date },
  //   //           isavailable: {
  //   //             $elemMatch: {
  //   //               date: { $lte : today_date},
  //   //               breakfast: true,
  //   //             },
  //   //           },
  //   //         },
  //   //       },
  //   //       {
  //   //         $group: {
  //   //           _id: "$_id",
  //   //           userId: { $first: "$userId" },
  //   //           name: { $first: "$name" },
  //   //           email: { $first: "$email" },
  //   //         },
  //   //       },
  //   //       {
  //   //         $sort: { userId: 1 },
  //   //       },
  //   //     ]);

  //   // // const type = req.params.type;
    
  //   // var today_date = new Date();

  //   // console.log(today_date);
    
  //   // today_date = moment(today_date).utcOffset("0").startOf("day").toDate();

  //   // // moment(today_date).format('YYYY-MM-DD');

    
  
    
  //   // var user;

  //   // console.log(today_date);
    
  //   // if (type === "Breakfast") {
  //   //   user = await User.aggregate([
  //   //     {
  //   //       $match: {
  //   //         // start_date: { $lte: today_date },
  //   //         // end_date: { $gte: today_date },
  //   //         isavailable: {
  //   //           $elemMatch: {
  //   //             date: today_date,
  //   //             breakfast: true,
  //   //           },
  //   //         },
  //   //       },
  //   //     },
  //   //     {
  //   //       $group: {
  //   //         _id: "$_id",
  //   //         userId: { $first: "$userId" },
  //   //         name: { $first: "$name" },
  //   //         email: { $first: "$email" },
  //   //       },
  //   //     },
  //   //     {
  //   //       $sort: { userId: 1 },
  //   //     },
  //   //   ]);
  //   // }
  //   // if (type === "Lunch") {
  //   //   user = await User.aggregate([
  //   //     {
  //   //       $match: {
  //   //         // start_date: { $lte: today_date },
  //   //         // end_date: { $gte: today_date },
  //   //         isavailable: {
  //   //           $elemMatch: {
  //   //             date: today_date,
  //   //             lunch: true,
  //   //           },
  //   //         },
  //   //       },
  //   //     },
  //   //     {
  //   //       $group: {
  //   //         _id: "$_id",
  //   //         userId: { $first: "$userId" },
  //   //         name: { $first: "$name" },
  //   //         email: { $first: "$email" },
  //   //       },
  //   //     },
  //   //     {
  //   //       $sort: { userId: 1 },
  //   //     },
  //   //   ]);
  //   // }
  //   // if (type === "Dinner") {
  //   //   user = await User.aggregate([
  //   //     {
  //   //       $match: {
  //   //         // start_date: { $lte: today_date },
  //   //         // end_date: { $gte: today_date },
  //   //         isavailable: {
  //   //           $elemMatch: {
  //   //             date: today_date,
  //   //             dinner: true,
  //   //           },
  //   //         },
  //   //       },
  //   //     },
  //   //     {
  //   //       $group: {
  //   //         _id: "$_id",
  //   //         userId: { $first: "$userId" },
  //   //         name: { $first: "$name" },
  //   //         email: { $first: "$email" },
  //   //       },
  //   //     },
  //   //     {
  //   //       $sort: { userId: 1 },
  //   //     },
  //   //   ]);
  //   // }
  
  //   // if (!users) {
  //   //   return res.status(400).json({ message: "No users found" });
  //   // }
  //   // res.json(users);
  //   // const users = {_id: "k", date : "6", value: user.length}
  //   // var ans = 

  //   function groupBy(objectArray, property) {
  //       return objectArray.reduce(function (acc, obj) {
  //         var key = obj[property];
  //         key = moment(key).startOf('date').get('date')
  //         console.log(obj);
  //         if (!acc[key]) {
  //           acc[key] = [];
  //         }
  //         acc[key].push(obj);
  //         return acc;
  //       }, {});
  //     }
      
  //   var groupedPeople = groupBy(users, '_id');
  //   groupedPeople  = Object.entries(groupedPeople).map(entry => {
  //       return {"date": entry[0],"value": entry[1].length};
  //     });
  //     // console.log(groupedPeople);
  //   res.json(groupedPeople)
  // });


  })
