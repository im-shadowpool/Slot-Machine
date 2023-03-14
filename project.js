const prompt = require("prompt-sync")();

// 1 Deposit Money [DONE]
// 2 Know number line to bet [DONE]
// 3 collect the bet amount [DONE]
// 4 Spin the slot machine [DONE]
// 5 check if the user won [DONE]
// 6 give the user their winnings [DONE]
// 7 play again [DONE]

const ROWS = 3;
const COLS = 3;

const SYMBLES_COUNT = {
  A: 2,
  B: 6,
  C: 4,
  D: 8,
};
const SYMBOLS_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter the deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid Number, Please try again.");
    } else return numberDepositAmount;
  }
};

const numberofLines = () => {
  while (true) {
    const NumberofLinesEnter = prompt("Enter the number of lines: (1-3) ");
    const NumberLines = parseFloat(NumberofLinesEnter);
    if (isNaN(NumberLines) || NumberLines <= 0 || NumberLines > 3) {
      console.log("Invalid input. Please enter again");
    } else return NumberLines;
  }
};

const numberBet = (balance, Lines) => {
  while (true) {
    const EnterNumberbet = prompt("Enter the bet number per line: ");
    const NumberbetisNum = parseFloat(EnterNumberbet);
    if (
      isNaN(NumberbetisNum) ||
      NumberbetisNum <= 0 ||
      NumberbetisNum > balance / Lines
    ) {
      console.log("Invalid bet amount, Please try again.");
    } else return NumberbetisNum;
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBLES_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelsSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelsSymbols.length);
      const selectedSymbol = reelsSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelsSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};
const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getwinnings = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings = winnings + bet * SYMBOLS_VALUES[symbols[0]];
    }
  }
  return winnings;
};

const game = () => {
  let balance = deposit();
  while (true) {
    console.log("You have balance of rupees : $" + balance);

    const NumberLines = numberofLines();
    const bet = numberBet(balance, NumberLines);
    balance = balance - bet * NumberLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getwinnings(rows, bet, NumberLines);
    balance += winnings;
    console.log("You won, $" + winnings.toString());
    if (balance <= 0) {
      console.log("You ran out of mmoney");
      break;
    }
    const playAgain = prompt("Do you wanna play again (y/n)?)");
    if (playAgain != "y") break;
  }
};

game();
