import "./App.css";
import React, { useMemo, useState } from "react";
import WinningPositions from "./WinningPositions.js";

function App() {
  const [player1, setPlayer1] = useState({ id: 1, name: "Player 1", figure: "" });
  const [player2, setPlayer2] = useState({ id: 2, name: "Player 2", figure: "" });
  const [activePlayerId, setActivePlayerId] = useState(1);

  const [fieldsValues, setFieldsValues] = useState([
    { nr: 1, value: "" },
    { nr: 2, value: "" },
    { nr: 3, value: "" },
    { nr: 4, value: "" },
    { nr: 5, value: "" },
    { nr: 6, value: "" },
    { nr: 7, value: "" },
    { nr: 8, value: "" },
    { nr: 9, value: "" },
  ]);
  const [isWinner, setIsWinner] = useState(false);

  // Set figures for players
  // Hide the figures
  const handleFigureChoice = (figure) => {
    setPlayer1({
      ...player1,
      figure: figure
    });

    setPlayer2({
      ...player2,
      figure:  figure === "●" ? "❌" : "●",
    });

    setActivePlayerId(1);
  };
  // Insert a figure of activePlayer
  // and change activePlayer
  //
  const handleFigureInsertion = (fieldToUpdate) => {
    const newList = fieldsValues.map((fieldValue) => {
      if (fieldToUpdate === fieldValue) {
        const updatedField = {
          value: activeFigure,
        };
        return updatedField;
      }
      return fieldValue;
    });
    setFieldsValues(newList);

    setActivePlayerId((prev) => (prev === 1 ? 2 : 1));
  };

  const isFigureChosen = useMemo(() => {
    return player1.figure !== '' && player2.figure !== '';
  }, [player1.figure, player2.figure ]);

  const activePlayerName = useMemo(() => {
    return activePlayerId === 1 ? player1.name : player2.name;
  }, [activePlayerId, player1.name, player2.name]);

  const activeFigure = useMemo(() => {
    return activePlayerId === 1 ? player1.figure : player2.figure;
  }, [activePlayerId, player1.figure, player2.figure]);

  return (
    <div className="App-header">
      <WinningPositions fieldsValues={fieldsValues} />
      <div className="active-player">
        {activePlayerName}
        {activeFigure}
      </div>
      {/* Choose the figure */}
      {!isFigureChosen && (
        <div className="figure-choice">
          <div onClick={() => handleFigureChoice("❌")} className="figure">
            ❌
          </div>
          <div onClick={() => handleFigureChoice("●")} className="figure">
            ●
          </div>
        </div>
      )}
      {isFigureChosen && <div className="turn">Turn</div>}

      {/* Container for the game */}
      <div className="container">
        {fieldsValues.map((fieldValue, index) => (
          <div
            onClick={() => handleFigureInsertion(fieldValue)}
            className="one-field"
            key={fieldValue.nr}
          >
            <div className="field-value">{fieldValue.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
