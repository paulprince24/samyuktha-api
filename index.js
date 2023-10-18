var express = require("express");
require("dotenv").config();

var app = express();
var cors = require("cors");

//Load Postgres Server
var { client } = require("./config/db_config");
const morgan = require("morgan");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
// @Route http://localhost:5000/v1/api/events
// @method GET

app.get("/v1/api/events", async (req, res) => {
  try {
    var getEvents = await client.query("SELECT * from tbl_events INNER JOIN tbl_rules ON tbl_events.id = tbl_rules.eventid");
    console.log(getEvents.rows);
    res.status(200).json({
      events: getEvents.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error",
      err: err,
    });
  }
});

app.post("/v1/api/events/single", async (req, res) => {
  console.log(req.body);
  try {
    var findParticipant = await client.query(
      "SELECT * from tbl_single WHERE participantemail = $1 AND eventid = $2",
      [req.body.participantemail, req.body.eventid]
    );
    console.log(findParticipant.rowCount);
    if (findParticipant.rowCount == 0) {
      var newParticipant = await client.query(
        "INSERT INTO tbl_single(userid,eventid,participantemail,participantname, participantphone) VALUES($1,$2,$3,$4,$5)",
        [
          req.body.userid,
          req.body.eventid,
          req.body.participantemail,
          req.body.participantname,
          req.body.participantphone,
        ]
      );
      console.log(newParticipant.rows);
      res.status(200).json({
        status: true,
        msg: "Participant Added",
      });
    } else {
      res.status(200).json({
        status: false,
        msg: "Pariticipant is already registered",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error",
      err: err,
    });
  }
});

app.post("/v1/api/events/group", async (req, res) => {
  console.log(req.body);
  try {
    var findParticipant = await client.query(
      "SELECT * FROM tbl_group WHERE participant1email = $1 AND eventid = $2",
      [req.body.participant1email, req.body.eventid]
    );
    console.log(findParticipant.rowCount);
    if (findParticipant.rowCount == 0) {
      var newParticipant = await client.query(
        "INSERT INTO tbl_group(userId,eventId,participant1Email,participant1Name,participant1Phone,participant2Name,participant2Phone,participant3Name,participant3Phone,participant4Name,participant4Phone,participant5Name,participant5Phone) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
        [
          req.body.userid,
          req.body.eventid,
          req.body.participant1email,
          req.body.participant1name,
          req.body.participant1phone,
          req.body.participant2name || "",
          req.body.participant2phone || "",
          req.body.participant3name || "",
          req.body.participant3phone || "",
          req.body.participant4name || "",
          req.body.participant4phone || "",
          req.body.participant5name || "",
          req.body.participant5phone || "",
        ]
      );
      console.log(newParticipant.rows);
      res.status(200).json({
        status: true,
        msg: "Team Added",
      });
    } else {
      res.status(200).json({
        status: false,
        msg: "Team is already registered",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error",
      err: err,
    });
  }
});

app.get("/v1/api/events/group", async (req, res) => {
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
app.get("/v1/api/events/single", async (req, res) => {
  try {
    var getRegisteredUser = await client.query("SELECT * FROM tbl_single");
    res.status(200).json(getRegisteredUser.rows);
  } catch (err) {
    console.log(err);
    res.status(200).json({
      msg: "Internal Server Error",
    });
  }
});

var PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is Starting");
});
