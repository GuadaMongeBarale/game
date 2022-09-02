import * as n from "./nodes.js";
import * as m from "./maps.js";

const game = n.canvas.getContext('2d');
let elementsSize;
let canvasSize;
let level = 0;
let lives = 3;
let timeStart;
let timeInterval;


const playerPosition = {
    x:undefined,
    y:undefined,
}
const giftP = {
    x:undefined,
    y:undefined,
}
let enemiesP = []

const toNum = (n) => Number(n.toFixed(2));

function movePlayer() {
    playerPosition.x = toNum(playerPosition.x);
    playerPosition.y = toNum(playerPosition.y)

    const giftCollisionX = playerPosition.x === toNum(giftP.x);
    const giftCollisionY = playerPosition.y === toNum(giftP.y);
    const enemiesCollision = enemiesP.find(enemy =>{
        const boomX = toNum(enemy.x) === playerPosition.x;
        const boomY = toNum(enemy.y) === playerPosition.y;
        return boomX && boomY;
    })

    if (giftCollisionX && giftCollisionY ) {
        levelWin();
    } 
    else if (enemiesCollision) {
        game.fillText(m.emojis['BOMB_COLLISION'], playerPosition.x, playerPosition.y);
        setTimeout(()=>{levelFail();},300);
    }
    else {
        game.fillText(m.emojis['PLAYER'], playerPosition.x, playerPosition.y);
    }
}

function gameWin() {
    let newRecord;
    clearInterval(timeInterval);
    const newTime = Math.floor((Date.now() - timeStart)/1000);
    const record = localStorage.getItem('record_time');
    if (!record || record > newTime ) {
        localStorage.setItem('record_time', newTime);
        newRecord = true;
    }
    game.fillText(m.emojis['WIN'], playerPosition.x, playerPosition.y);

    setTimeout(()=> {
        n.win.classList.remove('inactive');
        n.gameContainer.classList.add('inactive');
        newRecord ? n.recordStatus.textContent = 'Conseguiste un nuevo record' 
        :
        n.recordStatus.textContent = `No superaste el record de ${record} seg.`;
    }, 1000);

    return;
}

function levelWin() {
    level++;
    if (level == (m.maps.length)) {
        gameWin();
    } else {
        lives++;
        startGame(level);
    }
}

function levelFail() {
    lives --;
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    if (lives > 0) {
        startGame(level);
    }
    else {
        lives = 3;
        level = 0;
        timeStart = 0;
        startGame(level); 
    }    
}

function startGame(level) {
    //where(xinitial, yinitial, width, height)
    /* game.fillRect(0,0,100,100); */

    game.font = `${elementsSize - 7}px sans-serif`;
    game.textAlign = 'end';

    const map = m.maps[level];
    const mapRows = map.trim().split('\n');
    const element = mapRows.map(row => row.trim().split(''));

    game.clearRect(0,0,canvasSize,canvasSize);
    enemiesP = [];

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
    }

    element.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            let emoji = m.emojis[col];
            let posX = elementsSize * (colIndex + 1 );
            let posY = elementsSize * (rowIndex + 1 );
            
            if (col=== 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            }
            else if (col=== 'I') {
                giftP.x = posX;
                giftP.y = posY;
            }
            else if (col=== 'X') {
                enemiesP.push({
                    x: posX,
                    y: posY,
                });
            } 
            game.fillText(emoji, posX, posY);
        })
        n.livesNum.textContent = '❤️'.repeat(lives);

        n.recordSeg.textContent = localStorage.getItem('record_time') || 'Todavía no tienes record de';
    });

    movePlayer();
}

function showTime() {
    n.time.textContent = Math.floor((Date.now() - timeStart)/1000);
}

function setCanvasSize() {
    canvasSize = window.innerHeight > window.innerWidth
        ?
        (window.innerWidth * 0.7)
        :
        (window.innerHeight * 0.7)
    
    canvasSize = toNum(canvasSize);

    n.canvas.setAttribute('width', canvasSize);
    n.canvas.setAttribute('height', canvasSize);

    elementsSize = toNum(canvasSize / 10);

    playerPosition.x = undefined;
    playerPosition.y = undefined;

    startGame(level);
}

function moveUp() {
    if (toNum(playerPosition.y) - elementsSize > 0) {
        playerPosition.y -= elementsSize;
        startGame(level);
    }
}
function moveLeft() {
    if (toNum(playerPosition.x - elementsSize )>= elementsSize ) {
        playerPosition.x -= elementsSize;
        startGame(level);
    }
}
function moveRight() {
    if (toNum(playerPosition.x + elementsSize) < canvasSize + elementsSize) {
        playerPosition.x += elementsSize;
        startGame(level);
    }
}
function moveDown() {
    if (toNum(playerPosition.y + elementsSize) < canvasSize + elementsSize)  {
        playerPosition.y += elementsSize;
        startGame(level);
    }
}

window.addEventListener("keydown", (e) => {
    let keyPushed = e.key;

    switch (keyPushed) {
        case "ArrowUp":
            moveUp();
            break;
        
        case "ArrowDown":
            moveDown();
            break;

        case "ArrowLeft":
            moveLeft();
            break;

        case "ArrowRight":
            moveRight();
            break;

        default:
        break;
    }
});

n.down.addEventListener('click', moveDown)
n.up.addEventListener('click', moveUp)
n.left.addEventListener('click', moveLeft)
n.right.addEventListener('click', moveRight)

// first load HTML and then the canvas. Not errors
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

