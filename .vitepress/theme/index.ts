import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import Badge from "../../components/Badge.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("Badge", Badge);
  },
} satisfies Theme;
