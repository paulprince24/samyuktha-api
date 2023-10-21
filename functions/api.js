const express = require("express");
const serverless = require("serverless-http");
var cors = require("cors");
const app = express();
const router = express.Router();

//Load Postgres Server
var { client } = require("./db_config");
const morgan = require("morgan");
const authenticateUser = require("./middleware/authorization");
const { uuid } = require("uuidv4");
const {
  sendMail,
  sendSingleMail,
  sendGroupMail,
} = require("./middleware/mail");
const {
  getEvents,
  getIndividualEvents,
} = require("./Controllers/users/events");
const {
  addSingleEventParticipants,
  addGroupEventParticipants,
} = require("./Controllers/users/participants");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

router.get("/", (req, res) => {
  res.send("API is running");
});

// @Route http://localhost:5000/v1/api/events
// @method GET

router.get("/v1/api/events", async (req, res, next) => {
  getEvents(req, res, next);
});

// @Route http://localhost:5000/v1/api/events/:id
// @method GET

router.get("/v1/api/events/:id", async (req, res, next) => {
  getIndividualEvents(req, res, next);
});

// @Route http://localhost:5000/v1/api/events/single
// @method POST
router.post(
  "/v1/api/events/single",
  authenticateUser,
  async (req, res, next) => {
    addSingleEventParticipants(req, res, next);
  }
);

// @Route http://localhost:5000/v1/api/events/group
// @method POST

router.post(
  "/v1/api/events/group",
  authenticateUser,
  async (req, res, next) => {
    addGroupEventParticipants(req, res, next);
  }
);

router.get("/v1/api/events/group", async (req, res) => {
  try {
    var getRegisteredUser = await client.query("SELECT * FROM tbl_group");
    res.status(200).json(getRegisteredUser.rows);
  } catch (err) {
    console.log(err);
    res.status(200).json({
      msg: "Internal Server Error",
    });
  }
});
router.get("/v1/api/admin/events/single/:eventid", async (req, res) => {
  try {
    console.log(req.params)
    var getRegisteredUser = await client.query(
      "SELECT * FROM tbl_single WHERE eventid = $1",
      [req.params.eventid]
    );
    if (getRegisteredUser.rowCount == 0) {
      res.status(200).json({
        msg: "No Records found",
      });
    } else {
      res.status(200).json(getRegisteredUser.rows);
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({
      msg: "Internal Server Error",
    });
  }
});

app.use("/", router);

module.exports.handler = serverless(app);
