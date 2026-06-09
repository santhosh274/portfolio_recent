// Database module placeholder
// Prisma has been removed as it was not being used in the project
// If you need database functionality in the future, consider:
// - SQLite with better-sqlite3 for simple local projects
// - Supabase or PlanetScale for serverless databases
// - Direct SQL with connection pooling

export const db = null;

export function getDb() {
  if (!db) {
    throw new Error('Database is not configured. Install and configure a database client to use database features.');
  }
  return db;
}
