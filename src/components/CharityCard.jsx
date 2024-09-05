import "./CharityCard.css";


export default function CharityCard({ charity }) {
  // const charityLogoStyle = {
  //   width: "150px",
  //   height: "120px",
  //   padding: "0px",
  //   marginTop: "10px",
  // };

  // const cardStyle = {
  //   width: "450px",
  //   margin: "10px auto",
  //   boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)",
  //   display: "flex",
  //   flexDirection: "column",
  //   minHeight: "300px",
  //   padding: "10px",
  //   borderRadius: "8px",
  // };

  // const donatedStyle = {
  //   backgroundColor: "#FFBC2C",
  //   boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  //   padding: "6px",
  //   borderRadius: "5px",
  // };

  // const cardUrlStyle = {
  //   textDecoration: "none",
  //   color: "black",
  // };

  // const logoContainerStyle = {
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  // };



  return (
    // <a className='card-url-style' href={charity.websiteUrl} target="_blank">
    //   <div className="card" className='charity-card-style'>
    //     <div className="card-body">
    //       <div className='logo-container-style'>
    //         <img
    //           className="charity-logo-style"
    //           src={charity.logoImgUrl}
    //           alt="Charity Logo"
    //         />
    //       </div>
    //       <p className="card-text text-center">{charity.charityDesc}</p>
    //     </div>
    //     <h6 className="text-center donated-style">
    //       Total Donated:
    //       <span style={{ backgroundColor: "#FFBC2C" }}>
    //         <h6>{charity.wallet}</h6>
    //       </span>
    //     </h6>
       
    //   </div>
    // </a>

    <a className='card-url-style' href={charity.websiteUrl} target="_blank">
      <div className="charity-card">
        <div className="charity-card-body">
          <div className='logo-container-style'>
            <img
              className="charity-logo-style"
              src={charity.logoImgUrl}
              alt="Charity Logo"
            />
          </div>
          <p className="charity-card-text">{charity.charityDesc}</p>
          <h6 className="donated-style">
          Total Donated:
          <span className="total-donations">
            <h6>{'$'}{charity.wallet}</h6>
          </span>
          </h6>
        </div>
      </div>
    </a>

  );
}
