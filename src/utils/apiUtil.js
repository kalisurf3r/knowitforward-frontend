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

const categoryFetch = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No JWT token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:3004/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data);

        if (data) {
          const mappedData = data.data.map((category) => {
            return {
              id: category.id,
              categoryName: category.categoryName,
            };
          });
          setCategories(mappedData);
        } else {
          console.error("Expected an array but got:", data);
        }
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  const charityFetch = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No JWT token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:3004/api/charities", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data);

        if (data) {
          const mappedData = data.data.map((charity) => {
            return {
              id: charity.id,
              charityName: charity.charityName,
              
            };
          });
          setCharities(mappedData);
        } else {
          console.error("Expected an array but got:", data);
        }
      } else {
        console.error("Failed to fetch charities");
      }
    } catch (error) {
      console.error("Error fetching charities:", error);
    }
  };

  