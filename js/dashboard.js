/*                  #TODO'S

-> when user click's on the code link then new pop-up window should open up and shows code in it. 
*/

//Selectors
const problemTable = document.querySelector('.problem-table');

//Event Listners
document.addEventListener('DOMContentLoaded', getProblems);

//Functions

function initialize(){
    //Selectors
    var removeButton = document.querySelector('.remove-button');
    var codeLink = document.querySelector('.code-link');

    //Event Listners
    removeButton.addEventListener('click', removeButtonHandler);
    codeLink.addEventListener('click', codeLinkHandler);
    
}

function getProblems(){
    console.log("getProblem called");
    //Check---Hey, do I have anything?
    let problemList;
    if(localStorage.getItem('problemList') === null){
        problemList = [];
    }
    else{
        problemList = JSON.parse(localStorage.getItem('problemList'));
    }
    console.log(problemList);

    let index = 0;
    problemList.forEach(function(problem){
        index++;
        createNode(problem, index);
        // console.log(problem);
    });
    console.log("getProblem done");
    initialize();
}

function createNode(problem, index){
    console.log(problem, index);

    // create tr
    const newProblem = document.createElement("tr");
    newProblem.classList.add("problem");

    // create 6 - td

    const indexTD = document.createElement("td");
    indexTD.innerHTML = index;
    newProblem.appendChild(indexTD);

    const nameTD = document.createElement("td");
    nameTD.innerHTML = problem.problemName;
    newProblem.appendChild(nameTD);
    
    const difficultyTD = document.createElement("td");
    difficultyTD.innerHTML = problem.problemDifficulty;
    newProblem.appendChild(difficultyTD);
    
    const dateTD = document.createElement("td");
    dateTD.innerHTML = problem.date;
    newProblem.appendChild(dateTD);
    
    const codeTD = document.createElement("td");
    const codeLink = document.createElement("a");
    codeLink.classList.add("code-link");
    codeLink.href = "javascript:void(0);";
    codeLink.innerHTML = "code";
    codeLink.data = problem.code;
    codeTD.appendChild(codeLink);
    newProblem.appendChild(codeTD);
    
    const removeTD = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "remove";
    removeButton.classList.add("remove-button");
    removeTD.appendChild(removeButton);
    newProblem.appendChild(removeTD);

    problemTable.appendChild(newProblem);
}

function removeButtonHandler(event){
    console.log("removeButtonHandler called");
}

function codeLinkHandler(event){
    console.log("codeLinkHandler called");
    if(!window.open('../html/code.html', 'Code', 'width=500,height=500')){
        window.open('../html/code.html', '_blank','width=500,height=500');
    }
    const item = event.target;
    console.log(item);
    console.log(item.data);
}

function removeAll(){
    localStorage.clear();
}