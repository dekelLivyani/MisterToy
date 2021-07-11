
import { httpService } from './http.service';
// import axios from 'axios';

export const reviewService = {
   query,
   add,
   // remove,
}


function query(filterBy) {
   return httpService.get('review/', filterBy)
}

function add(review) {
   return httpService.post('review/', { review })
}

// function remove(id) {
//    return httpService.delete(`review/${id}`)
// }
