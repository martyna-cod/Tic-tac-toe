import React, { useMemo, useState } from "react";

import "./App.css";

// TODO:
// - Display who won the game
// - Detect if there is no winner: it's a draw
// - Define global game states, like: "idle" - "game-running" - "winner-found" - "draw"
// - And add buttons to advance to the next stage (extend the current player figure choice stuff)
// - Block changing the figure in the field once the one picked > prevent cheating

const winningGroups = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6]
];

function App() {
  const [player1, setPlayer1] = useState({
    id: 1,
    name: "Player 1",
    figure: "",
  });
  const [player2, setPlayer2] = useState({
    id: 2,
    name: "Player 2",
    figure: "",
  });
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
    { nr: 9, value: "" }
  ]);

  const winningPlayerId = useMemo(() => {
    function determineWinningPlayerIdUsingFieldValue(fieldValueIndex) {
      return fieldsValues[fieldValueIndex].value !== ""
        ? activePlayerId === 1
          ? 2
          : 1
        : null;
    }

    function determineWinningPlayerIdForGroup(fieldValue1, fieldValue2, fieldValue3) {
      if (
        fieldsValues[fieldValue1].value === fieldsValues[fieldValue2].value &&
        fieldsValues[fieldValue2].value === fieldsValues[fieldValue3].value
      ) {
        return determineWinningPlayerIdUsingFieldValue(fieldValue1);
      }
    }

    let winningPlayerId = null;
    let currentGroupIndex = 0;
    while(!winningPlayerId && currentGroupIndex < winningGroups.length) {
      winningPlayerId = determineWinningPlayerIdForGroup(...winningGroups[currentGroupIndex]);

      currentGroupIndex++;
    }

    return winningPlayerId;
  }, [activePlayerId, fieldsValues]);

  const isFigureChosen = useMemo(() => {
    return player1.figure !== "" && player2.figure !== "";
  }, [player1.figure, player2.figure]);

  const activePlayerName = useMemo(() => {
    return activePlayerId === 1 ? player1.name : player2.name;
  }, [activePlayerId, player1.name, player2.name]);

  const activeFigure = useMemo(() => {
    return activePlayerId === 1 ? player1.figure : player2.figure;
  }, [activePlayerId, player1.figure, player2.figure]);

  const handleFigureChoice = (figure) => {
    setPlayer1(player1 => ({ ...player1, figure: figure }));
    setPlayer2(player2 => ({ ...player2, figure: figure === "●" ? "❌" : "●" }));

    setActivePlayerId(1);
  };

  const handleFigureInsertion = (fieldValueIndexToUpdate) => {
    setFieldsValues(fieldsValues => fieldsValues.map((fieldValue, index) =>
      fieldValueIndexToUpdate === index
        ? { ...fieldsValues[fieldValueIndexToUpdate], value: activeFigure } 
        : fieldValue
    ));

    setActivePlayerId(activePlayerId => (activePlayerId === 1 ? 2 : 1));
  };

  return (
    <div className="App-header">
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
            onClick={() => handleFigureInsertion(index)}
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
