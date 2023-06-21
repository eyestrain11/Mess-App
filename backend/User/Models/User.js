import mongoose from 'mongoose'
import validator from 'validator';
import moment from "moment";

// import DailyEntry from './DailyEntry.js';
var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        default: 2000,
      },
    name : {
        type : String,
        required : [true , 'Please enter your name']
    },
    email : {
        type : String,
        required : [true , 'Please enter an email'],
        unique : [true , 'Email already exist'],
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Email is invalid");
            }
        }
    },

    isavailable: [
        {
          date: {
            type: Date,
            
          },
  
          breakfast: {
            type: Boolean,
            
            default: true,
          },
          lunch: {
            type: Boolean,
            
            default: true,
          },
          dinner: {
            type: Boolean,
            
            default: true,
          },
        },
      ],

    mobileno: {
        type: Number,
        required : [true , "Please enter an contact number"],
        validate: {
            validator: function(v) {
                return /^[0-9]{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    },
    role: {
        type: Number,
        enum: [0 , 1 , 2 ],
        // required : true 
    },
    password : { 
        type : String,
        required : [true , "Please enter an password"],
    },
    cpassword : { 
        type : String,
        required : [true , "Please enter an confirm password"],
    }
},
{timestamps : true}
)

userSchema.pre("save", async function (next) {

    console.log("Go to pre section");
    var docs = this;

    const data = await User.find()

    docs.userId = docs.userId+data.length;
    
    console.log("Adding : " , docs.userId);

    var arr = getDatesInRange(new Date(firstDay), new Date(lastDay));
  
    function getDatesInRange(d1, d2) {
      const date = new Date(d1);
      const dates = [];
      while (date <= d2) {
        dates.push(new Date(date));
        date.setDate(date.getDate()+1);
      }
      return dates;
    }
    arr.map((item) => {
      const availableObject = {
        date: moment(item).utcOffset("+05:30").startOf("day").toDate(),
        breakfast: true,
        lunch: true,
        dinner: true,
      };
      docs.isavailable.push(availableObject);
    });
    
    // const dailyEntryObject = {"userid":docs.userId , "attendance" : } 
    // const today_date = new Date("");
    // if(docs.role===0)
    // {

    //     const today_date = new Date();
    //     today_date.setDate(today_date.getDate()-1)
    //     const dailyEntryObject = {"userId":docs.userId , "attendance" : [{"date":today_date}]}
    //     const success = await new DailyEntry(dailyEntryObject).save();
    //     console.log("success daily entry : " , success);
    //     // return res.status(400).json({ message: 'Entry added'});
    //     // console.log(docs.planId);
    // }
    next()
  });

//   userSchema.pre("save", async function (next) {
//     var docs = this;
  
//     const data = await UserPlan.find();
  
  
//     docs.subId = docs.subId + data.length;
   
//    const today_date = firstDay;
    
//    const end_date = lastDay;
  
//     var arr = getDatesInRange(new Date(today_date), new Date(end_date));
  
//     function getDatesInRange(d1, d2) {
//       const date = new Date(d1);
//       const dates = [];
//       while (date <= d2) {
//         dates.push(new Date(date));
//         date.setDate(date.getDate() + 1);
//       }
//       return dates;
//     }
//     arr.map((item) => {
//       const availableObject = {
//         date: moment(item).utcOffset("+05:30").startOf("day").toDate(),
//         breakfast: true,
//         lunch: true,
//         dinner: true,
//       };
//       docs.isavailable.push(availableObject);
//     });
  
//     console.log(end_date);
//     docs.start_date = firstDay;
//     docs.end_date = lastDay;
//     docs.remaining_days = Math.round(
//       moment.duration(moment(end_date).diff(moment(today_date))).asDays()
//     );
//     // console.log(docs.planId);
//     next();
//   });


const User = mongoose.models.newUser || mongoose.model('newUser' , userSchema)

export default User