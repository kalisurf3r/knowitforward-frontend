import "./Volunteer.css";
import { getCategories, getCharities, postService } from "../utils/apiUtil";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

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
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  
  let userId;
  const token = localStorage.getItem("token");

  const verifyJWT = async () => {
    if (!token) {
      console.error("No JWT token found");
      return false;
    }

    const url_prefix = "https://knowitforward.onrender.com/";
    // const url_prefix = "http://localhost:3004/"

    const response = await fetch(url_prefix + "api/verifyToken", {
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
       
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id; 
    } catch (error) {
      console.error("Failed to decode JWT token", error);
      return false;
    }
        await categoryFetch();
        await charityFetch();
      }
    };
    initialize();
  }, []);

  const handleVolunteerSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    let serviceProviderId = null;
    if (token) {
      const decodedToken = jwtDecode(token);
      serviceProviderId = decodedToken ? decodedToken.id : null;
    }
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
      ServiceProviderId: serviceProviderId
    };
console.log('req.body', data);
    try {
      console.log(data);
      const response = await postService(data, token);

      console.log('after');
      if (response.status === 200) {

          console.log("Volunteering successful:", data);
          setMessage("Submission Successful");
          setIsError(false);

          setTitle("");
          setDescription("");
          setPrice("");
          setOfferEndDate("");
          setScheduledDate("");
          setSelectedCategory("");
          setSelectedCharity("");

          
          setTimeout(() => {
            navigate('/services'); 
          }, 2000);

        console.log("Volunteering successful:", data);
        setMessage("Submission Successful");
        setIsError(false);

        setTitle("");
        setDescription("");
        setPrice("");
        setOfferEndDate("");
        setScheduledDate("");
        setSelectedCategory("");
        setSelectedCharity("");

      } else {
        console.error("Failed to volunteer");
        setMessage("Submission Failed");
        setIsError(true);
      }
    } catch (error) {
      console.error("Error volunteering:", error);
      setMessage("Submission Failed");
      setIsError(true);
    }

    setIsMessageVisible(true);
  }

  return (
    <>
      <div className='volunteer-container'>
        <img className='volunteer-img' src="volunteer.png" alt="Volunteer" />
        <div className="volunteer-header">
          <h2>Volunteer</h2>
          <p className="volunteer-text">
            With <span className="fw-semibold">KnowItForward</span> you can
            donate your time by offering a service that you love and support
            your favorite charities at the same time.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-center">
          Tell us more about the service you're donating
        </h3>
      </div>

      <div className="volunteer-form-container">
        <form className="form-style" onSubmit={handleVolunteerSubmit}>
          <div className="form-group-style">
            <label className="label-style" htmlFor="title">
              Title:
            </label>
            <input
              className="input-style"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="title"
              name="title"
              placeholder="title"
            />
          </div>
          <div className="form-group-style">
            <label className="label-style" htmlFor="description">
              Description:
            </label>
            <textarea
              className="text-area-style"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="description"
              id="description"
              name="description"
              placeholder="description"
            />
          </div>
          <div className="form-group-style">
            <label className="label-style" htmlFor="price">
              Price:
            </label>
            <input
              className="input2-style"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              id="price"
              name="price"
              placeholder="price"
            />
          </div>
          <div className="form-group-style">
            <label className="label-style" htmlFor="offer-end-date">
              Offer End Date:
            </label>
            <input
              className="input2-style"
              value={offerEndDate}
              onChange={(e) => setOfferEndDate(e.target.value)}
              type="date"
              id="offer-end-date"
              name="offer-end-date"
              placeholder="end_date"
            />
          </div>
          <div className="form-group-style">
            <label className="label-style" htmlFor="scheduled-date">
              Scheduled Date:
            </label>
            <input
              className="input2-style"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              type="date"
              id="scheduled-date"
              name="scheduled-date"
              placeholder="end_date"
            />
          </div>
          <div className="form-group-style">
            <label className="label-style" htmlFor="charity">
              Charity:
            </label>
            <select id="charity" name="charity" onChange={(e) => setSelectedCharity(charities[e.target.value])}>
              <option value={selectedCharity}>Select a charity</option>
              {charities.map((charity, index) => (
                <option key={charity.id} value={index}>{charity.charityName}</option>
              ))}
            </select>
          </div>
          <div className="form-group-style">
            <label className="label-style" htmlFor="category">
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
          <div className="button-container">
            <button type="submit" className="button-style">
              <span className="fw-semibold">Volunteer</span>
            </button>
          </div>
        </form>
        {isMessageVisible && (
          <div style={{ color: isError ? 'red' : 'green', textAlign: 'center', marginTop: '20px' }}>
            {message}
          </div>
        )}
      </div>
    </>
  );
}
