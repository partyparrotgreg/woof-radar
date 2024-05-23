// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

// export const users = createTable(
//   "user",
//   {
//     id: serial("id").primaryKey(),
//     name: text("name").notNull(),
//     email: text("email").notNull(),
//     image: text("image").notNull(),
//     createdAt: timestamp("createdAt").defaultNow().notNull(),
//   },
//   (users) => ({
//     emailIndex: index("email_idx").on(users.email),
//   }),
// );

// export const accounts = createTable(
//   "account",
//   {
//     id: serial("id").primaryKey(),
//     userId: integer("user_id"),
//     balance: integer("balance"),
//     createdAt: timestamp("created_at", { withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updatedAt", { withTimezone: true }),
//   },
//   (example) => ({
//     userIdIndex: index("user_id_idx").on(example.userId),
//   }),
// );

export const woofs = pgTable("woof", {
  id: serial("id").primaryKey(),
  level: integer("level"),
  lat: varchar("lat", { length: 256 }),
  lng: varchar("lng", { length: 256 }),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});