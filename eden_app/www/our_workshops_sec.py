import frappe

@frappe.whitelist(allow_guest=True)
def get_workshops():
    workshops = frappe.get_all('Eden Workshops', fields=['workshop_title', 'workshop_subtitle' , 'workshop_date' ,'workshop_time', 'workshop_status' , 'workshop_image','workshop_url_link'])
    return workshops
