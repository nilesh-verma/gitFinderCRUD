const mongoose = require('mongoose')
const env_Var = require('../config/env.json')
const database = env_Var.development.database
module.exports = {
    mongo_connection : async () => {
         const mongo_db =await mongoose.connect(database.host+database.port+'/'+database.database, { useNewUrlParser: true })
         return mongo_db
    }
}