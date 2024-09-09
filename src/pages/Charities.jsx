import "./Charities.css";
import CharityCard from "../components/CharityCard";
import { getCharities } from "../utils/apiUtil";
import { useEffect, useState } from "react";

export default function Charities(props) {

  const [charities, setCharities] = useState([]);
  
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
                        charityDesc: charity.charityDesc,
                        wallet: charity.wallet,
                        logoImgUrl: charity.logoImgUrl,
                        websiteUrl: charity.websiteUrl,
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
    charityFetch();
  }, []);


  return (
    <>
      <div className="charities-container">
        <div className="img-scale">
          <img className="charity-img" src="/hands.png" alt="hands" />
        </div>
        <div className="charity-header">
          <h2>Charities</h2>
          <p className="header-text">
            With <span className="fw-semibold">KnowItForward</span> you can support the charities that are important
            to you, simply by donating your time doing the things you do best.
          </p>
        </div>
      </div>

        <div className="row charity-cards" style={{ marginTop: "2vh" }}>
        {charities.map((charity) => (
          <div className="col-12 col-xxl-3 col-md-6 col-lg-4  col-sm-12 mb-4" key={charity.id}>
            <CharityCard charity={charity}/>
          </div>
        ))}
      </div>
    </>
  );
}
