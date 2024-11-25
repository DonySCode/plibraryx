import {Router} from "express";
import {BookController} from "../controllers/BookController";
import {authenticate} from "../../../shared/middleware/authMiddleware";

const router = Router();
const bookController = new BookController();

router.use(authenticate);
router.post("/", bookController.add.bind(bookController));
router.get("/", bookController.getAll.bind(bookController));
router.get("/:id", bookController.getById.bind(bookController));
router.put("/:id", bookController.update.bind(bookController));
router.delete("/:id", bookController.delete.bind(bookController));
router.patch("/:id/favorite", bookController.maskAsFavorite.bind(bookController));
router.patch("/:id/unfavorite", bookController.unmaskAsFavorite.bind(bookController));

export default router;
