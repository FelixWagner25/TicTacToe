let fields = [null, null, "circle", "cross", null, null, "cross", null, null];

function init() {
  render();
}

function render() {
  let tableHTML = "<table>";
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
      tableHTML += `<td>${symbol}</td>`;
    }
    tableHTML += "</tr>";
  }
  tableHTML += "</table>";

  document.getElementById("container").innerHTML = tableHTML;
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
            dur="1.5s"
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
    <!-- Erster Strich des Kreuzes -->
    <line x1="20" y1="20" x2="52" y2="52" stroke="#FFC000" stroke-width="6"
        stroke-dasharray="45" stroke-dashoffset="45">
        <animate 
            attributeName="stroke-dashoffset"
            from="45" to="0"
            dur="1s"
            fill="freeze"
            begin="0.1s" />
    </line>

    <!-- Zweiter Strich des Kreuzes -->
    <line x1="52" y1="20" x2="20" y2="52" stroke="#FFC000" stroke-width="6"
        stroke-dasharray="45" stroke-dashoffset="45">
        <animate 
            attributeName="stroke-dashoffset"
            from="45" to="0"
            dur="1s"
            fill="freeze"
            begin="1.2s" />
    </line>
  </svg>
  `;
  return svg;
}
