import {Router} from "express";
import {BookController} from "../controllers/BookController";
import {authenticate} from "../../../shared/middleware/authMiddleware";

const router = Router();
const userController = new BookController();

router.get("/", userController.getAll.bind(userController));

export default router;
