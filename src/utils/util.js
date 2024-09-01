import { jwtDecode } from "jwt-decode";

export const verifyTokenValidity = (token) => {
    if (!token) return null;

    try {
        // Decode the token (assuming it's a JWT)
        const decodedToken = jwtDecode(token);
        console.log("Decoded token value: ", decodedToken);
        const expirationTime = decodedToken.exp * 1000;

        if (Date.now() >= expirationTime) {
            localStorage.removeItem("token"); // Remove expired token
            return null;
        }

        const data = {
            id: decodedToken.id,
            username: decodedToken.username,
            token: token
        }
        // Return the username or other data stored in the token
        console.log("Returning data from verifyTokenValidity: ", data)
        return data;
    } catch (err) {
        console.error("Error while trying to decode token", err);
        localStorage.removeItem("token"); // Remove expired token
        return null;
    }
};
