import mongoose from "mongoose"

export const connect = async () =>{

    try {
        const connect = await mongoose.connect(process.env.DB_URL)
        

    console.log(
        `Database connected`
    );
        
    } catch (error) {
        console.log(error);
        // if there is any error exit the process 
        process.exit(1);
    }
}

