require("dotenv").config();
const { app } = require("deta");
const nodemailer = require("nodemailer");
const supabase = require("./utils/supabaseClient");
const createEmailBody = require("./utils/createEmailBody");

app.lib.cron((event) => {
  async function sendBirthdayMails() {
    const t = new Date();
    const day = t.getDay();
    const month = t.getMonth();

    const { data, error } = await supabase
      .from("birthdays")
      .select()
      .eq("birth_day", day)
      .eq("birth_month", month);

    const usersToReceive = [];
    const groupedData = {};

    data.forEach((birthday) => {
      // checks whether a birthday is the first for a user
      if (usersToReceive.includes(birthday.user_id)) {
        groupedData[birthday.user_id].push(birthday);
      } else {
        groupedData[birthday.user_id] = [birthday];
        usersToReceive.push(birthday.user_id);
      }
    });

    // create nodemailer transport
    let transporter = nodemailer.createTransport({
      service: process.env.NODEMAILER_SERVICE,
      auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASS,
      },
    });

    // loop and run the utility function that returns the birthday email body and send
    for (const user of usersToReceive) {
      const emailContents = createEmailBody(groupedData[user]);
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("user_id", user);

      let info = await transporter.sendMail({
        from: '"BDaaS Birthday Reminder" <birthdays@bdaas.okezie.dev>',
        to: data[0].email,
        subject: "Yay! Today is someone's birthday",
        html: emailContents,
      });

      console.log("Message sent: %s", info.messageId);
    }
  }

  sendBirthdayMails();
});

module.exports = app;
