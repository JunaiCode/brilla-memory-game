import { useNavigate } from "react-router-dom";
const CompletePage = ({ win, movements, partners }) => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <div>
      <article className="complete-page">
        <aside className="complete-page-opacity">
          <div className="complete-page-content">
            {win && (
              <h2 className="complate-page-title">
                ¡Felicidades! Completaste {partners + 1} parejas en {movements}
                movimientos.
              </h2>
            )}
            {!win && (
              <h2 className="complate-page-title">
                Oops! excediste los 16 movimientos, vuelve a intentarlo.
              </h2>
            )}
            <button onClick={navigateToHome} className="play-button">
              Jugar de nuevo
            </button>
          </div>
        </aside>
      </article>
    </div>
  );
};

export default CompletePage;
