import { useNavigate } from "react-router-dom";
const Stats = ({ movements, partners }) => {
  const navigate = useNavigate();
  const backHome = () => {
    navigate("/");
  };
  return (
    <div className="stats">
      <p>
        Movimientos: {movements} Parejas: {partners}
      </p>
      <button onClick={backHome} className="restart-button">
        Reiniciar
      </button>
    </div>
  );
};

export default Stats;
