$(document).ready(function () {
    // Set up scroll spy
    $("body").attr({
        "data-spy": "scroll",
        "data-target": "#navbar-example2",
        "data-offset": "50",
    });

    // Add 'active' class on click
    $("#navbar-example2 .nav-link").click(function () {
        // console.log("clc");
        $("#navbar-example2 .nav-link").removeClass("active");
        $(this).addClass("active");
    });

    // Get the exact position offset of the navbar
    var navbarOffset = $("#navbar-example2").position().top;
    // Change background color and text color when scrolling
    $(window).scroll(function () {
        console.log(navbarOffset , "navbarOffset");

        var scrollPos = $(document).scrollTop();
        console.log(scrollPos, "scrollPos");
        var navbar = $("#navbar-example2");

        if (scrollPos >= navbarOffset) {
            console.log("scrollPos exceeds navbar offset");
            navbar.addClass("bg_blue_scroll");
        } else {
            navbar.removeClass("bg_blue_scroll");
            console.log("scrollPos less than navbar offset");
        }
    });
});
