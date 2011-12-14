var textHeight = 8;
    
    
var SentanceFactory = function() {
    var mySentanceArray = [],
        dirArray = [];
    this.NextSentance = function() {
        if(mySentanceArray.length === 0) {
           mySentanceArray = ["WOWIE", "HELLO HOW ARE YOU?", "THIS IS A REALLY LONG SENTANCE I WONDER IF IT STILL WORKS"]
        }
        if(dirArray.length === 0) {
           dirArray = ["Up","Down","Left","Right"];
        }
        firstAnimationText.SetDirection(dirArray.shift());
        return mySentanceArray.shift();
    }; 
};
var sentanceFactory = new SentanceFactory();


var Light = function(row,column,lightBoard)  {
    var colLightOff = "#422",
        colLightOn = "red",
        colStroke = "black"
        speedLightOn = 4000,
        speedLightOff =4000;
    this.row = row;
    this.column = column;
    this.LightBoard = lightBoard;
    var pos;
    if(this.LightBoard) {
        pos = this.LightBoard.LightPosition(row,column);
        this.graphic = this.LightBoard.Paper.circle(pos.x, pos.y, this.LightBoard.LightWidth);
        this.graphic.attr({
            fill: colLightOff,
            stroke: colStroke,
            model: this
        });    
    }
    this.On = function(){
        //var anim = Raphael.animation({
        this.graphic.attr({
            "stroke-width": 2,
            "fill": colLightOn,
            "stroke": colLightOff
        });
        //this.graphic.animate(anim, speedLightOn);
        return this;
    };
    this.Off = function(){
        //var anim = Raphael.animation({
        this.graphic.attr({
            "stroke-width": 1,
            "fill": colLightOff,
            "stroke": colStroke
        });
        //this.graphic.animate(anim, speedLightOn);
        return this;
    };
    this.Left =  function() {
        return this.LightBoard.Left(row,column);
    };
    this.Right = function() {
        return this.LightBoard.Right(row,column);
    };
    this.Up = function() {
        return this.LightBoard.Up(row,column);
    };
    this.Down = function() {
        return this.LightBoard.Down(row,column);
    };
    return this;
}
var LEDLightBoard = function(lightsAlong, lightsUp, elementID) {
    var lightHolder = [[]];
    this.Font= Fonts.Simple8();
    this.LightPadding = 1;
    this.LightWidth = 4;
    this.LightPosition= function(row,column) {
        return {x: row * 6, y: column * 6};
    };
    this.width = lightsAlong * 6 + 4;
    this.height = lightsUp * 6 + 4;
    this.LightsAlong = lightsAlong;
    this.LightsUp = lightsUp;
    
    this.Paper= Raphael(elementID, this.width, this.height);
    this.TextAnimations = [];
    this.AddTextAnimation = function(textAnimation) {
        this.TextAnimations.push(textAnimation);
    }
    
    this.GetLightAt= function(row,column) {
        if(lightHolder[row] && lightHolder[row][column]) {
            return lightHolder[row][column];
        }
        return null;
    };
    this.Left= function(row,column) {
        if(row === 0) {
            return this.OffscreenLight;
        }
        return this.GetLightAt(row-1,column);
    };
    this.Right= function(row,column) {
        if(row === this.LightsAlong-1) {
            return this.OffscreenLight;
        }
        return this.GetLightAt(row+1,column);
    };
    this.Up= function(row,column) {
        if(column === 0) {
            return this.OffscreenLight;
        }
        return this.GetLightAt(row,column-1);
    };
    this.Down= function(row,column) {
        if(column === this.LightsUP-1) {
            return this.OffscreenLight;
        }
        return this.GetLightAt(row,column+1);
    };
    this.PrepareLights = function (rows,cols)
    {    
        for(var i = 0; i < rows; i++){
            for(var j = 0; j < cols; j++){
                this.CreateLight(i,j);
            }
        }
    };
    this.CreateLight= function(row,column) {
        var myLight = new Light(row,column,this);
        if(!lightHolder[row]) {
            lightHolder[row] = [];
        }
        lightHolder[row][column] = myLight;
    };
    this.PrepareLights(lightsAlong, lightsUp);
    this.OffscreenLight = new Light(-10,-10, this);
    
    this.Draw = function(lights)
    {
        for(var i=0, l=lights.length; i < l; i++){
            lights[i].On();
        }
    }

};

var TextGenerator = function(lightBoard) {
    this.TextMap;
    this.LightBoard = lightBoard;
    this.LightBoard.AddTextAnimation(this);
    this.dir;
    this.NextScrollFrame;
    
    var scrollerQueue = {
        Left: function() {
            var queud = QueuedLights.shift();
            if(queud) {
                for(var i=0, l=queud.length; i < l; i++){
                    currentLights.push(firstLEDLightBoard.GetLightAt(this.LightBoard.LightsAlong - 1,queud[i]));
                }
            }
        },
        Right: function() {
            var queud = QueuedLights.pop();
            if(queud) {
                for(var i=0, l=queud.length; i < l; i++){
                    currentLights.push(firstLEDLightBoard.GetLightAt(1,queud[i]));
                }
            }
            
        },
        Up: function() {
            var queud = QueuedLights.shift();
            if(queud) {
                for(var i=0, l=queud.length; i < l; i++){
                    currentLights.push(firstLEDLightBoard.GetLightAt(queud[i],this.LightBoard.LightsUp - 1));
                }
            }
        },
        Down: function() {
            var queud = QueuedLights.pop();
            if(queud) {
                for(var i=0, l=queud.length; i < l; i++){
                    currentLights.push(firstLEDLightBoard.GetLightAt(queud[i],1));
                }
            }
            
        }
    },
    QueuedLights = [],
    currentLights = [];
    this.SetDirection = function(direction) {
        this.dir = direction;
        this.NextScrollFrame = scrollerQueue[this.dir];
        
    }
    this.Go = function() {
        this.CreateSentanceAndStartScrolling();
        this.startTimer();
    }
    //this.currentLights =[];
    this.CreateSentanceAndStartScrolling = function ()
    {
        this.TextMap = this.GetTextMap(sentanceFactory.NextSentance());//arrText[0]);
        
        var temp = this[this.dir](this.TextMap);
        QueuedLights = temp.Queued;
        this.LightBoard.Draw(temp.Onscreen);
        //scrollText();  
    };
    this.GetTextMap= function (text) {
        //!Check this function
        var textMap = [];
        var totalCols = 0;
        for(var i=0, l=text.length; i < l; i++){
            var charMap = this.LightBoard.Font[text.charAt(i)];
            if(charMap != undefined){
                for(j = 0; j < charMap.length; j++){
                    textMap[totalCols] = charMap[j];
                    totalCols++;
                }
                textMap[totalCols] = [];
                totalCols++;
            }
        }
        return textMap;
    };
    
    this.Left = function(myText) {
        var currentStartPlot = [this.LightBoard.LightsAlong+myText.length,Math.round(this.LightBoard.LightsUp/2) - Math.round(textHeight/2)],
            onscreenLights = [],
            myQueuedLights = [];
        for(var rowIndex=0, rowMax=myText.length; rowIndex<rowMax; rowIndex++)
        {
            for(var blockNumber=0, blockMax=myText[rowIndex].length; blockNumber<blockMax; blockNumber++)
            {
                var colIndex = myText[rowIndex][blockNumber],
                    lightObj = this.LightBoard.GetLightAt(rowIndex + currentStartPlot[0],colIndex + currentStartPlot[1]);
                if (lightObj) {
                     onscreenLights.push(lightObj); 
                } else {
                    if(!myQueuedLights[rowIndex]) {
                        myQueuedLights[rowIndex] = [];
                    }
                    myQueuedLights[rowIndex].push(colIndex + currentStartPlot[1]);
                }
            }
        }   
        return {Onscreen:onscreenLights,Queued:myQueuedLights};
    };
    this.Right = function(myText) {
        var currentStartPlot = [0-myText.length,Math.round(this.LightBoard.LightsUp/2) - Math.round(textHeight/2)],
            onscreenLights = [],
            myQueuedLights = [];
        for(var rowIndex=0, rowMax=myText.length; rowIndex<rowMax; rowIndex++)
        {
            for(var blockNumber=0, blockMax=myText[rowIndex].length; blockNumber<blockMax; blockNumber++)
            {
                var colIndex = myText[rowIndex][blockNumber],
                    lightObj = this.LightBoard.GetLightAt(rowIndex + currentStartPlot[0],colIndex + currentStartPlot[1]);
                if (lightObj) {
                     onscreenLights.push(lightObj); 
                } else {
                    if(!myQueuedLights[rowIndex]) {
                        myQueuedLights[rowIndex] = [];
                    }
                    myQueuedLights[rowIndex].push(colIndex + currentStartPlot[1]);
                }
            }
        }   
        return {Onscreen:onscreenLights,Queued:myQueuedLights};
    };
    this.Up = function(myText) {
        var currentStartPlot = [Math.round(this.LightBoard.LightsAlong/2) - Math.round(myText.length/2),this.LightBoard.LightsUp],
            onscreenLights = [],
            myQueuedLights = [];
        for(var rowIndex=0, rowMax=myText.length; rowIndex<rowMax; rowIndex++)
        {
            for(var blockNumber=0, blockMax=myText[rowIndex].length; blockNumber<blockMax; blockNumber++)
            {
                var colIndex = myText[rowIndex][blockNumber],
                    lightObj = this.LightBoard.GetLightAt(rowIndex + currentStartPlot[0],colIndex + currentStartPlot[1]);
                if (lightObj) {
                     onscreenLights.push(lightObj); 
                } else {
                    if(!myQueuedLights[colIndex]) {
                        myQueuedLights[colIndex] = [];
                    }
                    myQueuedLights[colIndex].push(rowIndex + currentStartPlot[0]);
                }
            }
        }
        return {Onscreen:onscreenLights,Queued:myQueuedLights};
    };
    this.Down = function(myText) {
        var currentStartPlot = [Math.round(this.LightBoard.LightsAlong/2) - Math.round(myText.length/2),0-this.LightBoard.LightsUp],
            onscreenLights = [],
            myQueuedLights = [];
        for(var rowIndex=0, rowMax=myText.length; rowIndex<rowMax; rowIndex++)
        {
            for(var blockNumber=0, blockMax=myText[rowIndex].length; blockNumber<blockMax; blockNumber++)
            {
                var colIndex = myText[rowIndex][blockNumber],
                    lightObj = this.LightBoard.GetLightAt(rowIndex + currentStartPlot[0],colIndex + currentStartPlot[1]);
                if(lightObj) {
                    onscreenLights.push(lightObj);       
                } else {
                    if(!myQueuedLights[colIndex]) {
                        myQueuedLights[colIndex] = [];
                    }
                    myQueuedLights[colIndex].push(rowIndex + currentStartPlot[0]);
                }
            }
        }   
        return {Onscreen:onscreenLights,Queued:myQueuedLights};
    };
    
    
    
    this.ScrollText = function () {
        var totalOffLights = 0;
        for(var i=0, l=currentLights.length; i<l; i++){
            if (currentLights[i] && currentLights[i] !== firstLEDLightBoard.OffscreenLight) {
                currentLights[i] = currentLights[i].Off()[this.dir]();
            } else {
                totalOffLights ++;
            }
        }
        //scrollerQueue[this.dir]();
        this.NextScrollFrame();
        for(var i=0, l=currentLights.length; i<l; i++){
            if (currentLights[i] && currentLights[i] !== firstLEDLightBoard.OffscreenLight) {
                currentLights[i] = currentLights[i].On();
            }
        }
        if(totalOffLights === currentLights.length && QueuedLights.length === 0) {
            this.sequenceOffScreen("", [this.dir]);
        } 
    }
    
    var timer;
    this.startTimer=function(){ 
        var inst=this; 
        console.log('startTimer this: ',this); 
        timer=setInterval(function(){ 
            console.log('setInterval this: ',this); 
            inst.ScrollText(); 
        },75); 
    };
    //this.startTimer();
    
    
    this.sequenceOffScreen = function(e, type)
    {
        this.CreateSentanceAndStartScrolling();
    };
    this.pixelOffScreen = function(e, type, row, column)
    {
        //Pixel left screen :)
    };
    


    /*var docReady = function(){
    //firstLEDLightBoard.createLights(boardWidth, boardHeight);
        firstAnimationText.CreateSentanceAndStartScrolling();
    }();*/

    
};

var firstLEDLightBoard = new LEDLightBoard(160,15,"board");
var firstAnimationText = new TextGenerator(firstLEDLightBoard);
firstLEDLightBoard.AddTextAnimation(firstAnimationText);
firstAnimationText.Go();
//var secondAnimationText = new TextGenerator(firstLEDLightBoard);
//firstLEDLightBoard.AddTextAnimation(secondAnimationText);
//secondAnimationText.Go();

// We'll need Array.indexOf method which IE dosent support yet.
if(!Array.indexOf){ Array.prototype.indexOf = function(obj){ for(var i=0; i<this.length; i++){ if(this[i]==obj){ return i; } } return -1; } }







/*
// Cross browser, backward compatible solution
(function( window, Date ) {
// feature testing
var raf = window.mozRequestAnimationFrame    ||
          window.webkitRequestAnimationFrame ||
          window.msRequestAnimationFrame     ||
          window.oRequestAnimationFrame;

window.animLoop = function( render, element ) {
  var running, lastFrame = +new Date;
  function loop( now ) {
    if ( running !== false ) {
      raf ?
        raf( loop, element ) :
        // fallback to setTimeout
        setTimeout( loop, 25 );
      // Make sure to use a valid time, since:
      // - Chrome 10 doesn't return it at all
      // - setTimeout returns the actual timeout
      now = now && now > 1E4 ? now : +new Date;
      var deltaT = now - lastFrame;
      // do not render frame when deltaT is too high
      if ( deltaT < 160 ) {
        running = render( deltaT, now );
      }
      lastFrame = now;
    }
  }
  loop();
};
})( window, Date );


var animWrapper = document.getElementById("board");

// Usage
animLoop(function( deltaT, now ) {
    firstAnimationText.ScrollText();
// optional 2nd arg: elem containing the animation
}, animWrapper );

// */

//Events


