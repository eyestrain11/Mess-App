// import DailyEntry from '../Modals/DailyEntry.js'
// import bcrypt from 'bcrypt'
// import User from '../../User/Models/User.js'
// import asyncHandler from 'express-async-handler'

// export const getUserEntryDetail = asyncHandler(async (req , res) => {
//     const userId = req.params.userId

//     if(!userId)
//     {
//         return res.status(400).json({ message: 'User ID Required' })
//     }

//     const entry = await User.findOne({"userId":userId})
    
//     const start_end = entry.attendance[0].date.getDate()
    
//     const end_date = entry.attendance[entry.attendance.length-1].date.getDate()
    

//     res.json(entry);

// }) 



// export const updateDailyEntry = asyncHandler(async (req, res) => {
//     const {userId , verifyThing } = req.body

//     if(!verifyThing)
//     {
//         return res.status(400).json({message:"Select type required"})
//     }
   
//     const user = await User.findOne({"userId":userId}).exec()

//     if (!user) {
//             return res.status(400).json({ message: 'User not found'});
//     }
    
//     const date = new Date()
//     console.log(user);
//     const isTodayAdded = user.attendance.filter(item => {
        
//         if( item.date.getDate()===date.getDate() && item.date.getMonth()===date.getMonth() && item.date.getYear()===date.getYear())
//         {
//             return item
//         }
//     });

    
    
//     const length = isTodayAdded.length

//     var updatedObject={}

//     if(verifyThing==="breakfast")
//     {
//         updatedObject = {"breakfast":true , "lunch":length==0?false:isTodayAdded[0].menu.lunch , "dinner":length==0?false:isTodayAdded[0].menu.dinner }
//     }
//     else if(verifyThing==="lunch")
//     {
//         updatedObject = {"breakfast": length==0?false:isTodayAdded[0].menu.breakfast, "lunch":true , "dinner":length==0?false:isTodayAdded[0].menu.dinner }
        
//     }
//     else if(verifyThing==="dinner"){
//         updatedObject = {"breakfast": length==0?false:isTodayAdded[0].menu.breakfast, "lunch":length==0?false:isTodayAdded[0].menu.lunch , "dinner":true }
//     }
//     else
//     {
      
//         return res.json({message :"No verify thing is access"})
//     }
    
//     if(isTodayAdded.length === 1)
//     {
//         if(((verifyThing==="breakfast")&&isTodayAdded[0].menu.breakfast)||((verifyThing==="lunch")&&isTodayAdded[0].menu.lunch) || ((verifyThing==="dinner")&&isTodayAdded[0].menu.dinner))
//         {
            
//             return res.status(400).json({message:`Your ${verifyThing} entry is already added`})
//         }

//         const updateEntry = await User.updateOne({"userId":userId } , {
//             $set:{
//                 "attendance.$[elemX].menu" : updatedObject
//             }},
//             {
//                 "arrayFilters" : [{"elemX.date":isTodayAdded[0].date}]
//             }
//         )
//         return res.json({message:`Daily entery updated for ${verifyThing}`})
//     }

//     else
//     {
        
//         const today_date = new Date();
        
//         const dailyEntryObject = {"date":today_date , "menu":updatedObject}

//         const updateEntry = await User.updateOne({"userId":userId } , {
//             $push:{
//                 "attendance":dailyEntryObject
//             }},
//         )
//         return res.json({message:`Daily entery updated for ${verifyThing}`})
//     }
// })