const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "samyuktha7.0.2023@gmail.com",
    pass: "xsmtpsib-a844650df0ffd4d62e25033b5b1f40b5bfdd394adac8dfb4857d87601c2e0905-DbPnISNgMUEjcA8C",
  },
  tls: { rejectUnauthorized: false },
});

function sendSingleMail(data) {
  var MailContent = `
Dear ${data.participantName},

We are thrilled to inform you that your registration for ${data.eventName} has been successfully processed! We are delighted to have you as part of this exciting event.

Event Details:

•	Event Name: ${data.eventName}
•	Date: 27-10-2023
•	Location: Saintgits College of Engineering

Your registration details are as follows:

•	Name: ${data.participantName}
•	Email: ${data.participantEmail}
•	Contact Number: ${data.participantPhone}

Event Cordinators:
  
  ${data.studentincharge1}
  ${data.studentincharge1mobile}

  ${data.studentincharge2}
  ${data.studentincharge2mobile}


Registeration Time: 8:30 AM To 10:00 AM

Your registration is confirmed, and we are looking forward to welcoming you to the event. We have an incredible lineup of activities planned to make this event both informative and enjoyable.
We look forward to seeing you at ${data.eventName} and making it a memorable and successful occasion. In the meantime, if you have any special requests or requirements, please let us know so we can ensure your comfort and satisfaction.

Best regards,
Team Samyuktha
`;
  let mailOptions = {
    from: "samyuktha7.0.2023@gmail.com",
    to: `${data.participantEmail}`,
    subject: `Successful Registration for ${data.eventName}`,
    text: MailContent,
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Message sent: %s", data.messageId);
    }
  });
}

function sendGroupMail(data) {
  var MailContent = `
  Dear ${data.participant1Name},
  
  We are thrilled to inform you that your registration for ${
    data.eventName
  } has been successfully processed! We are delighted to have you as part of this exciting event.
  
  Event Details:
  
  • 	Event Name: ${data.eventName}
  • 	Date: 27-10-2023
  • 	Location: Saintgits College of Engineering
  
  Your registration details are as follows:
  
  • 	Name: ${data.participant1Name}
  • 	Email: ${data.participant1Email}
  •	    Contact Number: ${data.participant1Phone}

  Registeration Time: 8:30 AM To 10:00 AM

  Fellow Partcipants:
  • ${data.participant2Name || ""}
  • ${data.participant3Name || ""}
  • ${data.participant4Name || ""}
  • ${data.participant5Name || ""}

  Event Cordinators:

  ${data.studentincharge1}
  ${data.studentincharge1mobile}

  ${data.studentincharge2}
  ${data.studentincharge2mobile}

  
  Your registration is confirmed, and we are looking forward to welcoming you to the event. We have an incredible lineup of activities planned to make this event both informative and enjoyable.

  We look forward to seeing you at ${
    data.eventName
  } and making it a memorable and successful occasion. In the meantime, if you have any special requests or requirements, please let us know so we can ensure your comfort and satisfaction.
  
  Best regards,
  Team Samyuktha
  `;
  let mailOptions = {
    from: "samyuktha7.0.2023@gmail.com",
    to: `${data.participant1Email}`,
    subject: `Successful Registration for ${data.eventName}`,
    text: MailContent,
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Message sent: %s", data.messageId);
    }
  });
}

module.exports.sendSingleMail = sendSingleMail;
module.exports.sendGroupMail = sendGroupMail;
