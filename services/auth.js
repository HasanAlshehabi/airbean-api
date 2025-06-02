import User from "../models/User";

const validateRegistration = async (username, password, role) => {
    if (!username || !password || !role) {
        throw new Error('Missing credentials.')
    }
    else {
        if (await User.findOne(username === username )) {
            console.log('Username already exists')
        }
    }
};

export default validateRegistration;

/* {
  "username" : <username>,
  "password" : <password>
} */
