import DefaultTheme from "vitepress/theme";
import "./style.css";
import Modal from "../../components/Modal.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("Modal", Modal);
  },
};
