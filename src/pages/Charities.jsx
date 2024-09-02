import "./charities.css";
import CharityCard from "../components/CharityCard";

export default function Charities() {


  return (
    <>
      <div className="container-style">
        <div className="img-scale">
          <img className="img-style" src="/hands.png" alt="hands" />
        </div>
        <div className="text-center">
          <h1>Charities</h1>
          <p className="header-text" style={{ marginRight: "10px" }}>
            With <span className="fw-semibold">KnowItForward</span> you can support the charities that are important
            to you, simply by donating your time doing the things you do best.
          </p>
        </div>
      </div>

      <div className="row" style={{ marginTop: "85px" }} >
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
