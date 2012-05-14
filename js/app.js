
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
    setProjects(projects);
  }
}
function setProjects(projects) {
  cookie.set("projects", JSON.stringify(projects), {expires: 1000}); // expire 1000 days from now
}




// based on the location hash (url after the #), fills up the content div appropriately
// this gets called when the page loads
function loadPage() {
  // clear the content html
  $("#content").html("");
  // make sure footer is shown (if splash page happens, it will hide the footer)
  $(".footer").show();
  
  var hash = location.hash.substr(1);
  
  ich.grabTemplates();
  
  if (hash.substr(0, 8) === "project=") {
    var project = parseInt(hash.substr(8), 10);
    addProject(project);
    
    if (projects.length === 1 && !cookie.get("splashShown")) {
      // show splash page first
      cookie.set("splashShown"); // so we don't display it again
      
      // hide the footer
      $(".footer").hide();
      
      var html = ich.splash({projectID: project});
      $("#content").append(html);
    } else {
      var num = projects.indexOf(project); // which number (i.e. president) we're on

      // TODO: check that presidents isn't overflowed, show "win" info

      var presidentHTML = ich.president(presidentsDB[num]);
      var projectHTML = ich.project(projectsDB[project]);

      $("#content").append(projectHTML);
      $("#content").append(presidentHTML);
    }
    
  } else if (hash.substr(0, 5) === "path=") {
    projects = hash.substr(5).split(",").map(function (x) {return parseInt(x, 10);});
    setProjects(projects);
    location.hash = "list";
  } else if (hash === "list") {
    var associations = projects.map(function (project, i) {
      return {
        project: projectsDB[project],
        projectID: project,
        president: presidentsDB[i]
      };
    });
    
    var html = ich.list({associations: associations, path: projects.join(",")});
    
    $("#content").append(html);
    
  } else {
    // assume it's a static page
    if (!ich.templates[hash]) {
      // if it's a totally unexpected hash, just use the about page
      hash = "about";
    }
    var html = ich[hash]({});
    $("#content").append(html);
  }
  
  // scroll to the top of the page
  $("body").scrollTop(0);
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
