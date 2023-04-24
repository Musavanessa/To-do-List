const app = require("./backend/app");
const debug = require("debug")("node-angular");
const mysql = require('mysql');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const http = require("http");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const sqlCon = mysql.createConnection({
  user: "",
  host: "localhost",
  password: "",
  database: "Todo"
})

//check database connection
sqlCon.connect(err=> {
  if(err) {
      console.log(err,'sqlConerr');
  }
      console.log('database connected...');
  
})

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const app = express();
app.set("views engine", 'ejs');
app.use(bodyparser.urlencoded({extended:true}));

//create connection to database
app.post("InsertData", (req,res) => {
    let title = req.body.title;
    let description = req.body.description;

    //send data to mysql database
    sqlCon.query("INSERT INTO todoTable values(water, soap)",[title,description],(error,results) => {
        if(error) {
            console.log(error);
        }
        if(results) {
           res.rend("Record Inserted successfully"); 
        }
    })
})



//create route to retrieve data
app.get("RetrieveData", (req,res) => {
    sqlCon.query("SELECT * FROM todo",(error, results) => {
        if(error){
            console.log(error);
    }
    if(result) {
        console.log(result);
        res.send(result);
    }
    })
})

//create route for edit data
app.post("EditData", (req, res) => {
    let NewTitle = req.body.NewTitle;
    let NewDescription =  req.body.NewDescription;

    //edit data from database
    sqlCon.query("UPDATE todoTable set Title = ? and Description = ?", [NewTitle, NewDescription], (error, result) => {
        if(error) {
            console.log(error);
        }
        if(result) {
            res.send("Details updated successfully");
        }
    })

    //create route to delete data
     app.post("DeleteData", (req, res) =>{
        let id = req.body.id;

        sqlCon.query("DELETE FROM todoTable where id=?", id, (error,result) => {
            if(error) {
                console.log(error);
            }
            if(result) {
                res.send("Details deleted successfully");
            }
        })
    })

app.get('/', (req, res) => {
    res.send("Title");
    res.render("List", {newListItems: newItem});
})

app.post('/', (req, res) => {
    let newItem = req.body.newItem;
    newItems.push(newItem);
    res.redirect('/');
})


const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(45445);
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);