const mongoClient = require('mongodb').MongoClient;
const { dbConfig, collection } = require('../CONFIG/config');
const url = dbConfig.MONGO_URL;
const DB = dbConfig.DB_NAME;
const common = require('./commonBal');
exports.getFinYearWiseWorkOrderList = ({ userCode }, { finYear }) => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            if(!finYear) {
                finYear = await common.getCurrentFinYear();
            }
            const aggregation = [
                { $match: { finYear: finYear, "area.status": 'Confirm', "area.blockCode": userCode } },
                { $unwind: "$area" },
                { $match: { "area.status": 'Confirm', "area.blockCode": userCode } },
                { $group: { _id: { "workOrderNo": "$workOrderNo" } } },
                { $project: { _id: 0, workOrderNo: "$_id.workOrderNo" } }
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
exports.getFinYearWiseLotList = ({ userCode }, { finYear }) => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            if(!finYear) {
                finYear = await common.getCurrentFinYear();
            }
            const aggregation = [
                { $match: { status: 'Transit', finYear: finYear, "area.blockCode": userCode, "area.status": 'Transit' } },
                { $unwind: "$area" },
                { $match: { "area.blockCode": userCode, "area.status": 'Transit' } },
                { $project: { _id: 0, lotNo: 1, deliveryDate: 1, invoiceNo: 1, wayBillNo: 1, firmName: 1, supplierMobileNo: 1, vehicleNo: 1, vehicleName: 1, workOrderNo: 1, totalQuantity: "$area.crateQuantity" } }
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
exports.getFinYearWiseReceivedCrateList = ({ userCode }, { finYear }) => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            if(!finYear) {
                finYear = await common.getCurrentFinYear();
            }
            const aggregation = [
                { $match: { finYear: finYear, "area.blockCode": userCode, $or: [ { "area.status": 'Received' }, { "area.status": 'Confirm' } ] } },
                { $unwind: "$area" },
                { $match: { "area.blockCode": userCode, $or: [ { "area.status": 'Received' }, { "area.status": 'Confirm' } ] } },
                { $project: { _id: 0, lotNo: 1, receivedOn: "$area.receivedOn", firmName: 1, supplierMobileNo: 1, workOrderNo: 1, totalQuantity: "$area.crateQuantity", receivedQuantity: "$area.receivedQuantity", remark: "$area.remark", status: "$area.status" } }
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
exports.receiveCreatesFromLot = ({ lotNo, userCode }, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            const dbo = db.db(DB);
            let mArray = { arrayFilters: [{ "e1.blockCode": userCode, "e1.status": "Transit" }] };
            const newvalues = { $set: { "area.$[e1].receivedOn": new Date(), "area.$[e1].status": 'Received', "area.$[e1].receivedQuantity": +data.receivedQuantity, "area.$[e1].remark": data.remark } };
            await  dbo.collection(collection.SUPPLY_MASTER).updateOne({ lotNo: lotNo }, newvalues, mArray);
            const response = {
                message: "Received detail send to supplier and admin successfully."
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
//FIXME: CALL ASYNCHROUSLY to databse
exports.getWOWiseQuantityDetail = ({ userCode, woNo }) => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            const aggregation = [
                { $match: { "area.blockCode": userCode, workOrderNo: woNo, "area.status": 'Confirm' } },
                { $unwind: "$area" },
                { $match: { "area.blockCode": userCode, "area.status": 'Confirm' } },
                { $group: { _id: { workOrderNo: "$workOrderNo" }, receivedQuantity: { $sum: "$area.receivedQuantity" } } },
                { $project: { _id: 0 } }
            ]
            const result = await dbo.collection(collection.SUPPLY_MASTER).aggregate(aggregation).toArray();

            const totalAggregation = [
                { $match: { "area.blockCode": userCode, "area.status": 'Confirm' } },
                { $unwind: "$area" },
                { $match: { "area.blockCode": userCode, "area.status": 'Confirm' } },
                { $group: { _id: { blockCode: "$blockCode" }, totalReceivedQuantity: { $sum: "$area.receivedQuantity" } } },
                { $project: { _id: 0 } }
            ]
            const totalResult = await dbo.collection(collection.SUPPLY_MASTER).aggregate(totalAggregation).toArray();
            
            const distrbutedAggregation = [
                { $match: { "blockCode": userCode, workOrderNo: woNo } },
                { $group: { _id: { blockCode: userCode, workOrderNo: woNo }, distrbutedQuantity: { $sum: "$noOfCrates" } } },
                { $project: { _id: 0 } }
            ]
            const distrbutedResult = await dbo.collection(collection.DISTRIBUTION).aggregate(distrbutedAggregation).toArray();
            result[0].distrbutedQuantity = distrbutedResult[0] ? distrbutedResult[0].distrbutedQuantity : 0;
            result[0].totalReceivedQuantity = totalResult[0] ? totalResult[0].totalReceivedQuantity : 0;
            resolve(result[0]);
            db.close();
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    })
}
exports.farmerIsReceiveCrate = ({ farmerId }) => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            const aggregation = [
                { $match: { farmerId: farmerId } },
                { $project: { _id: 0, farmerId: 1 } }
            ]
            const result = await dbo.collection(collection.DISTRIBUTION).aggregate(aggregation).toArray();
            let response = {
                status: result.length > 0 ? true : false
            }
            resolve(response);
            db.close();
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    })
}
exports.getWSHGList = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            const aggregation = [
                { $project: { _id: 0 } }
            ]
            const result = await dbo.collection(collection.WSHG_MASTER).aggregate(aggregation).toArray();
            resolve(result);
            db.close();
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    })
}
exports.getPreDistNameOfFarmerID = ( { districtCode } ) => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            const aggregation = [
                { $match: { districtCode: districtCode } },
                { $project: { _id: 0, distName: { $substr:["$pdsDistrictName", 0, 3] } } }
            ]
            const result = await dbo.collection(collection.DISTRICT_MASTER).aggregate(aggregation).toArray();
            resolve(result[0]);
            db.close();
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    })
}
exports.addCrateDistributionDetail = (data) => {
    return new Promise( async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            const response = {};
            if(data.farmerGender === 'Female') {
                const aggregation = [
                    { $match: { farmerId: data.farmerId } },
                    { $project: { _id: 0, farmerId: 1 } }
                ]
                const result = await dbo.collection(collection.DISTRIBUTION).aggregate(aggregation).toArray();
                let status = result.length > 0 ? true : false
                if(status) {
                        response.message = "This farmer already received the crates";
                        response.success = 0;
                } else {
                        data.distributedOn = new Date();
                        await dbo.collection(collection.DISTRIBUTION).insertOne(data);
                        response.message = "Distribution detail added successfully";
                        response.success = 1;
                }
            } else {
                response.message = "Only Female farmers are allowed to receive crates";
                response.success = 0;
            }
            resolve(response);
            db.close();
        } catch (e) {
            console.error(e);
            reject(e);
        }
    })
}
// FIXME:ADD USERCODE WISE FETCH - SHO WISE
exports.getDistributedCrateList = ( { finYear } ) => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            if(!finYear) {
                finYear = await common.getCurrentFinYear();
            }
            const aggregation = [
                { $match: { finYear: finYear } },
                { $project: { _id: 0 } },
                { $sort: { distributedOn: -1 } }
            ]
            const result = await dbo.collection(collection.DISTRIBUTION).aggregate(aggregation).toArray();
            resolve(result);
            db.close();
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    })
}
