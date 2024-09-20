import { v4 as uuidv4 } from "uuid"; // Import UUID package
import supabase from "../supabaseClient";

const uploadImageToSupabase = async (file: any | undefined, folder: string) => {
	let imageURL = "";

	if (file) {
		try {
			const sanitizedFilename = file.originalname.replace(/\s+/g, "_");

			// Step 2: Generate a unique filename with UUID
			const uniqueFilename = `${folder}/${uuidv4()}-${sanitizedFilename}`;

			// Step 3: Upload the file to Supabase storage
			const { data: uploadData, error } = await supabase.storage
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
		} catch (error) {
			throw new Error(`Logo upload failed: ${error}`);
		}
	}

	return imageURL;
};

export default uploadImageToSupabase;
