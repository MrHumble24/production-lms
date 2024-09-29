"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid"); // Import UUID package
const supabaseClient_1 = __importDefault(require("../supabaseClient"));
const uploadImageToSupabase = (file, folder) => __awaiter(void 0, void 0, void 0, function* () {
    let imageURL = "";
    if (file) {
        try {
            const sanitizedFilename = file.originalname.replace(/\s+/g, "_");
            // Step 2: Generate a unique filename with UUID
            const uniqueFilename = `${folder}/${(0, uuid_1.v4)()}-${sanitizedFilename}`;
            // Step 3: Upload the file to Supabase storage
            const { data: uploadData, error } = yield supabaseClient_1.default.storage
                .from("companies")
                .upload(uniqueFilename, file.buffer, {
                cacheControl: "3600",
                upsert: false,
            });
            if (error) {
                throw new Error(`Failed to upload logo: ${error.message}`);
            }
            // Step 4: Construct the logo URL
            imageURL = `${process.env.PROJECT_URL}/storage/v1/object/public/companies/${uploadData.path}`;
        }
        catch (error) {
            throw new Error(`Logo upload failed: ${error}`);
        }
    }
    return imageURL;
});
exports.default = uploadImageToSupabase;
