const express = require('express')

const ctrl = require("../../controllers/notices");
const upload = require('../../middlewares/upload')


const router = express.Router()

router.get('/', ctrl.getNoticesByCategory) // для вибірки по категорії + по заголовку /:category

router.get('/:noticeId', ctrl.getNoticeById) // для знвходження по id

router.patch('/:noticeId', ctrl.addToFavorite) // для додавання в обрані

router.get('/favorite', ctrl.getFavorite) // для вибірки усіх обраних оголошення авторизованого користувача

router.delete('/:noticeId', ctrl.removeFromFavorite) // для видалення оголошення з обраних

router.post('/', upload.single('file'), ctrl.addNotice) // для створення оголошення 

router.get('/:userId', ctrl.getNoticesByUser) // для отримання оголошень, створених авторизованим користувачем

router.delete('/:noticeId', ctrl.removeNotice) // для видалення оголошення, створеного авторизованим користувачем

module.exports = router
