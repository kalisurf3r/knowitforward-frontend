import "./volunteer.css";
import { getCategories, getCharities, postService } from "../utils/apiUtil";
import { useState, useEffect } from "react";

export default function Volunteer() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offerEndDate, setOfferEndDate] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [charities, setCharities] = useState([]);
  const [selectedCharity, setSelectedCharity] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const verifyJWT = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No JWT token found");
      return false;
    }

    const response = await fetch("http://localhost:3004/api/verifyToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setIsVerified(data.isValid);
      return data.isValid;
    } else {
      console.error("JWT verification failed");
      return false;
    }
  };

  const categoryFetch = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No JWT token found");
      return;
    }

    try {
        
        const response = await getCategories();
        
        if (response.status === 200) {
            // const data = await response.json();
            console.log("Fetched data:", response);

            if (response) {
                const mappedData = response.data.map((category) => {
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
        
        const response = await getCharities();
        
        if (response.status === 200) {
            // const data = await response.json();
            console.log("Fetched data:", response);

            if (response) {
                const mappedData = response.data.map((charity) => {
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

  useEffect(() => {
    const initialize = async () => {
      const isTokenValid = await verifyJWT();
      if (isTokenValid) {
        await categoryFetch();
        await charityFetch();
      }
    };
    initialize();
  }, []);

  const handleVolunteerSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No JWT token found");
      return;
    }
  
    const data = {
      title,
      description,
      basePrice: price,
      offerEndDate,
      serviceDate: scheduledDate,
      category: selectedCategory.categoryName,
      CategoryId: selectedCategory.id,
      charity: selectedCharity.charityName,
      CharityId: selectedCharity.id,
    };
  
    try {
        console.log(data);
      const response = await postService(data, token);
  
      console.log('after');
      if (response.status === 200) {
          console.log("Volunteering successful:", data);
      } else {
          console.error("Failed to volunteer");
      }
    } catch (error) {
      console.error("Error volunteering:", error);
    }
  }
  

  
  const imgStyle = {
    width: "850px",
    height: "250px",
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "40px",
    marginTop: "80px",
    marginLeft: "60px",
  };

  const textContainerStyle = {
    display: "flex",
    flexDirection: "column",
    fontFamily: "Rubik, sans-serif",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px",
    justifyContent: "center",
  };

  const formGroupStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    margin: "0",
  };

  const labelStyle = {
    width: "100px",
    textAlign: "center",
    paddingRight: "10px",
    paddingLeft: "10px",
  };

  const inputStyle = {
    flex: "1",
    borderRadius: "10px",
    border: "none",
    maxWidth: "600px",
  };

  const input2Style = {
    flex: "1",
    borderRadius: "10px",
    border: "none",
    maxWidth: "400px",
  };

  const textAreaStyle = {
    flex: "1",
    height: "100px",
    borderRadius: "10px",
    border: "none",
    maxWidth: "600px",
  };

  const buttonStyle = {
    flex: "1",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFBC2C",
    borderRadius: "10px",
    border: "none",
    maxWidth: "300px",
    padding: "10px",
  };

  return (
    <>
      <div style={containerStyle}>
        <img style={imgStyle} src="volunteer.png" alt="Volunteer" />
        <div style={textContainerStyle}>
          <h1 className="text-center">Volunteer</h1>
          <p className="text-center" style={{ marginTop: "4vh" }}>
            With <span className="fw-semibold">KnowItForward</span> you can
            donate your time by offering a service that you love and support
            your favorite charities at the same time.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-center" style={{ marginTop: "60px" }}>
          Tell us more about the service you're donating
        </h3>
      </div>

      <div className="volunteer-form">
        <form style={formStyle} onSubmit={handleVolunteerSubmit}>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="title">
              Title:
            </label>
            <input
              style={inputStyle}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="title"
              name="title"
              placeholder="title"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="description">
              Description:
            </label>
            <textarea
              style={textAreaStyle}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="description"
              id="description"
              name="description"
              placeholder="description"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="price">
              Price:
            </label>
            <input
              style={input2Style}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              type="number"
              id="price"
              name="price"
              placeholder="price"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="offer-end-date">
              Offer End Date:
            </label>
            <input
              style={input2Style}
                value={offerEndDate}
                onChange={(e) => setOfferEndDate(e.target.value)}
              type="date"
              id="offer-end-date"
              name="offer-end-date"
              placeholder="end_date"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="scheduled-date">
              Scheduled Date:
            </label>
            <input
              style={input2Style}
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
              type="date"
              id="scheduled-date"
              name="scheduled-date"
              placeholder="end_date"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="charity">
              Charity:
            </label>
            <select id="charity" name="charity" onChange={(e) => setSelectedCharity(charities[e.target.value])}>
              <option value={selectedCharity}>Select a charity</option>
              {charities.map((charity, index) => (
                <option key={charity.id} value={index}>{charity.charityName}</option>
              ))}
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="category">
              Category:
            </label>
            <select id="category" name="category" onChange={(e) => setSelectedCategory(categories[e.target.value])}>
              <option value={selectedCategory}>Select a category</option>
              {categories.map((category, index) => (
                <option key={category.id} value={index}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              marginBottom: "30px",
            }}
          >
            <button type="submit" style={buttonStyle}>
              <span className="fw-semibold">Volunteer</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
