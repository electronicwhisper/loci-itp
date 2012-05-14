
// manages the list of projects that the user has qr-scanned
// these get put in a global variable, an array called projects
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




// based on the location hash (url after the #), fills up the content div appropriately
// this gets called when the page loads
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





// Show more and show less functionality
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
