import { useEffect, useState } from "react";
import Square from "./Square";
import Stats from "./Stats";
import { useNavigate } from "react-router-dom";

const Game = ({ movements, setMovements, partners, setPartners, setWin }) => {
  const [previousValue, setPreviousValue] = useState(null); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [previousCard, setPreviousCard] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);
  const defaultImage = "./images/brilla.jpg";
  const necesaryMovements = 16;
  const necesaryPartners = 3;
  const [cards, setCards] = useState([
    {
      value: 1,
      reverseImage: "https://picsum.photos/100/100",
    },
    {
      value: 2,
      reverseImage: "https://picsum.photos/100/100",
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmMovement = (value, card, image) => {
    setMovements((prev) => prev + 1);
    if (value === previousValue) {
      setPartners((prev) => prev + 1);
    } else {
      setTimeout(() => {
        previousCard.disabled = false;
        card.disabled = false;
        previousImage.src = defaultImage;
        image.src = defaultImage;
      }, 1000);
    }
    validateWin();
    setPreviousCard(null);
    setPreviousImage(null);
    setPreviousValue(null);
  };

  const changeValues = (value, card, image) => {
    disabledCard(card);
    validateImage(image);
    if (previousValue == null) {
      setPreviousValue(value);
    } else {
      confirmMovement(value, card, image);
    }
  };

  const generateRandomCards = () => {
    const cards = [];
    //Generar 8 pares de cartas
    for (let i = 0; i < 8; i++) {
      const card = {
        value: i,
        image: defaultImage,
        reverseImage: "https://picsum.photos/200/300",
      };
      //Agregar el par de cartas al arreglo
      cards.push(card);
      cards.push({ ...card });
    }
    setCards(shuffle(cards));
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;
    // Mientras queden elementos a mezclar...
    while (currentIndex !== 0) {
      // Elegir un elemento sin mezclar...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // E intercambiarlo con el elemento actual
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  const disabledCard = (card) => {
    if (previousCard == null) {
      setPreviousCard(card);
    }
    card.disabled = true;
  };

  const validateImage = (image) => {
    image.src = "https://picsum.photos/100/100";
    if (previousImage == null) {
      setPreviousImage(image);
    }
  };

  const resetGame = () => {
    setMovements(0);
    setPartners(0);
    setPreviousValue(null);
    setPreviousCard(null);
    generateRandomCards();
  };

  const validateWin = () => {
    if (movements < necesaryMovements && partners === necesaryPartners - 1) {
      setWin(true);
      navigate("/completegame");
    } else {
      if (movements >= necesaryMovements - 1) {
        setWin(false);
        navigate("/completegame");
      }
    }
  };

  return (
    <div>
      <nav className="nav-brilla">Brilla LOGO</nav>
      <h1>
        ¡Arma {necesaryPartners} parejas en menos de {necesaryMovements}{" "}
        movimientos y gana!
      </h1>
      <Stats movements={movements} partners={partners} />
      <Square
        cards={cards}
        changeValues={changeValues}
        defaultImage={defaultImage}
      />
    </div>
  );
};

export default Game;
