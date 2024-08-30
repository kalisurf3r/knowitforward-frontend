import "./charities.css";
import CharityCard from "../components/CharityCard";

export default function Charities() {
  const imgStyle = {
    width: "250px",
    height: "200px",
  };

  const imgScale = {
    position: "relative",
    top: "50px",
    left: "30px",
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "70px",
  };

  return (
    <>
      <div style={containerStyle}>
        <div style={imgScale}>
          <img style={imgStyle} src="/hands.png" alt="hands" />
        </div>
        <div className="text-center">
          <h3 >Charities</h3>
          <p style={{marginRight:"10px"}}>
            With <span className="fw-semibold">KnowItForward</span> you can support the charities that are important
            to you, simply by donating your time doing the things you do best.
          </p>
        </div>
      </div>

      <div className="row" style={{marginTop: "85px"}} >
                <div className="col-md-4 mb-3">
                    <CharityCard />
                </div>
                <div className="col-md-4 mb-3">
                    <CharityCard />
                </div>
                <div className="col-md-4 mb-3">
                    <CharityCard />
                </div>
                <div className="col-md-4 mb-3">
                    <CharityCard />
                </div>
                <div className="col-md-4 mb-3">
                    <CharityCard />
                </div>
                <div className="col-md-4 mb-3">
                    <CharityCard />
                </div>
            </div>

            
    </>
  );
}
