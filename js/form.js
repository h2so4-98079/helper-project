// TODO : create the function for the 
/*
form-cancel-button
form-submit-button
*/

//Selectors
const problemNameInput = document.querySelector('.problem-name-input');
const codeInput = document.querySelector('.code-input');
const formCancelButton = document.querySelector('.form-cancel-button');
const formSubmitButton = document.querySelector('.form-submit-button');

//Event Listners
formCancelButton.addEventListener('click', formCancelButtonHandler);
formSubmitButton.addEventListener('click', formSubmitButtonHandler);

//Functions

function formSubmitButtonHandler(event) {
    // on submission of form it should save all the information in the local storage
    // event.preventDefault();

    // Add all values into the local storage.

    let link = "link"; // get link of the opened tab
    let difficulty = 0; // get difficulty using the link

    let problem = {
        problemName: problemNameInput.value.trim(),
        problemDifficulty: difficulty,
        code: codeInput.value,
        date: new Date(),
        problemLink: link
    };

    //check if entered problem Name is empty?
    if(problem.problemName == ""){
        problem.problemName = getName(problem.problemLink);
    }

    console.log(problem);
    saveProblemLocally(problem);

    console.log("Working fine - submit");
    // window.close(); // uncomment
}

function formCancelButtonHandler(event) {
    console.log("Working fine - cancel")
    window.close();
}

function saveProblemLocally(problem){
    //Check---Hey, do I have anything?
    let problemList;
    if(localStorage.getItem('problemList') === null){
        problemList = [];
    }
    else{
        problemList = JSON.parse(localStorage.getItem('problemList'));
    }
    problemList.push(problem);
    localStorage.setItem('problemList', JSON.stringify(problemList));
}

function getName(link){
    // give the name of the function using the link

    // #TODO : by using the link provide the name of the problem if codeforces problem

    return link;
}