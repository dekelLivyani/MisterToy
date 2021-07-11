import { reviewService } from '@/services/review.service.js'

export const reviewStore = {
   state: {
      reviews:[],
   },
   getters: {
      reviews(state) {
         return state.reviews;
      }
   },
   mutations: {
      loadReviews(state, { reviews}) {
         state.reviews = reviews
      },
      addReview(state, { review}){
         state.reviews.push(review);
         console.log(state.reviews);
      }
   },
   actions: {

      async loadReviews(content ,{ filterBy}) {
         try {
            const reviews = await reviewService.query(filterBy)
            content.commit({ type: 'loadReviews', reviews })
            return reviews
         }
         catch (err){
            console.log('Cannot load reviews', err);
            throw err;
         }
      },

      async addReview({ commit }, { review }) {
         try {
            const addedReview = await reviewService.add(review)
            commit({ type: 'addReview', review:addedReview })
            return addedReview;
         }
         catch (err) {
            console.log('Cannot add review ', review, ',', err);
            throw err;
         }
      }
   }
}
