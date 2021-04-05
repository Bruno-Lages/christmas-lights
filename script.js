///////////////start and stop buttons///////////////////////
const start = document.querySelector('#start');
const stop = document.querySelector('#stop');

////////////////turns lights on//////////////////////////////
start.addEventListener("click", beginLights);

function beginLights(){
    getSpeed();
    getIntensity();
    updateSpeedClass(speed);
    updateIntensityClass(intensity);
    stopLights();
    setTimeout( () => {
        classifyBalls();
        turnOnFirstgroup();
        turnOnSecondGroup();
    }, speed*1000);
}


function classifyBalls(){
    const balls = document.querySelectorAll('.light-ball');
    balls.forEach( (element, index) => {
        element.setAttribute('id', index);
        element.classList.add(Number(element.id) % 2 === 0? 'group1' : 'group2');
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

///////////////////////////////change colors feature/////////////////
const container = document.querySelector('.container');
container.addEventListener('click', e => {
    console.log(e.target);
    console.log(e.target.id);
    ballId = e.target.id;
    showModal();
    }
);

function changeBackground(ballId, colorname){
    el = document.querySelector(`#${ballId}.light-ball`);
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
    return Number(key);
}

//////////////////////intensity////////////////////////
let intensity;

function getIntensity(){
    intensity = document.querySelector('#intensity').value;
    return intensity;
}

function updateIntensityClass(intensity){
    css = document.styleSheets[0].cssRules;
    const balls = document.querySelectorAll('.light-ball');
    balls.forEach( (ball) => {
        if (checkCSS(ball.id)){
            let customClass = findClass(`class-${ball.id}`);
            let rgbBegnin = css[customClass + 1][1].style.boxShadow.indexOf('rgb');
            let rgbEnd = Number(css[customClass + 1][1].style.boxShadow.indexOf(')'))+1;
            let rgbColor = css[customClass + 1][1].style.boxShadow.slice(rgbBegnin, rgbEnd);
            css[customClass + 1][1].style.boxShadow = `0 0 15px ${intensity}px ${rgbColor}`;
        }
    });
    const defaultClass = findClass('bright');
    css[defaultClass + 1][1].style.boxShadow = `0 0 15px ${intensity}px #2349c5`;
    console.log(css[defaultClass + 1].cssText);
}