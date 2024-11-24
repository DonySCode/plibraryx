import {Router} from "express";
import {BookController} from "../controllers/BookController";
import {authenticate} from "../../../shared/middleware/authMiddleware";

const router = Router();
const userController = new BookController();

router.use(authenticate);
router.post("/", userController.add.bind(userController));
router.get("/", userController.getAll.bind(userController));
router.get("/:id", userController.getById.bind(userController));
router.put("/:id", userController.update.bind(userController));
router.delete("/:id", userController.delete.bind(userController));
router.patch("/:id/favorite", userController.maskAsFavorite.bind(userController));
router.patch("/:id/unfavorite", userController.unmaskAsFavorite.bind(userController));

export default router;
