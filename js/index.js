/* 

#TODO : after opening the page for to add the problem details, on clicking the submit button it should parse the link of the currently opened problem page and save all those information added into the local storage.

#TODO : showDashboardHandler should show the the dashboard
#TODO : showDashboardHandler should show all the data onload.

#issue : "open link in new tab" shows blocked for addProblem
*/

//create the event listner which adds the problem in the dashboard on clicking on the add button

// Selectors
const addProblem = document.querySelector('.add-problem');
const showDashboard = document.querySelector('.show-dashboard');

// Event Listner
addProblem.addEventListener('click', addProblemHandler);
showDashboard.addEventListener('click', showDashboardHandler);

// Functions
function addProblemHandler(event) {
    // open the form to submit!!
    // console.log("addProblemHandler working fine.");
    if(!window.open('../html/form.html', 'Form', 'width=500,height=500')){
        window.open('../html/form.html', '_blank','width=500,height=500');
    }
    // href="./form.html" onclick="return !window.open(this.href, 'Form', 'width=500,height=500')" target="_blank"
}

function showDashboardHandler(event) {
    location.href = '../html/dashboard.html';
}