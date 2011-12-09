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
var LEDLightBoard = {
    Font: Fonts.Simple8(),
    Paper: Raphael("board", 900, 900)
}
var PositionHelper = {
    GetLightAt: function(row,column) {
        if(lightHolder[row] && lightHolder[row][column]) {
            return lightHolder[row][column];
        }
        return null;
    },
    Left: function(row,column) {
        if(row === 0) {
            setTimeout('pixelOffScreen("","Left","' + row + '","' + column + '")', 20);
            return myOffscreenLight;
        }
        return this.GetLightAt(row-1,column);
    },
    Right: function(row,column) {
        if(row === boardWidth-1) {
            setTimeout('pixelOffScreen("","Right","' + row + '","' + column + '")', 20);
            return myOffscreenLight;
        }
        return this.GetLightAt(row+1,column);
    },
    Up: function(row,column) {
        if(column === 0) {
            setTimeout('pixelOffScreen("","Up","' + row + '","' + column + '")', 20);
            return myOffscreenLight;
        }
        return this.GetLightAt(row,column-1);
    },
    Down: function(row,column) {
        if(column === boardHeight-1) {
            setTimeout('pixelOffScreen("","Down","' + row + '","' + column + '")', 20);
            return myOffscreenLight;
        }
        return this.GetLightAt(row,column+1);
    },
    LightWidth: function() {
        return 4;
    },
    SetLightPosition: function(row,column) {
        return {x: row * 6, y: column * 6}
    },
    CreateLight: function(row,column) {
        var myLight = new Light(row,column);
        if(!lightHolder[row]) {
            lightHolder[row] = [];
        }
        
        lightHolder[row][column] = myLight;
    }
}
var Light = function(row,column)  {
    this.row = row;
    this.column = column;
    var pos = PositionHelper.SetLightPosition(row,column)
    this.graphic = LEDLightBoard.Paper.circle(pos.x, pos.y, PositionHelper.LightWidth());
    this.graphic.attr({
        fill: colLightOff,
        stroke: colStroke,
        model: this
    });
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
        return PositionHelper.Left(row,column);
    };
    this.Right = function() {
        return PositionHelper.Right(row,column);
    };
    this.Up = function() {
        return PositionHelper.Up(row,column);
    };
    this.Down = function() {
        return PositionHelper.Down(row,column);
    };
    return this;
}
var myOffscreenLight = new Light(-10,-10);
       
function createLights(rows,cols)
{    
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            PositionHelper.CreateLight(i,j);
        }
    }
}

function getTextMap(text)
{
    //!Check this function
    var paddingAtStart = boardWidth;
    var textMap = [];
    var totalCols = 0;
    for(var i=0, l=text.length; i < l; i++){
        var charMap = LEDLightBoard.Font[text.charAt(i)];
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
                    lightObj = PositionHelper.GetLightAt(rowIndex + currentStartPlot[0],colIndex + currentStartPlot[1]);
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
                    lightObj = PositionHelper.GetLightAt(rowIndex + currentStartPlot[0],colIndex + currentStartPlot[1]);
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
                    lightObj = PositionHelper.GetLightAt(rowIndex + currentStartPlot[0],colIndex + currentStartPlot[1]);
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
                    lightObj = PositionHelper.GetLightAt(rowIndex + currentStartPlot[0],colIndex + currentStartPlot[1]);
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
                currentLights.push(PositionHelper.GetLightAt(boardWidth - 1,queud[i]));
            }
        }
    },
    Right: function() {
        var queud = QueuedLights.pop();
        if(queud) {
            for(var i=0, l=queud.length; i < l; i++){
                currentLights.push(PositionHelper.GetLightAt(1,queud[i]));
            }
        }
        
    },
    Up: function() {
        var queud = QueuedLights.shift();
        if(queud) {
            for(var i=0, l=queud.length; i < l; i++){
                currentLights.push(PositionHelper.GetLightAt(queud[i],boardHeight - 1));
            }
        }
    },
    Down: function() {
        var queud = QueuedLights.pop();
        if(queud) {
            for(var i=0, l=queud.length; i < l; i++){
                currentLights.push(PositionHelper.GetLightAt(queud[i],1));
            }
        }
        
    }
}
function scrollText() {
    var totalOffLights = 0;
    for(var i=0, l=currentLights.length; i<l; i++){
        if (currentLights[i] && currentLights[i] !== myOffscreenLight) {
            currentLights[i] = currentLights[i].Off()[dir]();
        } else {
            totalOffLights ++;
        }
    }

    scrollerQueue[dir]();
    for(var i=0, l=currentLights.length; i<l; i++){
        if (currentLights[i] && currentLights[i] !== myOffscreenLight) {
            currentLights[i] = currentLights[i].On();
        }
    }
    if(totalOffLights === currentLights.length && QueuedLights.length === 0) {
        sequenceOffScreen("", [dir]);
    } else {
        setTimeout('scrollText()', 25);
        
    }
}

/*
timer = setInterval(function() {
    scrollText()
}, 25);
*/
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
    CreateSentanceAndStartScrolling();
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
var CreateSentanceAndStartScrolling = function () {
    TheTextMap = getTextMap(NextSentance());//arrText[0]);
    
    var temp = TextPreparation[dir](TheTextMap);
    //{Onscreen:onscreenLights,Queued:QueuedLights}
    QueuedLights = temp.Queued;
    draw(temp.Onscreen);
    scrollText();  
}

var docReady = function(){
    createLights(boardWidth, boardHeight);
    CreateSentanceAndStartScrolling();
}();


/*
function animLoop( render, element ) {
    var running, lastFrame = +new Date;
    function loop( now ) {
        // stop the loop if render returned false
        if ( running !== false ) {
            requestAnimationFrame( loop, element );
            var deltaT = now - lastFrame;
            // do not render frame when deltaT is too high
            if ( deltaT < 160 ) {
                running = render( deltaT );
            }
            lastFrame = now;
        }
    }
    loop( lastFrame );
}
*/



