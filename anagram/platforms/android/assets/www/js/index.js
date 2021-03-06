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

    this.init();
}

BadController.prototype.init = function(){
    this.currentViewName = "game";

    var inputField = document.getElementById('js-input-field');

    document.getElementById('newGameButton').addEventListener('click', function(){badController.displayElem('game');});
    document.getElementById('homeScreenButton').addEventListener('click', function(){badController.displayElem('home');});
    document.getElementById('aboutButton').addEventListener('click',  function(){badController.displayElem('about');});
    document.getElementById('creditsButton').addEventListener('click',  function(){badController.displayElem('credits');});


    document.getElementById('js-clear-all').addEventListener('click',  function(){clearAll()});

   var letters = document.getElementsByClassName('js-letter-input');

    for(var i=0;i<letters.length;i++){
        var input = letters[i].innerText;
        letters[i].addEventListener('click', function(){letterInput(this);}, false);
    }

    function clearAll() {
        inputField.innerText = "";

        for(var i=0;i<letters.length;i++){
            letters[i].disabled = false;
        }

    }

    function letterInput(input) {
        inputField.innerText += input.innerText;
        input.disabled = true;
    }


}

BadController.prototype.displayElem = function(element){
    var currentView = document.getElementById(this.currentViewName);
    currentView.className += " hidden";

    this.currentViewName = element;
    var newView = document.getElementById(this.currentViewName);
    newView.className = newView.className.replace(new RegExp('(\\s|^)' + 'hidden' + '(\\s|$)'),'');
    console.log("fuck");
}


var badController = new BadController();