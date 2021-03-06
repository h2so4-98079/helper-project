// #todo : save the data in the mongoDB atlas

document.addEventListener('DOMContentLoaded', init);

function init(){
    console.log("Form opened.");

    //Event Listners
    document.querySelector('.form-cancel-button').addEventListener('click', formCancelButtonHandler);
    document.querySelector('.form-submit-button').addEventListener('click', formSubmitButtonHandler);
}

//Functions
async function formSubmitButtonHandler(event) {
    // save all the information in the local storage
    // event.preventDefault(); // Use this if needed

    let Name = document.querySelector('.problem-name-input').value.trim();
    let Code = document.querySelector('.code-input').value.trim();

    // get the required data using link
    let [Link, Rating, nameUsingLink] = await getDataUsingLink(); 
    
    console.log(Link, Rating, nameUsingLink);
    
    // if problemName empty then replace it with link name
    if(Name == ""){
        Name = nameUsingLink;
    }
    
    let problem = {
        problemName: Name,
        problemRating: Rating,
        problemCode: Code,
        date: new Date().toLocaleDateString(),
        problemLink: Link
    };

    console.log(problem);
    // save problem in local storage
    saveProblemLocally(problem);

    console.log("Working fine - submit");

    // close the opened window
    window.close();
}

function formCancelButtonHandler(event){
    console.log("Working fine - cancel");
    window.close();
}

function saveProblemLocally(problem){
    //Check---Hey, do I have anything?
    let problemList;
    if(localStorage.getItem('problemList') === null){
        problemList = [];
    }
    else{
        // parse the string to the javascript object
        problemList = JSON.parse(localStorage.getItem('problemList'));
    }
    problemList.push(problem);
    // stringify the list and store it in the local storage
    localStorage.setItem('problemList', JSON.stringify(problemList));
}

// functions related to api call

async function getDataUsingLink(){
    // #TODO : get the link of opened tab, using it get the problemRating and name of the problem and return it with link, problemRating and name.
    let link = localStorage.getItem('currentLink'), problemRating = 0, problemName = "none";
    // localStorage.removeItem('currentLink'); // remove during the adding new link so that user can save the same problem multiple times as it's her choice. :)
    console.log(link);
    [problemName, problemRating] = await getNameAndRating(link);
    return [link, problemRating, problemName];
}

async function getNameAndRating(link){
    let [contestId, problemIndex] = getIdAndIndex(link);
    let problemName = -1, problemRating = -1;

    if(contestId == -1 || problemIndex == -1){
        return [problemName, problemRating];
    }

    console.log("contestId : ", contestId);
    console.log("problemIndex : ", problemIndex);

    let url = "https://codeforces.com/api/contest.standings?contestId=" + contestId + "&from=1&count=1";
    console.log("url : ", url);

    let res = await fetchAsync(url);

    if(res.status != "OK"){
        console.log("some error occured!");
        return [problemName, problemRating];
    }

    let problems = res.result.problems;

    problems.forEach(element => {
        if(element.contestId.toString() == contestId.toString() && 
            element.index.toString() == problemIndex.toString()){
                problemName = element.name.toString();
                problemRating = element.rating.toString();

                // console.log("element : ", element);
                // console.log("problemName : ", problemName);
                // console.log("problemRating : ", problemRating);
            }
        // console.log("element : ", element);
    });

    console.log("problemName : ", problemName);
    console.log("problemRating : ", problemRating);

    // console.log("problems : ", problems);
    // console.log("res.status : ", res.status);
    // console.log("res : ", res);

    return [problemName, problemRating];
}

async function fetchAsync(url){
    let response = await fetch(url);
    let data = await response.json();
    console.log("data : ", data);
    return data;
}

function getIdAndIndex(link){
    console.log("link : ", link);

    let cfLinkType1 = "https://codeforces.com/problemset/problem/";
    let cfLinkType2 = "https://codeforces.com/contest/";
    let contestId = -1, problemIndex = -1;

    if(link.includes(cfLinkType1)){
        console.log("yes, 1st type of link : ", cfLinkType1);
        console.log("cfLinkType1 : ", cfLinkType1);

        // get the contestId from the link
        let startPos = cfLinkType1.length;
        let endPos = link.indexOf("/", startPos);
        contestId = link.substr(startPos, endPos-startPos);
        console.log("contestId : ", contestId);

        // get the index of problem
        problemIndex = link[link.length - 1];
        console.log("problemIndex : ", problemIndex);
    }
    else if(link.includes(cfLinkType2)){
        console.log("yes, 2nd type of link : ", cfLinkType2);
        console.log("cfLinkType2 : ", cfLinkType2);

        // get the contestId from the link
        let startPos = cfLinkType2.length;
        let endPos = link.indexOf("/", startPos);
        contestId = link.substr(startPos, endPos-startPos);
        console.log("contestId : ", contestId);

        // get the index of problem
        problemIndex = link[link.length - 1];
        console.log("problemIndex : ", problemIndex);
    }
    else{
        console.log("not a codeforces problem link");
    }

    console.log("contestId : ", contestId);
    console.log("problemIndex : ", problemIndex);

    return [contestId, problemIndex];
}