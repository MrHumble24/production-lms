"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const SUPABASE_URL = process.env.PROJECT_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_API_KEY;
const supabase = (0, supabase_js_1.createClient)("https://shxqgxtugewtbjjknfvr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoeHFneHR1Z2V3dGJqamtuZnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTkyMjUsImV4cCI6MjAzMjkzNTIyNX0.VSKP1Pw7HV87AcbkpiUCCt3zbqmzbDcCUqn5f-hRz6U");
exports.default = supabase;
