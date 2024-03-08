$(document).ready(function () {
  $(".modal_form").submit(function (event) {
    event.preventDefault();
    console.log(event.target, "e.target");
    console.log(event.target.value, "e.target.value");
    let formName = event.target;

    if (validateForm()) {
      console.log("Form is valid. Submitting...");
      let modal_method;
      if (formName.classList.contains("quote_modal")) {
        modal_method = "eden_app.request_quote.create_request_quote_document";
        console.log("quote_modal");
        $("#.demo_modal").hide()
      } else {
        modal_method = "eden_app.request_quote.create_request_demo_document";

        console.log("demo_modal");
        $("#.quote_modal").hide()

      }
      frappe.call({
        method: modal_method,
        type: "POST",
        args: {
          first_name: $("#first_name_id").val().trim(),
          last_name: $("#last_name_id").val().trim(),
          country: $("#country_id").val().trim(),
          phone_no: $("#phone_number_id").val().trim(),
          email: $("#email_id").val().trim(),
          company: $("#company_id").val().trim(),
          employee_no: $("#no_of_employees").val().trim(),
          msg: $("#message_input").val().trim(),
        },
        callback: function (response) {
          if (!response.exc) {
            console.log("Form submitted successfully:", response.message);
            // Display SweetAlert pop-up
            Swal.fire({
              title: "Thank You!",
              text: "Your message has been submitted successfully.",
              icon: "success",
              showConfirmButton: false,
              timer: 5000, // Set the timer for the pop-up to automatically close after 3 seconds
            });

            $(":input").val("");
          } else {
            console.log("Error submitting form:", response.exc);
          }
        },
      });
    } else {
      console.log("Form is not valid. Please check your inputs.");
    }
  });

  function validateForm() {
    var isValid = true;

    // Validate First Name
    isValid = validateField("first_name_id", "Mandatory Field") && isValid;

    // Validate Last Name
    isValid = validateField("last_name_id", "Mandatory Field") && isValid;

    // Validate Country
    isValid = validateSelectBox("country_id", "Mandatory Field") && isValid;

    // Validate Phone Number
    isValid = validatePhoneNumber("phone_number_id") && isValid;

    // Validate Email
    isValid = validateField("email_id", "Mandatory Field") && isValid;

    // Validate Company
    isValid = validateField("company_id", "Mandatory Field") && isValid;

    // Validate no_of_employees
    isValid =
      validateSelectBox("no_of_employees", "Mandatory Field") && isValid;

    return isValid;
  }

  function validateField(fieldId, errorMessage) {
    var fieldValue = $("#" + fieldId).val();

    // For other input fields, trim the value and validate if it's empty
    fieldValue = fieldValue.trim();
    if (fieldValue === "") {
      displayErrorMessage(fieldId, errorMessage);
      return false;
    } else {
      hideErrorMessage(fieldId);
      return true;
    }
  }

  function validatePhoneNumber(fieldId) {
    var phoneNumber = $("#" + fieldId)
      .val()
      .trim();
    // Validate if the phone number contains only numeric characters
    if (/^\d+$/.test(phoneNumber)) {
      hideErrorMessage(fieldId);
      return true;
    } else {
      displayErrorMessage(fieldId, "Please enter a valid phone number");
      return false;
    }
  }

  function validateSelectBox(fieldId, message) {
    var fieldValue = $("#" + fieldId).val();
    console.log(fieldValue, "fieldValue start");
    if (fieldValue == null) {
      console.log(fieldValue, "fieldValue  == fady");

      $("#" + fieldId).addClass("is-invalid");
      $("#" + fieldId + "_error")
        .text(message)
        .show();
      return false;
    } else {
      console.log("hideErrorMessage(fieldId)");
      hideErrorMessage(fieldId);
      return true;
    }
  }

  function displayErrorMessage(fieldId, message) {
    $("#" + fieldId).addClass("is-invalid");
    $("#" + fieldId + "_error")
      .text(message)
      .show();
  }

  function hideErrorMessage(fieldId) {
    $("#" + fieldId).removeClass("is-invalid");
    $("#" + fieldId + "_error").hide();
  }
});
