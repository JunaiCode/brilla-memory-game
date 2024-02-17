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
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    validateWin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partners, movements]);

  const confirmMovement = (value, card, image) => {
    setMovements((prev) => prev + 1);
    if (value === previousValue) {
      setPartners((prev) => prev + 1);
    } else {
      setTimeout(() => {
        previousCard.disabled = false;
        card.disabled = false;
        previousImage.src = defaultImage;
        card.style = "border: none;";
        previousCard.style = "border: none;";
        image.src = defaultImage;
      }, 1000);
    }
    setPreviousCard(null);
    setPreviousImage(null);
    setPreviousValue(null);
  };

  const changeValues = (value, card, image, reverseImage) => {
    console.log(card);
    card.style = "border: 2px solid #FFD700;";
    disabledCard(card);
    validateImage(image, reverseImage);
    if (previousValue == null) {
      setPreviousValue(value);
    } else {
      confirmMovement(value, card, image);
    }
  };

  const generateRandomCards = () => {
    const cards = [
      {
        value: 1,
        reverseImage: "./images/1.png",
      },
      {
        value: 2,
        reverseImage: "./images/2.png",
      },
      {
        value: 3,
        reverseImage: "./images/3.png",
      },
      {
        value: 4,
        reverseImage: "./images/4.png",
      },
      {
        value: 5,
        reverseImage: "./images/5.png",
      },
      {
        value: 6,
        reverseImage: "./images/6.png",
      },
      {
        value: 7,
        reverseImage: "./images/7.png",
      },
      {
        value: 8,
        reverseImage: "./images/8.png",
      },
    ];
    // duplicar el array
    const pairs = [...cards, ...cards];
    setCards(shuffle(pairs));
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

  const validateImage = (image, reversImage) => {
    image.src = reversImage;
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
    if (partners === 0 && movements === 0) return;

    if (movements < necesaryMovements && partners === necesaryPartners) {
      setWin(true);
      navigate("/completegame");
    } else {
      if (movements >= necesaryMovements) {
        setWin(false);
        navigate("/completegame");
      }
    }
  };

  return (
    <div>
      <nav className="nav-brilla">
        <img src="" alt="BotonPago" />
        <img src="./images/logo.png" alt="logo" />
      </nav>
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
