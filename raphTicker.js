var GetAlphabeticData = function () {
    var map = new Array();
    // Maps are added by James Curran - http://honestillusion.com/Default.aspx
    map[" "] = [[]];
    map["A"] = [[3,4,5,6,7],[1,2,4],[0,4],[1,2,4],[3,4,5,6,7]];
    map["B"] = [[0,1,2,3,4,5,6,7],[0,3,7],[0,3,7],[0,3,7], [1,2,4,5,6]];
    map["C"] = [[1,2,3,4,5,6],[0,7],[0,7],[0,7], [1,6]]
    map["D"] = [[0,1,2,3,4,5,6,7],[0,7],[0,7],[1,6], [2,3,4,5]];
    map["E"] = [[0,1,2,3,4,5,6,7],[0,3,7],[0,3,7],[0,3,7],[0,7]];
    map["F"] = [[0,1,2,3,4,5,6,7],[0,3],[0,3],[0,3],[0]];
    map["G"] = [[1,2,3,4,5,6],[0,7],[0,7],[0,4,7], [1,4,5,6]]
    map["H"] = [[0,1,2,3,4,5,6,7],[3],[3],[3],[0,1,2,3,4,5,6,7]];
    map["I"] = [[0,7],[0,7],[0,1,2,3,4,5,6,7],[0,7],[0,7]];
    map["J"] = [[0,6],[0,7],[0,7],[0,7],[0,1,2,3,4,5,6]];
    map["K"] = [[0,1,2,3,4,5,6,7],[3],[3],[2,4], [0,1,5,6,7]];
    map["L"] = [[0,1,2,3,4,5,6,7],[7],[7],[7]];
    map["M"] = [[0,1,2,3,4,5,6,7],[2],[3],[2],[0,1,2,3,4,5,6,7]];
    map["N"] = [[0,1,2,3,4,5,6,7],[2],[3],[4],[0,1,2,3,4,5,6,7]];
    map["O"] = [[1,2,3,4,5,6],[0,7],[0,7],[0,7], [1,2,3,4,5,6]];
    map["P"] = [[0,1,2,3,4,5,6,7],[0,3],[0,3],[0,3],[1,2]];
    map["Q"] = [[1,2,3,4,5,6],[0,7],[0,5,7],[0,6], [1,2,3,4,5,6,7]];
    map["R"] = [[0,1,2,3,4,5,6,7],[0,3],[0,3,4], [1,2,5,6,7]];
    map["S"] = [[1,2,6],[0,3,7],[0,3,7],[0,3,7],[1,4,5,6]];
    map["T"] = [[0],[0],[0,1,2,3,4,5,6,7],[0],[0]];
    map["U"] = [[0,1,2,3,4,5,6],[7],[7],[7],[0,1,2,3,4,5,6]];
    map["V"] = [[0,1],[2,3,4],[5,6,7],[2,3,4],[0,1]];
    map["W"] = [[0,1,2,3,4,5,6],[7],[3,4,5,6],[7],[0,1,2,3,4,5,6]];
    map["X"] = [[0,1,6,7],[2,5],[3,4],[2,5],[0,1,6,7]];
    map["Y"] = [[0,1],[2],[3,4,5,6,7],[2],[1,0]];
    map["Z"] = [[0,5,6,7],  [0,4,7],[0,3,7], [0,2,7],[0,1,7]];
    map["0"] = [[2,3,4,5],[1,6],[0,7],[1,6], [2,3,4,5]];
    map["1"] = [[1,7],[0,1,2,3,4,5,6,7],[7]];
    map["2"] = [[1,6,7], [0,5,7], [0,4,7], [0,3,7], [1,2,7]];
    map["3"] = [[1,6],[0,7],[0,3,7],[0,3,7], [1,2,3,4,5,6]];
    map["4"] = [[3,4], [2,4],[1,4],[0,1,2,3,4,5,6,7],[4]];
    map["5"] = [[0,1,2,6],[0,3,7],[0,3,7],[0,3,7], [0,4,5,6]];
    map["6"] = [[1,2,3,4,5,6],[0,3,7],[0,3,7],[0,3,7],[1,4,5,6]];
    map["7"] = [[0],[0,5,6,7],[0,4],[0,3],[0,1,2]];
    map["8"] = [[1,2,4,5,6],[0,3,7],[0,3,7],[0,3,7],[1,2, 4,5,6]];
    map["9"] = [[1,2,6],[0,3,7],[0,3,7],[0,3,7],[1,2,3,4,5,6]];
    map["&amp;"] = [[1,4,5,6], [0,2,3,7], [0,3,7], [0,4,7], [1,5,6]];
    map["/"] = [[6],[5],[4],[3],[2]];
    map["%"] = [[1,2,6],[1,2,5],[4],[3,5,6],[2,5,6]];
    map["#"] = [[2,4], [0,1,2,3,4,5,6],[2,4], [0,1,2,3,4,5,6],[2,4]];
    map["!"] = [[0,1,2,3,4,6,7], [0,1,2,3,4,6,7]];
    map["-"] = [[3], [3], [3]];
    map["("] = [[2,3,4,5],[1,6],[0,7]];
    map[":"] = [[2,5]];
    map[")"] = [[0,7],[1,6],[2,3,4,5]];
    map["*"] = [[1,3,6],[2,3,5],[3,4],[2,4,5],[1,4,6]];
    map["."] = [[6,7],[6,7]];
    map[","] = [[7],[5,6]];
    map["$"] = [[2,3,6],[1,4,7],[0,1,2,3,4,5,6,7],[1,4,7],[2,5,6]];
    map["'"] = [[1],[0]];
    map['"'] = [[0,1],[],[0,1]];
    map['?'] = [[1],[0],[0,4,5,7],[0,3],[1,2]];
    
    return map;
}
var map = GetAlphabeticData(),
    paper = Raphael("board", 900, 900),
    colBackground = "black",
    colLightOff = "#422",
    colLightOn = "red",
    colStroke = "black"
    speedLightOn = 20,
    speedLightOff =20;
var lightHolder = [[]];

var PositionHelper = {
    
    GetLightAt: function(row,column) {
        if(lightHolder[row] && lightHolder[row][column]) {
            return lightHolder[row][column];
        }
        
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
    this.graphic = paper.circle(pos.x, pos.y, PositionHelper.LightWidth());
    this.graphic.attr({
        fill: colLightOff,
        stroke: colStroke,
        model: this
    });
    this.On = function(){
        //console.log("On",this);
        
        //var anim = Raphael.animation({
        this.graphic.attr({
            "stroke-width": 2,
            "fill": colLightOn,
            stroke: colLightOff
        });
        
        //this.graphic.animate(anim, speedLightOn);
        return this;
    };
    this.Off = function(){
        //console.log("Off",this);
        //var anim = Raphael.animation({
         this.graphic.attr({
            "stroke-width": 1,
            "fill": colLightOff,
            stroke: colStroke,
        });
        //this.graphic.animate(anim, speedLightOff);  
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
    
function createLights(rows,cols)
{    
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            /*if(j == cols) {
                $('#pcb').append('<span rel="'+j+'" class="light col-'+j+' row-'+i+'" id="c'+j+'-r'+i+'"></span>');
            } else {
                $('#pcb').append('<span rel="'+j+'" class="light col-'+j+' row-'+i+' last" id="c'+j+'-r'+i+'"></span>');
            
            }*/
            PositionHelper.CreateLight(i,j);
        }
    }

    /*
     var lightSize = 6; // width of light + margin
    $('#pcb').css({width: (cols*lightSize)+1 +'px', height: rows*lightSize +'px'});
    $('#led').css({width: displayWidth*lightSize +'px', height: rows*lightSize +'px'});
    */
}

function getMap(text)
{
    var paddingAtStart = boardWidth;
    var textMap = new Array();
    var totalCols = 0;
   /*
     for(var i=0; i < paddingAtStart; i++){
        textMap[totalCols] = [];
        totalCols++;
    }
   */
    for(var i=0, l=text.length; i < l; i++){
        var charMap = map[text.charAt(i)];
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
  /*
    if(totalCols - paddingAtStart < boardWidth) {
         for (var i=totalCols; i < boardWidth; i++){
              textMap[totalCols] = [];  
              totalCols++;
         }
    }
  */
    return textMap;
}

function draw(lights)
{
    for(var i=0, l=lights.length; i < l; i++){
    //for(var i=0; i<lights.length; i++){
        lights[i].On();
    }
}
var currentLights;

var QueuedLights = [];
var TexPreparation = {
    Left: function(map) {
        var currentStartPlot = [boardWidth+map.length,Math.round(boardHeight/2) - Math.round(textHeight/2)],
            onscreenLights = [];
        
        
        
        
        for(var rowIndex=0, rowMax=map.length; rowIndex<rowMax; rowIndex++)
        {
            for(var blockNumber=0, blockMax=map[rowIndex].length; blockNumber<blockMax; blockNumber++)
            {
                var colIndex = map[rowIndex][blockNumber],
                    lightObj = PositionHelper.GetLightAt(rowIndex + currentStartPlot[0],colIndex + currentStartPlot[1]);
                if (lightObj) {
                     onscreenLights.push(lightObj); 
                } else {
                    if(!QueuedLights[rowIndex]) {
                        QueuedLights[rowIndex] = [];
                    }
                    QueuedLights[rowIndex].push(colIndex + currentStartPlot[1]);
                }
            }
            
            /*
            if(rowIndex + currentStartPlot < boardWidth) {
                for(var blockNumber=0, blockMax=map[rowIndex].length; blockNumber<blockMax; blockNumber++)
                {
                    onscreenLights.push(PositionHelper.GetLightAt(rowIndex + currentStartPlot[0],map[rowIndex][blockNumber] + currentStartPlot[1]));       
                }
            } else {
                QueuedLights.push(map[rowIndex] + currentStartPlot[1]);
            }
            */
        }   
        //return {onscreen:onscreenLights,queued:QueuedLights}
        return onscreenLights;
    },
    Right: function(map) {
        var currentStartPlot = [0-map.length,Math.round(boardHeight/2) - Math.round(textHeight/2)],
            onscreenLights = [];
        for(var rowIndex=0, rowMax=map.length; rowIndex<rowMax; rowIndex++)
        {
            //if(rowIndex + currentStartPlot >= 0) {
            for(var blockNumber=0, blockMax=map[rowIndex].length; blockNumber<blockMax; blockNumber++)
            {
                var colIndex = map[rowIndex][blockNumber],
                    lightObj = PositionHelper.GetLightAt(rowIndex + currentStartPlot[0],colIndex + currentStartPlot[1]);
                if (lightObj) {
                     onscreenLights.push(lightObj); 
                } else {
                    if(!QueuedLights[rowIndex]) {
                        QueuedLights[rowIndex] = [];
                    }
                    QueuedLights[rowIndex].push(colIndex + currentStartPlot[1]);
                }
            }
               
            //} else {
            //    QueuedLights.push(map[rowIndex] + currentStartPlot[1]);
            //}
            
        }   
        //return {onscreen:onscreenLights,queued:QueuedLights}
        return onscreenLights;
    },
    Up: function(map) {
        var currentStartPlot = [Math.round(boardWidth/2) - Math.round(map.length/2),boardHeight],
            onscreenLights = [];
        for(var rowIndex=0, rowMax=map.length; rowIndex<rowMax; rowIndex++)
        {
            for(var blockNumber=0, blockMax=map[rowIndex].length; blockNumber<blockMax; blockNumber++)
            {
                var colIndex = map[rowIndex][blockNumber],
                    lightObj = PositionHelper.GetLightAt(rowIndex + currentStartPlot[0],colIndex + currentStartPlot[1]);
                if (lightObj) {
                     onscreenLights.push(lightObj); 
                } else {
                    if(!QueuedLights[colIndex]) {
                        QueuedLights[colIndex] = [];
                    }
                    QueuedLights[colIndex].push(rowIndex + currentStartPlot[0]);
                }
            }
            //QueuedLights.push(queuedLightsItem);
        }
        return onscreenLights;
    },
    Down: function(map) {
        var currentStartPlot = [Math.round(boardWidth/2) - Math.round(map.length/2),0-boardHeight],
            onscreenLights = [];
        for(var rowIndex=0, rowMax=map.length; rowIndex<rowMax; rowIndex++)
        {
            for(var blockNumber=0, blockMax=map[rowIndex].length; blockNumber<blockMax; blockNumber++)
            {
                var colIndex = map[rowIndex][blockNumber],
                    lightObj = PositionHelper.GetLightAt(rowIndex + currentStartPlot[0],colIndex + currentStartPlot[1]);
                if(lightObj) {
                    onscreenLights.push(lightObj);       
                } else {
                    if(!QueuedLights[colIndex]) {
                        QueuedLights[colIndex] = [];
                    }
                    QueuedLights[colIndex].push(rowIndex + currentStartPlot[0]);
                }
            }
        }   
        return onscreenLights;
    }
}
function GetLightsForText(map) {
    /*var maxLength = map.length;
    if(boardWidth > maxLength) {
         maxLength  =   boardWidth ; 
    }*/
    
}
/*
function scrollText(textCols)
{
    var col = $('#led .light').eq(0).attr('rel');
    console.log(col);
    $('#led .col-'+col).remove();
    
    
    setTimeout('scrollText('+ textCols +')', 1000)
}

// We'll need Array.indexOf method which IE dosent support yet.
if(!Array.indexOf){ Array.prototype.indexOf = function(obj){ for(var i=0; i<this.length; i++){ if(this[i]==obj){ return i; } } return -1; } }
var arrText = [];

*/
var boardWidth = 160,
    boardHeight = 15,
    textHeight = 8,
    currentLight,
    dir = "Right";

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

    /*currentLight = currentLight.Off()[dir]().On();
    if (currentLight !== myOffscreenLight) {
        setTimeout('scrollText()', 20);
    }*/
    var totalOffLights = 0;
    
    ;
   
    
    for(var i=0, l=currentLights.length; i<l; i++){
    //for(var i=0; i<currentLights.length; i++){
        if (currentLights[i] && currentLights[i] !== myOffscreenLight) {
            currentLights[i] = currentLights[i].Off()[dir]();
        } else {
            totalOffLights ++;
        }
    }
    /*for(var i=0; i<offScreenLights.length; i++){
        if (offScreenLights[i] !== myOffscreenLight) {
            offScreenLights[i] = offScreenLights[i].Off()[dir]();
        } else {
            totalOffLights ++;
        }
    }*/
    
    scrollerQueue[dir]();
   
    
    for(var i=0, l=currentLights.length; i<l; i++){
        if (currentLights[i] && currentLights[i] !== myOffscreenLight) {
            currentLights[i] = currentLights[i].On();
        }
    }
    if(totalOffLights === currentLights.length && QueuedLights.length === 0) {
        //$(document).trigger("sequenceOffScreen",[dir]);
        sequenceOffScreen("", [dir]);
    } else {
        setTimeout('scrollText()', 25);
        
    }
    //currentLights = currentLights.Off()[dir]().On();
}

var myOffscreenLight = new Light(-10,-10);
var textMap;
var sequenceOffScreen = function(e, type) {
    CreateSentanceAndStartScrolling();
};
var pixelOffScreen = function(e, type, row, column) {
    //Pixel left screen :)
};
var mySentanceArray = [],
    dirArray = [];
    
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
    textMap = getMap(NextSentance());//arrText[0]);
    currentLights = TexPreparation[dir](textMap);
    draw(currentLights);
    scrollText();  
}

var docReady = function(){
    
    createLights(boardWidth, boardHeight);
    CreateSentanceAndStartScrolling();
    
}();


