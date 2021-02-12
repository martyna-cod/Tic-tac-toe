import "./App.css";
import React, { useState } from "react";
import WinningPositions from "./WinningPositions.js";

function App() {
  const [player1, setPlayer1] = useState({ name: "Player 1 ", figure: "" });
  const [player2, setPlayer2] = useState({ name: "Player 2", figure: "" });
  const [activePlayer, setActivePlayer] = useState(player1);
  const [isFigureChosen, setIsFigureChosen] = useState(false);
  const [activeFigure, setActiveFigure] = useState(player1.figure);
  const [fieldsValues, setFieldsValues] = useState([
    { nr: "1", value: "" },
    { nr: "2", value: "" },
    { nr: "3", value: "" },
    { nr: "4", value: "" },
    { nr: "5", value: "" },
    { nr: "6", value: "" },
    { nr: "7", value: "" },
    { nr: "8", value: "" },
    { nr: "9", value: "" },
  ]);
  const [isWinner, setIsWinner] = useState(false);

  // Set figures for players
  // Hide the figures
  const handleFigureChoice = (figure) => {
    setPlayer1({
      ...player1,
      figure: figure,
    });
    figure === "●"
      ? setPlayer2({
          ...player2,
          figure: "❌",
        })
      : setPlayer2({
          ...player2,
          figure: "●",
        });
    setIsFigureChosen(true);
    setActiveFigure(figure);
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
    setActivePlayer((prev) => (prev === player1 ? player2 : player1));
    setActiveFigure((prev) => (prev === "❌" ? "●" : "❌"));
  };

  return (
    <div className="App-header">
      <WinningPositions fieldsValues={fieldsValues} />
      <div className="active-player">
        {activePlayer.name}
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
            className="one-field 1"
            key="index"
          >
            <div className="field-value">{fieldValue.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
