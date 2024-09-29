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
const supabaseClient_1 = __importDefault(require("../supabaseClient"));
const deleteImageFromSupabase = (imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    if (!imageUrl) {
        return;
    }
    const logoPath = imageUrl.replace(`${process.env.PROJECT_URL}/storage/v1/object/public/companies/`, "");
    console.log(`Attempting to delete logo at path: ${logoPath}`);
    // Step 3: Delete the image from Supabase storage
    const { error: deleteError } = yield supabaseClient_1.default.storage
        .from("companies")
        .remove([logoPath]); // Correctly use the extracted logoPath
    if (deleteError) {
        throw new Error(`Failed to delete logo from storage: ${deleteError.message}`);
    }
});
exports.default = deleteImageFromSupabase;
