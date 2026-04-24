import { type NextRequest, NextResponse } from "next/server";
import { getBlog } from "@/supabase/blogs-server";
import { createClient as createServerClient } from "@/supabase/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const blog = await getBlog(id);

		return NextResponse.json({ blog });
	} catch (error: unknown) {
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : "Failed to fetch blog",
			},
			{ status: 500 },
		);
	}
}

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const body = await request.json();
		const { title, markdown, imageUrl } = body as {
			title?: string;
			markdown?: string;
			imageUrl?: string | null;
		};

		if (!title?.trim() || !markdown?.trim()) {
			return NextResponse.json(
				{ error: "Missing required fields: title and markdown are required" },
				{ status: 400 },
			);
		}

		const authClient = await createServerClient();
		const {
			data: { user },
			error: authError,
		} = await authClient.auth.getUser();

		if (authError || !user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
		const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

		if (!supabaseUrl || !supabaseServiceKey) {
			return NextResponse.json(
				{ error: "Server configuration error" },
				{ status: 500 },
			);
		}

		const adminClient = createClient(supabaseUrl, supabaseServiceKey);

		const { data: blog, error: blogError } = await adminClient
			.from("blogs")
			.select("id, writer_id")
			.eq("id", id)
			.single();

		if (blogError || !blog) {
			return NextResponse.json({ error: "Blog not found" }, { status: 404 });
		}

		if (blog.writer_id !== user.id) {
			return NextResponse.json(
				{ error: "You can only edit your own blogs" },
				{ status: 403 },
			);
		}

		const { data: updatedBlog, error: updateError } = await adminClient
			.from("blogs")
			.update({
				title: title.trim(),
				markdown: markdown.trim(),
				image_url: imageUrl || null,
			})
			.eq("id", id)
			.select()
			.single();

		if (updateError) {
			return NextResponse.json(
				{ error: updateError.message || "Failed to update blog" },
				{ status: 500 },
			);
		}

		return NextResponse.json({ success: true, blog: updatedBlog });
	} catch (error: unknown) {
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : "Failed to update blog",
			},
			{ status: 500 },
		);
	}
}
