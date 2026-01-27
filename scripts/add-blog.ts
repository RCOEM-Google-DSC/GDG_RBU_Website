import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL in .env.local");
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY in .env.local");
  console.error(
    "You can find this in your Supabase Dashboard under Settings > API",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface BlogPost {
  writerEmail: string;
  imageUrl: string; 
  title: string;
  markdownFile: string; 
  publishedAt?: string; 
}

// configs
const blogPost: BlogPost = {
  writerEmail: "saptanshuwanjari63@gmail.com", 
  imageUrl:
    "https://res.cloudinary.com/dlvkywzol/image/upload/v1769535172/WhatsApp_Image_2026-01-27_at_11.00.44_PM_e4e8au.jpg",
  title: "Why LangChain is Changing How We Build AI Applications",
  markdownFile: "./team-blogs/langchain.md", 
  publishedAt: new Date().toISOString(), 
};


// fetch data from db
async function getTeamMemberByEmail(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, role")
    .eq("email", email)
    .single();

  if (error || !data) {
    throw new Error(`Team member with email ${email} not found`);
  }
  // club membervalidation
  if (data.role !== "member" && data.role !== "admin") {
    throw new Error(
      `User ${email} is not a team member (role: ${data.role})`,
    );
  }

  return data;
}

async function readMarkdownFile(filePath: string): Promise<string> {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Markdown file not found: ${absolutePath}`);
  }

  return fs.readFileSync(absolutePath, "utf-8");
}

async function createBlogPost(post: BlogPost) {
  console.log("Starting blog post creation...\n");

  // team member
  console.log(`Looking up team member: ${post.writerEmail}`);
  const writer = await getTeamMemberByEmail(post.writerEmail);
  console.log(`Found team member: ${writer.name} (${writer.role})\n`);

  // md content
  console.log(`Reading markdown file: ${post.markdownFile}`);
  const markdownContent = await readMarkdownFile(post.markdownFile);
  console.log(`Markdown loaded (${markdownContent.length} characters)\n`);

  // Insert blog post
  console.log("Inserting blog post into database...");
  const { data, error } = await supabase
    .from("blogs")
    .insert({
      writer_id: writer.id,
      image_url: post.imageUrl,
      title: post.title,
      markdown: markdownContent,
      published_at: post.publishedAt || new Date().toISOString(),
      likes_count: 0,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create blog post: ${error.message}`);
  }

  console.log("Blog post created successfully!\n");
  console.log("Blog Details:");
  console.log(`   ID: ${data.id}`);
  console.log(`   Title: ${data.title}`);
  console.log(`   Writer: ${writer.name}`);
  console.log(`   Published: ${data.published_at}`);
  console.log(`   Image: ${data.image_url}`);
  console.log(`\nDone! Your blog post is now live.`);

  return data;
}

createBlogPost(blogPost)
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("\nError:", error.message);
    process.exit(1);
  });
