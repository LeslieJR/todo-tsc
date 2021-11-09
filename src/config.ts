export default {
    database:{
        uri: process.env.MONGODB_URI || "mongodb://localhost/todo-tsc",
        username: process.env.MONGODB_USERNAME || "",
        password: process.env.MONGODB_PASSWORD || ""
    },
    jwt: {
        secret: process.env.JWT_SECRET || "djnfdvrevsde"
    }
}