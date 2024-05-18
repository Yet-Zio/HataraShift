import mongoose from "mongoose";

/**
 * An asynchronous method that helps the server connect to the mongoDB database.
 */
export const connectToMongo = async () => {
    const MONGOURI = process.env.MONGOURI!
    mongoose.connect(MONGOURI)
    .then(success => {
        console.log("Connected to MongoDB successfully!\nDB:", success.connection.name)
    })
    .catch(err => {
        console.log("An error occured while connecting to the database: ", err.message)
    })
}