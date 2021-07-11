import { toyService } from '@/services/toy.service.js'

export const toyStore = {
   state: {
      toys: [],
      toyToUpdate: null,
      filterBy: {
         name: '',
         price: 0,
         type: 'All',
      }
   },
   getters: {
      toys(state) {
         return state.toys;
      },
      toysToShow(state) {
         let toysToShow = state.toys.filter(toy => +toy.price >= state.filterBy.price)
            .filter(toy => toy.type === state.filterBy.type || state.filterBy.type === 'All')
         let regex = new RegExp(state.filterBy.name, 'i')
         return toysToShow.filter(toy => regex.test(toy.name))
      },
      toyToUpdate(state) {
         return state.toyToUpdate;
      },
      toysCountByType(state) {
         return state.toys.reduce((acc, toy) => {
            if (!acc[toy.type]) acc[toy.type] = 0;
            acc[toy.type]++;
            return acc;
         }, {});
      },
      toysInStockByType(state) {
         return state.toys.reduce((acc, toy) => {
            if (!acc[toy.type]) acc[toy.type] = 0;
            if (toy.inStock) {
               acc[toy.type]++;
            }
            return acc;
         }, {});
      }
   },
   mutations: {
      setFilter(state, { filterBy }) {
         state.filterBy = filterBy
      },
      setFilterToAll(state) {
         state.filterBy = {
            name: '',
            price: 0,
            type: 'All',
         }
      },
      loadToys(state, { toys }) {
         state.toys = toys
      },
      addToy(state, { savedToy }) {
         state.toys.push(savedToy);
      },
      updateToy(state, { savedToy }) {
         const idx = state.toys.findIndex(toy =>
            toy._id === savedToy._id)
         state.toys.splice(idx, 1, savedToy)
         state.toyToUpdate = null
      },
      removeToy(state, { toyId }) {
         const idx = state.toys.findIndex(toy => toy._id === toyId)
         state.toys.splice(idx, 1);
      },
      setToyToUpdate(state, { toy }) {
         state.toyToUpdate = toy
      },
 
   },
   actions: {
      async loadToys(content) {
         try {
            const toys = await toyService.query(content.state.filterBy)
            content.commit({ type: 'loadToys', toys })
            return toys
         }
         catch (err){
            console.log('Cannot load toys', err);
            throw err;
         }
      },
      async saveToy({ commit }, { toy }) {
         const type = (toy._id) ? 'updateToy' : 'addToy'
         try {
            const savedToy = await toyService.save(toy)
            commit({ type, savedToy })
            return savedToy
         }
         catch (err){
            console.log('Cannot save toy ', toy, ',', err);
            throw err;
         }
      },
      async removeToy({ commit }, { toyId }) {
         try {
            await toyService.remove(toyId)
            commit({ type: 'removeToy', toyId })
         }
         catch (err){
            console.log('Cannot remove toy ', toyId, ',', err);
            throw err;
         }
      },

   }
}