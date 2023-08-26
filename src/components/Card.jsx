import { useRef } from "react";

const Card = ({ value, changeValues, defaultImage }) => {
  let refImage = useRef(null);
  let refButton = useRef(null);
  const handleClick = () => {
    changeValues(value, refButton.current, refImage.current);
  };

  return (
    <button className="card" onClick={handleClick} ref={refButton}>
      <img src={defaultImage} alt="" ref={refImage} />
    </button>
  );
};

export default Card;
