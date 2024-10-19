
import express from "express";
import { sendMessage } from "../routControler/messageContRout.js";
import isLogin from "../middleware/isLogin.js";
import { getMessage } from "../routControler/messageContRout.js";

const router = express.Router();

router.post("/send/:id",isLogin, sendMessage)
router.get("/:id",isLogin, getMessage)


export default router;