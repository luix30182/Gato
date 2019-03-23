let canvas = null;
let ctx = null;
const boardWidth = 600;
const boartheight = 600;
const cellHeight = boartheight/3;
const cellWidth = boardWidth/3;

// 0 = celda vacia
let game = [[0,0,0],[0,0,0],[0,0,0]];
let currentPlayer = null;

window.onload = function(){
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = boardWidth;
    canvas.height = boartheight;
    canvas.onclick = onCanvasClick;
    clearGame();
    currentPlayer = 1;
}   
function onCanvasClick(e){
    const coord = getMouseLocation(e);
    const cell = getCellFromLocation(coord);
    console.log(coord,cell)
    // processCellClick(cell);
    drawCoss(coord.x,coord.y)
}
function getMouseLocation(e){
    const cx = e.pageX - canvas.offsetLeft;
    const cy = e.pageY - canvas.offsetTop;
    return {x: cx, y:cy};
}
function getCellFromLocation(coord){
    const cCoord = {x:0, y:0};
    if(coord.x>400){
       cCoord.x = 2;
    }else if(coord.x>200){
       cCoord.x = 1;
    }

    if(coord.y>400){
        cCoord.y = 2
    }else if(coord.y > 200){
        cCoord.y = 1;
    }
    return cCoord;
}
function clearGame(){
    ctx.clearRect(0,0,boardWidth,boartheight);
    drawGameBoard();
    drawMoves();
}
//Esta funcion dibuja las lineas del tablero de juego 
function drawGameBoard() {
    ctx.beginPath();
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 600);
    ctx.stroke();
 
    ctx.beginPath();
    ctx.moveTo(200 * 2, 0);
    ctx.lineTo(200 * 2, 600);
    ctx.stroke();
 
    ctx.beginPath();
    ctx.moveTo(0, 200);
    ctx.lineTo(600, 200);
    ctx.stroke();
 
    ctx.beginPath();
    ctx.moveTo(0, 200 * 2);
    ctx.lineTo(600, 200 * 2);
    ctx.stroke();
}

function drawCoss(x,y){

    const boardIntersect = [
        {x1:0,y1:0,x2:0,y2:0},
    ];

    ctx.beginPath();
    ctx.moveTo(x - boardWidth, y - boartheight);
    ctx.lineTo(x + boardWidth, y + boartheight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + boardWidth, y - boartheight);
    ctx.lineTo(x - boardWidth, y + boartheight);
    ctx.stroke();
}

function drawCircle(x,y){
    ctx.beginPath();
    ctx.arc(x*cellWidth+(cellWidth/2), y*cellHeight+(cellHeight/2),cellWidth/2,0,360,false);
    ctx.stroke();
}

function drawMoves(){
    for(let i=0;i<2;i++){
        for(let j=0;j<2;j++){
            const cell = game[i][j];
            if(cell == 1){
                drawCoss(i,j);
            }else if(cell == 2){
                drawCircle(i,j);
            }
        }
    }
}

function checkSolved(){
    let full = true;
    let p1Row = 0;
    let p1Col = 0;
    let p2Row = 0;
    let p2Col = 0;

    for(let i=0;i<3;i++){    
        for(let j=0;j<3;j++){
            if(game[j][i] == 1){
                p1Row++;
            }else if(game[j][i] == 2){
                p2Row++;
            }else{
                full = false;
            }
            
            if(game[i][j] == 1){
                p1Col++;
            }else if(game[i][j] == 2){
                p2Col++;            }
        }
    }

    let p1D = game[0][0] == 1 && game[1][1] == 1 && game[2][2] == 1;
    p1D = p1D | game[0][2] == 1 && game[1][1] == 1 && game[2][0] == 1;
    let p2D = game[0][0] == 2 && game[1][1] == 2 && game[2][2] == 2;
    p2D = p2D | game[0][2] == 2 && game[1][1] == 2 && game[2][0] == 2;

    if(p1Row == 3 | p1Col == 3 | p1D){
        endGame("Gana el jugador");
        return;
    }else if(p2Row == 3 | p2Col == 3 | p2D){
        endGame("Gana la maquina");
        return;
    }
    if(full){
        endGame("Empate");
    }
}
function endGame(message){
    alert(message);
    game = [[0,0,0],[0,0,0],[0,0,0]]
    currentPlayer = 1;
    clearGame();
}

function processCellClick(cell) {
    if (game[cell.x][cell.y] != 0) return;
    game[cell.x][cell.y] = currentPlayer;

    if (currentPlayer == 1) currentPlayer = 2;
    else currentPlayer = 1;
 
    checkSolved();
}