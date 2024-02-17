import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const navigateToGame = () => {
    navigate("/game");
  };
  return (
    <div>
      <article className="hero-image">
        <aside className="hero-image-opacity">
          <div className="hero-image-content">
            <h2 className="hero-image-title">Bienvenid@s</h2>
            <button onClick={navigateToGame} className="play-button">
              Jugar
            </button>
          </div>
        </aside>
          <img src="images/corner.png" className="corner" alt="corner" />
      </article>
    </div>
  );
};

export default Home;
