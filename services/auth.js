import User from "../models/User.js";

export const validateRegistration = async (username, password, role) => {
    if (!username || !password || !role) {
        throw new Error('Missing credentials.')
    }
    else {
        if (await User.findOne(username === username )) {
            console.log('Username already exists')
        }
    }
};

export const validateLogin = async (username, password, role) => {
    if(!username || !password) {
        return {
            success: false,
            message: "username and password are required"
        }
    }
    const user = await User.findOne({ username }) 
    if (!user) {
        return {
            success: false,
            message: "user not found"
        }
    }
    if (user.password !== password) {
        return {
            success: false,
            message: "invalid credentials"
        }
    }

    return {
        success: true,
        message: `välkommen ${user.username}du är nu inloggad!`,
        user : username.user
    }

}



/* {
  "username" : <username>,
  "password" : <password>
} */
