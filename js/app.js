// modified from http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
  var vars = {}, hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars[hash[0]] = hash[1];
  }
  return vars;
}



function getProjects() {
  var projects = [];
  var c = cookie.get("projects");
  if (c) {
    projects = JSON.parse(c);
  }
  return projects;
}
var projects = getProjects();

function addProject(project) {
  if (projects.indexOf(project) === -1) { // only add it if it's not already in the projects list
    projects.push(project);
    cookie.set("projects", JSON.stringify(projects), {expires: 1000}); // expire 1000 days from now
  }
}
function clearProjects() {
  // resetting function, for debugging purposes
  cookie.empty();
}




var presidentsDB = [
  {
    name: "George Washington",
    description: "The first US president, he held the office from 1789 to 1797. He had wooden teeth and rosy cheeks.",
    image: "learnings/presidents/images/georgeWashington.jpg"
  }
];





function loadPage() {
  var hash = location.hash.substr(1);
  
  ich.grabTemplates();
  
  if (hash.substr(0, 8) === "project=") {
    var project = parseInt(hash.substr(8), 10);
    addProject(project);
    
    var num = projects.indexOf(project); // which number (i.e. president) we're on
    num=0;
    
    var presidentHTML = ich.president(presidentsDB[num]);
    var projectHTML = ich.project(projectsDB[project]);
    
    $("#content").html(""); // clear it
    $("#content").append(projectHTML);
    $("#content").append(presidentHTML);
    
  } else if (hash === "about") {
    
  }
}

window.onhashchange = loadPage;
loadPage();






$("body").on("click", ".show-more", function () {
  var showMore = $(this);
  showMore.find(".show-more-button").hide();
  showMore.find(".more").show();
});









// this will add the project given by the query parameter, ie:
// if the url is: qr.html?project=29
// then 29 will be added to the projects list (unless it is already in the projects list, in which case nothing will happen.)
function addProjectBasedOnUrl() {
  var urlVars = getUrlVars();
  if (urlVars["project"]) {
    addProject(urlVars["project"])
  }
}



function showDebug() {
  var s = "Projects: "+JSON.stringify(projects);
  document.getElementById("debug").innerHTML = s;
}



