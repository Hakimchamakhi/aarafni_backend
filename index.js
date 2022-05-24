const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();


const PORT= process.env.PORT || 7000;
//Connect to DataBase
mongoose.connect(process.env.MONGO_URI,
  {useNewUrlParser: true, useUnifiedTopology: true},
  ()=>{
      console.log('connected to Database');
})
mongoose.connection.on('error', err => {
  console.log(err);
});

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/user/login', (require("./Routes/Login")))
app.use('/user/register', (require("./Routes/Register")))
app.use('/team/login', (require("./Routes/Teamlogin")))
app.use('/team/register', (require("./Routes/Teamregister")))
app.use('/user', (require("./Routes/User")))
app.use('/contact', (require("./Routes/Contact")))
app.use('/project', (require("./Routes/Project")))
app.use('/preference', (require("./Routes/Preference")))
app.use('/conference', (require("./Routes/Conference")))


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))