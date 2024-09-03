const API_PREFIX = "http://localhost:3004/";

// api GET /api/user/login
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


//--------------- Loader functions --------------

export const loadHomePageData = async () => {
    let response = {};
    const serviceData = await getServices();
    const charitiesData = await getCharities();
    response["services"] = serviceData;
    response["charities"] = charitiesData;
    console.log("Response data: ", response);
    return response;
}