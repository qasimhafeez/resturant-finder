import mongoose from 'mongoose'
const { model, Schema } = mongoose

const restaurantsSchema = new Schema({
	restaurantsName: String,
	log: String,
	Lat: String,
	address: String,
})

const FestaurantsModel = model('restaurants', restaurantsSchema)

export { restaurantsSchema, FestaurantsModel }
