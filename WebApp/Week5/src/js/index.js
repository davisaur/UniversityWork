window.addEventListener("load", function () {

    document.querySelector("#headingtop").addEventListener("click", myFunction);

});

function myFunction() {
    var x = document.querySelector("#myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}