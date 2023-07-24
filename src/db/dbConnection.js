const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
     useUnifiedTopology: true,
}).then(()=>{console.log("Database connection is succesfull");}).catch((err)=>{console.log(err);});