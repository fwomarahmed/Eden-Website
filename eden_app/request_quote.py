import frappe
from frappe import whitelist, _
from datetime import datetime


@whitelist(allow_guest=True)
def create_request_quote_document(first_name,last_name , country , phone_no , email ,company , employee_no ,msg):
    doc = frappe.new_doc("Eden Request Quote")
    doc.first_name = first_name
    doc.last_name = last_name
    doc.country = country
    doc.phone_number = phone_no
    doc.email = email
    doc.company = company
    doc.employee_no = employee_no
    doc.msg = msg
    doc.insert(ignore_permissions=True)

    return 200