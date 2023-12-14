import User from "../models/userModel.js"

class UserMongo {
    
    async login(email, password){
        try {
            if(email==="" || password === ""){
                throw new Error(`All fields are required`);
            }
            
            const userFound = await User.findOne({email, password});
            if(!userFound){
                throw new Error(`User ${email} Not Found!`);
            }

            return userFound;
        } catch (error) {
            throw new Error(error);
        }
    }

    async register(name, email, password){
        try {
            if(name==="" || email==="" || password === ""){
                throw new Error(`All fields are required`);
            }
            
            const existsUser = await User.findOne({email});
            if(existsUser){
                throw new Error(`User ${email} duplicate!`);
            }

            const data = {
                name, 
                email, 
                password
            }
            const user = new User(data);
            await user.save();
        } catch (error) {
            throw new Error(error);
        }   
    }
}

export default UserMongo;