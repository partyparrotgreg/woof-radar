import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    // url: env.DATABASE_URL,
    url: env.POSTGRES_URL,
    
  },
  tablesFilter: ["woof-radar-t3-drizzle_*"],
} satisfies Config;
