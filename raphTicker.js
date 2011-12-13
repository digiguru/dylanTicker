var 
    colBackground = "black",
    colLightOff = "#422",
    colLightOn = "red",
    colStroke = "black"
    speedLightOn = 20,
    speedLightOff =20,
    lightHolder = [[]],
    currentLights =[],
    QueuedLights = [],
    boardWidth = 160,
    boardHeight = 15,
    textHeight = 8,
    currentLight = [],
    dir = "Right";
    //textMap = [],
    mySentanceArray = [],
    dirArray = [];


var Light = function(row,column,lightBoard)  {
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
    this.Font= Fonts.Simple8();
    this.LightPadding = 1;
    this.LightWidth = 4;
    this.LightPosition= function(row,column) {
        return {x: row * 6, y: column * 6};
    };
    this.width = lightsAlong * 6 + 4;
    this.height = lightsUp * 6 + 4;
    
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
            //setTimeout('pixelOffScreen("","Left","' + row + '","' + column + '")', 20);
            pixelOffScreen("","Left",row,column);
            return this.OffscreenLight;
        }
        return this.GetLightAt(row-1,column);
    };
    this.Right= function(row,column) {
        if(row === boardWidth-1) {
            //setTimeout('pixelOffScreen("","Right","' + row + '","' + column + '")', 20);
            pixelOffScreen("","Right",row,column);
            return this.OffscreenLight;
        }
        return this.GetLightAt(row+1,column);
    };
    this.Up= function(row,column) {
        if(column === 0) {
            //setTimeout('pixelOffScreen("","Up","' + row + '","' + column + '")', 20);
            pixelOffScreen("","Up",row,column);
            return this.OffscreenLight;
        }
        return this.GetLightAt(row,column-1);
    };
    this.Down= function(row,column) {
        if(column === boardHeight-1) {
            //setTimeout('pixelOffScreen("","Down","' + row + '","' + column + '")', 20);
            pixelOffScreen("","Down",row,column);
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
    //this.createLights(lightsAlong, lightsUp);
    this.PrepareLights(lightsAlong, lightsUp);
    this.OffscreenLight = new Light(-10,-10, this);
};

var TextGenerator = function() {
    this.TextMap;
    this.CreateSentanceAndStartScrolling = function ()
    {
        this.TextMap = this.GetTextMap(NextSentance());//arrText[0]);
        
        var temp = TextPreparation[dir](this.TextMap);
        QueuedLights = temp.Queued;
        draw(temp.Onscreen);
        //scrollText();  
    };
    this.GetTextMap= function (text) {
        //!Check this function
        var paddingAtStart = boardWidth;
        var textMap = [];
        var totalCols = 0;
        for(var i=0, l=text.length; i < l; i++){
            var charMap = firstLEDLightBoard.Font[text.charAt(i)];
            if(charMap != undefined){
                for(j = 0; j < charMap.length; j++){
                    textMap[totalCols] = charMap[j];
                    totalCols++;
                }
                // Add a blank col
                textMap[totalCols] = [];
                totalCols++;
            }
        }
        return textMap;
    }
};

var firstLEDLightBoard = new LEDLightBoard(boardWidth,boardHeight,"board");
var firstAnimationText = new TextGenerator();
firstLEDLightBoard.AddTextAnimation(firstAnimationText);



function draw(lights)
{
    for(var i=0, l=lights.length; i < l; i++){
        lights[i].On();
    }
}

var TextPreparation = {
    StartPlot: {
        Left: function(myText) {
            return [boardWidth+myText.length,Math.round(boardHeight/2) - Math.round(textHeight/2)];
        },
        Right: function(myText) {
            return [0-myText.length,Math.round(boardHeight/2) - Math.round(textHeight/2)];
        },
        Up: function(myText) {
            return [Math.round(boardWidth/2) - Math.round(myText.length/2),boardHeight];
        },
        Down: function(myText) {
            return [Math.round(boardWidth/2) - Math.round(myText.length/2),0-boardHeight];
        }        
    },
    Left: function(myText) {
        var currentStartPlot = this.StartPlot.Left(myText),
            onscreenLights = [],
            myQueuedLights = [];
        for(var rowIndex=0, rowMax=myText.length; rowIndex<rowMax; rowIndex++)
        {
            for(var blockNumber=0, blockMax=myText[rowIndex].length; blockNumber<blockMax; blockNumber++)
            {
                var colIndex = myText[rowIndex][blockNumber],
                    lightObj = firstLEDLightBoard.GetLightAt(rowIndex + currentStartPlot[0],colIndex + currentStartPlot[1]);
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
    },
    Right: function(myText) {
        var currentStartPlot = this.StartPlot.Right(myText),
            onscreenLights = [],
            myQueuedLights = [];
        for(var rowIndex=0, rowMax=myText.length; rowIndex<rowMax; rowIndex++)
        {
            for(var blockNumber=0, blockMax=myText[rowIndex].length; blockNumber<blockMax; blockNumber++)
            {
                var colIndex = myText[rowIndex][blockNumber],
                    lightObj = firstLEDLightBoard.GetLightAt(rowIndex + currentStartPlot[0],colIndex + currentStartPlot[1]);
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
    },
    Up: function(myText) {
        var currentStartPlot = this.StartPlot.Up(myText),
            onscreenLights = [],
            myQueuedLights = [];
        for(var rowIndex=0, rowMax=myText.length; rowIndex<rowMax; rowIndex++)
        {
            for(var blockNumber=0, blockMax=myText[rowIndex].length; blockNumber<blockMax; blockNumber++)
            {
                var colIndex = myText[rowIndex][blockNumber],
                    lightObj = firstLEDLightBoard.GetLightAt(rowIndex + currentStartPlot[0],colIndex + currentStartPlot[1]);
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
    },
    Down: function(myText) {
        var currentStartPlot = this.StartPlot.Down(myText),
            onscreenLights = [],
            myQueuedLights = [];
        for(var rowIndex=0, rowMax=myText.length; rowIndex<rowMax; rowIndex++)
        {
            for(var blockNumber=0, blockMax=myText[rowIndex].length; blockNumber<blockMax; blockNumber++)
            {
                var colIndex = myText[rowIndex][blockNumber],
                    lightObj = firstLEDLightBoard.GetLightAt(rowIndex + currentStartPlot[0],colIndex + currentStartPlot[1]);
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
    }
}
// We'll need Array.indexOf method which IE dosent support yet.
if(!Array.indexOf){ Array.prototype.indexOf = function(obj){ for(var i=0; i<this.length; i++){ if(this[i]==obj){ return i; } } return -1; } }


var scrollerQueue = {
    Left: function() {
        var queud = QueuedLights.shift();
        if(queud) {
            for(var i=0, l=queud.length; i < l; i++){
                currentLights.push(firstLEDLightBoard.GetLightAt(boardWidth - 1,queud[i]));
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
                currentLights.push(firstLEDLightBoard.GetLightAt(queud[i],boardHeight - 1));
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
}
function scrollText() {
    var totalOffLights = 0;
    for(var i=0, l=currentLights.length; i<l; i++){
        if (currentLights[i] && currentLights[i] !== firstLEDLightBoard.OffscreenLight) {
            currentLights[i] = currentLights[i].Off()[dir]();
        } else {
            totalOffLights ++;
        }
    }

    scrollerQueue[dir]();
    for(var i=0, l=currentLights.length; i<l; i++){
        if (currentLights[i] && currentLights[i] !== firstLEDLightBoard.OffscreenLight) {
            currentLights[i] = currentLights[i].On();
        }
    }
    if(totalOffLights === currentLights.length && QueuedLights.length === 0) {
        sequenceOffScreen("", [dir]);
    } else {
        //setTimeout('scrollText()', 25);
        
    }
}


timer = setInterval(function() {
    scrollText()
}, 75);

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
    scrollText();
// optional 2nd arg: elem containing the animation
}, animWrapper );

// */

//Events
var sequenceOffScreen = function(e, type) {
    firstAnimationText.CreateSentanceAndStartScrolling();
},
    pixelOffScreen = function(e, type, row, column) {
    //Pixel left screen :)
}
    
var NextSentance = function() {
    if(mySentanceArray.length === 0) {
       mySentanceArray = ["WOWIE", "HELLO HOW ARE YOU?", "THIS IS A REALLY LONG SENTANCE I WONDER IF IT STILL WORKS"]
    }
    if(dirArray.length === 0) {
       dirArray = ["Up","Down","Left","Right"];
    }
    dir = dirArray.shift();
    return mySentanceArray.shift();
}


var docReady = function(){
    //firstLEDLightBoard.createLights(boardWidth, boardHeight);
    firstAnimationText.CreateSentanceAndStartScrolling();
}();




