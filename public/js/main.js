/*global $*/
/*eslint-env browser*/
/*eslint "no-console": "off" */
 

$(document).ready(function(){
   var allTeams = [];
   var allLocations = [];
   var allGames =[];
    $.getJSON("https://api.myjson.com/bins/b827n", function(data){
        allTeams = data.Teams
        allLocations = data.Locations
        allGames = data.Matches 
        console.log("allTeams: " + allTeams);
        console.log("allGames: " + allGames);
        console.log("allLocations: " + allLocations);
        showTeamsList(allTeams);
        showContent(allGames, allLocations);
        activateMenu();
  
    
    })


})   

function activateMenu(){

        $("#buttonContainer").click(function(e) {//this gets the clicking event!
                console.log(e);
                var id = e.target.id // this stores the id of the target of the clicking action
                var menu = $("#" + id + "_menu")
                console.log(id)
                // the following shows the chat page;
                if (id == "chat"){
                    $("#indexContainer").hide();
                    $("#chatBox").show();
                    $("#big_TableContainer").hide();
                    $("#bigMapBox").hide();
                    $("#mapAddress").hide();
                    $("#mapContainer").hide();
                }
                if (id != "chat"){
                    $("#chatBox").hide();
                     $(menu).toggle(1000);
                }
                console.log($("#"+id).is("input"))
                //the following line hides the not-chosen menus
                $(".toggler_class").not("#" + id + "_menu").hide();
               // the following changes the background color
                console.log($("#" + id).css("background-color") )
                //looks like you can compare colors only using rgb values
                if($("#" + id).css("background-color") == "rgb(4, 57, 73)" && $("#" + id).is("input")){
                    $("#" + id).css("background-color", "rgb(0, 128, 0)")
                    console.log("from blue to green")
                }
                else if($("#" + id).css("background-color") == "rgb(0, 128, 0)") {
                    $("#" + id).css("background-color", "rgb(4, 57 ,73)")
                    console.log("from green to blue")
                }
                else{
                    console.log("???")
                }

                $("#" + id).siblings(".button").css("background-color", " rgb(4, 57, 73)")

            })
}
             
function showContent(array1, array2){
            $(".radio_input").on("click", function(e){
                var value = e.target.value
                var id = e.target.id
                var gridId = e.target.getAttribute("data-value");
                console.log("THIS IS the ID: " + id)
                console.log("THIS IS the gridId: " + gridId)
                $(".toggler_class").hide(1000);
                $("#smallMapBox").hide()
                $("#indexContainer").hide();
                if ($(this).attr("name") == "when" || $(this).attr("name") == "teams"){ 
                    makeTable(id, gridId, array1);

                }
                if($(this).attr("name") == "location"){
                    showMap(id, array2);
                }
//                if($(this).attr("name") == "teams"){
//                    console.log("TEAMS")
//                }
            })

}



function makeTable(id, gridId, array1) {
        $("#big_TableContainer").show();
        //IMPORTANT: the following line deletes any previous table, so they won't stack
        $("#table_games").html("");
    /* I HAVE TO MANUALLY SHOW/HIDE EVERY CHILDREN OF bigMapBox, WHY?? HIDING THE PARENT SHOULD HIDE THEM TOO!!!*/
        $("#mapContainer").hide();
        $("#mapAddress").hide();

        array1.forEach(function(object){
            var month = object.month; 
            var name = object.name;
            var team1_name = object.t1Name
            var team2_name = object.t2Name
            var date = object.date;
            var time = object.time;
            var gameId = object.gameId;
            var url = object.url;
            var address = object.address;
            var page_link = object.page_link
            var location_landscape = $("<a>").attr({"href":"#", "id":"a_id_land" + gameId}); 
            $(location_landscape).html("Location");
            var location_portrait = $("<a>").attr({"href":/*page_link*/"#", "id":"a_id_portr" + gameId});
            $(location_portrait).html("Location")
            var src1 = object.t1Logo;
            var src2 = object.t2Logo;
            
            if ( id == month ){
                // make a data-toggle button, with logos, dates etc
                var row = $("<tr>").attr({"id": "row_" + gameId});
                var button = $("<button>").attr({"id":gameId, "class":"game_element", "data-toggle":"collapse", "data-target": "#collapse_" + gameId}); 
                var date_span = $("<span>").attr({"id":"date_of_game_" + gameId, "class":"date_span" })
                var logo1 = $("<img>").attr({"src": src1, "class": "team_logo_landscape team_logo"})
                var logo2 = $("<img>").attr({"src": src2, "class": "team_logo_landscape team_logo"})
                var vs_span =$("<span>").attr({"id":"vs_of_game" + gameId, "class":"vs_span"})
                $(date_span).html(date);
                $(button).append(date_span);
                $(button).append(logo1);
                $(vs_span).html("VS");
                $(button).append(vs_span);
                $(button).append(logo2);
                $(row).append(button);
                // append everything to the table
                $("#table_games").append(row);
                // now make a hidden div to be toggled, and append it to the row!
                var hidden_div = $("<div>").attr({"class":"collapse hidden_info_div", "id":"collapse_" + gameId});
                var time_span = $("<span>").attr({"class":"time_span"})
                $(time_span).append(time);
                var location_span = $("<span>").attr({"class":"location_span"})
                // now check the screen orientation, to have 2 different "location" links
                if (window.matchMedia("(orientation: landscape)").matches){
                    $(location_span).append(location_landscape);
                }
                if (window.matchMedia("(orientation: portrait)").matches){
                    $(location_span).append(location_portrait);
                }
                
                $(hidden_div).append(time_span);
                $(hidden_div).append(location_span);
                $(row).append(hidden_div);
            }
            if (gridId == team1_name || gridId == team2_name){
                console.log("THIS IS NAME: " + gridId);
                // make a data-toggle button, with logos, dates etc
                var row = $("<tr>").attr({"id": "row_" + gameId});
                var button = $("<button>").attr({"id":gameId, "class":"game_element", "data-toggle":"collapse", "data-target": "#collapse_" + gameId}); 
                var date_span = $("<span>").attr({"id":"date_of_game_" + gameId, "class":"date_span" })
                var logo1 = $("<img>").attr({"src": src1, "class": "team_logo_landscape team_logo"})
                var logo2 = $("<img>").attr({"src": src2, "class": "team_logo_landscape team_logo"})
                var vs_span =$("<span>").attr({"id":"vs_of_game" + gameId, "class":"vs_span"})
                $(date_span).html(date);
                $(button).append(date_span);
                $(button).append(logo1);
                $(vs_span).html("VS");
                $(button).append(vs_span);
                $(button).append(logo2);
                $(row).append(button);
                // append everything to the table
                $("#table_games").append(row);
                // now make a hidden div to be toggled, and append it to the row!
                var hidden_div = $("<div>").attr({"class":"collapse hidden_info_div", "id":"collapse_" + gameId});
                var time_span = $("<span>").attr({"class":"time_span"})
                $(time_span).append(time);
                var location_span = $("<span>").attr({"class":"location_span"});
                // now check the screen orientation, to have 2 different "location" links
                if (window.matchMedia("(orientation: landscape)").matches){
                    $(location_span).append(location_landscape);
                }
                if (window.matchMedia("(orientation: portrait)").matches){
                    $(location_span).append(location_portrait);
                }
            
                $(hidden_div).append(time_span);
                $(hidden_div).append(location_span);
                $(row).append(hidden_div);

            }
            
            //initialize the function to show the small map on the side
            show_small_map(gameId, address, url);
            show_modal(gameId, address, url);

        })
}

function showTeamsList(team_list){
        console.log("allTeams:")
        console.log(team_list)
        team_list.forEach(function(img){
            var url= img.logo
            var team_name = img.name
            var team_motto=img.motto
            //make a grid
            var newGrid = $("<div>").attr({"class":"row teamGrid teamGrid_landscape radio_input","name":"teams", "data-value":team_name});
            var newCol1 = $("<div>").attr({"class":"col-xs-4 logo_col radio_input","name":"teams", "data-value":team_name });
            var newCol2 = $("<div>").attr({"class":"col-xs-8 words_col radio_input","name":"teams", "data-value":team_name});
            $(newGrid).append(newCol1);
            $(newGrid).append(newCol2);
            //made; append logo image
            var newLogo =$("<input type='image'>")
            newLogo.attr({src:url, class:"team_logo team_logo_landscape radio_input","name":"teams", "data-value":team_name});
            $(newCol1).append(newLogo);
            //done; append team name and motto
            var name_p = $("<p>").attr({"class":"team_name radio_input","name":"teams", "data-value":team_name})
            $(name_p).html(team_name);
            var name_m = $("<p>").attr({"class":"team_motto radio_input","name":"teams", "data-value":team_name})
            $(name_m).html('"' + team_motto + '"');
            $(newCol2).append(name_p);
            $(newCol2).append(name_m);
            //append whole grid to menu
            $("#teams_menu").append(newGrid);
            $("#teams_menu").css("overflow-scrolling", "touch");
            console.log(url)
        })
    }

function showMap(id, array) {//called by showContent; shows map according to its code

        $("#big_TableContainer").hide();
    /* I HAVE TO MANUALLY SHOW EVERY CHILDREN OF bigMapBox, WHY?? SHOWING THE PARENT SHOULD SHOW THEM TOO!!!*/
        $("#bigMapBox").show();
        $("#mapAddress").show();
        $("#mapContainer").show();
        console.log("THIS IS ID :" + id)
        $(array).each(function(){
            console.log(array);
            var map_code = this.code;
            var map_src = this.url;
            var map_address = this.address
       
            if (map_code == id){// WORKS ONLY 6-7 TIMES THEN STOPS WORKING!!!!!
                var newMap = $("<iframe>").attr({ id : "map_id_" + map_code, "class": "map map_landscape", "data-value": map_code, "frameborder": "0", "src" : map_src });
                $("#mapAddress").html(map_address)
                $("#mapContainer").append(newMap);
                console.log(map_code);
                console.log(map_src);
                console.log(map_address);
            }
            if (map_code != id){
               $("#map_id_" + map_code).hide();
            }
        })
    
}

function show_small_map(gameId, address, url){
    $("#a_id_land" + gameId).click(function(){
        $("#smallMapBox").show()
        var newMap = $("<iframe>").attr({ "class": "small_map_img", "frameborder": "0", "src" : url });
        $(".small_map_img").hide();
        $("#small_address").show();
        $("#small_address").html(address)
        $("#small_map").show();
        $("#small_map").append(newMap);
        console.log("location clicked")
    })
}

// CODE FOR THE CHAT
document.getElementById("login").addEventListener("click", login);
document.getElementById("create-post").addEventListener("click", writeNewPost);
var audio = new Audio('stop1.mp3');
$(".advice").hide();
$("#posts").hide();


getPosts();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    $(".advice").hide();
    $("#posts").show();

  } else {
    $(".advice").show();
    $("#posts").hide();
    // No user is signed in.
  }
});

// Cosas opcionales a añadir:
// Comprobar si el usuario está logueado al inicio del script
// Borrar el texto del input al crear el post
// Si no hay texto que no deje enviar el post

function login() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(function () {
      getPosts();
    })
    .catch(function () {
      alert("Something went wrong");
    });
}


function writeNewPost() {

  if (!$("#textInput").val()) {
    return
  }

  var text = document.getElementById("textInput").value;
  var userName = firebase.auth().currentUser.displayName;

  // A post entry.
  var postData = {
    name: userName,
    body: text
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('myMatch').push().key;
  
  var updates = {};
  updates[newPostKey] = postData;

  $("#textInput").val("");

  audio.play();

  return firebase.database().ref().child('myMatch').update(updates);
}


function getPosts() {

  firebase.database().ref('myMatch').on('value', function (data) {

    var logs = document.getElementById("posts");
    logs.innerHTML = "";

    var posts = data.val();

    var template = "";

    for (var key in posts) {
      if (posts[key].name == firebase.auth().currentUser.displayName) {
        template += `
          <div class="notification is-info">
            <p class="name">${posts[key].name} says:</p>
            <p>${posts[key].body}</p>
          </div>
        `;
      } else {
        template += `
          <div class="notification is-primary">
            <p class="name">${posts[key].name} says:</p>
            <p>${posts[key].body}</p>
          </div>
        `;
      }

    }

    logs.innerHTML = template;

    $(".box").animate({ scrollTop: $(".box").prop("scrollHeight") }, 500);
  });
}
// END OF THE CHAT CODE

// CODE FOR THE MODAL IMAGE
function show_modal(gameId, address, url){
       var modal = $('#myModal');
       var modalImg = $("<iframe>").attr({"id":"modal_map_id_" + gameId, "class":"modal-content map", "frameborder": "0", "src" : url, "name":gameId});
    $("#a_id_portr" + gameId).click(function(){
        console.log("modal id: " + $("#modal_map_id_" + gameId))
        var value = $("#modal_map_id_" + gameId).attr("name");//not useful for the function AND undefined
        // on click, show the modal AND the modalImg; coupled with the "hide" below,prevents same images from stacking 
        $(modal).show();
        $(modalImg).show();
        //THE ID IS UNDEFINED, WHY? ASK!; THE IF STATEMENTS BELOW ARE THEREFORE COMMENTED OUT
           console.log($("#modal_map_id_" + gameId).attr("id"))
           console.log("value: " + value);
           console.log("gameId: " + gameId);
//        if( value != gameId){
//            $(modalImg).hide();
//        }
//        if (value == gameId){
//        
//        }
        // hide all that hasn't the correct id(prevents stacking); make the iframe and insert it inside the modal; use the address text as a caption   
        $(".modal-content").not("#modal_map_id_"+ gameId).hide();
        $(modal).append(modalImg);
//        $(modalImg).show();
        var captionText = $("#caption");
        $(captionText).html(address);
    })                                  
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal AND hide the modalImg
    span.onclick = function() { 
       $(modalImg).hide();
       $(modal).hide();
    }
}
//END OF MODAL CODE


