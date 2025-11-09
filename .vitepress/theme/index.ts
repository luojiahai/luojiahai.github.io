import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import ExternalLinkModal from "../../components/ExternalLinkModal.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("ExternalLinkModal", ExternalLinkModal);
  },
} satisfies Theme;
