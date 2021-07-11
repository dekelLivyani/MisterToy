const toyService = require('./toy.service')
const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')

async function getToy(req, res) {
   try {
      const toy = await toyService.getById(req.params.id)
      res.send(toy)
   } catch (err) {
      logger.error('Failed to get toy', err)
      res.status(500).send({ err: 'Failed to get toy' })
   }
}

async function getToys(req, res) {
   try {
      const filterBy = {
         name: req.query?.name || '',
         price: req.query?.price || 0,
         type: req.query?.type || 'ALL',
      }
      const toys = await toyService.query(filterBy)
      res.send(toys)
   } catch (err) {
      logger.error('Failed to get toys', err)
      res.status(500).send({ err: 'Failed to get toys' })
   }
}

async function deleteToy(req, res) {
   try {
      await toyService.remove(req.params.id)
      res.send({ msg: 'Deleted successfully' })
   } catch (err) {
      logger.error('Failed to delete toy', err)
      res.status(500).send({ err: 'Failed to delete toy' })
   }
}

async function updateToy(req, res) {
   try {
      const toy = req.body
      const savedToy = await toyService.update(toy)
      res.send(savedToy)
      // socketService.broadcast({ type: 'toy-updated', data: review, to: savedToy._id })
   } catch (err) {
      logger.error('Failed to update toy', err)
      res.status(500).send({ err: 'Failed to update toy' })
   }
}

async function addToy(req, res) {
   try {
      const toy = req.body
      const savedToy = await toyService.add(toy)
      res.send(savedToy)
      // socketService.broadcast({ type: 'toy-add', data: review, to: savedToy._id })
   } catch (err) {
      logger.error('Failed to add toy', err)
      res.status(500).send({ err: 'Failed to add toy' })
   }
}


// async function addReview(req, res) {
//    try {

//       const { toy, review } = req.body
//       // const toy = await toyService.getById(req.params.id)
//       const savedToy = await toyService.addReview(toy, review)
//       res.send(savedToy)
//    } catch (err) {
//       logger.error('Failed to add review', err)
//       res.status(500).send({ err: 'Failed to add review' })
//    }
// }


module.exports = {
   getToy,
   getToys,
   deleteToy,
   updateToy,
   addToy,
   // addReview
}