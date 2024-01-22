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
            // Uncomment the line below to submit the form
            // $('form')[0].submit();
        } else {
            console.log('Form is not valid. Please check your inputs.');
        }
    });

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
