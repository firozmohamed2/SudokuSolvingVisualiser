//buttons init

var loadDataBtn = document.getElementById("loadDataBtn");
var solveDataBtn = document.getElementById("solveDataBtn");
var stopSolveBtn = document.getElementById("stopSolveBtn");
solveDataBtn.classList.add("invisible");
stopSolveBtn.classList.add("invisible");
var displayValue = "";



//ripple init
var ripple = document.getElementById("ripple");
ripple.style.display="none";

//variables initialization
var SolveBoardStopper = 1;
var values = "";



//generating grid basic structure
var gridValues = new Array(9);
for (var i = 0; i < gridValues.length; i++) {
  gridValues[i] = [];
}

function generateGrid2() {
  var grid = "<div class='container '><div class='container_min'><table>";
  for (row = 0; row <9; row++) {
    grid += "<tr>";

    for (col = 0; col <9; col++) {
      displayValue = "";


      grid +=
        "<td ><p id=text" + row + "" + col + ">" + displayValue + "</p></td>";
    }
    grid += "</tr>";
  }


  return grid;
}






//setup grid values from api data

function setUpGrid(vals) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      gridValues[i][j] = parseInt(vals.charAt(i * 9 + j));
    }
  }

  addDisplayValuesGrid();
}








//calling grid generation function
$("#tableContainer").append(generateGrid2());









//load data from API server
//also invoke input of starting values

function loadData() {
  SolveBoardStopper=1;
  ripple.style.display="inline-block";
  const options = {
    method: "GET",
  };

  fetch(
    "https://main--glistening-babka-b74b41.netlify.app/.netlify/functions/api",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      values = response.vals;
      setUpGrid(values);
      solveDataBtn.classList.remove("invisible");
      loadDataBtn.classList.add("invisible");
      ripple.style.display="none";


    })

    .catch((err) => console.error(err));
}





//sleep function to delay process 
function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}







//adding initial values to the grid from data provided by API 
function addDisplayValuesGrid() {
  for (var row = 0; row < 9; row++) {
    for (var col = 0; col < 9; col++) {
      if (gridValues[row][col] == 0) {
        displayValue = "";
      } else {
        displayValue = gridValues[row][col];
      }

      document.getElementById("text" + row + "" + col).innerHTML = displayValue;
      document
              .getElementById("text" + row + "" + col)
              .classList.remove("pClass");
    }
  }
}



function solveSudoku(board) {

  if (solveBoard(board)) {
  } else {
    console.log("\nUnsolvable !!");
  }
}










// solving sudoku logic 

function isNumberInRow(board, number, row) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] == number) {
      return true;
    }
  }
  return false;
}

function isNumberInColumn(board, number, column) {
  for (let i = 0; i < 9; i++) {
    if (board[i][column] == number) {
      return true;
    }
  }
  return false;
}

function isNumberInBox(board, number, row, column) {
  const initialBoxRow = row - (row % 3);
  const initialBoxColumn = column - (column % 3);

  for (let i = initialBoxRow; i < initialBoxRow + 3; i++) {
    for (let j = initialBoxColumn; j < initialBoxColumn + 3; j++) {
      if (board[i][j] == number) {
        return true;
      }
    }
  }
  return false;
}

function isValidPlacement(board, number, row, column) {
  return (
    !isNumberInRow(board, number, row) &&
    !isNumberInColumn(board, number, column) &&
    !isNumberInBox(board, number, row, column)
  );
}



async function solveBoard(board) {


  if (SolveBoardStopper == 0) {
    return;
  }


  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      if (board[row][column] == 0) {
        for (let numberToTry = 1; numberToTry <= 9; numberToTry++) {
          if (isValidPlacement(board, numberToTry, row, column)) {
            board[row][column] = numberToTry;
            document.getElementById("text" + row + "" + column).innerHTML =
              numberToTry;
            document
              .getElementById("text" + row + "" + column)
              .classList.add("pClass");

            await sleep(130);

            if (await solveBoard(board)) {
              return true;
            } else {
              board[row][column] = 0;
              document.getElementById("text" + row + "" + column).innerHTML =
                " ";
              document
                .getElementById("text" + row + "" + column)
                .classList.add("pClass");
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}










//on click listeners for buttons
loadDataBtn.addEventListener("click", function (e) {
  loadData();
});


solveDataBtn.addEventListener("click", function (e) {
  if (values == "") return;

  solveDataBtn.classList.add("invisible");
  stopSolveBtn.classList.remove("invisible");
  solveSudoku(gridValues);
});

stopSolveBtn.addEventListener("click", function (e) {
  SolveBoardStopper = 0;
  loadDataBtn.classList.remove("invisible");
  stopSolveBtn.classList.add("invisible");

  generateGrid2(9,9);
});
