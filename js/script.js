/* =========================================
   NOVAAPP - MAIN JAVASCRIPT
   ========================================= */

   document.addEventListener("DOMContentLoaded", function () {


    /* =========================================
       PAGE LOADER
    ========================================= */

    const loader =
        document.querySelector(".page-loader");

    if (loader) {

        window.addEventListener("load", function () {

            setTimeout(function () {

                loader.classList.add("hide");

            }, 400);

        });

    }



    /* =========================================
       MOBILE MENU
    ========================================= */

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");


    if (mobileMenuBtn && mobileMenu) {

        mobileMenuBtn.addEventListener(
            "click",
            function () {

                mobileMenu.classList.toggle(
                    "hidden"
                );

            }
        );

    }



    /* =========================================
       PASSWORD SHOW / HIDE
    ========================================= */

    const passwordButtons =
        document.querySelectorAll(
            ".password-toggle"
        );


    passwordButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const targetId =
                    button.getAttribute(
                        "data-target"
                    );

                const input =
                    document.getElementById(
                        targetId
                    );


                if (!input) {
                    return;
                }


                if (
                    input.type === "password"
                ) {

                    input.type = "text";

                    button.textContent = "🙈";

                } else {

                    input.type = "password";

                    button.textContent = "👁";

                }

            }
        );

    });



    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );


    if (
        revealElements.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "active"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "active"
                );

            }
        );

    }



    /* =========================================
       COUNTER ANIMATION
    ========================================= */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    if (counters.length > 0) {

        const counterObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const counter =
                                entry.target;


                            const target =
                                parseInt(
                                    counter.dataset.counter
                                ) || 0;


                            let current = 0;


                            const increment =
                                Math.max(
                                    1,
                                    Math.ceil(
                                        target / 80
                                    )
                                );


                            const timer =
                                setInterval(
                                    function () {

                                        current +=
                                            increment;


                                        if (
                                            current >=
                                            target
                                        ) {

                                            current =
                                                target;

                                            clearInterval(
                                                timer
                                            );

                                        }


                                        counter.textContent =
                                            current.toLocaleString();

                                    },
                                    20
                                );


                            counterObserver.unobserve(
                                counter
                            );

                        }
                    );

                },
                {
                    threshold: 0.6
                }
            );


        counters.forEach(
            function (counter) {

                counterObserver.observe(
                    counter
                );

            }
        );

    }



    /* =========================================
       CONTACT FORM - FORMSPREE
    ========================================= */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {


                const name =
                    document.getElementById(
                        "contactName"
                    );


                const email =
                    document.getElementById(
                        "contactEmail"
                    );


                const subject =
                    document.getElementById(
                        "contactSubject"
                    );


                const message =
                    document.getElementById(
                        "contactMessage"
                    );


                const nameError =
                    document.getElementById(
                        "contactNameError"
                    );


                const emailError =
                    document.getElementById(
                        "contactEmailError"
                    );


                const messageError =
                    document.getElementById(
                        "contactMessageError"
                    );


                /* Clear old errors */

                clearContactErrors();


                let valid = true;



                /* =================================
                   NAME VALIDATION
                ================================== */

                if (
                    !name ||
                    name.value.trim().length < 2
                ) {

                    event.preventDefault();

                    name.classList.add(
                        "input-error"
                    );


                    if (nameError) {

                        nameError.textContent =
                            "Please enter your name.";

                    }


                    valid = false;

                }



                /* =================================
                   EMAIL VALIDATION
                ================================== */

                if (
                    !email ||
                    !isValidEmail(
                        email.value.trim()
                    )
                ) {

                    event.preventDefault();

                    email.classList.add(
                        "input-error"
                    );


                    if (emailError) {

                        emailError.textContent =
                            "Please enter a valid email address.";

                    }


                    valid = false;

                }



                /* =================================
                   SUBJECT VALIDATION
                ================================== */

                if (
                    !subject ||
                    subject.value.trim().length < 2
                ) {

                    event.preventDefault();

                    if (subject) {

                        subject.classList.add(
                            "input-error"
                        );

                    }


                    valid = false;

                }



                /* =================================
                   MESSAGE VALIDATION
                ================================== */

                if (
                    !message ||
                    message.value.trim().length < 10
                ) {

                    event.preventDefault();

                    message.classList.add(
                        "input-error"
                    );


                    if (messageError) {

                        messageError.textContent =
                            "Message must contain at least 10 characters.";

                    }


                    valid = false;

                }



                /* =================================
                   FORM SUBMISSION
                ================================== */

                if (valid) {

                    /*
                     * IMPORTANT:
                     *
                     * We intentionally DO NOT use
                     * event.preventDefault() here.
                     *
                     * Formspree needs the browser
                     * to submit the form normally.
                     */


                    const button =
                        document.getElementById(
                            "contactSubmitBtn"
                        );


                    if (button) {

                        button.textContent =
                            "Sending...";

                        button.disabled = true;

                        button.classList.add(
                            "opacity-70",
                            "cursor-not-allowed"
                        );

                    }

                }

            }
        );

    }



    /* =========================================
       SIGN UP FORM
    ========================================= */

    const signupForm =
        document.getElementById(
            "signupForm"
        );


    if (signupForm) {

        signupForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                clearErrors();

                let valid = true;


                const name =
                    document.getElementById(
                        "fullName"
                    );


                const email =
                    document.getElementById(
                        "signupEmail"
                    );


                const phone =
                    document.getElementById(
                        "phone"
                    );


                const password =
                    document.getElementById(
                        "signupPassword"
                    );


                const confirmPassword =
                    document.getElementById(
                        "confirmPassword"
                    );


                const terms =
                    document.getElementById(
                        "terms"
                    );



                /* Name */

                if (
                    !name ||
                    name.value.trim().length < 3
                ) {

                    showError(
                        name,
                        "nameError",
                        "Please enter your full name."
                    );

                    valid = false;

                }



                /* Email */

                if (
                    !email ||
                    !isValidEmail(
                        email.value.trim()
                    )
                ) {

                    showError(
                        email,
                        "signupEmailError",
                        "Please enter a valid email address."
                    );

                    valid = false;

                }



                /* Phone */

                if (
                    phone &&
                    phone.value.trim() !== "" &&
                    !/^[0-9+\-\s()]{7,20}$/.test(
                        phone.value.trim()
                    )
                ) {

                    showError(
                        phone,
                        "phoneError",
                        "Please enter a valid phone number."
                    );

                    valid = false;

                }



                /* Password */

                if (
                    !password ||
                    password.value.length < 6
                ) {

                    showError(
                        password,
                        "signupPasswordError",
                        "Password must contain at least 6 characters."
                    );

                    valid = false;

                }



                /* Confirm Password */

                if (
                    !confirmPassword ||
                    confirmPassword.value !==
                    password.value
                ) {

                    showError(
                        confirmPassword,
                        "confirmPasswordError",
                        "Passwords do not match."
                    );

                    valid = false;

                }



                /* Terms */

                if (
                    terms &&
                    !terms.checked
                ) {

                    alert(
                        "Please agree to the Terms & Conditions."
                    );

                    valid = false;

                }



                /* Success */

                if (valid) {

                    const success =
                        document.getElementById(
                            "signupSuccess"
                        );


                    if (success) {

                        success.textContent =
                            "Account created successfully!";

                        success.classList.add(
                            "show"
                        );

                    }


                    signupForm.reset();


                    setTimeout(
                        function () {

                            window.location.href =
                                "signin.html";

                        },
                        1800
                    );

                }

            }
        );

    }



    /* =========================================
       SIGN IN FORM
    ========================================= */

    const signinForm =
        document.getElementById(
            "signinForm"
        );


    if (signinForm) {

        signinForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                clearErrors();

                let valid = true;


                const email =
                    document.getElementById(
                        "signinEmail"
                    );


                const password =
                    document.getElementById(
                        "signinPassword"
                    );



                /* Email */

                if (
                    !email ||
                    !isValidEmail(
                        email.value.trim()
                    )
                ) {

                    showError(
                        email,
                        "signinEmailError",
                        "Please enter a valid email address."
                    );

                    valid = false;

                }



                /* Password */

                if (
                    !password ||
                    password.value.length < 6
                ) {

                    showError(
                        password,
                        "signinPasswordError",
                        "Password must contain at least 6 characters."
                    );

                    valid = false;

                }



                /* Success */

                if (valid) {

                    const success =
                        document.getElementById(
                            "signinSuccess"
                        );


                    if (success) {

                        success.textContent =
                            "Sign in successful! Welcome back.";

                        success.classList.add(
                            "show"
                        );

                    }

                }

            }
        );

    }



    /* =========================================
       EMAIL VALIDATION FUNCTION
    ========================================= */

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            email
        );

    }



    /* =========================================
       SHOW ERROR
    ========================================= */

    function showError(
        input,
        errorId,
        message
    ) {

        if (input) {

            input.classList.add(
                "input-error"
            );

        }


        const error =
            document.getElementById(
                errorId
            );


        if (error) {

            error.textContent =
                message;

        }

    }



    /* =========================================
       CLEAR ALL ERRORS
    ========================================= */

    function clearErrors() {

        document
            .querySelectorAll(
                ".error-message"
            )
            .forEach(
                function (element) {

                    element.textContent =
                        "";

                }
            );


        document
            .querySelectorAll(
                ".form-input"
            )
            .forEach(
                function (input) {

                    input.classList.remove(
                        "input-error"
                    );

                }
            );


        document
            .querySelectorAll(
                ".success-message"
            )
            .forEach(
                function (element) {

                    element.classList.remove(
                        "show"
                    );

                    element.textContent =
                        "";

                }
            );

    }



    /* =========================================
       CLEAR CONTACT ERRORS
    ========================================= */

    function clearContactErrors() {

        const fields = [
            "contactName",
            "contactEmail",
            "contactSubject",
            "contactMessage"
        ];


        fields.forEach(
            function (id) {

                const input =
                    document.getElementById(
                        id
                    );


                if (input) {

                    input.classList.remove(
                        "input-error"
                    );

                }

            }
        );


        const errors = [
            "contactNameError",
            "contactEmailError",
            "contactMessageError"
        ];


        errors.forEach(
            function (id) {

                const error =
                    document.getElementById(
                        id
                    );


                if (error) {

                    error.textContent =
                        "";

                }

            }
        );

    }

});
