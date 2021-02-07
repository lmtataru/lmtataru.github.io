classArr = [];
function saveHearts() {
    for(var i = 1; i <= 5; i++) {   
        classArr[i] = [];
        for(var j = 0; j < document.getElementById("heart"+i).classList.length; j++){
            classArr[i].push(document.getElementById("heart"+i).classList.item(j));
        }
    }
}

function onhover(hover_id) {
    saveHearts();
    var heart_id = parseInt(hover_id.charAt(hover_id.length-1));

    for(var i = 1; i <= heart_id; i++){
        document.getElementById("heart"+i).classList.add("material_hover");
    }
    for(var i = heart_id+1; i <= 5; i++){
        document.getElementById("heart"+i).classList.remove("material_hover");
    }
}

function nothover() {
    for( var i = 1; i <= 5; i++){
        document.getElementById("heart"+i).classList.remove("material_hover");
        for(var j = 1; j <= classArr[i].length-1; j++){
            document.getElementById("heart"+i).classList.add(classArr[i][j]);
        }
    }
    classArr = [];
}

window.addEventListener('click', function(event) {    
    if (document.getElementById('heart1').contains(event.target) || 
        document.getElementById('heart2').contains(event.target) ||
        document.getElementById('heart3').contains(event.target) ||
        document.getElementById('heart4').contains(event.target) ||
        document.getElementById('heart5').contains(event.target) ){
    
            var heart_id = parseInt(event.target.id.charAt(event.target.id.length-1));
            for(var i = 1; i <= heart_id; i++){
                document.getElementById("heart"+i).classList.add("material_hover");
            }
            for(var i = heart_id+1; i <= 5; i++){
                document.getElementById("heart"+i).classList.remove("material_hover");
            }
            saveHearts();
    } else {
        for( var i = 1; i <= 5; i++){
            document.getElementById("heart"+i).classList.remove("material_hover");
        }
    }
});