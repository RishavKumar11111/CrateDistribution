const mongoClient = require('mongodb').MongoClient;
const { dbConfig, collection } = require('../CONFIG/config');
const url = dbConfig.MONGO_URL;
const DB = dbConfig.DB_NAME;

exports.addSupplierDetails = (data) => {
    return new Promise( async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            data.addedOn = new Date();
            data.userId = data.emailId;
            const user = {
                userId: data.emailId,
                role: 'SUPPLIER',
                password:'Test@1234',
                workOrderNo: data.workOrderNo,
                userName: data.firmName,
                createdOn: new Date()
                
            }
            await dbo.collection(collection.SUPPLIER_MASTER).insertOne(data);
            await dbo.collection(collection.USERS).insertOne(user);
            let response = {
                message: "supplier details successfully added"
            }
            resolve(response);
            db.close();
        } catch (e) {
            console.error(e);
            reject(e);
        }
    })
}
exports.getSupplierlist = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            const aggregation = [
                { $project: { _id: 0 } },
                { $sort: { addedOn: -1 } }
            ]
            const result = await dbo.collection(collection.SUPPLIER_MASTER).aggregate(aggregation).toArray();
            result.forEach( res => {
                let districtList = [];
                res.areaOfOperation.forEach(e => {
                    if(!districtList.some(d => d.districtCode === e.districtCode) ) {
                      districtList.push({districtCode: e.districtCode, districtName: e.districtName})
                    }
                });
                res.blockListLength = res.areaOfOperation.length;
                delete res['areaOfOperation']
                res.districtListLength = districtList.length;
            } )            
            resolve(result);
            db.close();
        } catch (e) {
            console.error(e);
            reject(e);
        }
    })
}
exports.deletesupplierData = ({ workOrderNo }) => {
    return new Promise(async(resolve, reject) => {
        try{
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            const condition = { workOrderNo: workOrderNo };
            await dbo.collection(collection.SUPPLIER_MASTER).deleteOne(condition)
            let response = {
                message: "supplier successfully removed"
            }
            resolve(response);
            db.close();
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    });
}
//FIXME: UPDATE FIRM_NAME/USER_NAME IN USERS COLLECTION
exports.updatesupplierDetail=(firmID, suplierBody)=> {
    return new Promise(async(resolve, reject) => {
        try{
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            const res = await dbo.collection(collection.SUPPLIER_MASTER).updateOne({ firmID: firmID }, { $set: suplierBody });
            await dbo.collection(collection.USERS).updateOne({ userId: e.userId }, { $set: { userName: suplierBody.firmName } })
            let response = {
                message: "suppliers details successfully added"
            }
            resolve(response);
            db.close();
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    });
}
exports.getDistrictList = () => {
    return new Promise(async(resolve, reject) => {
try
{
    const db = await mongoClient.connect(url);
    var dbo = db.db(DB); 
    const res = await dbo.collection(collection.DISTRICT_MASTER).find({}).toArray()
    let response = {
        message: "suppliers details successfully deleted"
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
exports.getBlockList = (id) => {
    return new Promise(async(resolve, reject) => {
try
{
    const db = await mongoClient.connect(url);
    var dbo = db.db(DB);  
    const res = await dbo.collection(collection.BLOCK_MASTER).find({ district_id: id }).toArray()
    let response = {
        message: "suppliers details successfully deleted"
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
exports.supply = (data) => {
    return new Promise(async(resolve, reject) => {
try
{
    const db = await mongoClient.connect(url);
    var dbo = db.db(DB);  
    const res = await  dbo.collection(collection.SUPPLY_MASTER).insertOne(data)
    let response = {
        message: "suppliers details successfully deleted"
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
exports.getSupplylist= () => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);  
            const res = await  dbo.collection(collection.SUPPLY_MASTER).find({}).toArray();
            let response = {
                message: "suppliers details successfully deleted"
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
            result.forEach(e => {
                let prevDate = new Date(e.receivedOn).getTime()
                let toDay = new Date().getTime();
                let difference = (toDay - prevDate) / (1000 * 3600 * 24);
                e.daysGap = Math.floor(difference);
            })
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
            const newvalues = { $set: { "area.$[e1].confirmedOn": new Date(), "area.$[e1].status": 'Confirm', "area.$[e1].confirmBy": 'ADMIN' } };
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
exports.getSupplierDetails = ({ supplierId }) => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            const aggregation = [
                { $match: { userId: supplierId } },
                { $project: { _id: 0 } }
            ]
            const result = await dbo.collection(collection.SUPPLIER_MASTER).aggregate(aggregation).toArray();
            resolve(result[0]);
            db.close();
        } catch (e) {
            console.error(e);
            reject(e);
        }
    })
}
exports.updateSupplierDetails = ({ supplierId }, data) => {
    return new Promise( async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            data.updateOn = new Date();
            data.userId = data.emailId;
            const user = {
                userId: data.emailId,
                workOrderNo: data.workOrderNo,
                firmName: data.firmName,
                updateOn: new Date()                
            }
            await dbo.collection(collection.SUPPLIER_MASTER).updateOne({ userId: supplierId }, { $set: data });
            await dbo.collection(collection.USERS).updateOne({userId: supplierId}, {$set: user});
            let response = {
                message: "supplier details successfully updated"
            }
            resolve(response);
            db.close();
        } catch (e) {
            console.error(e);
            reject(e);
        }
    })
}
exports.checkWONoDuplicate = ({ woNo }) => {
    return new Promise(async(resolve, reject) => {
        try {
            const db = await mongoClient.connect(url);
            var dbo = db.db(DB);
            const aggregation = [
                { $match: { workOrderNo: woNo } },
                { $project: { _id: 0 } }
            ]
            const result = await dbo.collection(collection.SUPPLIER_MASTER).aggregate(aggregation).toArray();
            let response =  {
                status: result.length > 0 ? true : false
            }
            resolve(response);
            db.close();
        } catch (e) {
            console.error(e);
            reject(e);
        }
    })
}