import frappe


def get_context(context):
    workshops = frappe.get_all(
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
        filters=[],
    )
    frappe.msgprint("helloooooooooooooooo")
    print(
        "#########################################################################"
    )  # Add this line for debugging
    print(
        "#########################################################################"
    )  # Add this line for debugging
    print(
        "#########################################################################"
    )  # Add this line for debugging
    print("Workshops:", workshops)  # Add this line for debugging

    context.workshops = workshops
    return context
