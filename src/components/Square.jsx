import Card from "./Card";

const Square = ({ cards, confirmMovement, changeValues, defaultImage }) => {
  return (
    <div className="square">
      {cards.map((card, index) => {
        return (
          <Card
            key={index}
            confirmMovement={confirmMovement}
            changeValues={changeValues}
            value={card.value}
            reverseImage={card.reverseImage}
            defaultImage={defaultImage}
          />
        );
      })}
    </div>
  );
};

export default Square;
