$(document).ready(function () {
  $(".news_letter").submit(function (event) {
    event.preventDefault();

    var email = $("#email_id").val().trim();

    if (validateEmail(email)) {
      var modal_method =
        "eden_app.news_letter_emails.create_news_letter_email_document";
      // Eden New Letter Emails

      frappe.call({
        method: modal_method,
        type: "POST",
        args: {
          email: email,
        },
        callback: function (response) {
          if (!response.exc) {
            Swal.fire({
              title: "Thank You!",
              text: "You have successfully joined our newsletter.",
              icon: "success",
              showConfirmButton: false,
              timer: 5000,
            });

            $("#email_id").val("");
            hideErrorMessage(); // Hide error message if submission is successful
            $("#newsLetterModal").modal("hide");
          } else {
            console.log("Error submitting form:", response.exc);
          }
        },
      });
    } else {
      // Display error message under the email input
      displayErrorMessage("Email is not valid. Please check your input.");
    }
  });

  function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function displayErrorMessage(message) {
    $("#email_id_error").text(message).show();
    $("#email_id").addClass("is-invalid");
  }

  function hideErrorMessage() {
    $("#email_id_error").hide();
    $("#email_id").removeClass("is-invalid");
  }
});
