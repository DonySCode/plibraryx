import {Router} from "express";
import {UserController} from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.post("/register", userController.register.bind(userController));
router.get("/:username", userController.getUser.bind(userController));

export default router;
