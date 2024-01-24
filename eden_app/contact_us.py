import frappe
from frappe import whitelist, _
from datetime import datetime


@whitelist(allow_guest=True)
def create_contact_us_document(name,company, email, phone_no ,subject , msg):
    doc = frappe.new_doc("Eden Contact Us")
    doc.first_name = name
    doc.company = company
    doc.email = email
    doc.phone_number = phone_no
    doc.subject = subject
    doc.message = msg
    doc.insert(ignore_permissions=True)

    return 200