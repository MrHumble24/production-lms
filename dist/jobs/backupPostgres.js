"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backupPostgres = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const child_process_1 = require("child_process");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// PostgreSQL Backup Function
// DATABASE_URL="postgresql://postgres:1535@localhost:5432/learning-management-systems?schema=public"
const backupPostgres = () => {
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
    (0, child_process_1.exec)(pgDumpCommand, (error, stdout, stderr) => {
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
exports.backupPostgres = backupPostgres;
// Schedule the backup (e.g., every day at midnight)
node_cron_1.default.schedule("0 0 * * *", () => {
    console.log("Running PostgreSQL backup...");
    (0, exports.backupPostgres)();
});
