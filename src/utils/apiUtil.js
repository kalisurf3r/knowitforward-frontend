const API_PREFIX = "http://localhost:3004/";

export const login = async (userObj) => {
    console.log("In login got user obj as: ", userObj);
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


export const register = async (dataObj) => {
    console.log("In register got data obj as: ", dataObj);
    const url = API_PREFIX + "api/user";
    console.log("Register url: ", url);
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(dataObj),
        headers: {
            "Content-Type": "application/json",
        }
    });

    console.log("got back response from register api call as: ", response);
    return response.json();
};

export const postService = async (serviceObj, token) => {
    console.log("In postService got service obj as: ", serviceObj);
    const url = API_PREFIX + "api/services";
    console.log("Post service url: ", url);
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(serviceObj),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    console.log("got back response from postService api call as: ", response);
    return response.json();
}

// api GET /api/services
export const getServicesWithTokn = async (token) => {
    console.log("Quering for all services");
    const url = API_PREFIX + "api/services";
    console.log("services url: ", url);
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    console.log("got back response from getServices api call as: ", response);
    return response.json();
};

// api GET /api/services
export const getServices = async () => {
    console.log("Quering for all services");
    const url = API_PREFIX + "api/services";
    console.log("services url: ", url);
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    console.log("got back response from getServices api call as: ", response);
    return response.json();
};


// api GET /api/charities
export const getCharities = async () => {
    console.log("Quering for all charities");
    const url = API_PREFIX + "api/charities";
    console.log("charities url: ", url);
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    console.log("got back response from getCharities api call as: ", response);
    return response.json();
};

// api GET /api/categories
export const getCategories = async () => {
    console.log("Quering for all categories");
    const url = API_PREFIX + "api/categories";
    console.log("categories url: ", url);
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    console.log("got back response from getCategories api call as: ", response);
    return response.json();
};

// api GET /api/user/:id
export const getUserProfileDetails = async (userId, token) => {
    console.log("Quering for all user details with id: " + userId);
    const url = API_PREFIX + `api/user/:${userId}`;
    console.log("user profile url: ", url);
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });

    console.log("got back response from getUserProfileDetails api call as: ", response);
    return response.json();
};


//--------------- Loader functions --------------

export const loadAllData = async () => {
    let response = {};
    const serviceData = await getServices();
    const charitiesData = await getCharities();
    const categoriesData = await getCategories();
    response["services"] = serviceData;
    response["charities"] = charitiesData;
    response["categories"] = categoriesData;
    console.log("Response data: ", response);
    return response;
}


export const loadServicesAndCharities = async () => {
    let response = {};
    const serviceData = await getServices();
    const charitiesData = await getCharities();
    response["services"] = serviceData;
    response["charities"] = charitiesData;
    console.log("Response data: ", response);
    return response;
}

export const loadCategoriesAndCharities = async () => {
    let response = {};
    const charitiesData = await getCharities();
    const categoriesData = await getCategories();
    response["categories"] = categoriesData;
    response["charities"] = charitiesData;
    console.log("Response data: ", response);
    return response;
}

