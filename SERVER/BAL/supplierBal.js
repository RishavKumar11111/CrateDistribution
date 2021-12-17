const mongoClient = require('mongodb').MongoClient;
const { dbConfig, collection } = require('../CONFIG/config');
const url = dbConfig.MONGO_URL;
const DB = dbConfig.DB_NAME;

const cYear = new Date().getFullYear().toString();
const cMonth = new Date().getMonth();
const cFinYear = cMonth >= 3 ? cYear + "-" + (parseInt(cYear.slice(2, 4)) + 1).toString() : (parseInt(cYear) - 1).toString() + "-" + cYear.slice(2, 4);
exports.addSupply = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            const dbo = db.db(DB);
            const response = {};
            if(data.lotNo) {
                data.updateOn = new Date();
                response.message = "LOT detail updated successfully.";
            } else {
                data.addedOn = new Date();
                const lotAggregation = [
                    { $project: { _id: 0, lotNo: 1 } },
                    { $project: { lotNo: { $split: ["$lotNo", "LOT"] } } },
                    { $project: { lotNo: { $toInt: { $arrayElemAt: ["$lotNo", 1] } } } },
                    { $sort: { lotNo: -1 } }
                ]
                const results = await dbo.collection(collection.SUPPLY_MASTER).aggregate(lotAggregation).toArray();
                data.lotNo = (results.length === 0) ? 'LOT01' : `LOT${(results[0].lotNo + 1).toString().padStart(2, "0")}`;
                response.message = "LOT number created successfully.";
                response.lotNo = data.lotNo
            }
            data.status = 'Pending';
            data.deliveryDate = new Date(data.deliveryDate);
            data.finYear = cFinYear;
            await  dbo.collection(collection.SUPPLY_MASTER).updateOne({ lotNo: data.lotNo }, { $set: data }, { upsert: true });
            resolve(response);
            db.close();   

        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    })
}
exports.updateAreaOfSupply = ({ lotNo }, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            const dbo = db.db(DB);
            data.updateOn = new Date();
            data.status = 'Transit';
            data.area.forEach(e => {
                e.status = 'Transit'
            })
            await  dbo.collection(collection.SUPPLY_MASTER).updateOne({ lotNo: lotNo }, { $set: data });
            const response = {
                message: "LOT area and quantity updated successfully."
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
exports.getAvailableCrateQuantityOfWO = ({ workOrderNo }) => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            const lotAggregation = [
                { $match: { workOrderNo: workOrderNo } },
                { $group : {  _id: "$workOrderNo", totalQuantity: { $sum: "$totalQuantity" } } },
                { $project: { _id: 0, totalQuantity: 1 } }
            ]
            const awaitLotResult = dbo.collection(collection.SUPPLY_MASTER).aggregate(lotAggregation).toArray();
            const supplierAggregation = [
                { $match: { workOrderNo: workOrderNo } },
                { $project: { _id: 0, itemQuantity: 1 } }
            ]
            const supplierResult = await dbo.collection(collection.SUPPLIER_MASTER).aggregate(supplierAggregation).toArray();
            const lotResult = await awaitLotResult;
            const response = {
                availableCrateQuantity: lotResult[0] ? supplierResult[0].itemQuantity - lotResult[0].totalQuantity : supplierResult[0].itemQuantity
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
exports.getSupplyList = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            const aggregation = [
                { $project: { _id: 0 } },
                { $sort: { lotNo: -1 } }
            ]
            const result = await  dbo.collection(collection.SUPPLY_MASTER).aggregate(aggregation).toArray();
            // result.forEach(e => {
            //     if(!this.districtList.some(d => d.districtCode === e.districtCode) ) {
            //       this.districtList.push({districtCode: e.districtCode, districtName: e.districtName})
            //     }
            // });
            resolve(result);
            db.close();
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    })
}
// async function test() {
//     try {
//         const db = await mongoClient.connect(url);
//         var dbo = db.db(DB);
//         const aggregation = [
//             { $project: { _id: 0, lotNo: 1, area: 1, blocksLength: { $size: "$area" } } },
//             { $sort: { lotNo: -1 } }
//         ]
//         const result = await  dbo.collection(collection.SUPPLY_MASTER).aggregate(aggregation).toArray();
//         result.forEach(e => {
//             let distList = [];
//             e.area.forEach(area => {
//                     if(!distList.some(d => d.districtCode === area.districtCode) ) {
//                         distList.push({districtCode: area.districtCode, districtName: area.districtName})
//                     }
//             })
//             e.noOfDistricts = distList.length; 
//         });
//         // console.log(result);
//         db.close();
//     }
//     catch (e) {
//         console.error(e);
//         // reject(e);
//     }
// }
// test();
exports.getSupplierDetailsByWONo = ({ woNo }) => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            const aggregation = [
                { $match: { workOrderNo: woNo } },
                { $project: { _id: 0 } }
            ]
            const result = await dbo.collection(collection.SUPPLIER_MASTER).aggregate(aggregation).toArray();
            resolve(result[0]);
            db.close();
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    })
}