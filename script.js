let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "cross"; // Startspieler ist "cross"
let gameOver = false; // Spielstatus

function init() {
  render();
}

function render() {
  let tableHTML = '<table id="gameTable">';
  for (let i = 0; i < 3; i++) {
    tableHTML += "<tr>";
    for (let j = 0; j < 3; j++) {
      let index = i * 3 + j;
      let field = fields[index];
      let symbol = "";
      if (field === "circle") {
        symbol = `<span class="circle">${generateCircleSVG()}</span>`;
      } else if (field === "cross") {
        symbol = `<span class="cross">${generateCrossSVG()}</span>`;
      }
      // onclick-Funktion hinzufügen, nur wenn das Spiel noch läuft
      tableHTML += `<td onclick="handleClick(${index}, this)">${symbol}</td>`;
    }
    tableHTML += "</tr>";
  }
  tableHTML += "</table>";

  document.getElementById("container").innerHTML = tableHTML;
}

// Funktion, die aufgerufen wird, wenn auf ein Feld geklickt wird
function handleClick(index, cell) {
  if (!gameOver && fields[index] === null) {
    fields[index] = currentPlayer;

    if (currentPlayer === "circle") {
      cell.innerHTML = generateCircleSVG();
      currentPlayer = "cross";
    } else {
      cell.innerHTML = generateCrossSVG();
      currentPlayer = "circle";
    }

    cell.onclick = null; // Klick-Event entfernen
    checkWinner(); // Gewinner prüfen
  }
}

// Funktion, die überprüft, ob jemand gewonnen hat
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Reihen
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Spalten
    [0, 4, 8],
    [2, 4, 6], // Diagonalen
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      fields[a] !== null &&
      fields[a] === fields[b] &&
      fields[a] === fields[c]
    ) {
      gameOver = true;
      drawWinningLine(a, b, c); // Linie zeichnen
      return;
    }
  }

  // Prüfen, ob das Spielfeld voll ist (Unentschieden)
  if (!fields.includes(null)) {
    gameOver = true;
    alert("Unentschieden!");
  }
}

function generateLineSVG(startX, startY, endX, endY) {
  const table = document.getElementById("gameTable");
  const rect = table.getBoundingClientRect(); // Größe und Position der Tabelle holen

  // Berechnung der Position relativ zum Viewport
  const topOffset = rect.top;
  const leftOffset = rect.left;

  const svg = `
<svg width="${rect.width}" height="${rect.height}" 
     style="position: absolute; top: ${topOffset}px; left: ${leftOffset}px;" 
     xmlns="http://www.w3.org/2000/svg">
  <line x1="${startX}" y1="${startY}" x2="${startX}" y2="${startY}" stroke="#fff" stroke-width="4">
      <animate 
          attributeName="x2"
          from="${startX}"
          to="${endX}"
          dur="1s"
          fill="freeze" />
      <animate 
          attributeName="y2"
          from="${startY}"
          to="${endY}"
          dur="1s"
          fill="freeze" />
  </line>
</svg>
`;
  return svg;
}

// Funktion zum Zeichnen der weißen Linie
function drawWinningLine(a, b, c) {
  const table = document.getElementById("gameTable");
  const cells = table.getElementsByTagName("td");
  const [startX, startY] = getCellCenter(cells[a]);
  const [endX, endY] = getCellCenter(cells[c]);

  // Nutzt die neue Funktion zum Erstellen des SVG-Codes
  const lineSVG = generateLineSVG(startX, startY, endX, endY);

  // Fügt das generierte SVG in den Container ein
  document.getElementById("gameTable").innerHTML += lineSVG;
}

function getCellCenter(cell) {
  const rect = cell.getBoundingClientRect();
  const tableRect = document
    .getElementById("gameTable")
    .getBoundingClientRect();
  return [
    rect.left - tableRect.left + rect.width / 2,
    rect.top - tableRect.top + rect.height / 2,
  ];
}

function generateCircleSVG() {
  const svg = `
  <svg width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
    <circle cx="36" cy="36" r="30" fill="none" stroke="#00B0EF" stroke-width="6"
        stroke-dasharray="188.4"
        stroke-dashoffset="188.4">
        <animate 
            attributeName="stroke-dashoffset"
            from="188.4" to="0"
            dur="0.25s"
            fill="freeze"
            begin="0.1s" />
    </circle>
  </svg>
  `;
  return svg;
}

function generateCrossSVG() {
  const svg = `
<svg width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
  <line x1="10" y1="10" x2="62" y2="62" stroke="#FFC000" stroke-width="6"
      stroke-dasharray="73.5" stroke-dashoffset="73.5">
      <animate 
          attributeName="stroke-dashoffset"
          from="73.5" to="0"
          dur="0.15s"
          fill="freeze"
          begin="0.1s" />
  </line>
  <line x1="62" y1="10" x2="10" y2="62" stroke="#FFC000" stroke-width="6"
      stroke-dasharray="73.5" stroke-dashoffset="73.5">
      <animate 
          attributeName="stroke-dashoffset"
          from="73.5" to="0"
          dur="0.25s"
          fill="freeze"
          begin="0.5s" />
  </line>
</svg>
`;
  return svg;
}

function restartGame() {
  resetFields();
  resetPlayerToCross();
  resetGameStatus();
  render();
}

function resetFields() {
  for (let index = 0; index < fields.length; index++) {
    fields[index] = null;
  }
}

function resetPlayerToCross() {
  currentPlayer = "cross";
}

function resetGameStatus() {
  gameOver = false;
}
