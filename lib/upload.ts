/**
 * Client-side utility to upload an image to the /api/upload route
 * 
 * @param file - The File or Blob object to upload
 * @param folder - Optional folder name in Cloudinary
 * @returns The secure URL of the uploaded image
 */
export async function uploadImage(
	file: File | Blob,
	folder: string = "GDG_BLOG_COVERS",
): Promise<string> {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("folder", folder);

	const response = await fetch("/api/upload", {
		method: "POST",
		body: formData,
	});

	const data = await response.json().catch(() => ({}));

	if (!response.ok) {
		throw new Error(
			data.details || data.error || `Upload failed (HTTP ${response.status})`,
		);
	}

	const uploadedUrl = data.url || data.secure_url || data.transformed_url;
	if (!uploadedUrl) {
		throw new Error("Upload did not return a valid image URL");
	}

	return uploadedUrl;
}
