import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import ExternalLinkModal from "../../components/ExternalLinkModal.vue";
import PartyParrot from "../../components/PartyParrot.vue";
import WhoAmITerminal from "../../components/WhoAmITerminal.vue";
import Weather from "../../components/Weather.vue";
import WhoAreYou from "../../components/WhoAreYou.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("ExternalLinkModal", ExternalLinkModal);
    app.component("PartyParrot", PartyParrot);
    app.component("WhoAmITerminal", WhoAmITerminal);
    app.component("Weather", Weather);
    app.component("WhoAreYou", WhoAreYou);
  },
} satisfies Theme;
