const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const toyService = require('../toy/toy.service')
const socketService = require('../../services/socket.service')
const reviewService = require('./review.service')

async function getReviews(req, res) {
   try {
      const reviews = await reviewService.query(req.query)
      res.send(reviews)
   } catch (err) {
      logger.error('Cannot get reviews', err)
      res.status(500).send({ err: 'Failed to get reviews' })
   }
}

async function deleteReview(req, res) {
   try {
      await reviewService.remove(req.params.id)
      res.send({ msg: 'Deleted successfully' })
   } catch (err) {
      logger.error('Failed to delete review', err)
      res.status(500).send({ err: 'Failed to delete review' })
   }
}


async function addReview(req, res) {
   try {
      var { review} = req.body
      review.userId = req.session.user._id
      
      review = await reviewService.add(review)

      // prepare the updated review for sending out
      review.user = await userService.getById(review.userId)
      review.toy = await toyService.getById(review.toyId)
      
      console.log('CTRL SessionId:', req.sessionID);
      socketService.broadcast({ type: 'review-added', data: review })
      socketService.emitToAll({ type: 'user-updated', data: review.user, room: req.session.user._id })
      res.send(review)

   } catch (err) {
      console.log(err)
      logger.error('Failed to add review', err)
      res.status(500).send({ err: 'Failed to add review' })
   }
}

module.exports = {
   getReviews,
   deleteReview,
   addReview
}