import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "ye-category-banners",

  initialize() {
    withPluginApi("0.8", (api) => {
      api.decorateWidget("ye-category-header-widget:after", (helper) => {
        helper.widget.appEvents.on("page:changed", () => {
          helper.widget.scheduleRerender();
        });
      });
    });
  },
};
