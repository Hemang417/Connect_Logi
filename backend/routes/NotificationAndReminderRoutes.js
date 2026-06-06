import express from "express";
import {
    fetchNotifications,
    updatethereadingrowwithtimeandvalue,
    readallnotifications,
  } from "../api/notifications.js";

  import { fetchImpJobs, readjobforuser } from "../api/impjobnotifications.js";
import { StoringReminders, fetchReminders } from "../api/reminder.js";
import { setMail, fetchMail } from "../api/mail.js";



const router = express.Router();

router.post("/settimeandmail", async (req, res) => {
  try {
    const { email, passcode, hours, minutes, orgname, orgcode } = req.body;
    const settedmail = await setMail(
      email,
      passcode,
      hours,
      minutes,
      orgname,
      orgcode
    );
  } catch (error) {
    console.log(error);
  }
});

router.get("/gettimeandmail", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const fetchedMail = await fetchMail(orgname, orgcode);
    res.json(fetchedMail);
  } catch (error) {
    console.log(error);
  }
});


router.get("/fetchnotifications", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const fetchednotifications = await fetchNotifications(orgname, orgcode);
    res.send(fetchednotifications);
  } catch (error) {
    console.log(error);
  }
});

router.put("/userhasread", async (req, res) => {
  try {
    const {
      orgname,
      orgcode,
      address,
      clientname,
      country,
      state,
      city,
      postalcode,
      alias,
      pan,
      gst,
      iec,
      branchname,
      creditdays,
      username,
      id,
      reading,
      timeofreading,
    } = req.body.theitemread;
    const { currentDate, employeename } = req.body;
    const updatedReadRow = await updatethereadingrowwithtimeandvalue(
      orgname,
      orgcode,
      address,
      clientname,
      country,
      state,
      city,
      postalcode,
      alias,
      pan,
      gst,
      iec,
      branchname,
      creditdays,
      username,
      id,
      currentDate,
      reading,
      timeofreading,
      employeename
    );
    res.send(updatedReadRow); // Make sure updatedReadRow contains the updated row
  } catch (error) {
    console.log(error);
  }
});

router.put("/makereadall", async (req, res) => {
  try {
    const { currentDate, notifications } = req.body;
    const everythingread = await readallnotifications(
      currentDate,
      notifications
    );
    res.status(200).send(everythingread);
  } catch (error) {
    console.log(error);
  }
});


router.get("/fetchJobnotifications", async (req, res) => {
  try {
    const { orgname, orgcode, branchcode } = req.query;
    const fetchedjob = await fetchImpJobs(orgname, orgcode, branchcode);
    res.send(fetchedjob);
  } catch (error) {
    console.log(error);
  }
});

router.put("/userreadforjob", async (req, res) => {
  try {
    const { orgname, orgcode, username, jobnumber, branchcode, branchname } =
      req.body;
    const readedjob = await readjobforuser(
      orgname,
      orgcode,
      username,
      jobnumber,
      branchcode,
      branchname
    );
  } catch (error) {
    console.log(error);
  }
});

router.post("/insertreminder", async (req, res) => {
  try {
    const { jobnumber } = req.body;
    const storedreminders = await StoringReminders(
      req.body.reminders,
      jobnumber
    );

    res.status(200).send(storedreminders);
  } catch (error) {
    console.log(error);
  }
});

router.get("/fetchremindernotifications", async (req, res) => {
  try {
    const { orgname, orgcode, branchname } = req.query;
    const fetchedreminders = await fetchReminders(orgname, orgcode, branchname);
    res.send(fetchedreminders);
  } catch (error) {
    console.log(error);
  }
});




export default router
