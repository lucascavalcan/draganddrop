let areas = {    
    a: null,
    b: null,
    c: null 
}

//tornando os items arrastaveis
document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("dragstart", dragStart); 
    item.addEventListener("dragend", dragEnd);    
});

//eventos da área de drop 
document.querySelectorAll(".area").forEach(area => { 
    area.addEventListener("dragover", dragOver); 
    area.addEventListener("dragleave", dragLeave); 
    area.addEventListener("drop", drop); 
})

//trasnformando a neutralArea tembém em uma área de drop 
document.querySelector(".neutralArea").addEventListener("dragover", dragOverNeutral);
document.querySelector(".neutralArea").addEventListener("dragleave", dragLeaveNeutral);
document.querySelector(".neutralArea").addEventListener("drop", dropNeutral);

//Functions item
function dragStart(e) {
    e.currentTarget.classList.add("dragging");

};

function dragEnd(e) {
    e.currentTarget.classList.remove("dragging");
};

//FunctionS area
function dragOver(e) {
    if (e.currentTarget.querySelector(".item") === null) { 
        
        e.preventDefault(); 
        e.currentTarget.classList.add("hover");
    }
};

function dragLeave(e) {
    e.currentTarget.classList.remove("hover");  
};

function drop(e) {
    
    e.currentTarget.classList.remove("hover");
    
    if (e.currentTarget.querySelector(".item") === null) { 
        
        let dragItem = document.querySelector(".item.dragging");
        
        e.currentTarget.appendChild(dragItem);

        updateAreas();  
    }
};

//Functions neutral area

function dragOverNeutral(e) {
    //não precisa de verificação
    e.preventDefault();
    e.currentTarget.classList.add("hover");
};

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove("hover");
};

function dropNeutral(e) {
    e.currentTarget.classList.remove("hover");
    //tambem não precisa de verificação (pois não tem problema ja ter outro item naquela área)
    let dragItem = document.querySelector(".item.dragging");
    e.currentTarget.appendChild(dragItem);

    updateAreas();  
};

//logic functions
function updateAreas() {  
    document.querySelectorAll(".area").forEach(area => {
        let name = area.getAttribute("data-name");  

        if (area.querySelector(".item") !== null) {  
            areas[name] = area.querySelector(".item").innerHTML;
        } else {  
            areas[name] = null;
        }
    });

    
    if (areas.a === "1" && areas.b === "2" && areas.c === "3") {
        document.querySelector(".areas").classList.add("correct");
    } else {
        document.querySelector(".areas").classList.remove("correct");   
    }
};