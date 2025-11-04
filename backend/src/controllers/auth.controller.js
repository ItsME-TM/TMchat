export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try{
        if(!fullName || !email || !password){
            return res.status(400).json(
                {message: "Please provide all required fields: fullName, email, password"}
            );
        }
        if (password.length < 6){
            return res.status(400).json(
                {message: "Password must be at least 6 characters long"}
            );
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json(
                {message: "Please provide a valid email address"}
            );
        }

    }catch(error){

    }

    res.send("Signup controller");
} 