"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBConfig = void 0;
class MongoDBConfig {
    constructor() {
    }
}
exports.MongoDBConfig = MongoDBConfig;
_a = MongoDBConfig;
MongoDBConfig.CLUSTER = "jesusdb-cluster.d4veouh.mongodb.net";
MongoDBConfig.USER = "markesiano";
MongoDBConfig.PASSWORD = "markesiano123";
MongoDBConfig.APPNAME = "JesusDB-Cluster";
MongoDBConfig.CONFIG = "retryWrites=true&w=majority&appName=" + _a.APPNAME;
