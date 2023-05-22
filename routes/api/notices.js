const express = require("express");

const ctrl = require("../../controllers/notices");

const { validateBody, upload } = require("../../middlewares");
// const {schema} = require("../../models/notice")
const { body } = require("express-validator");

const router = express.Router();

router.get("/category/:category", ctrl.getNoticesByCategory); // для вибірки по категорії + по заголовку

router.get("/favorite", ctrl.getFavorite); // для вибірки усіх обраних оголошення авторизованого користувача

router.get("/:noticeId", ctrl.getNoticeById); // для знвходження по id

router.get("/user/:userId", ctrl.getNoticesByUser); // для отримання оголошень, створених авторизованим користувачем

router.patch("/:noticeId", ctrl.addToFavorite); // для додавання в обрані

router.delete("/favorite/:noticeId", ctrl.removeFromFavorite); // для видалення оголошення з обраних

router.post(
  "/",
  upload.single("file"),
  validateBody([
    body("title").isString().notEmpty(),
    body("name").isString().notEmpty().isLength({ min: 2, max: 16 }),
    body("date")
      .isString()
      .notEmpty()
      .matches(/^\d{2}([.])\d{2}([.])\d{4}$/),
    body("breed").isString().notEmpty().isLength({ min: 2, max: 16 }),
    body("category").isIn(["sell", "lost-found", "for-free"]).notEmpty(),
    body("sex").isString().notEmpty().isIn(["male", "female"]),
    body("comments").isString().isLength({ min: 8, max: 120 }),
    body("location").isString().notEmpty(),
    body("price")
      .notEmpty()
      .isNumeric()
      .isLength({ min: 1 })
      .withMessage("Price must be higher then 0"),
  ]),
  ctrl.addNotice
); // для створення оголошення

router.delete("/:noticeId", ctrl.removeNotice); // для видалення оголошення, створеного авторизованим користувачем

module.exports = router;
