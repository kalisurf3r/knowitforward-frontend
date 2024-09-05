import "./CharityCard.css";


export default function CharityCard({ charity }) {

  return (

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
