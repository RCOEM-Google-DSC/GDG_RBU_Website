import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Configure Cloudinary with environment variables
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Server-side function to upload an image to Cloudinary
 * 
 * @param file - Can be a Buffer, a base64 string, or a file path
 * @param folder - Cloudinary folder name (defaults to GDG_BLOG_COVERS)
 * @returns The secure URL of the uploaded image
 */
export async function uploadBlogImage(
	file: string | Buffer,
	folder: string = "GDG_BLOG_COVERS",
): Promise<string> {
	try {
		// Use upload_stream if it's a Buffer
		if (Buffer.isBuffer(file)) {
			return new Promise((resolve, reject) => {
				const uploadStream = cloudinary.uploader.upload_stream(
					{
						folder,
						resource_type: "image",
						use_filename: true,
						unique_filename: true,
					},
					(error, result) => {
						if (error) {
							console.error("Cloudinary upload error:", error);
							return reject(new Error(error.message || "Failed to upload image"));
						}
						if (!result?.secure_url) {
							return reject(new Error("No secure URL returned from Cloudinary"));
						}
						resolve(result.secure_url);
					},
				);
				uploadStream.end(file);
			});
		}

		// Otherwise use the standard upload method (for paths or base64)
		const result = await cloudinary.uploader.upload(file, {
			folder,
			resource_type: "image",
			use_filename: true,
			unique_filename: true,
		});

		if (!result.secure_url) {
			throw new Error("No secure URL returned from Cloudinary");
		}

		return result.secure_url;
	} catch (error: any) {
		console.error(
			"Error uploading to Cloudinary:",
			error.message || error,
		);
		throw new Error(error.message || "Failed to upload image to Cloudinary");
	}
}

// Support running directly as a script
async function runCli() {
	const filePath = process.argv[2];
	if (!filePath) {
		console.error("Usage: npx tsx supabase/blogs-upload.ts <file-path>");
		process.exit(1);
	}

	try {
		const url = await uploadBlogImage(filePath);
		console.log("Published Link:", url);
	} catch (err) {
		console.error("Upload failed.");
		process.exit(1);
	}
}

// Check if run directly
const nodePath = process.argv[1];
const modulePath = fileURLToPath(import.meta.url);

if (nodePath === modulePath || nodePath?.endsWith('blogs-upload.ts')) {
	runCli();
}
