const express = require('express')

const ctrl = require("../../controllers/notices");

const router = express.Router()

router.get('/:category', ctrl.getNoticesByCategory) // для вибірки по категорії + по заголовку

router.get('/:noticeId', ctrl.getNoticeById) // для знвходження по id

router.patch('/:noticeId', ctrl.addToFavorite) // для додавання в обрані

router.get('/favorite', ctrl.getFavorite) // для вибірки усіх обраних оголошення авторизованого користувача

router.delete('/:noticeId', ctrl.removeFromFavorite) // для видалення оголошення з обраних

router.post('/', ctrl.addNotice) // для створення оголошення

router.get('/:userId', ctrl.getNoticesByUser) // для отримання оголошень, створених авторизованим користувачем

router.delete('/:noticeId', ctrl.removeNotice) // для видалення оголошення, створеного авторизованим користувачем

module.exports = router
