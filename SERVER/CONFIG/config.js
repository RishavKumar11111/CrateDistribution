exports.dbConfig = {
    DB_NAME: `crateDistribution`,
    MONGO_URL: `mongodb://${process.env.MONGO_HOST || 'localhost'}:${process.env.MONGO_PORT || 27017}/`
}
exports.collection = {
    DISTRICT_MASTER: `districtMaster`,
    BLOCK_MASTER: `blockMaster`,
    USERS: `users`,
    SUPPLIER_MASTER: `supplierMaster`,
    SUPPLY_MASTER: `supplyMaster`,
    WSHG_MASTER: `WSHGMaster`,
    DISTRIBUTION: `distribution`
}