import User from "../../User/Models/User.js";
import moment from 'moment'
import asyncHandler from "express-async-handler";
import dayjs from 'dayjs'

 

export const getRefundB = asyncHandler(async (req, res) =>{

var userId = req.params.userId;
// console.log(typeof(userId));

var today_date = new Date() ;
var firstDay= new Date(today_date.getFullYear(), today_date.getMonth(), 2);
var lastDay = new Date(today_date.getFullYear(), today_date.getMonth() + 1, 1);

var arr = getDatesInRange(firstDay, lastDay);
// console.log(firstDay,"GAY");

function getDatesInRange(d1, d2) {
  const date = new Date(d1);
//   console.log(date,"JI");
  const dates = [];
  while (date <= d2) {
    // console.log(date,d2,"IN");
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
//   console.log(dates.length);
  return dates;
}

var index=0,count=0;
 console.log(arr.length)

async function loadData(){
 for(let item of arr){
    // console.log(item)

    let users = await User.aggregate([
    {
      $match: {
        $and : [
        {"userId" :parseInt(userId)},
        {"isavailable": {
          "$elemMatch": {
            "date": item,
            "breakfast": false,
          }
        }}
    ]},
    },
  ]); 
  index++;
  count+=users.length;
//   if(users.length===1) console.log(users);
//   console.log(item,"HRY");
  if(index===arr.length) res.json(count);
 }
}

loadData();

})



export const getRefundL = asyncHandler(async (req, res) =>{

    var userId = req.params.userId;
    // console.log(typeof(userId));
    
    var today_date = new Date() ;
    var firstDay= new Date(today_date.getFullYear(), today_date.getMonth(), 1);
    var lastDay = new Date(today_date.getFullYear(), today_date.getMonth() + 1, 0);
    
    var arr = getDatesInRange(firstDay, lastDay);
    
    function getDatesInRange(d1, d2) {
      const date = new Date(d1);
      const dates = [];
      while (date <= d2) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      return dates;
    }
    
    var index=0,count=0;
     
    
    async function loadData(){
     for(let item of arr){
        // console.log(item);
        let users = await User.aggregate([
        {
          $match: {
            $and : [
            {"userId" :parseInt(userId)},
            {"isavailable": {
              "$elemMatch": {
                "date": item,
                "lunch": false,
              }
            }}
        ]},
        },
      ]); 
      index++;
      count+=users.length;
    //   if(users.length===1) console.log(users);
    //   console.log(index,users.length);
      if(index===arr.length) res.json(count);
     }
    }
    
    loadData();
    
    })


    export const getRefundD = asyncHandler(async (req, res) =>{

        var userId = req.params.userId;
        // console.log(typeof(userId));
        
        var today_date = new Date() ;
        var firstDay= new Date(today_date.getFullYear(), today_date.getMonth(), 1);
        var lastDay = new Date(today_date.getFullYear(), today_date.getMonth() + 1, 0);
        
        var arr = getDatesInRange(firstDay, lastDay);
        
        function getDatesInRange(d1, d2) {
          const date = new Date(d1);
          const dates = [];
          while (date <= d2) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
          }
          return dates;
        }
        
       var index=0,count=0;
         
        
        async function loadData(){
         for(let item of arr){
            // console.log(item);
            let users = await User.aggregate([
            {
              $match: {
                $and : [
                {"userId" :parseInt(userId)},
                {"isavailable": {
                  "$elemMatch": {
                    "date": item,
                    "dinner": false,
                  }
                }}
            ]},
            },
          ]); 
          index++;
          count+=users.length;
        //   if(users.length===1) console.log(users);
        //   console.log(index,users.length);
          if(index===arr.length) res.json(count);
         }
        }
        
        loadData();
        
        })