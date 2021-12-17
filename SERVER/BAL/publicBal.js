const { dbConfig, collection } = require('../config/config');
const mongo = require('mongodb').MongoClient;
const url = dbConfig.MONGO_URL;
const DB = dbConfig.DB_NAME;

exports.getUserDetail = (userId) => {
    return new Promise( async (resolve, reject) => {
        try{
            const db = await mongo.connect(url);
            const dbo = db.db(DB);
            const aggregation = [
                { $match: { userId: userId } },
                { $project: { _id: 0 } }
            ]
            const result = await dbo.collection(collection.USERS).aggregate(aggregation).toArray();
            resolve(result[0]);
            db.close();    
        } catch(e) {
            console.error(e);
            reject({ message: "Database/network issue." });
        }
    })
}
exports.changePassword = ({ userName, oldPassword, newPassword }) => {
    return new Promise( async (resolve, reject) => {
        try{
            const db = await mongo.connect(url);
            const dbo = db.db(DB);
            const aggregation = [
                { $match: { userName: userName } },
                { $project: { _id: 0, password: 1 } }
            ]
            const result = await dbo.collection("users").aggregate(aggregation).toArray();
            let response = {};
            if(result[0].password === oldPassword) {
                await dbo.collection("users").updateOne({userName: userName}, { $set: { password: newPassword } })
                response.success = true;
                response.message = "Password successfully changed.";
            } else {
                response.success = false;
                response.message = "Wrong old password. Please try again.";
            }
            
            resolve(response);
            db.close();    
        } catch(e) {
            reject({ message: "Database/network issue." });
        }
    })
}
exports.getDistrictList = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongo.connect(url);
            var dbo = db.db(DB);
            const aggregation = [
                { $project: { _id: 0 } }
            ]
            const result = await dbo.collection(collection.DISTRICT_MASTER).aggregate(aggregation).toArray();
            resolve(result);
            db.close();
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
  
    })
}
exports.getBlockList = ({ districtCode }) => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongo.connect(url);
            var dbo = db.db(DB);
            const aggregation = [
                { $match: { districtCode: districtCode } },
                { $project: { _id: 0 } }
            ]
            const result = await dbo.collection(collection.BLOCK_MASTER).aggregate(aggregation).toArray();
            resolve(result);
            db.close();     
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    })
}