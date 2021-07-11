import { httpService } from './http.service';
// import axios from 'axios';

const TOY_CODE = 'toys'
const API = 'http://localhost:3030/api/toy'

export const toyService = {
   query,
   save,
   getById,
   remove,
   getEmptyToy
}


function query(filterBy) {
   return httpService.get('toy', filterBy)
}

function getById(id) {
   return httpService.get(`toy/${id}`)
}

function remove(id) {
   return httpService.delete(`toy/${id}`)
}

function save(toy) {
   if (toy._id) return httpService.put('toy', toy)
   else return httpService.post('toy', toy)
}



function getEmptyToy() {
   return {
      name: '',
      imgNum: null,
      price: null,
      type: '',
      createdAt: null,
      inStock: false,
   }
}