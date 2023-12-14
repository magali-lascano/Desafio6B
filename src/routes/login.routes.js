import { Router } from "express";
import { 
    login,
    register
} from "../dao/controllers/login.controller.mdb";

const router = Router();
router.post("/login", login);
router.post("/register", register);

export default router;