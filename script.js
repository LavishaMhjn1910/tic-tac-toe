const boardEl = document.getElementById('board');
}


function endGame(result){
running = false;
if(result.winner){
messageEl.textContent = result.winner + ' wins!';
scores[result.winner]++;
highlightWin(result.combo);
} else {
messageEl.textContent = "It's a tie!";
scores.T++;
}
updateScores();
}


function highlightWin(combo){
const cells = Array.from(boardEl.children);
const c0 = cells[combo[0]].getBoundingClientRect();
const c2 = cells[combo[2]].getBoundingClientRect();
const boardRect = boardEl.getBoundingClientRect();
const line = document.createElement('div');
line.className = 'line';
const x0 = c0.left + c0.width/2 - boardRect.left;
const y0 = c0.top + c0.height/2 - boardRect.top;
const x2 = c2.left + c2.width/2 - boardRect.left;
const y2 = c2.top + c2.height/2 - boardRect.top;
const dx = x2 - x0, dy = y2 - y0;
const length = Math.hypot(dx,dy);
line.style.width = length + 'px';
line.style.left = (x0 - length/2 + length/2) + 'px';
line.style.top = (y0 - 3) + 'px';
const angle = Math.atan2(dy,dx) * (180/Math.PI);
line.style.transform = `translateX(${0}px) rotate(${angle}deg)`;
boardEl.appendChild(line);
}


function updateUI(){
Array.from(boardEl.children).forEach((cell,i)=>{
const span = cell.querySelector('span');
span.textContent = state[i] || '';
if(state[i]) cell.classList.add('disabled');
});
messageEl.textContent = `${current} moved`;
}


function updateScores(){
scoreXEl.textContent = 'X: ' + scores.X;
scoreOEl.textContent = 'O: ' + scores.O;
scoreTEl.textContent = 'Ties: ' + scores.T;
turnIndicator.textContent = running ? ('Turn: ' + current) : 'Game over';
}


function resetBoard(){
state = Array(9).fill(null);
current = 'X';
running = true;
messageEl.textContent = 'Make a move — X starts';
Array.from(boardEl.querySelectorAll('.line')).forEach(n=>n.remove());
renderBoard();
updateScores();
}


resetBtn.addEventListener('click', resetBoard);
newGameBtn.addEventListener('click', ()=>{
scores = {X:0,O:0,T:0};
resetBoard();
});


renderBoard();
updateScores();


window.addEventListener('keydown',(e)=>{
if(e.key.toLowerCase()==='r') resetBoard();
});