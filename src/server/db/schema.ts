// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `woofradar_${name}`);


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

export const woofs = createTable("woof", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  level: integer("level"),
  lat: integer("lat"),
  lng: integer("lng"),
  address: varchar("address", { length: 256 }),
  // ownerId: integer("owner_id")
  //   .notNull()
  //   .references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});