$(document).ready(function() {
    $(window).scroll( function() {
        if( $(window).scrollTop() >= 80 ) {
            $("#navbar").addClass("active");
        } else {
            $("#navbar").removeClass("active");
        }
    });

    $(document).on("click", "#hamburger", function() {
        // alert("Hello")
        $("#sidebar").addClass("show");
        $("#overlay").addClass("show");
    });

    $(document).on("click", "#overlay", function() {
        // alert("OFf")
        $("#sidebar").removeClass("show");
        $("#overlay").removeClass("show"); // <=== ini bermasalah anjeng
    });

    // $('.users-table').DataTable();
    // $('.users-table').css("display", "none");
});
