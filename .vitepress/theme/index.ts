import DefaultTheme from "vitepress/theme";
import "./style.css";
import Badge from "../../components/Badge.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("Badge", Badge);
  },
};
