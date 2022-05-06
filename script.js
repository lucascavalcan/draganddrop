//variável qu evai armazenar qual item está em cada espaço naquele momento
let areas = {    
    a: null,
    b: null,
    c: null  //pois começa sem nenhum item nas caixas de baixo
}

//tornando os items arrastaveis (evento "dragstart" e "dragend")
document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("dragstart", dragStart);  //evento inicia quando começa a arrastar
    item.addEventListener("dragend", dragEnd);    //evento inicia quando solta o mouse
});

//eventos da área de drop (áreas em que pode soltar o item que foi arrastado)
document.querySelectorAll(".area").forEach(area => {  //toda área de drop criada tem que ter os três eventos a seguir:
    area.addEventListener("dragover", dragOver); //função vai ser rodada sempre que um item for arrastado por cima da area na qual se adicionou o evento
    area.addEventListener("dragleave", dragLeave); //acontece quando estava arrastando por cima e sai de uma área de drop
    area.addEventListener("drop", drop); //quando solta o item arrastado na área de drop
})

//trasnformando a neutralArea tembém em uma área de drop (para poder arrastar de volta os itens)
document.querySelector(".neutralArea").addEventListener("dragover", dragOverNeutral);
document.querySelector(".neutralArea").addEventListener("dragleave", dragLeaveNeutral);
document.querySelector(".neutralArea").addEventListener("drop", dropNeutral);

//Functions item
//função que começa a arrastar
function dragStart(e) {
    //quando começa a arrastar, aplica uma class no item
    e.currentTarget.classList.add("dragging");

};

function dragEnd(e) {
    //quando parar de arrastar (soltar o mouse), vai remover essa class
    e.currentTarget.classList.remove("dragging");
};

//FunctionS area
function dragOver(e) {
    if (e.currentTarget.querySelector(".item") === null) { //verificar se já não tem nenhum item na área onde vai fazer o drop do novo item que está sendo arrastado
        
        //só roda esses comandos quando não tem nenhum item dentro de onde quer fazer o drop:
        e.preventDefault(); //para possibilitar o drop
        e.currentTarget.classList.add("hover"); //adiciona o hover quando estiver na área dropavel
    }
};

function dragLeave(e) {
    e.currentTarget.classList.remove("hover");  //retira o hover quando sair da área dropavel
};

function drop(e) {
    //só funciona quando, no dragover, se libera a possibilidade de dar um drop nesse item específico
    //precisa de um preventDefault no dragover, pois o comportamento padrão é negar o drop
    
    //quando soltar o item, a primeira coisa que faz é remover o hover
    e.currentTarget.classList.remove("hover");
    
    //verificar se já não tem um item no local para onde foi arrastado
    if (e.currentTarget.querySelector(".item") === null) { //se não tem nenhuma div com a class item naquele local para onde foi arrastado
        
        //após isso, precisa pegar o item que foi arrastado (através da class dragging)
        let dragItem = document.querySelector(".item.dragging");
        
        //selecionar um elemento do html e mandar adicionar esse elemento dentro de outro elemento
        //vai usar o appendchild (determina que entre dentro desse elemento e adicionar mais um item no final)
        e.currentTarget.appendChild(dragItem);

        updateAreas();  //atualizando as informações
    }
};

//Functions neutral area

function dragOverNeutral(e) {
    //aqui, não precisa de verificação
    e.preventDefault();
    e.currentTarget.classList.add("hover");
};

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove("hover");
};

function dropNeutral(e) {
    e.currentTarget.classList.remove("hover");
    //aqui, o processo de drop tambem não precisa de verificação (pois não tem problema ja ter outro item naquela área)
    let dragItem = document.querySelector(".item.dragging");
    e.currentTarget.appendChild(dragItem);

    updateAreas();  //atualizando as informações
};

//logic functions
//função que atualiza as áreas (para saber qual item está em cada área naquele momento)
function updateAreas() {  //essa função vai ser rodada dentro dos drops (quando, de fato, for feita uma troca)
    //vai em cada uma das áreas, vê se tem algum item dentro e, se tiver, verifica que item é esse
    document.querySelectorAll(".area").forEach(area => {
        let name = area.getAttribute("data-name");  //pegando o atributo de cada uma das áreas

        if (area.querySelector(".item") !== null) {  //se tem um item dentro da area
            areas[name] = area.querySelector(".item").innerHTML;
        } else {  //caso não ache nenhum item dentro dessa area
            areas[name] = null;
        }
    });

    //deixar a borda de areas verde quando os itens estiverem em sequencia
    if (areas.a === "1" && areas.b === "2" && areas.c === "3") {
        document.querySelector(".areas").classList.add("correct");
    } else {
        document.querySelector(".areas").classList.remove("correct");   
    }
};