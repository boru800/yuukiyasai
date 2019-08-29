$(function() {
    $(".back-top-btn").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 500);
        $("header li").removeClass("nav_active");
    });
});a
