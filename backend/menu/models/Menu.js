import mongoose from 'mongoose'

const menuSchema = new mongoose.Schema({

    menuId: {
        type: Number,
        default: 0,
      },
    menu_day:{
        type: String,
        enum: ['Sunday' , 'Monday' ,'Tuesday','Wednesday','Thursday','Friday','Saturday'],
        required : true 
    },
    menu_breakfast : {
        type : Array,
        required : [true , 'Please enter breakfast menu']
    },
    menu_lunch : {
        type : Array,
        required : [true , 'Please enter lunch menu']
    },
    menu_dinner : {
        type : Array,
        required : [true , 'Please enter dinner menu']
    },
    special_menu : {
        type : Array,
    },

},
{timestamps : true}
)

// to assign unique ids to all the menus, model.pre runs before the model export.
menuSchema.pre("save", async function (next) {
    const data = await Menu.find(); // gives the current set.
    this.menuId = this.menuId + data.length;
    next
  });

const Menu = mongoose.model('menu' , menuSchema);

export default Menu
