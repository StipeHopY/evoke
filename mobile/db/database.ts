import { drizzle, ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";

import * as schema from "./schema";
import { dbName } from "@/constants/data";

// TODO: try to make that expo env string is not | undefined

const expo = SQLite.openDatabaseSync(dbName);

export const db: ExpoSQLiteDatabase<typeof schema> = drizzle(expo, { schema });
export * from "./schema";
