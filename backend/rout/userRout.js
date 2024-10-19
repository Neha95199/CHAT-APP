import express from "express"
import isLogin from '../middleware/isLogin.js'
import { getUserBySearch } from "../routControler/userHandlerRout.js";
import { getCurrentChatters } from "../routControler/userHandlerRout.js";
const router = express.Router();

router.get("/search",isLogin,getUserBySearch)
router.get("/currentChatters",isLogin,getCurrentChatters)

export default router