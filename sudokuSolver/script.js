var loadDataBtn = document.getElementById("loadDataBtn");
var solveDataBtn = document.getElementById("solveDataBtn");
var stopSolveBtn = document.getElementById("stopSolveBtn");
var ripple = document.getElementById("ripple");
ripple.style.display="none";




solveDataBtn.classList.add("invisible");
stopSolveBtn.classList.add("invisible");



var values = "";
var gridValues = new Array(9);
for (var i = 0; i < gridValues.length; i++) {
  gridValues[i] = [];
}

var SolveBoardStopper = 1;

//setup grid values from api data

function setUpGrid(vals) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      console.log(vals.charAt(i));
      gridValues[i][j] = parseInt(vals.charAt(i * 9 + j));
    }
  }

  addDisplayValuesGrid();
}

$("#tableContainer").append(generateGrid2(9, 9));

//generating grid basic structure
function generateGrid2(rows, cols) {
  var grid = "<div class='container '><div class='container_min'><table>";
  for (row = 0; row <= rows - 1; row++) {
    grid += "<tr>";

    for (col = 0; col <= cols - 1; col++) {
      displayValue = "";


      grid +=
        "<td ><p id=text" + row + "" + col + ">" + displayValue + "</p></td>";
    }
    grid += "</tr>";
  }


  return grid;
}

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
      console.log(response.vals);
      solveDataBtn.classList.remove("invisible");
      loadDataBtn.classList.add("invisible");
      ripple.style.display="none";


    })

    .catch((err) => console.error(err));
}

loadDataBtn.addEventListener("click", function (e) {
  loadData();
});

const GRID_SIZE = 9;
const BOX_SIZE = 3;

let count = 0;

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

var displayValue = "";



var row_count = 9;
var col_count = 9;

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

$("td").click(function () {
  var index = $("td").index(this);
  var row = Math.floor(index / col_count) + 1;
  var col = (index % col_count) + 1;
  $("span").text("That was row " + row + " and col " + col);
  if (ob == 1) {
    $(this).css("background-color", "black");
  } else {
    $(this).css("background-color", "red");
  }
});

function solveSudoku(board) {
  console.log("\nInput ..\n");
  printBoard(board);

  if (solveBoard(board)) {
    console.log("\nSolved !!\n");
    printBoard(board);
  } else {
    console.log("\nUnsolvable !!");
  }
}

function printBoard(board) {
  for (let row = 0; row < GRID_SIZE; row++) {
    var str = "";
    if (row % 3 == 0 && row != 0) {
      console.log("------------");
    }
    for (let column = 0; column < GRID_SIZE; column++) {
      if (column % 3 == 0 && column != 0) {
        // console.log("|");
        str += "|";
      }
      //console.log(board[row][column].toString());
      str += board[row][column].toString() + " ";
    }
    console.log(str);
  }
}

function isNumberInRow(board, number, row) {
  for (let i = 0; i < GRID_SIZE; i++) {
    if (board[row][i] == number) {
      return true;
    }
  }
  return false;
}

function isNumberInColumn(board, number, column) {
  for (let i = 0; i < GRID_SIZE; i++) {
    if (board[i][column] == number) {
      return true;
    }
  }
  return false;
}

function isNumberInBox(board, number, row, column) {
  const initialBoxRow = row - (row % BOX_SIZE);
  const initialBoxColumn = column - (column % BOX_SIZE);

  for (let i = initialBoxRow; i < initialBoxRow + BOX_SIZE; i++) {
    for (let j = initialBoxColumn; j < initialBoxColumn + BOX_SIZE; j++) {
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

  console.log(SolveBoardStopper);

  if (SolveBoardStopper == 0) {
    return;
  }

  console.log(count++);

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let column = 0; column < GRID_SIZE; column++) {
      if (board[row][column] == 0) {
        for (let numberToTry = 1; numberToTry <= GRID_SIZE; numberToTry++) {
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
