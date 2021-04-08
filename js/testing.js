// let link = "https://www.youtube.com/"
let link1 = "https://codeforces.com/problemset/problem/1506/A";
let link2 = "https://codeforces.com/contest/1506/problem/A";
let link3 = "https://www.youtube.com/";
let link4 = "https://codeforces.com/problemset/problem/1510/K";
let link5 = "https://codeforces.com/contest/1510/problem/A";

removeAll();
function removeAll(){
    localStorage.clear();
}

// localStorage.setItem('currentLink', "https://codeforces.com/problemset/problem/1506/G");
// // #issue : afterwards getNameAndRating() directly other code start working without updating the values problemName and problemRating

// // getIdAndIndex(link5);
// let problemName = -1, problemRating = -1;

// getNameAndRating().then(response => {
//     // console.log(x);
//     problemName = response[0], problemRating = response[1];
// });

// console.log("problemName 1 : ", problemName);
// console.log("problemRating 1 : ", problemRating);

async function getNameAndRating(){
    let [contestId, problemIndex] = getIdAndIndex(link1);
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

// testingRelatedToLink();

function testingRelatedToLink(){
    let link1 = "https://codeforces.com/problemset/problem/1506/A";
    let link2 = "https://codeforces.com/contest/1506/problem/A";
    // let link = link1;
    let link = link2;
    // let link = "https://www.youtube.com/"

    let cfLinkType1 = "https://codeforces.com/problemset/problem/";
    let cfLinkType2 = "https://codeforces.com/contest/";
    console.log("link : ", link);
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
}
