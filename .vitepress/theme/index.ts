import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import EmailAddress from "../../components/EmailAddress.vue";
import Link from "../../components/Link.vue";
import Parrot from "../../components/Parrot.vue";
import Resume from "../../components/Resume.vue";
import Terminal from "../../components/Terminal.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("EmailAddress", EmailAddress);
    app.component("Link", Link);
    app.component("Parrot", Parrot);
    app.component("Resume", Resume);
    app.component("Terminal", Terminal);
  },
} satisfies Theme;
