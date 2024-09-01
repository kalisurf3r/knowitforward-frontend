const API_PREFIX = "http://localhost:3004/";

export const login = async (userObj) => {
    console.log("In login Got user obj as: ", userObj);
    const url = API_PREFIX + "api/user/login";
    console.log("Login url: ", url);
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json",
        }
    });

    console.log("got back response from login api call as: ", response);
    return response.json();
};

