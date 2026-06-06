import express from "express";
import {
    getEditLog, 
} from "../api/editlogs.js";

const router = express.Router();

router.get("/getedits", async (req,res) => {
    try {
        const { orgcode } = req.query;
        const edits = await getEditLog(orgcode);
        res.send(edits);
    } catch (error) {
        console.log(error);
    }
});

export default router;