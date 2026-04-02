import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import "./custom-fonts.css";
import Layout from "./Layout.vue";
import Parrot from "../../components/Parrot.vue";
import Resume from "../../components/Resume.vue";
import Terminal from "../../components/Terminal.vue";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("Parrot", Parrot);
    app.component("Resume", Resume);
    app.component("Terminal", Terminal);
  },
} satisfies Theme;
