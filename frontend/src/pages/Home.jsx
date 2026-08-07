import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="hero">
        <p className="kicker">Touring management</p>
        <h1>YourTour</h1>
        <p className="byline">
          by <span className="j">J</span> &amp; <span className="l">L</span>{" "}
          &amp; <span className="b">B</span>
        </p>
        <p className="lede">
          Tour management for artists and their managers. Managers run the{" "}
          <em>roster, venues, and tours</em> — artists send suggestions from the
          road. One source of truth, on and off the stage.
        </p>
      </div>

      <div className="entry-grid">
        <Link to="/venues" className="entry">
          <div className="num">01</div>
          <div className="name">Venues</div>
          <p className="desc">Book and manage the rooms.</p>
        </Link>
        <Link to="/tours" className="entry">
          <div className="num">02</div>
          <div className="name">Tours</div>
          <p className="desc">Schedule dates and routes.</p>
        </Link>
        <Link to="/suggestions" className="entry">
          <div className="num">03</div>
          <div className="name">Suggestions</div>
          <p className="desc">Artists pitch, managers approve.</p>
        </Link>
        <Link to="/login" className="entry">
          <div className="num">04</div>
          <div className="name">Sign in</div>
          <p className="desc">Manager or artist access.</p>
        </Link>
      </div>

      <p className="dedication">
        Built for Lenny &hearts; Jesula <span className="heart">&hearts;</span>{" "}
        Bazelais
      </p>
    </div>
  );
}

export default Home;
