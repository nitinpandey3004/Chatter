import dotenv from "dotenv";
await dotenv.config();

import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";

// mongo connection
import "./config/mongo.js";

// socket configuration
import WebSockets from "./utils/WebSockets.js";

// routes
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import chatRoomRouter from "./routes/chatRoom.js";
import deleteRouter from "./routes/delete.js";
// middlewares
import { decode } from './middlewares/jwt.js'

const app = express();
let whitelist = ['http://localhost:3000','http://localhost:80','http://localhost:4000'];
let corsOptions = {
    origin: (origin, callback)=>{
      console.log("Checking " + origin);
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },credentials: true
}
app.use(cors(corsOptions));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
})

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3000";
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

/** Create HTTP server. */
const server = http.createServer(app);
/** Create socket connection */
import * as io from "socket.io";
const socketio = new io.Server({ cors: { 
  origin: "http://localhost:3000", 
  noServer: true, 
  methods: ["GET", "POST"], 
  transports: ['websocket', 'polling'], 
  credentials: true 
  }, 
  allowEIO3: true 
});
global.io = socketio.listen(server);
global.io.on('connection', (client) => {
  new WebSockets().connection(client);
})

/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});
