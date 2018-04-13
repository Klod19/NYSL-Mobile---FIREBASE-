/*global $*/
/*eslint-env browser*/
/*eslint "no-console": "off" */
 

$(document).ready(function(){
   var allTeams = [];
   var allLocations = [];
   var allGames =[];
    $.getJSON("https://api.myjson.com/bins/14hrrz", function(data){
        allTeams = data.Teams
        allLocations = data.Locations
        allGames = data.Matches
        console.log(allTeams);
        console.log(allLocations);
        showTeamsList(allTeams);
        showContent(allLocations);
        activateMenu();
  
    
    })


})   

function activateMenu(){

        $("#buttonContainer").click(function(e) {//this gets the clicking event!
                console.log(e);
                var id = e.target.id // this stores the id of the target of the clicking action
                var menu = $("#" + id + "_menu")
                console.log(id)
                menu.toggle(1000);
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
            
            


 
//function makeUpperCase(str){
//    str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
//    return letter.toUpperCase();
//    });
//}
//    
function showContent(array){
            $(".radio_input").on("click", function(e){
                var tool = e.target.value
                var id = e.target.id
                console.log("THIS IS the TOOL: " + tool)
                $(".menu").hide(1000);
                $("#indexContainer").hide();
                if ($(this).attr("name") == "when"){ /*"input[type=radio]:checked" wont work!*/
                    makeTable();
    //                console.log("this is: " + this)
                }
                if($(this).attr("name") == "location"){
                    showMap(tool, array);
               }
            })
}



function makeTable(id) {
        $("#tableContainer").show();
    /* I HAVE TO MANUALLY SHOW/HIDE EVERY CHILDREN OF bigMapBox, WHY?? HIDING THE PARENT SHOULD HIDE THEM TOO!!!*/
        $("#mapContainer").hide();
        $("#mapAddress").hide();
        $(array)each(function(object){
            if ( id == object.key ) /* LOOK INTO THIS!!!*/ 
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
            var newGrid = $("<div>").attr({"class":"row teamGrid teamGrid_landscape"})
            var newCol1 = $("<div>").attr("class", "col-sm-4 logo_col");
            var newCol2 = $("<div>").attr("class", "col-sm-8 words_col");
            $(newGrid).append(newCol1);
            $(newGrid).append(newCol2);
            //made; append logo image
            var newLogo =$("<input type='image'>")
            newLogo.attr({src:url, class:"team_logo team_logo_landscape"});
            $(newCol1).append(newLogo);
            //done; append team name and motto
            var name_p = $("<p class='team_name'>").html(team_name);
            var name_m = $("<p class='team_motto'>").html(team_motto);
            $(newCol2).append(name_p);
            $(newCol2).append(name_m);
            //append whole grid to menu
            $("#teams_menu").append(newGrid);
            $("#teams_menu").css("overflow-scrolling", "touch");
            console.log(url)
        })
    }

function showMap(value, array) {//called by showContent; shows map according to its code

        $("#tableContainer").hide();
    /* I HAVE TO MANUALLY SHOW EVERY CHILDREN OF bigMapBox, WHY?? SHOWING THE PARENT SHOULD SHOW THEM TOO!!!*/
        $("#bigMapBox").show();
        $("#mapAddress").show();
        $("#mapContainer").show();
        // show a particular map: 
    //    $(".mapContainer").attr("id").is(value).show();
    //    $(".mapContainer").attr("id").not(value).hide();
        //    $(".mapContainer").attr("display", "flex")
        console.log("THIS IS VALUE AND TOOL:" + value)
        $(array).each(function(){
            console.log(array);
            var map_code = this.code;
            var map_src = this.url;
            var map_address = this.address
       
            if (map_code == value){/* CSS for attr border to "map map_landscape: 210, 460*/
                var newMap = $("<iframe>").attr({ id : map_code, "class": "map map_landscape", "frameborder": "0", "src" : map_src });
                $("#mapContainer").append(newMap);
                $("#mapAddress").html(map_address)
                console.log(map_code);
                console.log(map_src);
                console.log(map_address);
            }
            if (map_code != value){
                $("#" + map_code).hide();
//                $("#mapAdress").html("");
            }
        })
    
}
    
