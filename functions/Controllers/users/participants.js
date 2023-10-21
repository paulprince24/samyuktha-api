const { uuid } = require("uuidv4");
const { client } = require("../../db_config");
const { sendSingleMail, sendGroupMail } = require("../../middleware/mail");

async function addSingleEventParticipants(req, res, next) {
  try {
    var findParticipant = await client.query(
      "SELECT * from tbl_single WHERE participantemail = $1 AND eventid = $2",
      [req.body.participantemail, req.body.eventid]
    );
    if (findParticipant.rowCount == 0) {
      var newParticipant = await client.query(
        "INSERT INTO tbl_single(id,userid,eventid,loggedInEmail,participantemail,participantname, participantphone,courseName,collegeName) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)",
        [
          uuid(),
          req.body.userid,
          req.body.eventid,
          req.user.email,
          req.body.participantemail,
          req.body.participantname,
          req.body.participantphone,
          req.body.course,
          req.body.college,
        ]
      );
      console.log(newParticipant.rows);
      var getEventData = await client.query(
        "SELECT eventname,studentincharge1,studentincharge2,studentincharge1mobile,studentincharge2mobile FROM tbl_events WHERE id = $1",
        [req.body.eventid]
      );
      var mailData = {
        eventName: getEventData.rows[0].eventname,
        participantEmail: req.body.participantemail,
        participantName: req.body.participantname,
        participantPhone: req.body.participantphone,
        studentincharge1: getEventData.rows[0].studentincharge1,
        studentincharge2: getEventData.rows[0].studentincharge2,
        studentincharge1mobile: getEventData.rows[0].studentincharge1mobile,
        studentincharge2mobile: getEventData.rows[0].studentincharge1mobile,
      };
      // sendSingleMail(mailData);
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
}

async function addGroupEventParticipants(req, res, next) {
  try {
    var findParticipant = await client.query(
      "SELECT * FROM tbl_group WHERE participant1email = $1 AND eventid = $2",
      [req.body.participant1email, req.body.eventid]
    );
    console.log(findParticipant.rowCount);
    if (findParticipant.rowCount == 0) {
      console.log(uuid());
      var newParticipant = await client.query(
        "INSERT INTO tbl_group(id,userId,eventId,loggedinemail,participant1Email,participant1Name,participant1Phone,courseName,collegeName,participant2Name,participant2Phone,participant3Name,participant3Phone,participant4Name,participant4Phone,participant5Name,participant5Phone) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)",
        [
          uuid(),
          req.body.userid,
          req.body.eventid,
          req.user.email,
          req.body.participant1email,
          req.body.participant1name,
          req.body.course,
          req.body.college,
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
      var getEventData = await client.query(
        "SELECT eventname,studentincharge1,studentincharge2,studentincharge1mobile,studentincharge2mobile FROM tbl_events WHERE id = $1",
        [req.body.eventid]
      );
      var mailData = {
        eventName: getEventData.rows[0].eventname,
        participant1Email: req.body.participant1email,
        participant1Name: req.body.participant1name,
        participant1Phone: req.body.participant1phone,
        participant2Name: req.body.participant2name,
        participant3Name: req.body.participant3name,
        participant4Name: req.body.participant4name,
        participant5Name: req.body.participant5name,
        studentincharge1: getEventData.rows[0].studentincharge1,
        studentincharge2: getEventData.rows[0].studentincharge2,
        studentincharge1mobile: getEventData.rows[0].studentincharge1mobile,
        studentincharge2mobile: getEventData.rows[0].studentincharge1mobile,
      };
      sendGroupMail(mailData);
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
}

module.exports = {
  addSingleEventParticipants,
  addGroupEventParticipants,
};
