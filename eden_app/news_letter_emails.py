import frappe
from frappe import whitelist, _
from datetime import datetime


@whitelist(allow_guest=True)
def create_news_letter_email_document(email):
    doc = frappe.new_doc("Eden News Letter Emails")
    doc.email = email
    doc.insert(ignore_permissions=True)

    return 200
