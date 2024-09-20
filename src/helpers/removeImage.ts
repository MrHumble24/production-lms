import supabase from "../supabaseClient";

const deleteImageFromSupabase = async (
  imageUrl: string | undefined | null
): Promise<void> => {
  if (!imageUrl) {
    return;
  }

  const logoPath = imageUrl.replace(
    `${process.env.PROJECT_URL}/storage/v1/object/public/companies/`,
    ""
  );

  console.log(`Attempting to delete logo at path: ${logoPath}`);

  // Step 3: Delete the image from Supabase storage
  const { error: deleteError } = await supabase.storage
    .from("companies")
    .remove([logoPath]); // Correctly use the extracted logoPath

  if (deleteError) {
    throw new Error(
      `Failed to delete logo from storage: ${deleteError.message}`
    );
  }
};

export default deleteImageFromSupabase;
