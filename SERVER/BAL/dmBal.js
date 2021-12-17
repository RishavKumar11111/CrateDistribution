const mongoClient = require('mongodb').MongoClient;
const { dbConfig, collection } = require('../CONFIG/config');
const url = dbConfig.MONGO_URL;
const DB = dbConfig.DB_NAME;
const common = require('./commonBal');


exports.getFinYearDistWiseReceivedCrateList = ({ districtCode }, { finYear }) => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            if(!finYear) {
                finYear = await common.getCurrentFinYear();
            }
            const aggregation = [
                { $match: { finYear: finYear, "area.status": 'Received', "area.districtCode": districtCode } },
                { $unwind: "$area" },
                { $match: { "area.status": 'Received', "area.districtCode": districtCode } },
                { $project: { _id: 0, lotNo: 1, receivedOn: "$area.receivedOn", firmName: 1, workOrderNo: 1, receivedQuantity: "$area.receivedQuantity", remark: "$area.remark", blockCode: "$area.blockCode", blockName: "$area.blockName" } }
            ]
            const result = await dbo.collection(collection.SUPPLY_MASTER).aggregate(aggregation).toArray();
            resolve(result);
            db.close();
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    })
}
exports.confirmReceivedCrates = ({ lotNo, districtCode, blockCode }) => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            const dbo = db.db(DB);
            let mArray = { arrayFilters: [{ "e1.blockCode": blockCode, "e1.districtCode": districtCode, "e1.status": "Received" }] };
            const newvalues = { $set: { "area.$[e1].confirmedOn": new Date(), "area.$[e1].status": 'Confirm', "area.$[e1].confirmBy": 'DM' } };
            await  dbo.collection(collection.SUPPLY_MASTER).updateOne({ lotNo: lotNo }, newvalues, mArray);
            const response = {
                message: "Successfully confirmed."
            };
            resolve(response);
            db.close();   
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    })
}