///////////////start and stop buttons///////////////////////
const start = document.querySelector('#start');
const stop = document.querySelector('#stop');

////////////////turns lights on//////////////////////////////
start.addEventListener("click", beginLights);

function beginLights(){
    stopLights();
    classifyBalls();
    turnOnFirstgroup();
    turnOnSecondGroup();
}


function classifyBalls(){
    const balls = document.querySelectorAll('.light-ball');
    let i = 1;
    balls.forEach( element => {
        element.classList.add(i % 2 === 0? 'group1' : 'group2');
        i++;
        return;
    })
}
function turnOnFirstgroup(){
    const firstBalls = document.querySelectorAll('.group1');
    firstBalls.forEach(ball => ball.classList.add('bright'));
}
function turnOnSecondGroup(){
    const secondBalls = document.querySelectorAll('.group2');
    setTimeout(() => secondBalls.forEach(ball => ball.classList.add('bright')), 500);
}
///////////////////////////turns lights off//////////////////////////////
stop.addEventListener('click', stopLights);

function stopLights(){
    const balls = document.querySelectorAll('.light-ball');
    balls.forEach(ball => {
        ball.classList.remove('group1');
        ball.classList.remove('group2');
        ball.classList.remove('bright');
    }
        )
}

///////////////////////modals//////////////////
const button = document.querySelector('.button');
button.addEventListener("click", e => e.preventDefault());
button.addEventListener('click', closeModal)

function showModal(){
    const modal = document.querySelector('.modal');
    modal.style.visibility = "visible";
}

function closeModal(){
    const modal = document.querySelector('.modal');
    modal.style.visibility = "hidden";
    const color = document.querySelector('.color').value;
    console.log(color);
    return color;
}


///////////////////////////////future change colors feature/////////////////
const container = document.querySelector('.container');
container.addEventListener('click', e => {
    console.log(e.target);
    const color = showModal();
    //cria animação
    beginLights();
    e.target.classList.add('teste');
    }
);