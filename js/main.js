let canvas = null;
let ctx = null;
const boardWidth = 600;
const boartheight = 600;
const cellHeight = boartheight/3;
const cellWidth = boardWidth/3;
let turn = 1;
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
    processCellClick(cell);
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
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 5;

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
    xcoords = getXcoords(x,y);
    ctx.beginPath();
    ctx.strokeStyle = "#c62828";
    ctx.lineWidth = 4;
    ctx.moveTo(xcoords[0][0], xcoords[0][1]);
    ctx.lineTo(xcoords[0][2],xcoords[0][3]);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xcoords[1][0],xcoords[1][1]);
    ctx.lineTo(xcoords[1][2],xcoords[1][3]);
    ctx.stroke();
}
function getXcoords(x,y){
    const boardIntersect = [
        [[0,0,200,200],[200,0,0,200]],
        [[200,0,400,200],[400,0,200,200]],
        [[400,0,600,200],[600,0,400,200]],
        [[0,200,200,400],[200,200,0,400]],
        [[200,200,400,400],[400,200,200,400]],
        [[400,200,600,400],[600,200,400,400]],
        [[0,400,200,600],[200,400,0,600]],
        [[200,400,400,600],[400,400,200,600]],
        [[400,400,600,600],[400,600,600,400]],
    ];
    if(x==0 && y==0){
        return boardIntersect[0]
    }else if(x==1 && y==0){
        return boardIntersect[1]
    }else if(x==2 && y==0){
        return boardIntersect[2]
    }else if(x==0 && y==1){
        return boardIntersect[3]
    }else if(x==1 && y==1){
        return boardIntersect[4]
    }else if(x==2 && y==1){
        return boardIntersect[5]
    }else if(x==0 && y==2){
        return boardIntersect[6]
    }else if(x==1 && y==2){
        return boardIntersect[7]
    }else if(x==2 && y==2){
        return boardIntersect[8]
    }
}
function drawCircle(x,y){
    ctx.beginPath();
    ctx.strokeStyle = "#1564bf";
    ctx.lineWidth = 5;    
    ctx.arc(x*cellWidth+(cellWidth/2), y*cellHeight+(cellHeight/2),cellWidth/2,0,360,false);
    ctx.stroke();
}

function drawMoves(){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            const cell = game[i][j];
            if(cell == 1){
                drawCoss(i,j);
            }else if(cell == 5){
                drawCircle(i,j);
            }
        }
    }
}

function processCellClick(cell) {
    checkWin();
    if (game[cell.x][cell.y] != 0){
     return;   
    }else{
        game[cell.x][cell.y] = 1;
        turn ++;
        clearGame();
        currentPlayer = 2;
        if(currentPlayer == 2){
            machineMove();
            turn++;
            currentPlayer = 1;
            clearGame();
        }
        checkWin();
    }
}
function machineMove(){
    if(turn == 1){
       goN(0,0); 
    }else if(turn == 2){
        if(game[1][1] == 0){
            goN(1,1);
        }else{
            goN(0,0);
        }
    }else if(turn == 3){
        if(game[2][2] == 0){
            goN(2,2);
        }else{
            goN(2,0);
        }
    }else if(turn == 4){
        const p = possWin(1);
        if(p.length>1){
            goN(p[0],p[1])
        }else{
            const t = maketwo()
            goN(t[0],t[1])
        }
    }else if(turn == 5){
        const p = possWin(1);
        const p2 = possWin(5);
        if(p != 0){
            goN(p[0],p[1])
        }else if(p2 != 0){
            goN(p2[0],p[1]);
        }else if(game[0][2] != 0){
            goN(0,2);
        }else{
            goN(2,0);
        }
    }else if(turn == 6){
        const p = possWin(5);
        const p2 = possWin(1);
        if(p.length>1){
            
            goN(p[0],p[1])
        }else if(p2.length>1){
            goN(p2[0],p2[1]);
        }else{
            const t = maketwo();
            goN(t[0],t[1])
        }
    }else if(turn == 7){
        const p = possWin(1);
        const p2 = possWin(5);
        if(p.length>1){
            goN(p[0],p[1])
        }else if(p2.length>1){
            goN(p2[0],p2[1]);
        }else{
            const t = goBlank()
            goN(t[0],t[1]);
        }
    }else if(turn == 8){
        const p = possWin(5);
        const p2 = possWin(1);
        if(p.length>1){
            goN(p[0],p[1])
        }else if(p2.length>1){
            goN(p2[0],p2[1]);
        }else{
            const t = goBlank()
            goN(t[0],t[1]);
        }
    }else if(turn == 9){
        const p = possWin(1);
        const p2 = possWin(5);
        if(p.length>1){
            goN(p[0],p[1])
        }else if(p2.length>1){
            goN(p2[0],p[1]);
        }else{
            const t = goBlank()
            goN(t[0],t[1]);
        }
    }
}
//Juega la maquina
function goBlank(){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(game[i][j] == 0){
                return [i,j]
            }
        }
    }
}
function maketwo(){
    if(game[1][1] == 0){
        return [1,1];
    }else if (game[1][0] == 0){
        return [1,0]
    }else if (game[0][1] == 0){
        return [0,1]
    }else if (game[2][1] == 0){
        return [2,1]
    }else if (game[1][2] == 0){
        return [1,2]
    }
    return false;
}
function goN(x,y){
    if (game[x][y] != 0) return;
    game[x][y] = 5;
}
function possWin(x){
    const values  = [
        [{v:game[0][0]+game[1][1]+game[2][2],x1:0,y1:0,x2:1,y2:1,x3:2,y3:2}],
        [{v:game[2][0]+game[1][1]+game[0][2],x1:2,y1:0,x2:1,y2:1,x3:0,y3:2}],
        [{v:game[0][0]+game[0][1]+game[0][2],x1:0,y1:0,x2:0,y2:1,x3:0,y3:2}],
        [{v:game[1][0]+game[1][1]+game[1][2],x1:1,y1:0,x2:1,y2:1,x3:1,y3:2}],
        [{v:game[2][0]+game[2][1]+game[2][2],x1:2,y1:0,x2:2,y2:1,x3:2,y3:2}],
        [{v:game[0][0]+game[1][0]+game[2][0],x1:0,y1:0,x2:1,y2:0,x3:2,y3:0}],
        [{v:game[0][1]+game[1][1]+game[2][1],x1:0,y1:1,x2:1,y2:1,x3:2,y3:1}],
        [{v:game[0][2]+game[1][2]+game[2][2],x1:0,y1:2,x2:1,y2:2,x3:2,y3:2}]
     ]
     let toReturn = 0;
     values.forEach(el =>{
         if(el[0].v == x*2){
            if(game[el[0].x1][el[0].y1] == 0){
                // console.log([el[0].x1,el[0].y1])
                toReturn = [el[0].x1,el[0].y1]
            } else if(game[el[0].x2][el[0].y2] == 0){
                // console.log([el[0].x2,el[0].y2])
                toReturn = [el[0].x2,el[0].y2]
            }else if(game[el[0].x3][el[0].y3] == 0){
               toReturn = [el[0].x3,el[0].y3]
                // console.log([el[0].x3,el[0].y3])
            }
         }
     });
     return toReturn
}

function checkWin(){
    //diagonales
    const d1 = game[0][0] + game[1][1] + game[2][2]
    const d2 = game[2][0] + game[1][1] + game[0][2]
    
    const r1 = game[0][0] + game[0][1] + game[0][2]
    const r2 = game[1][0] + game[1][1] + game[1][2]
    const r3 = game[2][0] + game[2][1] + game[2][2]
    
    const c1 = game[0][0] + game[1][0] + game[2][0]
    const c2 = game[0][1] + game[1][1] + game[2][1]
    const c3 = game[0][2] + game[1][2] + game[2][2]
    
    if(r1==3|r2==3|r3==3|c1==3|c2==3|c3==3|d1==3|d2==3){
        console.log('Gana el jugador')
        endGame()
    }else if(r1==15|r2==15|r3==15|c1==15|c2==15|c3==15|d1==15|d2==15){
        console.log('Gana la maquina')
        endGame()
    }else if(turn > 9){
        console.log('Es un empate')
        
    }

}
function endGame(){
    currentPlayer = 1;
    turn = 1;
    game = [[0,0,0],[0,0,0],[0,0,0]]
    clearGame();
}