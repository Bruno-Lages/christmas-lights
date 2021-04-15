class ChristmasLights{
    //creates a serie of properties of the balls
    constructor(){
    this.ballId;
    this.colorname; 
    this.speed;
    this.intensity;
    }

start(){ //begins the aplication
    this.createRow();
    this.classifyBalls();
    this.getClicks();
    this.stop();
    this.chooseColor();
    this.submitButton();
    this.addRow();
    this.removeRow();
    this.closeButton();
}

beginLights(){
    //get the last chosen speed
    this.setSpeed(); 
    //get the last chosen intensity
    this.setIntensity(); 
    //change the speed of all the lights
    this.updateSpeedClass(); 
    //change the intensity of all the lights
    this.updateIntensityClass(); 
    //stop the lights if they are already on, preventing the acceleration of the lights every time someone clicks the start button repeatedly
    this.stopLights(); 
    //after some seconds, turns the lights on
    setTimeout( () => { 
        //splits the balls into two groups
        this.classifyBalls(); 
        //turns the first light group on
        this.turnOnFirstgroup(); 
        // turns the second light group on, according to the chosen speed
        //also preventing the acceleration of the lights every time the lights turn on repeatedly
        this.turnOnSecondGroup(); 
    }, this.speed*1000);
}

//splits the balls into two groups
classifyBalls(){
    //select the balls of the div
    const balls = document.querySelectorAll('.light-ball');
    //creates an index for the loop
    //for each ball, creates an id and a class, according if the index is even or odd;
    balls.forEach( (element, index) => {
        //sets the ball's id
        element.setAttribute('id', index);
        //if the ball id is an even number, puts the ball in the first group, otherwise, add it in the second group 
        element.classList.add(Number(element.id) % 2 === 0? 'group1' : 'group2');
        return;
    })
};

//checks if some custom ball class exist, returning true or false
checkCSS(id){
    let check = false;
    for (let rule of document.styleSheets[0].rules){
        if (rule.cssText.includes(`class-${id}`)) return check = true;
    }
    return check;
}

turnOnFirstgroup(){
    //gets the balls in the first group
    const firstBalls = document.querySelectorAll('.group1');
    //for each ball, checks if theres a custom setting and sets it, otherwise, sets the default class
    firstBalls.forEach(ball => {
        ball.classList.add(this.checkCSS(ball.id)? `class-${ball.id}` : 'bright');
    });
}

turnOnSecondGroup(){
    //gets the balls in the first group
    const secondBalls = document.querySelectorAll('.group2');
    //after the chosen interval, checks if theres a custom setting and sets it, otherwise, sets the default class
    setTimeout(() => secondBalls.forEach(ball => ball.classList.add(this.checkCSS(ball.id)? `class-${ball.id}` : 'bright')), this.speed*1000);
}

setSpeed(){
    this.speed = document.querySelector("#speed").value;
}

//find the key of a class ball in the style sheet
findKeyClass(className){
    let key;
    //gets the style sheet rules object and turn it into an array with the position of each rules, possibiliting the use of the forEach method
    const css = document.styleSheets[0].rules;
    const cssKeys = Object.keys(css);
    //for each ball, checks if the custom class exist and returns the position in the style sheets
    cssKeys.forEach( rule => {
        if (css[rule].cssText.includes(`.${className}`)) return key = rule;
    });
    return Number(key);
}

//update the speed of all the balls
updateSpeedClass(){
    //gets the style sheet and the balls
    const css = document.styleSheets[0].cssRules;
    const balls = document.querySelectorAll('.light-ball');
    //checks if there's a custom ball, finds where it is in the style sheet and change the speed of the animation
    balls.forEach( (ball) => {
        if (this.checkCSS(ball.id)){
            let customClass = this.findKeyClass(`class-${ball.id}`);
            css[customClass].style.animationDuration = this.speed + 's';
        }
    });
    //find where is the default class and change the speed of the animation
    const defaultClass = this.findKeyClass('bright');
    css[defaultClass].style.animationDuration = this.speed + 's';
    //console.log(css[defaultClass].cssText);
}

setIntensity(){
    this.intensity = document.querySelector('#intensity').value;
}

updateIntensityClass(){
    const css = document.styleSheets[0].cssRules;
    const balls = document.querySelectorAll('.light-ball');
    //finds the custom balls animation and change its intensity(box shadow spread radius)
    balls.forEach( (ball) => {
        //checks if there's a custom ball class
        if (this.checkCSS(ball.id)){
            //finds the custom ball class localization in the style sheet
            let customClass = this.findKeyClass(`class-${ball.id}`);
            //The animation rule is always after the class rule. The animation rule is an object with two objects inside, one to when the animation is in 0%, with the key 0, and the another when it reaches 100%, with the key 1. Keeping that in mind, in the second object(with key 1), it finds where the rgb color declaration starts in the box shadow settings
            let rgbBegnin = css[customClass + 1][1].style.boxShadow.indexOf('rgb');
            //finds where the the rgb color declaration finishes in the box shadow settings
            let rgbEnd = Number(css[customClass + 1][1].style.boxShadow.indexOf(')'))+1;
            //takes the string between the start and the end, that is, the rgb of the animation
            let rgbColor = css[customClass + 1][1].style.boxShadow.slice(rgbBegnin, rgbEnd);
            // change the light ball intensity and keeps the color that were there before
            css[customClass + 1][1].style.boxShadow = `0 0 15px ${this.intensity}px ${rgbColor}`;
        }
        //finds the default ball class localization in the style sheet and changes the light intensity(box shadow spread radius)
        const defaultClass = this.findKeyClass('bright');
        css[defaultClass + 1][1].style.boxShadow = `0 0 15px ${this.intensity}px #2349c5`;
        //console.log(css[defaultClass + 1].cssText);
    });
}

stopLights(){
    const balls = document.querySelectorAll('.light-ball');
    balls.forEach( ball => {
        ball.classList.remove('bright');
        ball.classList.remove(`class-${ball.id}`);
    });
}

showModal(){ 
    const modal = document.querySelector('.modal');
    modal.style.display = "flex";
}

setColorname(){
    this.colorname = document.querySelector('.color').value.replace('#','');
    console.log(this.colorname);
}

setBallId(ballId){
    this.ballId = ballId;
}

closeModal(){ //closes the modal and set the colorname
    const modal = document.querySelector('.modal');
    modal.style.display = "none";
}

deleteRule(ballId){ 
    const css = document.styleSheets[0];
    let choosenRule = Number(this.findKeyClass(`class-${ballId}`));
    css.deleteRule(choosenRule);
    css.deleteRule(choosenRule);//the animation occupies the same place of the removed class
}

createRules(){
    const css = document.styleSheets[0];
    if (this.checkCSS(this.ballId)) { //if the chosen ball already has a class, remove the previous class and the animation
        this.deleteRule(this.ballId);
    };
    console.log(css);
    //creates a class in the style sheet
    css.insertRule(`.class-${this.ballId} {animation: animation-${this.colorname} 0.5s ease-in-out infinite alternate;}`, css.rules.length);
    //creates an animation in the style sheet
    css.insertRule(`@keyframes animation-${this.colorname} {
        0% {
            box-shadow: 0 0 10px -5px #2349c500;
            background-color: #${this.colorname}7a;
        }
        100% {
            box-shadow: 0 0 10px 4px #${this.colorname};
            background-color: #${this.colorname};
        }
    }`, css.rules.length);
}

createBalls(container){
    for (let i = 1; i <= 7; i++){
        let ball = document.createElement('div');
        ball.setAttribute('class', 'light-ball');
        container.append(ball);
    }
}

createRow(){
    const container = document.querySelector('.container');
    const row = document.createElement('div');
    row.setAttribute('class', `row${container.childElementCount}`);
    this.createBalls(row);
    container.append(row);
    this.classifyBalls();
}

addRow(){
    const button = document.querySelector('.new-row');
    button.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('.container').childElementCount < 7 && this.createRow();
        this.beginLights();
    })
}

deleteRules(container){
    const row = container;
    const firstId = Number(container.firstElementChild.id);
    const lastId = Number(container.lastElementChild.id);
    console.log(firstId, lastId);
    for (let i = firstId; i < lastId; i++){
        if (this.checkCSS(i)) this.deleteRule(i);
    }
}

deleteRow(){
    const container = document.querySelector('.container');
    this.deleteRules(container.lastChild);
    container.removeChild(container.lastChild);
}

removeRow(){
    const removeButton = document.querySelector('.remove-row');
    removeButton.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('.container').childElementCount > 1 && this.deleteRow();
        this.stopLights();
    })
}

getClicks(){
    const start = document.querySelector('#start');
    start.addEventListener("click", () => this.beginLights());
}

stop(){
    const stop = document.querySelector('#stop');
    stop.addEventListener('click', this.stopLights);
}

chooseColor(){
    const container = document.querySelector('.container');
    container.addEventListener('click', e => {
        this.setBallId(e.target.id);
        console.log(this.ballId);
        this.showModal();
    })
}

submitButton(){
    const button = document.querySelector('.button');
    button.addEventListener("click", e => {
        e.preventDefault();
        this.setColorname();
        this.closeModal();
        this.createRules();
        this.beginLights();
    });
}

closeButton(){
    const button = document.querySelector('.close-modal');
    button.addEventListener('click', () => this.closeModal());
}

}

const christmasLights = new ChristmasLights();
christmasLights.start();
