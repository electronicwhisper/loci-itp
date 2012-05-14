
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





function loadPage() {
  var hash = location.hash.substr(1);
  
  ich.grabTemplates();
  
  if (hash.substr(0, 8) === "project=") {
    var project = parseInt(hash.substr(8), 10);
    addProject(project);
    
    var num = projects.indexOf(project); // which number (i.e. president) we're on
    
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






$("body").on("click", ".show-more-button", function () {
  var showMore = $(this).parents(".show-more");
  showMore.find(".show-more-button").hide();
  showMore.find(".more").show();
  showMore.find(".show-less-button").show();
});
$("body").on("click", ".show-less-button", function () {
  var showMore = $(this).parents(".show-more");
  showMore.find(".show-more-button").show();
  showMore.find(".more").hide();
  showMore.find(".show-less-button").hide();
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



