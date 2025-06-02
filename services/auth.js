import User from "../models/User.js";

export const HTTPResponses = {
  Successful: {
    successful: true,
    statusCode: 200,
    message: "Operation was successful.",
  },
  Created: {
    successful: true,
    statusCode: 201,
    message: "User created successfully.",
  },
  MissingFields: {
    successful: false,
    statusCode: 400,
    message: "Missing required fields.",
  },
  UsernameExists: {
    successful: false,
    statusCode: 409,
    message: "Username already exists. Try another one!",
  },
};

const validateRegistration = async (user) => {
  const { username, password, role } = user;
  if (!username || !password || !role) {
    return HTTPResponses["MissingFields"];
  } else {
    if (await User.findOne({ username: username })) {
      return HTTPResponses["UsernameExists"];
    }
    else {
        return HTTPResponses["Created"]
    }
  }
};

export default validateRegistration;
