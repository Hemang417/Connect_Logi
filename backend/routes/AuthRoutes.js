import express from "express";
import {
  getTheUser,
  logoutUser,
  getNextRegistrationId,
  registerClient,
  updateUserPassword,
  getApprover,
  approvePasswordChange,
  rejectPasswordChange,
} from "../api/user.js";

import { uploadClientFiles } from "../middleware/clientRegistration.middleware.js";

import { loginCheckToken } from "../middleware/logCheck.middleware.js";

const router = express.Router();

router.post("/auth/login", async (req, res) => {
  try {
    const { username, password, orgcode } = req.body;
    if (!username || !password || !orgcode) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const userdetails = await getTheUser(username, password, orgcode);

    if (userdetails?.error) {
      return res.status(401).json({ error: userdetails.error });
    }

    return res.status(200).json(userdetails);

  } catch (error) {
    console.log("Error during Login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/auth/dashboard", loginCheckToken, async (req, res) => {
  try {
    return res.json({
      success: true,
      message: "Token is valid. Proceed to dashboard.",
    });
  } catch (err) {
    console.error("Error in /auth/dashboard:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/auth/logout", async (req, res) => {
  try {
    const { username, orgname, orgcode } = req.body;

    if (!username || !orgname || !orgcode) {
      return res.status(400).json({ error: "Username and orgcode are required." });
    }

    const logoutResult = await logoutUser(username, orgname, orgcode);

    if (logoutResult?.error) {
      return res.status(400).json({ error: logoutResult.error });
    }

    return res.status(200).json({
      message: "Logout successful",
      success: true
    });

  } catch (error) {
    console.log("Error during Logout:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET USER ID
router.get("/ctclient/nextid", getNextRegistrationId);

// SIGNUP ROUTE
router.post("/ctclient/register", uploadClientFiles, registerClient);

// FORGOT PASSWORD
router.post("/auth/forgotpassword", async (req, res) => {
  try {
    const { username, role, newpassword, repeatPassword, remark, orgcode } =
      req.body;
    // console.log(req.body);

    // Check if all required fields are provided
    if (!username || !orgcode || !newpassword || !repeatPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if new password matches repeat password
    if (newpassword !== repeatPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Update the user's password
    const result = await updateUserPassword(
      username,
      role,
      newpassword,
      remark,
      orgcode
    );

    res.status(200).json({ message: result.message }); // 'Password updated successfully'
  } catch (error) {
    console.log("Error during password reset:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get Password Change Requests
router.get("/auth/userreq", async (req, res) => {
  try {
    const latestrouterroval = await getApprover();

    if (latestrouterroval.length === 0) {
      return res
        .status(404)
        .json({ message: "No password change requests found" });
    }

    res.status(200).json(latestrouterroval);
  } catch (error) {
    console.log(error);
  }
});

// approve Password Change Route
router.post("/auth/userreq/approve", async (req, res) => {
  const { username } = req.body; // Get username from the request body
  try {

    const result = await approvePasswordChange(username);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reject Password Change Route
router.post("/auth/userreq/reject", async (req, res) => {
  const { username } = req.body; // Get username from the request body
  try {
    const result = await rejectPasswordChange(username);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;