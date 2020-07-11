const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require('multer');
const { mongoURL } = require("./config/key");
//for reading body json data
app.use(express.json());



// setting Public folder as static
app.use(express.static('./public'));


//connect to DB

mongoose
  .connect(mongoURL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Mondodb Connected...."))
  .catch((err) => console.error(err));


//model register
require("./models/user");
require("./models/note");


//importing routes middleware
app.use("/api/user", require("./routes/authRoute"));
app.use("/api/post", require("./routes/crudRoute"));
app.use('/api/post', require('./routes/imgRoute'))


app.get("/", (req, res) => {
  res.send("Server  working...........");
});

// Listening to the port

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}....`));
