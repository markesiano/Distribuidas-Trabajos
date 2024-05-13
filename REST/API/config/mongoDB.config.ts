export class MongoDBConfig {
    public static readonly CLUSTER: string = "jesusdb-cluster.d4veouh.mongodb.net";
    public static readonly USER: string = "markesiano";
    public static readonly PASSWORD: string = "markesiano123";
    private static readonly APPNAME: string = "JesusDB-Cluster";
    public static readonly CONFIG: string = "retryWrites=true&w=majority&appName="+this.APPNAME;

    constructor(){
    }
}