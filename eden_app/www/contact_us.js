$(document).ready(function () {
    $('input[type="checkbox"]').on('change', function () {
        $('input[name="' + this.name + '"]').not(this).prop('checked', false);
    });
});
console.log("s");
$(document).ready(function () {
    $('form').submit(function (event) {
        event.preventDefault();

        if (validateForm()) {
            console.log('Form is valid. Submitting...');


            var formData = {
                'name': $('#first_name_id').val().trim(),
                'company': $('#company_id').val().trim(),
                'email': $('#email_id').val().trim(),
                'phone_no': $('#phone_id').val().trim(),
                'subject': getSelectedCheckboxValue('subject'),
                'msg': $('#textarea_input').val().trim()
            };
            console.log(formData);

            // Make an API request to create a new communication entry

            frappe.call({
                method: "contact_us.create_contact_us_document",
                type: "POST",
                args: {
                    data: JSON.stringify(formData)
                    // Add other fields as needed
                },
                callback: function (response) {
                    if (!response.exc) {
                        console.log('Form submitted successfully:', response.message);
                        // Optionally, you can redirect the user or perform other actions
                    } else {
                        console.log('Error submitting form:', response.exc);
                    }
                }
            });


        } else {
            console.log('Form is not valid. Please check your inputs.');
        }
    });


    function getSelectedCheckboxValue(fieldName) {
        var selectedCheckbox = $('input[name="' + fieldName + '"]:checked');
        return selectedCheckbox.length > 0 ? selectedCheckbox.val() : null;
    }
    function validateForm() {
        var isValid = true;

        // Validate First Name
        isValid = validateField('first_name_id', 'First name cannot be empty') && isValid;

        // Validate Company
        isValid = validateField('company_id', 'Company cannot be empty') && isValid;

        // Validate Email
        isValid = validateField('email_id', 'Please enter a valid email address') && isValid;

        // Validate Phone Number
        isValid = validatePhoneNumber('phone_id') && isValid;

        // Validate Subject (at least one checkbox selected)
        isValid = validateCheckbox('subject') && isValid;

        // Validate Message
        isValid = validateField('textarea_input', 'Message cannot be empty') && isValid;

        return isValid;
    }

    function validateField(fieldId, errorMessage) {
        var fieldValue = $('#' + fieldId).val().trim();
        if (fieldValue === '') {
            displayErrorMessage(fieldId, errorMessage);
            return false;
        } else {
            hideErrorMessage(fieldId);
            return true;
        }
    }

    function validatePhoneNumber(fieldId) {
        var phoneNumber = $('#' + fieldId).val().trim();
        // Validate if the phone number contains only numeric characters
        if (/^\d+$/.test(phoneNumber)) {
            hideErrorMessage(fieldId);
            return true;
        } else {
            displayErrorMessage(fieldId, 'Please enter a valid phone number');
            return false;
        }
    }

    function validateCheckbox(fieldName) {
        var isChecked = $('input[name="' + fieldName + '"]:checked').length > 0;
        if (!isChecked) {
            displayErrorMessage(fieldName + '_input', 'Please select at least one option');
        } else {
            hideErrorMessage(fieldName + '_input');
        }
        return isChecked;
    }

    function displayErrorMessage(fieldId, message) {
        $('#' + fieldId).addClass('is-invalid');
        $('#' + fieldId + '_error').text(message).show();
    }

    function hideErrorMessage(fieldId) {
        $('#' + fieldId).removeClass('is-invalid');
        $('#' + fieldId + '_error').hide();
    }
});
