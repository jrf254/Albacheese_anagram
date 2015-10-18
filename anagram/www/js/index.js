/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function BadController(){
    this.currentViewName = null;

    this.game = null;
    this.gameHasStarted = false;

    this.init();
}

BadController.prototype.init = function(){
    this.currentViewName = "home";

    document.getElementById('newGameButton').addEventListener('click', this.displayElem.bind(this, 'game'));
    document.getElementById('homeScreenButton').addEventListener('click', this.displayElem.bind(this, 'home'));
    document.getElementById('aboutButton').addEventListener('click',  this.displayElem.bind(this, 'about'));
    document.getElementById('creditsButton').addEventListener('click',  this.displayElem.bind(this, 'credits'));
}

BadController.prototype.displayElem = function(element){
    var currentView = document.getElementById(this.currentViewName);
    currentView.className += " hidden";

    this.currentViewName = element;
    var newView = document.getElementById(this.currentViewName);
    newView.className = newView.className.replace(new RegExp('(\\s|^)' + 'hidden' + '(\\s|$)'),'');
    if(element == 'game' && this.gameHasStarted == false){
        this.gameHasStarted = true;
        this.game = new AnagramGame();
    }
}

function AnagramGame(){
    this.availableLetters = []; //psudorandomly generated
    this.avalilableWords = []; //pulled from the availableLetters
    this.inputField = null;
    this.letterFields = null;
    this.timerId = null;
    this.timeLeft = null;

    this.init();
}

AnagramGame.prototype.init = function(){
    this.inputField = document.getElementById('js-input-field');
    this.letterFields = document.getElementsByClassName('js-letter-input');

    document.getElementById('js-clear-all').addEventListener('click', this.clearAll.bind(this));
    document.getElementById('js-enter-word').addEventListener('click', this.enterWord.bind(this));
    document.getElementById('js-shuffle-game').addEventListener('click', this.shuffleBoard.bind(this));
    document.getElementById('js-new-game').addEventListener('click', this.newGame.bind(this));
    
    for(var i=0;i<this.letterFields.length;i++){
        this.letterFields[i].addEventListener('click', this.letterInput.bind(this, this.letterFields[i]), false);
    }
}

AnagramGame.prototype.generateLetters = function(){
    this.availableLetters = [];
    var possibleVowels = ['a','e','i','o','u'];
    var possibleConsonants = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z'];
    for(var i = 0; i < 3; i++){
        var element = Math.floor(Math.random() * (possibleVowels.length - 1));
        console.log(element, possibleVowels[element]);
        this.availableLetters.push(possibleVowels[element]);
    }

    for(var i = 0; i < 6; i++){
        var element = Math.floor(Math.random() * (possibleConsonants.length - 1));
        this.availableLetters.push(possibleConsonants[element]);
    }
}

AnagramGame.prototype.shuffle = function(){
    var currentIndex = this.availableLetters.length, tempValue, randomIndex;

    while (0 !== currentIndex){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        tempValue = this.availableLetters[currentIndex];
        this.availableLetters[currentIndex] = this.availableLetters[randomIndex];
        this.availableLetters[randomIndex] = tempValue;
    }
}

AnagramGame.prototype.shuffleBoard = function(){
    this.clearAll();
    this.shuffle();
    this.displayLetters();
}

AnagramGame.prototype.displayLetters = function(){
    for(var i=0;i<this.letterFields.length;i++){
        this.letterFields[i].innerText = this.availableLetters[i];
    }
}

AnagramGame.prototype.letterInput = function(input){
    this.inputField.innerText += input.innerText;
    input.disabled = true;
}

AnagramGame.prototype.clearAll = function(){
    this.inputField.innerText = "";
    for(var i=0;i<this.letterFields.length;i++){
        this.letterFields[i].disabled = false;
    }
}

AnagramGame.prototype.newGame = function(){
    this.generateLetters();
    this.shuffleBoard();
    this.startTimer();
}

AnagramGame.prototype.startTimer = function(){
    this.timerId = window.setInterval(this.tickTimer.bind(this), 1000);
    this.timeLeft = 120;
    document.getElementById('js-timer-content').innerText = this.timeLeft;
}

AnagramGame.prototype.tickTimer = function(){
    this.timeLeft -= 1;
    document.getElementById('js-timer-content').innerText = this.timeLeft;
    if(this.timeLeft == 0){
        this.stopTimer();
    }
}

AnagramGame.prototype.stopTimer = function(){
    window.clearInterval(this.timerId);
    document.getElementById('js-timer-content').innerText = 0;
}

AnagramGame.prototype.enterWord = function(){

}

var badController = new BadController();