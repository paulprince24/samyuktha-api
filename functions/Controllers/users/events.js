const { uuid } = require("uuidv4");
const { client } = require("../../db_config");

async function getEvents(req, res, next) {
  try {
    var getEvents = await client.query("SELECT * from tbl_events");
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
}

async function getIndividualEvents(req, res, next) {
  try {
    console.log(req.params);
    var getEvents = await client.query(
      "SELECT * from tbl_events WHERE id = $1",
      [req.params.id]
    );

    var getRules = await client.query(
      "SELECT * from tbl_rules WHERE eventid = $1",
      [req.params.id]
    );
    console.log(getEvents.rows);
    res.status(200).json({
      events: getEvents.rows,
      rules: getRules.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error",
      err: err,
    });
  }
}

module.exports = {
  getEvents,
  getIndividualEvents,
};
