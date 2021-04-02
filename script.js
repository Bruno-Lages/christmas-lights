///////////////start and stop buttons///////////////////////
const start = document.querySelector('#start');
const stop = document.querySelector('#stop');

////////////////turns lights on//////////////////////////////
start.addEventListener("click", beginLights);

function beginLights(){
    getSpeed();
    updateSpeedClass(speed);
    stopLights();
    setTimeout( () => {
        classifyBalls();
        turnOnFirstgroup();
        turnOnSecondGroup();
    }, speed*1000);
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
        ball.classList.add(checkCSS(ball.id)? `class-${ball.id}` : 'bright');
    });
}
function turnOnSecondGroup(){
    const secondBalls = document.querySelectorAll('.group2');
    setTimeout(() => secondBalls.forEach(ball => ball.classList.add(checkCSS(ball.id)? `class-${ball.id}` : 'bright')), speed*1000);
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
let speed;
const button = document.querySelector('.button');
button.addEventListener("click", e => e.preventDefault());
button.addEventListener('click', () => {
    colorname = closeModal();
    createRules(colorname, ballId);
    //changeBackground(ballId, colorname);
    beginLights();
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
    let key;
    if (checkCSS(ballId, key)) {
        let rule = Number(findCssKey(ballId));
        styleSheets.deleteRule(rule);
        styleSheets.deleteRule(rule);
    };
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
    console.log(e.target.id);
    ballElement = e.target;
    ballId = e.target.id;
    showModal();
    }
);

function changeBackground(ballId, colorname){
    el = document.getElementById(ballId);
    el.style.backgroundColor = colorname;
}
function findCssKey(id){
    let key;
    const css = Object.keys(document.styleSheets[0].rules);
    css.forEach((rule, keys) => {
        console.log(rule);
        if (document.styleSheets[0].rules[rule].cssText.includes(`class-${id}`)) return key = keys;
    })
    return key;
}
classifyBalls();

//////////////////////speed///////////////////////////

function getSpeed(){ 
    speed = document.querySelector("#speed").value;
    console.log(speed);
    return speed;
}

function updateSpeedClass(speed){
    css = document.styleSheets[0].cssRules;
    const balls = document.querySelectorAll('.light-ball');
    balls.forEach( (ball) => {
        if (checkCSS(ball.id)){
            let customClass = findClass(`class-${ball.id}`);
            css[customClass].style.animationDuration = speed + 's';
        }
    });
    const defaultClass = findClass('bright');
    css[defaultClass].style.animationDuration = speed + 's';
    console.log(css[defaultClass].cssText);
}

function findClass(className){
    let key;
    const css = Object.keys(document.styleSheets[0].rules);
    css.forEach((rule) => {
        if (document.styleSheets[0].rules[rule].cssText.includes(`.${className}`)) return key = rule;
    })
    return key;
}