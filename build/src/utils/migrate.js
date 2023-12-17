"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const tslib_1 = require("tslib");
const migrator_1 = require("drizzle-orm/postgres-js/migrator");
const postgres_1 = tslib_1.__importDefault(require("postgres"));
const postgres_js_1 = require("drizzle-orm/postgres-js");
const connectionString = process.env.DATABASE_URL;
const client = (0, postgres_1.default)(connectionString, { ssl: 'require' });
exports.db = (0, postgres_js_1.drizzle)(client);
async function main() {
    console.log("Migrating database");
    await (0, migrator_1.migrate)(exports.db, { migrationsFolder: "drizzle" });
    console.log("Migrating finished");
    process.exit(0);
}
main();
//# sourceMappingURL=migrate.js.map