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
    this.inputField = null;
    this.letters = null;

    this.init();
}

AnagramGame.prototype.init = function(){
    this.inputField = document.getElementById('js-input-field');
    this.letters = document.getElementsByClassName('js-letter-input');

    document.getElementById('js-clear-all').addEventListener('click', this.clearAll.bind(this));
    
    for(var i=0;i<this.letters.length;i++){
        this.letters[i].addEventListener('click', this.letterInput.bind(this, this.letters[i]), false);
    }
}

AnagramGame.prototype.letterInput = function(input){
    console.log(input);
    this.inputField.innerText += input.innerText;
    input.disabled = true;
}

AnagramGame.prototype.clearAll = function(){
    this.inputField.innerText = "";
    for(var i=0;i<this.letters.length;i++){
        this.letters[i].disabled = false;
    }
}

var badController = new BadController();