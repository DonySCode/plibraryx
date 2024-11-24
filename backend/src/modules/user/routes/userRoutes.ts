import {Router} from "express";
import {UserController} from "../controllers/UserController";
import {authenticate} from "../../../shared/middleware/authMiddleware";

const router = Router();
const userController = new UserController();

router.post("/register", userController.register.bind(userController));
router.post("/login", userController.login.bind(userController));

export default router;
