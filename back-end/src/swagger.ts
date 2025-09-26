import type { Express } from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { fileURLToPath } from "url";

export function mountSwagger(app: Express, base = "/docs") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const swaggerPath = path.join(__dirname, "../swagger.yaml");
  const swaggerDocument = yaml.load(fs.readFileSync(swaggerPath, "utf8")) as Record<string, any>;
  app.use(base, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}