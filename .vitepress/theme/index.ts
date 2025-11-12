import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import ExternalLinkModal from "../../components/ExternalLinkModal.vue";
import PartyParrot from "../../components/PartyParrot.vue";
import Weather from "../../components/Weather.vue";
import WhoAmITerminal from "../../components/WhoAmITerminal.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("ExternalLinkModal", ExternalLinkModal);
    app.component("PartyParrot", PartyParrot);
    app.component("Weather", Weather);
    app.component("WhoAmITerminal", WhoAmITerminal);
  },
} satisfies Theme;
