/*global $*/
/*eslint-env browser*/
/*eslint "no-console": "off" */
 

$(document).ready(function(){
   var allTeams = [];
   var allLocations = [];
   var allGames =[];
    $.getJSON("https://api.myjson.com/bins/6p3mf", function(data){
        allTeams = data.Teams
        allLocations = data.Locations
        allGames = data.Matches // CONTROL THIS!!!
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
                $(menu).toggle(1000);
                console.log($("#"+id).is("input"))
                //the following line hides the not-chosen menus
                $(".menu").not("#" + id + "_menu").hide();
               // try with background color
                console.log($("#" + id).css("background-color") )
                //looks like you can compare colors only using rgb values
                if($("#" + id).css("background-color") == "rgb(38, 154, 188)" && $("#" + id).is("input")){
                    $("#" + id).css("background-color", "rgb(0, 128, 0)")
                    console.log("from blue to green")
                }
                else if($("#" + id).css("background-color") == "rgb(0, 128, 0)") {
                    $("#" + id).css("background-color", "rgb(38, 154, 188)")
                    console.log("from green to blue")
                }
                else{
                    console.log("???")
                }

                $("#" + id).siblings(".button").css("background-color", " rgb(38, 154, 188)")

            })
}
             
function showContent(array1, array2){
            $(".radio_input").on("click", function(e){
                var value = e.target.value
                var id = e.target.id
                var gridId = e.target.getAttribute("data-value");
                console.log("THIS IS the ID: " + id)
                console.log("THIS IS the gridId: " + gridId)
                $(".menu").hide(1000);
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
             //make a table header with the month; if it's in the loop it gets multiplied
//            var headerRow = $("<tr>").attr({"id":"headerRow_" + gameId})
//            var th = $("<th>")
//            $(th).html(month)
//            $(headerRow).append(th);
//            $("#table_games").append(headerRow);
        array1.forEach(function(object){
            var month = object.month; 
            var name = object.name;
            var team1_name = object.t1Name
            var team2_name = object.t2Name
//            console.log("team1_name: " + team1_name)
//            console.log("team2_name: " + team2_name)
//            console.log(gridId)
            var date = object.date;
            var time = object.time;
            var gameId = object.gameId;
            var url = object.url;
            var address = object.address;
            var location = $("<a>").attr({"href":"#", "id":"a_id_" + gameId}); 
            $(location).html("Location");
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
                $(location_span).append(location);
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
                var location_span = $("<span>").attr({"class":"location_span"})
                $(location_span).append(location);
                $(hidden_div).append(time_span);
                $(hidden_div).append(location_span);
                $(row).append(hidden_div);

            }
            
            //initialize the function to show the small map on the side
            show_small_map(gameId, address, url)

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
       
            if (map_code == id){/* CSS for attr border to "map map_landscape: 210, 460*/
                var newMap = $("<iframe>").attr({ id : map_code, "class": "map map_landscape", "frameborder": "0", "src" : map_src });
                $(".map").hide();
                $("#mapAddress").html(map_address)
                $(".map").show();
                $("#mapContainer").append(newMap);
                console.log(map_code);
                console.log(map_src);
                console.log(map_address);
            }
//            if (map_code != id){
////               $("#" + map_code).hide();
//               $(".map").hide();
//            }
        })
    
}

function show_small_map(gameId, address, url){
    $("#a_id_" + gameId).click(function(){
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





