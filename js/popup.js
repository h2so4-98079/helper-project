/* 

#ISSUE : "open link in new tab" shows blocked for addProblem

*/
document.addEventListener('DOMContentLoaded', init);

function init(){
    console.log("popup opened");
    
    // Event Listner
    document.querySelector('.add-problem').addEventListener('click', addProblemHandler);
    document.querySelector('.show-dashboard').addEventListener('click', showDashboardHandler);

    getLink();
}

// Functions

function getLink(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        // query current tab link...
        localStorage.removeItem('currentLink');
        let currentLink = tabs[0];
        localStorage.setItem('currentLink', currentLink.url);
        console.log(currentLink.url);
        console.log(tabs[0].url);
    });
}

function addProblemHandler(event) {
    // open the form to submit!!
    console.log("addProblemHandler working fine.");

    if(!window.open('../html/form.html', 'Form', 'width=500,height=500')){
        window.open('../html/form.html', '_blank','width=500,height=500');
    }
    // href="./form.html" onclick="return !window.open(this.href, 'Form', 'width=500,height=500')" target="_blank"
}

function showDashboardHandler(event) {
    console.log("showDashboard working fine.");
    // location.href = '../html/dashboard.html';
    chrome.tabs.create({ 'url': chrome.extension.getURL('../html/dashboard.html') });
}