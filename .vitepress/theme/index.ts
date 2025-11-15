import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import Badge from "../../components/Badge.vue";
import Parrot from "../../components/Parrot.vue";
import Resume from "../../components/Resume.vue";
import Terminal from "../../components/Terminal.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("Badge", Badge);
    app.component("Parrot", Parrot);
    app.component("Resume", Resume);
    app.component("Terminal", Terminal);
  },
} satisfies Theme;
