import UserMongo from "./user.controller.mdb.js";

const userMongo = new UserMongo();

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await userMongo.login(email, password);
        req.session.user = user;
        return res.status(200).json({message: `User ok!`});   
    }catch(error){
        res.status(500).json({error: error.message});   
    }
}

const register = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        await userMongo.register(name, email, password);
        return res.status(200).json({message: `User ${email} registered sussefuly`});   
    }catch(error){
        res.status(500).json({error: error.message});   
    }
}

export {
    login,
    register
}