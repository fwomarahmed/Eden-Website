# File: my_app/www/our_workshops_sec.py
import frappe


def get_context(context):
    workshops = frappe.db.get_all(
        "Eden Workshops",
        fields=[
            "workshop_title",
            "workshop_subtitle",
            "workshop_date",
            "workshop_time",
            "workshop_status",
            "workshop_image",
            "workshop_url_link",
        ],
    )

    print("Workshops:", workshops)  # Add this line for debugging

    context.workshops = workshops
    return context
