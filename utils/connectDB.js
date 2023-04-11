import mongoose from 'mongoose'

const connectMongo = async () => mongoose.connect('mongodb+srv://(a)kellyhood180:2OYYPY7HlTC4bHzs@cluster0.brikwpa.mongodb.net/?retryWrites=true&w=majority');

export default connectMongo
