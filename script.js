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
    balls.forEach( (element, index) => {
        element.classList.add(i % 2 === 0? 'group1' : 'group2');
        i++;
        element.setAttribute('id', index);
        return;
    })
}
function turnOnFirstgroup(){
    const firstBalls = document.querySelectorAll('.group1');
    firstBalls.forEach(ball => {
        console.log(ball.id);
        ball.classList.add(checkCSS(ball.id)? `class-${ball.id}` : 'bright');
    });
}
function turnOnSecondGroup(){
    const secondBalls = document.querySelectorAll('.group2');
    setTimeout(() => secondBalls.forEach(ball => ball.classList.add(checkCSS(ball.id)? `class-${ball.id}` : 'bright')), 500);
}
function checkCSS(id){
    let check = false;
    for (let rule of document.styleSheets[0].rules){
        if (rule.cssText.includes(`class-${id}`)) return check = true;
    }
    return check;
}
///////////////////////////turns lights off//////////////////////////////
stop.addEventListener('click', stopLights);

function stopLights(){
    const balls = document.querySelectorAll('.light-ball');
    balls.forEach(ball => {
        ball.classList.remove('bright');
        ball.classList.remove(`class-${ball.id}`);
    }
        )
}

///////////////////////modals//////////////////
let colorname;
let ballElement;
let ballId;
const button = document.querySelector('.button');
button.addEventListener("click", e => e.preventDefault());
button.addEventListener('click', () => {
    colorname = closeModal();
    createRules(colorname, ballId);
    //beginLights();
    changeBackground(ballId, colorname);
}   );

function showModal(){
    const modal = document.querySelector('.modal');
    modal.style.visibility = "visible";
}

function closeModal(){
    const modal = document.querySelector('.modal');
    modal.style.visibility = "hidden";
    const colorname = document.querySelector('.color').value.replace('#','');
    console.log(colorname);
    return colorname;
}

function createRules(colorname, ballId){
    const styleSheets = document.styleSheets[0];
    console.log(styleSheets);
    styleSheets.insertRule(`.class-${ballId} {animation: animation-${colorname} 0.5s ease-in-out infinite alternate;}`, styleSheets.rules.length);
    styleSheets.insertRule(`@keyframes animation-${colorname} {
        0% {
            box-shadow: 0 0 10px -5px #2349c500;
            background-color: #${colorname}7a;
        }
        100% {
            box-shadow: 0 0 10px 4px #${colorname};
            background-color: #${colorname};
        }
    }`, styleSheets.rules.length);
}

///////////////////////////////future change colors feature/////////////////
const container = document.querySelector('.container');
container.addEventListener('click', e => {
    console.log(e.target);
    ballElement = e.target;
    ballId = e.target.id;
    showModal();
    console.log(e.target.id);
    }
);

function changeBackground(ballId, colorname){
    el = document.getElementById(ballId);
    el.style.backgroundColor = colorname;
}
classifyBalls();