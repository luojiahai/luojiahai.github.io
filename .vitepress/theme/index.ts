import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import EmailAddress from "../../components/EmailAddress.vue";
import LinkButton from "../../components/LinkButton.vue";
import Parrot from "../../components/Parrot.vue";
import Resume from "../../components/Resume.vue";
import Terminal from "../../components/Terminal.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("EmailAddress", EmailAddress);
    app.component("LinkButton", LinkButton);
    app.component("Parrot", Parrot);
    app.component("Resume", Resume);
    app.component("Terminal", Terminal);
  },
} satisfies Theme;
