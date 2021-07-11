const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getToy, getToys, deleteToy, updateToy, addToy,addReview } = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getToys)
router.post('/',requireAdmin, addToy)
router.delete('/:id',requireAdmin , deleteToy)
router.put('/',requireAdmin, updateToy)
router.get('/:id', getToy)
// router.post('/review/:id',log, addReview)

module.exports = router