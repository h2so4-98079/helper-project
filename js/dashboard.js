/*
#TODO'S

*/

document.addEventListener('DOMContentLoaded', init);

function init(){
    getProblems();
}

//Functions

function getProblems(){
    // console.log("getProblem called");
    //Check---Hey, do I have anything?
    let problemList;
    if(localStorage.getItem('problemList') === null){
        problemList = [];
    }
    else{
        problemList = JSON.parse(localStorage.getItem('problemList'));
    }
    // console.log(problemList);

    let index = 0;
    problemList.forEach(function(problem){
        index++;
        createNode(problem, index);
        // console.log(problem);
    });
    // console.log("getProblem done");
}

function createNode(problem, index){
    // console.log(problem, index);

    let problemTable = document.querySelector('.problem-table');

    // create tr
    const newProblem = document.createElement("tr");
    newProblem.classList.add("problem");

    // create 6 - td

    const indexTD = document.createElement("td");
    indexTD.innerHTML = index;
    indexTD.data = problem;
    newProblem.appendChild(indexTD);

    const nameTD = document.createElement("td");
    const nameLink = document.createElement("a");
    console.log(problem.problemLink);
    nameLink.href = problem.problemLink;
    nameLink.innerHTML = problem.problemName;
    nameTD.appendChild(nameLink);
    newProblem.appendChild(nameTD);

    const ratingTD = document.createElement("td");
    ratingTD.innerHTML = problem.problemRating;
    newProblem.appendChild(ratingTD);

    const dateTD = document.createElement("td");
    dateTD.innerHTML = problem.date;
    newProblem.appendChild(dateTD);

    const codeTD = document.createElement("td");
    const codeLink = document.createElement("a");
    codeLink.classList.add("code-link");
    codeLink.href = "javascript:void(0);";
    codeLink.innerHTML = "code";
    // write the code in the data
    codeLink.data = problem.problemCode;
    codeLink.onclick = function(){
        // create the new pop-up window and show the code in it.
        let page = window.open("", "Code");
        // console.log("this:", this);
        page.document.body.innerHTML = createHtmlPage(this.data);
    };
    // console.log(codeLink);
    codeTD.appendChild(codeLink);
    newProblem.appendChild(codeTD);

    const removeTD = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "remove";
    removeButton.classList.add("remove-button");
    removeButton.onclick = function(){
        // remove the problem on remove button click
        // console.log("parentElement", this.parentElement.parentElement);
        removeProblemLocally(this.parentElement.parentElement);
        // console.log(this);
        this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
    };
    removeTD.appendChild(removeButton);
    newProblem.appendChild(removeTD);

    // console.log(newProblem);
    problemTable.appendChild(newProblem);
}

function createHtmlPage(code){
    // console.log(code);
    let page = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Code</title></head><body><p>'+code+'</p></body></html>'
    // console.log(page);
    return page;
}

function removeProblemLocally(element){
    // console.log("element:", element);
    // console.log(element.firstChild.data);
    //Check---Hey, do I have anything?
    let problemList;
    if(localStorage.getItem('problemList') === null){
        problemList = [];
    }
    else{
        problemList = JSON.parse(localStorage.getItem('problemList'));
    }

    const problem = element.firstChild.data;
    
    // console.log(problem);
    // console.log(getIndex(problemList, problem));
    // console.log(problemList);

    problemList.splice(getIndex(problemList, problem), 1);
    localStorage.setItem('problemList', JSON.stringify(problemList));
}

function getIndex(myArray, searchItem) {
    // console.log(searchItem)
    for(var i = 0, len = myArray.length; i < len; i++) {
        if(JSON.stringify(myArray[i]) === JSON.stringify(searchItem)) return i;
    }
    return -1;
}

function removeAll(){
    localStorage.clear();
}