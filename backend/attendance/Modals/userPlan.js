import moment from "moment";
import mongoose from "mongoose";
import validator from "validator";


  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

const userplanSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: [true, "Please enter user id"],
    },
    subId: {
      type: Number,
      // required : [true , 'Please enter user id']
    },
    planId: {
      type: Number,
      required: [true, "Please enter plan id"],
    },
    start_date: {
      type: Date,
      // required : [true , "Please enter an contact number"],
    },
    end_date: {
      type: Date,
      
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

    remaining_days: {
      type: Number,
     
    },
    fees: {
      type: Number,
      required: [true, "Please enter an password"],
    },
    fee_status: {
      type: Boolean,
      required: [true, "Please enter an confirm password"],
      enum: [false, true],
      default: false,
    },
  },
  { timestamps: true }
);
userplanSchema.pre("save", async function (next) {
  var docs = this;

  const data = await UserPlan.find();


  docs.subId = docs.subId + data.length;
 
 const today_date = firstDay;
  
 const end_date = lastDay;

  var arr = getDatesInRange(new Date(today_date), new Date(end_date));

  function getDatesInRange(d1, d2) {
    const date = new Date(d1);
    const dates = [];
    while (date <= d2) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
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

  

  console.log(end_date);
  docs.start_date = firstDay;
  docs.end_date = lastDay;
  docs.remaining_days = Math.round(
    moment.duration(moment(end_date).diff(moment(today_date))).asDays()
  );
  // console.log(docs.planId);
  next();
});

const UserPlan =
  mongoose.models.userplan || mongoose.model("userplan", userplanSchema);

export default UserPlan;
