import mongoose from "mongoose";


type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

//database is always in another continent
//database takes time to fetch the data
//we always used to use async while writing the function
// a database connection may fail also    
// a database value will always written the promise 

export async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to database")
        return
    }

    try{
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})
        
        connection.isConnected = db.connection.readyState
        
        console.log("DB connected Successfully")

    } catch (error){
        
        console.log("database connection failed", error);
        
        process.exit(1)
    }
}