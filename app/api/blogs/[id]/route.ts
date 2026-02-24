import { type NextRequest, NextResponse } from "next/server";
import { getBlog } from "@/supabase/blogs-server";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const blog = await getBlog(id);

		return NextResponse.json({ blog });
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || "Failed to fetch blog" },
			{ status: 500 },
		);
	}
}
