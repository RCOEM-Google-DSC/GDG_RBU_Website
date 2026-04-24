import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/supabase/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
	try {
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

		const { data: blogs, error } = await adminClient
			.from("blogs")
			.select("id, title, image_url, markdown, published_at")
			.eq("writer_id", user.id)
			.order("published_at", { ascending: false });

		if (error) {
			return NextResponse.json(
				{ error: error.message || "Failed to fetch blogs" },
				{ status: 500 },
			);
		}

		return NextResponse.json({ blogs: blogs || [] });
	} catch (error: unknown) {
		return NextResponse.json(
			{
				error: error instanceof Error ? error.message : "Failed to fetch blogs",
			},
			{ status: 500 },
		);
	}
}
