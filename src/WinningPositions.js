import React from "react";

export default function WinningPositions ({fieldsValues}) {
console.log("Winning js")
  if (
    fieldsValues[0].value === "❌" &&
    fieldsValues[1].value === "❌" &&
    fieldsValues[2].value === "❌"
  ) {
    console.log("BLA");
  }
  if (
    fieldsValues[3].value === "❌" &&
    fieldsValues[4].value === "❌" &&
    fieldsValues[5].value === "❌"
  ) {
    console.log("fds");
  }
  if (
    fieldsValues[6].value === "❌" &&
    fieldsValues[7].value === "❌" &&
    fieldsValues[8].value === "❌"
  ) {
    console.log("kra");
  }

  return <div></div>;
}
