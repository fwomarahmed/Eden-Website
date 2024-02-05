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
    )
    blogs = frappe.get_all(
        "Eden Blogs",
        fields=["blog_title", "blog_subtitle", "blog_url_link", "blog_image"],
    )

    context["workshops"] = workshops
    context.blogs = blogs

    return context
