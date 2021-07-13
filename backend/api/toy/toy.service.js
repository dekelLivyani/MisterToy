const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
   query,
   getById,
   remove,
   update,
   add,
   addMsgToToyHistory
   // addReview
}

async function query(filterBy) {
   const criteria = _buildCriteria(filterBy);
   try {
      const collection = await dbService.getCollection('toy')
      const toys = await collection.find(criteria).toArray()
      return toys;
   } catch (err) {
      console.log('ERROR: cannot find toys')
      throw err
   }
}

async function getById(toyId) {
   try {
      toyId = ObjectId(toyId)
      const collection = await dbService.getCollection('toy')
      const toy = await collection.findOne({ _id: toyId })
      return toy
   } catch (err) {
      console.log(`ERROR: cannot find toy ${toyId}`)
      throw err
   }
}

async function remove(toyId) {
   try {
      const collection = await dbService.getCollection('toy')
      return await collection.deleteOne({ _id: ObjectId(toyId) })
   } catch (err) {
      console.log(`ERROR: cannot remove toy ${toyId}`)
      throw err
   }
}

async function update(toy) {
   try {
      toy._id = ObjectId(toy._id)
      const collection = await dbService.getCollection('toy')
      await collection.updateOne({ _id: toy._id }, { $set: { ...toy } })
      return toy
   } catch (err) {
      console.log(`ERROR: cannot update toy ${toy._id}`)
      throw err
   }
}

async function add(toy) {
   try {
      const collection = await dbService.getCollection('toy')
      toy.price = +toy.price;
      await collection.insertOne(toy)
      return toy
   } catch (err) {
      console.log(`ERROR: cannot insert toy`)
      throw err
   }
}
async function addMsgToToyHistory(msg, toyId) {
   const toy = await getById(toyId);
   toy.chatHistory.push(msg);
   await update(toy);
}
// async function addReview(toy, review) {
//    try {
//       const collection = await dbService.getCollection('toy')
//       const toyId = ObjectId(toy._id)
//       await collection.updateOne({ '_id': toyId }, { $push: { reviews: review } })
//       const toyAfterAdding = await collection.findOne({ '_id': toyId })
//       return toyAfterAdding
//    } catch (err) {
//       console.log(`ERROR: cannot insert review`)
//       throw err
//    }
// }

function _buildCriteria(filterBy) {
   const criteria = {}
   if (filterBy.name) {
      const txtCriteria = { $regex: filterBy.name, $options: 'i' }
      criteria.name = txtCriteria
   }
   if (filterBy.type && filterBy.type !== 'All') {
      criteria.type = filterBy.type
   }
   if (filterBy.price) {
      criteria.price = { $gte: +filterBy.price }
   }
   return criteria
}


