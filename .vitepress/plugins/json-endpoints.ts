import type { Plugin } from "vite";
import enWhoami from "../../en/whoami.json";
import zhWhoami from "../../zh/whoami.json";

export function jsonEndpointsPlugin(): Plugin {
  return {
    name: "json-endpoints",
    configureServer(server) {
      server.middlewares.use((req: any, res: any, next: any) => {
        try {
          res.setHeader("Content-Type", "application/json");
          if (req.url === "/whoami") {
            res.end(JSON.stringify(enWhoami, null, 2));
          } else if (req.url === "/zh/whoami") {
            res.end(JSON.stringify(zhWhoami, null, 2));
          } else {
            next();
          }
        } catch (err) {
          next();
        }
      });
    },
  };
}
