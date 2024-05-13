export class ApiKey {
    
    // Create a colection of keys, where each row has key value, role, and count of requests

    private static keys = [
        {
            key: "ApiKeyTestJJJAdminsIlimited",
            role: "admin",
            count: 0
        },
        {
            key: "123456789",
            role: "User",
            count: 0
        },
        {
            key: "987654321",
            role: "User",
            count: 0
        }
    ];

    public static validateKey(key: string): String {
        const keyFound = this.keys.find(k => k.key === key);
        if(keyFound){
            if(keyFound.role === "admin") return "admin";
            else if (keyFound.count <= 30){
                keyFound.count++;
                return "user,"+ (30 - keyFound.count);
            }
            else return "limit reached";
        }
        return "invalid key";
    }

}