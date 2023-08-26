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

  const changeValues = (value, card, image, reverseImage) => {
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
        reverseImage: "https://picsum.photos/100/100",
      },
      {
        value: 2,
        reverseImage: "https://picsum.photos/110/110",
      },
      {
        value: 3,
        reverseImage: "https://picsum.photos/120/120",
      },
      {
        value: 4,
        reverseImage: "https://picsum.photos/130/130",
      },
      {
        value: 5,
        reverseImage: "https://picsum.photos/135/135",
      },
      {
        value: 6,
        reverseImage: "https://picsum.photos/125/125",
      },
      {
        value: 7,
        reverseImage: "https://picsum.photos/115/115",
      },
      {
        value: 8,
        reverseImage: "https://picsum.photos/140/140",
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
