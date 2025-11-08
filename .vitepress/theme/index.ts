import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import Badge from "../../components/Badge.vue";
import ExternalLinkModal from "../../components/ExternalLinkModal.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("Badge", Badge);
    app.component("ExternalLinkModal", ExternalLinkModal);
  },
} satisfies Theme;
