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
        
        function createLights(cols, rows, displayWidth)
        {
            $('#led').html('<div id="pcb"></div>');
            
            for(i = 0; i < rows; i++){
                for(j = 0; j < cols; j++){
                    if(j == cols) {
                        $('#pcb').append('<span rel="'+j+'" class="light col-'+j+' row-'+i+'" id="c'+j+'-r'+i+'"></span>');
                    } else {
                        $('#pcb').append('<span rel="'+j+'" class="light col-'+j+' row-'+i+' last" id="c'+j+'-r'+i+'"></span>');
                    
                    }
                }
            }

            var lightSize = 6; // width of light + margin
            $('#pcb').css({width: (cols*lightSize)+1 +'px', height: rows*lightSize +'px'});
            $('#led').css({width: displayWidth*lightSize +'px', height: rows*lightSize +'px'});
        }
        
        function getMap(text)
        {
            var paddingAtStart = boardWidth;
            var textMap = new Array();
            var totalCols = 0;
            for(var i=0; i < paddingAtStart; i++){
                textMap[totalCols] = [];
                totalCols++;
            }
            
            for(var i=0; i < text.length; i++){
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
            if(totalCols - paddingAtStart < boardWidth) {
                 for (var i=totalCols; i < boardWidth; i++){
                      textMap[totalCols] = [];  
                      totalCols++;
                 }
            } 
            return textMap;
        }

        function draw(map)
        {
            var maxLength = map.length;
            if(boardWidth > maxLength) {
                 maxLength  =   boardWidth ; 
            }
            for(i=0; i<maxLength; i++){
                for(j=0; j<8; j++){
                    var exist = (map[i] == undefined) ? map[0].indexOf(j) : map[i].indexOf(j);
                    if(exist != undefined && exist >= 0){
                         $('#c'+i+'-r'+(j+1)).addClass('on');
                    }
                }
            }
        }

        function scrollText(textCols)
        {
            var col = $('#led .light').eq(0).attr('rel');
            console.log(col);
            $('#led .col-'+col).remove();/*.each(function(){
                var myId = $(this).attr('id');
                var myRow = myId.substring(myId.indexOf('r')+1, myId.length);
                console.log(col, myId, myRow);
                $(this).insertAfter($('#led .row-'+myRow).eq(textCols-1));
            });*/
            
            
            setTimeout('scrollText('+ textCols +')', 1000)
        }

        // We'll need Array.indexOf method which IE dosent support yet.
        if(!Array.indexOf){ Array.prototype.indexOf = function(obj){ for(var i=0; i<this.length; i++){ if(this[i]==obj){ return i; } } return -1; } }
        var arrText = [];
 var boardWidth = 20;
            var boardheight = 10;
        $(document).ready(function(){
           
            arrText = [];
            $('#content li').each(function(index) {
               arrText.push($(this).text());
            });;
            textMap = getMap(arrText[0]);
            createLights(textMap.length, boardheight, boardWidth);
            draw(textMap);
            scrollText(textMap.length);
            //console.log(textMap);
        })