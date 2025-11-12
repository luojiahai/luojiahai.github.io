import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import ExternalLinkModal from "../../components/ExternalLinkModal.vue";
import PartyParrot from "../../components/PartyParrot.vue";
import StatusBar from "../../components/StatusBar.vue";
import Weather from "../../components/Weather.vue";
import WhoAreYou from "../../components/WhoAreYou.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("ExternalLinkModal", ExternalLinkModal);
    app.component("PartyParrot", PartyParrot);
    app.component("StatusBar", StatusBar);
    app.component("Weather", Weather);
    app.component("WhoAreYou", WhoAreYou);
  },
} satisfies Theme;
