import express from "express";
import { userRegister } from "../routControler/userRoutCont.js";
import { userLogin } from "../routControler/userRoutCont.js";
import { userLogout } from "../routControler/userRoutCont.js";

const router = express.Router();

router.post('/register',userRegister)

router.post('/login',userLogin)

router.post('/logout',userLogout)


export default router