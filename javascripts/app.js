console.log('Instructions:');
console.log("There's a 10x10 board.");
console.log(' ');
console.log('To create rovers, you have to type "createRovers(n)" in your browser console and hit enter, where n is the number of rovers (the max is 10).');
console.log('All rovers will be created from top to bottom in the first column. Their names starts at 0 (rover 0, rover 1...).');
console.log(' ');
console.log(`You can control the rovers by typing "commands('x')" in your browser console and hitting enter, where x is the command you want.`);
console.log('Valid commands are:');
console.log('r - to turn right;');
console.log('l - to turn left;');
console.log('f - to move forward;');
console.log('b - to move backward.');
console.log('Rovers can only move forward or backward. If you want to move to any other direction, first you have to turn the rover.');
console.log(' ');
console.log(`You can type as many commands as you want at once - e.g. - "commands('ffrlbbl')". Don't forget the quotes between parentheses.`);
console.log(`The commands are given for each one of the rovers in sequence. So, if you type "commands('frl')" and created 2 rovers, the commands given will be:`);
console.log('1) f - rover 0 moves forward;');
console.log('2) r - rover 1 turns right;');
console.log('3) l - rover 0 turns left.');
console.log('If you type any other letter, the rover will miss its turn.');
console.log(' ');
console.log('Watch out!');
console.log("Rovers can't be in the same square.");
console.log('There are also some obstacles in the way.');
console.log("Don't try to go outside of the board, you can hurt the rover.");
console.log(' ');
console.log('If you want to see the board with rovers and obstacles, just type "board" in your browser console and hit enter.');

// variables set

const roversArray = []; // array with all rovers objects.

let newRoverY; // variable to set each rover's y position when created.

let futurePosY; // variable to check if rovers can move.
let futurePosX; // variable to check if rovers can move.
let futurePos; // variable to check if rovers can move.
let allCurrentRoversPos = []; // variable to check if rovers can move. Stores every rover's position during checkPos().

let message; // message to display if a movement can't be done.

let roverNum = 0; // number of the commanded rover (turn).

const board = [
  [null, 'obstacle', null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, 'obstacle', null, null, null, null, null, null, null, null],
  [null, null, null, null, null, 'obstacle', null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, 'obstacle', null, null, null, null, null, null, null, null],
  [null, null, 'obstacle', null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, 'obstacle'],
];

const obstaclesArray = []; // variable to store every osbatacle position.

// code.

// inputs into array every osbatacle's position.
for (let i = 0; i < board.length; i += 1) {
  const row = board[i];
  for (let j = 0; j < row.length; j += 1) {
    if (board[i][j] === 'obstacle') {
      obstaclesArray.push(`${i},${j}`);
    }
  }
}

// adds to board every rover's position.
function addToBoard() {
  for (let i = 0; i < roversArray.length; i += 1) {
    if (roversArray[i].travelLog.length > 1) {
      const lastPos = roversArray[i].travelLog[roversArray[i].travelLog.length - 2];
      const lastY = lastPos[0];
      const lastX = lastPos[lastPos.length - 1];
      if (board[lastY][lastX] === `rover ${i}`) {
        board[lastY][lastX] = null;
      }
    }
    board[roversArray[i].y][roversArray[i].x] = `rover ${i}`;
  }
}

// inputs into array every rover's position.
function addCurrentRoversPos() {
  for (let i = 0; i < roversArray.length; i += 1) {
    const newPos = `${roversArray[i].y},${roversArray[i].x}`;
    allCurrentRoversPos.push(newPos);
  }
}

// checks start position. Puts new Rover on first empty space (y).
function checkStartPos() {
  addCurrentRoversPos();
  if (!allCurrentRoversPos.includes('0,0')) {
    newRoverY = 0;
  } else {
    for (let i = 0; i < roversArray.length; i += 1) {
      let j = 0;
      while (allCurrentRoversPos.includes(`${j},0`)) {
        newRoverY = j + 1;
        j += 1;
      }
    }
  }
}

// creates rovers based on input at the browser console and attribute each direction and position
function createRovers(numRovers) {
  const futureRoversCount = roversArray.length + numRovers;
  if (futureRoversCount <= 10) {
    for (let i = 0; i < numRovers; i += 1) {
      if (roversArray.length === 0) {
        newRoverY = 0;
      } else {
        checkStartPos();
      }
      const rover = {
        direction: 'N',
        x: 0,
        y: newRoverY,
        travelLog: [],
      };
      roversArray.push(rover);
    }
  } else {
    console.log(`The max number of rovers is 10. You have already set ${roversArray.length}.`);
  }
  for (let i = 0; i < roversArray.length; i += 1) {
    if (roversArray[i].travelLog.length === 0) {
      roversArray[i].travelLog.push(`${roversArray[i].y},${roversArray[i].x}`);
    }
  }
  addCurrentRoversPos();
  allCurrentRoversPos = [];
  addToBoard();
}


// turns rover left
function turnLeft(roverNum) {
  const rover = roversArray[roverNum];
  console.log(`Turning rover ${roverNum} left ...!`);

  switch (rover.direction) {
    case 'N':
      rover.direction = 'W';
      break;
    case 'W':
      rover.direction = 'S';
      break;
    case 'S':
      rover.direction = 'E';
      break;
    case 'E':
      rover.direction = 'N';
      break;
    default:
      break;
  }
  console.log(`Now rover ${roverNum} is facing ${rover.direction}`);
}

// turns rover right
function turnRight(roverNum) {
  const rover = roversArray[roverNum];
  console.log(`Turning rover ${roverNum} right ...!`);

  switch (rover.direction) {
    case 'N':
      rover.direction = 'E';
      break;
    case 'E':
      rover.direction = 'S';
      break;
    case 'S':
      rover.direction = 'W';
      break;
    case 'W':
      rover.direction = 'N';
      break;
    default:
      break;
  }
  console.log(`Now rover ${roverNum} is facing ${rover.direction}`);
}

// moves rover forward
function moveForward(roverNum) {
  const rover = roversArray[roverNum];
  switch (rover.direction) {
    case 'N':
      rover.y -= 1;
      break;
    case 'S':
      rover.y += 1;
      break;
    case 'E':
      rover.x += 1;
      break;
    case 'W':
      rover.x -= 1;
      break;
    default:
      break;
  }
  console.log(`Moving rover ${roverNum} forward...`);
  const newPos = `${rover.y},${rover.x}`;
  console.log(`Now rover ${roverNum} is at ${newPos}`);
  rover.travelLog.push(newPos);
}

// moves rover backward
function moveBackward(roverNum) {
  const rover = roversArray[roverNum];
  switch (rover.direction) {
    case 'N':
      rover.y += 1;
      break;
    case 'S':
      rover.y -= 1;
      break;
    case 'E':
      rover.x -= 1;
      break;
    case 'W':
      rover.x += 1;
      break;
    default:
      break;
  }
  console.log(`Moving rover ${roverNum} backward...`);
  const newPos = `${rover.y},${rover.x}`;
  console.log(`Now rover ${roverNum} is at ${newPos}`);
  rover.travelLog.push(newPos);
}

// check ifs rover can move. If there's a rover, an obstacle or a wall (end of board), displays a message.
function checkPos(roverNum, d) {
  const rover = roversArray[roverNum];
  futurePosX = rover.x;
  futurePosY = rover.y;

  if (d === 'f') {
    switch (rover.direction) {
      case 'N':
        futurePosY = rover.y - 1;
        break;
      case 'S':
        futurePosY = rover.y + 1;
        break;
      case 'E':
        futurePosX = rover.x + 1;
        break;
      case 'W':
        futurePosX = rover.x - 1;
        break;
      default:
        break;
    }
  }
  if (d === 'b') {
    switch (rover.direction) {
      case 'N':
        futurePosY = rover.y + 1;
        break;
      case 'S':
        futurePosY = rover.y - 1;
        break;
      case 'E':
        futurePosX = rover.x - 1;
        break;
      case 'W':
        futurePosX = rover.x + 1;
        break;
      default:
        break;
    }
  }
  futurePos = `${futurePosY},${futurePosX}`;
  addCurrentRoversPos();
  if (futurePosY >= 0 && futurePosY < 10 && futurePosX >= 0 && futurePosX < 10) {
    message = '';
  } else {
    message = `Rover ${roverNum} says: Ouch! There's a wall!`;
  }
  if (obstaclesArray.includes(futurePos)) {
    message = `Rover ${roverNum} says: Hey! There's an obstacle here!`;
  }
  if (allCurrentRoversPos.includes(futurePos)) {
    message = `Rover ${roverNum} says: Hey! There's another rover here!`;
  }
  allCurrentRoversPos = [];
}

// receives and interprets commands from browser console.
function commands(read) {
  for (let i = 0; i < read.length; i += 1) {
    if (roverNum === roversArray.length) {
      roverNum = 0;
    }
    switch (read[i]) {
      case 'f':
        checkPos(roverNum, 'f');
        if (message === '') {
          moveForward(roverNum);
        } else {
          console.log(message);
        }
        break;
      case 'b':
        checkPos(roverNum, 'b');
        if (message === '') {
          moveBackward(roverNum);
        } else {
          console.log(message);
        }
        break;
      case 'l':
        turnLeft(roverNum);
        break;
      case 'r':
        turnRight(roverNum);
        break;
      default:
        console.log(`Invalid command (${read[i]}). Lost your turn.`);
        break;
    }
    addToBoard();
    roverNum += 1;
  }
}
