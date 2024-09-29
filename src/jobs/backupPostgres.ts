import cron from "node-cron";
import { exec } from "child_process";
import * as fs from "fs";
import * as path from "path";

// PostgreSQL Backup Function
// DATABASE_URL="postgresql://postgres:1535@localhost:5432/learning-management-systems?schema=public"

export const backupPostgres = (): void => {
  const DB_NAME = "learning-management-systems";
  const DB_USER = "postgres";
  const DB_HOST = "localhost";
  const BACKUP_DIR = path.join(__dirname, "backups");
  const DATE = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
  const BACKUP_FILE = `${BACKUP_DIR}/db_backup_${DATE}.sql`;

  // Ensure the backup directory exists
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  // Execute pg_dump command to create a backup
  const pgDumpCommand = `pg_dump -U ${DB_USER} -h ${DB_HOST} ${DB_NAME} > ${BACKUP_FILE}`;

  exec(pgDumpCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error creating backup: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Backup stderr: ${stderr}`);
      return;
    }

    console.log(`PostgreSQL backup created successfully: ${BACKUP_FILE}`);
  });
};

// Schedule the backup (e.g., every day at midnight)
cron.schedule("0 0 * * *", () => {
  console.log("Running PostgreSQL backup...");
  backupPostgres();
});
