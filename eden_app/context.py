import frappe


def get_context(context):
    context.no_cache = 1
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
    # community_blogs = frappe.get_all(
    #     "Community Blogs",
    #     fields=[
    #         "blog_title",
    #         "blog_subtitle",
    #         "blog_writer_image",
    #         "blog_hero_image",
    #         "blog_writter_name",
    #         "blog_date",
    #         "custom_blog_url_link"
            
    #     ],
    # )

    context["workshops"] = workshops
    context.blogs = blogs
    # context.community_blogs = community_blogs
    return context
