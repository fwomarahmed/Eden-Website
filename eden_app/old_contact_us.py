# In your custom app or module
import frappe

@frappe.whitelist()
def insert_communication(data):
    try:
        # Parse the data JSON string
        data_dict = frappe.parse_json(data)

        # Create a new Communication document
        communication = frappe.get_doc({
            'doctype': 'Communication',
            'subject': data_dict.get('subject'),
            'content': data_dict.get('message'),
            'sender_full_name': data_dict.get('first_name'),
            'sender_email': data_dict.get('email'),
            'phone_number': data_dict.get('phone_number'),
            'status': 'Open'  # Set the status as needed
            # Add more fields as needed
        })

        # Save the Communication document
        communication.insert(ignore_permissions=True)

        return "Success"
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), 'Insert Communication Error')
        return frappe.throw(str(e), title='Error')

# Note: This is a basic example, and you may need to customize it based on your specific use case.
