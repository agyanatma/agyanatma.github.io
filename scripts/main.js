$(document).ready(function () {
    $("a.disabled").click(function (e) {
        e.preventDefault();
    });
    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                let target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $("html, body").animate(
                        {
                            scrollTop: target.offset().top + 5,
                        },
                        1000,
                        function () {
                            // Callback after animation
                            // Must change focus!
                            let $target = $(target);
                            $target.focus();
                            if ($target.is(":focus")) {
                                // Checking if the target was focused
                                return false;
                            } else {
                                $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                                $target.focus(); // Set focus again
                            }
                        }
                    );
                }
            }
        });

    $(window)
        .scroll(function () {
            var scrollDistance = $(window).scrollTop();

            // Show/hide menu on scroll
            // if (scrollDistance >= 850) {
            //     $("nav").fadeIn("fast");
            // } else {
            //     $("nav").fadeOut("fast");
            // }

            // Assign active class to nav links while scolling
            $("section").each(function (i) {
                if ($(this).position().top <= scrollDistance) {
                    $(".navigation a.active").removeClass("active");
                    $(".navigation a").eq(i).addClass("active");
                }
            });
        })
        .scroll();

    $("#mail").validate({
        rules: {
            email: {
                required: true,
                email: true,
            },
            message: "required",
        },
        messages: {
            email: {
                required: "I have to know your email.",
                email: "Your email address must be email formated.",
            },
            message: "You have write some message.",
        },
        submitHandler: function (form) {
            let name = $("#name").val();
            let email = $("#email").val();
            let message = $("#message").val();
            $.ajax({
                url: "mail.php",
                method: "POST",
                data: {
                    name: name,
                    email: email,
                    message: message,
                },
                success: function (res) {
                    if (res.code == 200) {
                        $(".success").animate(
                            {
                                marginLeft: "2em",
                                opacity: 1,
                            },
                            500,
                            function () {
                                setTimeout(function () {
                                    $(".success").animate({
                                        marginLeft: "-5em",
                                        opacity: 0,
                                    });
                                }, 3000);
                            }
                        );
                        $("#name").val("");
                        $("#email").val("");
                        $("#message").val("");
                    }
                },
            });
        },
    });
});
