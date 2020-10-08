import { h } from "virtual-dom";
import { iconNode } from "discourse-common/lib/icon-library";
import { createWidget } from "discourse/widgets/widget";

function buildCategory(category) {
  const header = [];

  if (settings.show_icon) {
    header.push(
      h("div.category-icon", { innerHTML: category.logo })
    );
  }

  const content = [
    h("h1.category-title", category.name)
  ];

  if (settings.show_description) {
    content.push(
      h("div.category-description", { innerHTML: category.description })
    );
  }

  header.push(
    h("div.category-content"), content,
  )

  return header;
}

export default createWidget("ye-category-header-widget", {
  tagName: "span.discourse-category-banners",

  html() {
    const path = window.location.pathname;
    const category = this.register
      .lookup("controller:navigation/category")
      .get("category");

    if (!category) {
      return;
    }

    console.log('Category', category);

    const isException = settings.exceptions
      .split("|")
      .filter(Boolean)
      .includes(category.name);

    if (/^\/c\//.test(path)) {
      const hideMobile = !settings.show_mobile && this.site.mobileView;
      const isSubCategory = !settings.show_subcategory && category.parentCategory;
      const hasNoCategoryDescription = settings.hide_if_no_description && !category.description_text;

      if (!isException && !hasNoCategoryDescription && !isSubCategory && !hideMobile) {
        document.body.classList.add("category-header");

        return h(
          `div.category-header.category-banner-${category.slug}`,
          {
            attributes: {
              style: `
                background-color: #${category.color};
                color: #${category.text_color};
              `,
            },
          },
          buildCategory(category),
        );
      }
    } else {
      document.body.classList.remove("category-header");
    }
  },
});
