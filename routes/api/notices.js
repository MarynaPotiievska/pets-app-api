const express = require("express");

const ctrl = require("../../controllers/notices");

const { validateBody, upload, isValidId, authenticate } = require("../../middlewares");
const {schema} = require("../../models/notice")


const router = express.Router();

router.get("/category/:category", ctrl.getNoticesByCategory); // для вибірки по категорії + по заголовку

router.get("/favorite", authenticate, ctrl.getFavorite); // для вибірки усіх обраних оголошення авторизованого користувача

router.get("/:noticeId", authenticate, isValidId, ctrl.getNoticeById); // для знаходження по id

router.get("/user/:userId", 
authenticate, ctrl.getNoticesByUser); // для отримання оголошень, створених авторизованим користувачем

router.patch("/:noticeId", authenticate, isValidId, ctrl.addToFavorite); // для додавання в обрані

router.delete("/favorite/:noticeId", authenticate, isValidId, ctrl.removeFromFavorite); // для видалення оголошення з обраних

router.post(
  "/", authenticate, 
  upload.single("file"),
  validateBody(schema),
  //   [
  //   body("title").isString().notEmpty(),
  //   body("name").isString().notEmpty().isLength({ min: 2, max: 16 }),
  //   body("date")
  //     .isString()
  //     .notEmpty()
  //     .matches(/^\d{2}([.])\d{2}([.])\d{4}$/),
  //   body("breed").isString().notEmpty().isLength({ min: 2, max: 16 }),
  //   body("category").isIn(["sell", "lost-found", "for-free"]).notEmpty(),
  //   body("sex").isString().notEmpty().isIn(["male", "female"]),
  //   body("comments").isString().isLength({ min: 8, max: 120 }),
  //   body("location").isString().notEmpty(),
  //   body("price")
  //   .if(body("category").equals("sell"))
  //     .notEmpty()
  //     .isNumeric()
  //     .isLength({ min: 1 })
  //     .withMessage("Price must be higher then 0"),
  // ]),
  ctrl.addNotice
); // для створення оголошення

router.delete("/:noticeId", authenticate, isValidId, ctrl.removeNotice); // для видалення оголошення, створеного авторизованим користувачем

module.exports = router;
