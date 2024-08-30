export default function CharityCard() {
    const charityLogoStyle = {
        width: "120px",
        height: "100px"
        }

        const cardStyle = {
            width: "300px", 
            margin: "0 auto",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        };

        const donatedStyle = {
            backgroundColor: '#FFBC2C',
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
        }


    

  return (
    <div className="card"  style={cardStyle}>
      <div className="card-body">
        <div className="d-flex justify-content-center">
        <img style={charityLogoStyle} src="unicef.png" alt="Unicef"/>  
        </div>
        <p className="card-text text-center">Insert Card Desc</p>
        <h6 style={donatedStyle} className="text-center">Total Donated:<span> Insert $$$ Here</span></h6>
      </div>
    </div>
  )
}

//* remember to set props for: logo, description, and total donated