// Domain definitions + full recruitment task briefs (2026-27)

export type BriefLink = { label: string; url: string };

export type BriefSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: BriefLink[];
};

export type TaskContact = { name: string; role: string; phone: string };

export type TaskBrief = {
  id: string;
  /** Tab label shown when a domain has multiple tasks */
  label: string;
  position: string;
  badge?: string;
  overview: string;
  sections: BriefSection[];
  submission: string[];
  contacts: TaskContact[];
  note?: string;
};

export type Domain = {
  id: string;
  name: string;
  shortName: string;
  color: string;
  description: string;
  briefs: TaskBrief[];
};

const CO_LEADS: TaskContact[] = [
  { name: "Saptanshu Wanjari", role: "GDG RBU Co-Lead", phone: "+91 7350557473" },
  { name: "Zoya Ghachi", role: "GDG RBU Co-Lead", phone: "+91 7058046302" },
];

const WEB_CONTACTS: TaskContact[] = [
  ...CO_LEADS,
  { name: "Rohit Agrawal", role: "Web Lead", phone: "+91 9981978217" },
];

const MM_CONTACTS: TaskContact[] = [
  ...CO_LEADS,
  { name: "Jagravi Bisen", role: "Marketing Lead", phone: "+91 9103548451" },
  { name: "Saarth Meshram", role: "Management Lead", phone: "+91 9552603646" },
];

const MM_BRIEF: TaskBrief = {
  id: "mm-core",
  label: "Main Task",
  position: "Management & Marketing",
  overview:
    "Plan, market and run a technical event end-to-end - from the event concept and promotion plan to sponsorship, constraint handling and official permission letters. One combined brief for both Management and Marketing applicants.",
  sections: [
    {
      heading: "1. Draft a technical event of your choice",
      bullets: [
        "Specify the main objective of the event.",
        "Explain what makes it stand out from other events.",
        "Suggest an appealing name for the event.",
        "Draft the event timeline, including: Introduction, various event segments, Conclusion, Vote of Thanks.",
      ],
    },
    {
      heading: "2. Marketing & promotion",
      bullets: [
        "Explain how you will promote the event both online and offline to maximize participation.",
        "Give at least 3 creative content ideas with sample captions and hashtags.",
        "Write a catchy tagline for the event.",
      ],
    },
    {
      heading: "3. Sponsorship",
      bullets: [
        "Suggest the type of businesses, organizations, or communities you would approach for sponsorship - and explain why.",
        "Explain how you would convince them to sponsor the event.",
        "Draft a sponsorship email.",
        "Create a sponsorship pitch deck.",
      ],
    },
    {
      heading: "4. Event management constraints",
      bullets: [
        "The event gets preponed - you now have only 48 hours to prepare and execute it.",
        "The previously booked venue is now occupied. Where will you conduct the event?",
        "How will you convey the venue change to the participants?",
      ],
    },
    {
      heading: "5. Marketing constraint",
      bullets: [
        "Instagram cannot be used for promotion.",
        "Explain how you will manage the marketing and maximize participation using alternative platforms.",
      ],
    },
    {
      heading: "6. Official permission letters",
      bullets: [
        "Event Permission Letter",
        "Venue Permission Letter",
        "Desk Publicity Request Letter",
      ],
    },
  ],
  submission: [
    "Compile all six sections into a single document / deck and upload it to Google Drive.",
    "Paste the Drive link (plus pitch-deck link, if separate) in the task submission form below.",
    "Create a Google Drive folder or Google Doc and make sure it is shared with 'Anyone with the link' access.",
  ],
  contacts: MM_CONTACTS,
};

export const DOMAINS: Domain[] = [
  {
    id: "web-dev",
    name: "Web Development",
    shortName: "WEB DEV",
    color: "#4285F4",
    description:
      "Build modern, responsive web applications using cutting-edge technologies like React, Next.js, and more. Shape the digital face of GDG RBU.",
    briefs: [
      {
        id: "frontend",
        label: "Frontend",
        position: "Frontend Web Developer",
        overview:
          "Convert the provided Figma UI design into a fully functional, responsive website using React or any equivalent framework/library. It must work across mobile, tablet and desktop and follow good practices - semantic HTML, clean architecture, optimized assets.",
        sections: [
          {
            heading: "Figma design to convert",
            paragraphs: [
              "Convert this exact Figma design into the responsive website:",
            ],
            links: [
              {
                label: "GDG Frontend Task - Figma",
                url: "https://www.figma.com/design/a8CZ4WnoYXeXN6r9RxFzhr/GDG-Frotend-Task?node-id=0-1&t=XmTzxECnVOpoUmOV-1",
              },
            ],
          },
          {
            heading: "Core requirements",
            bullets: [
              "Convert the Figma design into a responsive React website.",
              "Ensure responsiveness across mobile, tablet, and desktop.",
              "Deploy the website on Vercel (preferred) or alternatives like Netlify / Render.",
              "Maintain a well-structured GitHub repository with documentation.",
              "Implement Dark / Light mode.",
              "Add smooth animations & transitions.",
            ],
          },
          {
            heading: "Bonus features",
            bullets: [
              "Use TypeScript for better type safety.",
              "AI-powered interactions or features.",
              "Built with Next.js.",
            ],
          },
          {
            heading: "References",
            links: [
              { label: "React Docs", url: "https://react.dev" },
              { label: "Next.js Docs", url: "https://nextjs.org/docs" },
              { label: "Vercel Docs", url: "https://vercel.com/docs" },
            ],
          },
        ],
        submission: [
          "Upload your code to GitHub with proper documentation and setup instructions.",
          "Upload the GitHub link and the deployed frontend URL in the task submission form below.",
          "Points are allocated on technical quality and inclusion of bonus / optional features.",
          "Create a Google Drive folder or Google Doc and make sure it is shared with 'Anyone with the link' access.",
        ],
        contacts: WEB_CONTACTS,
      },
      {
        id: "backend",
        label: "Backend",
        position: "Backend Web Developer",
        overview:
          "Build RESTful APIs with proper authentication, protected routes and real business rules - plus a small React interface on top. Pick any backend framework (Node.js, Django, Flask, etc.) and follow good repo + documentation practices.",
        sections: [
          {
            heading: "Task - Event Management & Registration API",
            paragraphs: [
              "System where users discover events, view details, register, and manage registrations, while admins manage events. Must prevent duplicate registrations, enforce capacity, and keep registration data consistent.",
            ],
            bullets: [
              "User registration and login; JWT / session-based authentication.",
              "CRUD operations for events - Title, Description, Date/Time, Venue, Capacity, Category.",
              "Authenticated users can register; prevent duplicates and full-event registration.",
              "Users can view their registered events; admins can create, update and delete events.",
              "React interface: browse, search & filter events, view details, register / unregister, view registrations, admin event management.",
              "Bonus: event reminders, rate limiting, Redis caching, Docker, analytics, QR codes, background jobs.",
            ],
          },
          {
            heading: "References",
            links: [
              { label: "Flask Docs", url: "https://flask.palletsprojects.com" },
              { label: "Node.js Docs", url: "https://nodejs.org/docs" },
              { label: "React Docs", url: "https://react.dev" },
              { label: "Next.js Docs", url: "https://nextjs.org/docs" },
              { label: "Vercel Docs", url: "https://vercel.com/docs" },
              { label: "Docker Docs", url: "https://docs.docker.com" },
            ],
          },
        ],
        submission: [
          "Upload your code to GitHub with proper documentation and setup instructions.",
          "Upload the GitHub link and the deployed frontend URL (if hosted) in the task submission form below.",
          "Points are allocated on technical quality and inclusion of bonus / optional features.",
          "Create a Google Drive folder or Google Doc and make sure it is shared with 'Anyone with the link' access.",
        ],
        contacts: WEB_CONTACTS,
      },
    ],
  },
  {
    id: "cp",
    name: "Competitive Programming",
    shortName: "CP",
    color: "#EA4335",
    description:
      "Sharpen your problem-solving skills, participate in coding contests, and represent GDG RBU on global competitive programming platforms.",
    briefs: [
      {
        id: "cp-contest",
        label: "Contest",
        position: "Competitive Programming",
        badge: "Live contest",
        overview:
          "Compete in the Codeforces contest below. Contest results will be evaluated and observed for shortlisting candidates for interviews. Do not use AI.",
        sections: [
          {
            heading: "Contest details",
            bullets: [
              "Codeforces contest on 10th October, 20:00 – 22:00 IST.",
              "Register on the platform first, then join via the contest link.",
            ],
            links: [
              { label: "Register on Codeforces", url: "https://codeforces.com/register" },
              { label: "Contest link - Codeforces", url: "https://codeforces.com/contestInvitation/c50c2ab74d9b4a86cba09f7a05819833a4184fc3" },
            ],
          },
        ],
        submission: [
          "Take part in the contest at the scheduled time.",
          "Paste your Codeforces profile link and contest rank / screenshot link in the task submission form below.",
          "Create a Google Drive folder or Google Doc and make sure it is shared with 'Anyone with the link' access.",
        ],
        contacts: [
          ...CO_LEADS,
          { name: "Adarsh Jha", role: "CP Co-Lead", phone: "+91 93401 94244" },
          { name: "Dev Jain", role: "CP Co-Lead", phone: "+91 90335 96889" },
        ],
      },
    ],
  },
  {
    id: "design",
    name: "Design",
    shortName: "DESIGN",
    color: "#FBBC04",
    description:
      "Craft stunning visuals, UI/UX designs, and brand assets that define the look and feel of GDG RBU across all platforms.",
    briefs: [
      {
        id: "portfolio",
        label: "Task 1 · Portfolio",
        position: "UI/UX Designer",
        overview:
          "Design a personal portfolio that effectively presents your skills, experience, projects, and creative identity - clear, visually appealing, well-structured, and in your own design style.",
        sections: [
          {
            heading: "Include these sections",
            bullets: [
              "About Me - brief introduction, interests / goals.",
              "Skills - technical, creative, or organizational.",
              "Projects & Experience - relevant work, achievements, activities.",
              "Contact & Links - GitHub, LinkedIn, Behance, Instagram, or other relevant profiles.",
            ],
          },
          {
            heading: "Tooling",
            paragraphs: ["Create it in Figma (preferred) or any other design tool."],
          },
        ],
        submission: [
          "Submit a Figma link with editable access, a PDF, or a deployed website link - whichever best represents your portfolio.",
          "Paste the link(s) in the task submission form below.",
          "Create a Google Drive folder or Google Doc and make sure it is shared with 'Anyone with the link' access.",
        ],
        contacts: [
          ...CO_LEADS,
          { name: "Gayatri Donode", role: "Design Co-Lead", phone: "+91 8407906655" },
          { name: "Moksh Barapatre", role: "Design Co-Lead", phone: "+91 9049527009" },
        ],
      },
      {
        id: "hackathon-post",
        label: "Task 2 · Hackathon Post",
        position: "UI/UX Designer",
        overview:
          "Design a social media post promoting a college-level hackathon - visually engaging, clear hierarchy, aligned with the GDG RBU brand, and strong enough to make students register. Show your own design thinking; don't depend on AI for the core design.",
        sections: [
          {
            heading: "Format",
            bullets: [
              "Size: 1080 × 1350 px, built in Figma / Photoshop / Illustrator or any design tool.",
              "Single slide (visual + event info in one post) OR two slides (slide 1 = visual, slide 2 = details).",
            ],
          },
          {
            heading: "Must include",
            bullets: [
              "Hackathon name, date & time, venue or online platform, registration info.",
              "Key highlights - themes, tracks, prizes, workshops, networking.",
            ],
          },
          {
            heading: "Style reference",
            paragraphs: [
              "Use the GDG RBU Instagram page as a reference for visual style and brand identity, while keeping the concept original.",
            ],
          },
          {
            heading: "Design thinking document (mandatory)",
            paragraphs: [
              "One-page Word / PDF explaining your concept: visual direction, typography, color choices, layout, branding decisions and the reasoning behind the overall approach.",
            ],
          },
        ],
        submission: [
          "Submit final post(s) as PNG / JPG (both slides if two) plus the one-page design-thinking document via Drive.",
          "Paste the link(s) in the task submission form below.",
          "Create a Google Drive folder or Google Doc and make sure it is shared with 'Anyone with the link' access.",
        ],
        contacts: [
          ...CO_LEADS,
          { name: "Gayatri Donode", role: "Design Co-Lead", phone: "+91 8407906655" },
          { name: "Moksh Barapatre", role: "Design Co-Lead", phone: "+91 9049527009" },
        ],
      },
      {
        id: "tshirt",
        label: "Bonus · T-Shirt",
        position: "UI/UX Designer",
        badge: "Bonus · optional",
        overview:
          "Design a GDG RBU T-shirt that represents the community's identity plus your personal design style. Minimal, experimental, typography-based, illustrative - any style. Explore front, back, sleeves, or the overall layout.",
        sections: [
          {
            heading: "Guidelines",
            bullets: [
              "Any tool of your choice.",
              "Must feel aligned with the GDG RBU brand while leaving room for your creativity.",
              "Not mandatory - a chance to showcase additional creativity and merchandise thinking.",
            ],
          },
        ],
        submission: [
          "Submit the artwork (PNG / PDF) via Drive and paste the link in the task submission form below.",
          "Create a Google Drive folder or Google Doc and make sure it is shared with 'Anyone with the link' access.",
        ],
        contacts: [
          ...CO_LEADS,
          { name: "Gayatri Donode", role: "Design Co-Lead", phone: "+91 8407906655" },
          { name: "Moksh Barapatre", role: "Design Co-Lead", phone: "+91 9049527009" },
        ],
      },
    ],
  },
  {
    id: "mac",
    name: "ML / Android / Cloud",
    shortName: "MAC",
    color: "#34A853",
    description:
      "Explore machine learning, artificial intelligence, and cloud computing. Build intelligent solutions and deploy them at scale.",
    briefs: [
      {
        id: "cloud-deploy",
        label: "Cloud Task",
        position: "Cloud",
        overview:
          "Containerize a web application, deploy it on a cloud platform behind a load balancer, and set up CI/CD so every push to main is automatically built and deployed.",
        sections: [
          {
            heading: "1. Select a cloud platform",
            bullets: [
              "Choose AWS, GCP, Azure, etc. - a free-tier account is fine.",
              "Set up a billing alert / budget cap so you don't get charged unexpectedly.",
            ],
          },
          {
            heading: "2. Containerize the application",
            bullets: [
              "Build a simple app in any framework (Node.js, Flask, Django, etc.) with at least two endpoints such as / and /health.",
              "Display the hostname / instance ID so load balancing is visible on refresh.",
              "Write a Dockerfile, run the container locally to confirm, then push the image to a registry (Docker Hub, Artifact Registry, ECR, ACR).",
            ],
          },
          {
            heading: "3. Deploy with load balancing",
            bullets: [
              "Run at least two instances on a managed service (ECS/Fargate, GKE, Container Apps, EC2/VMs with Docker, etc.).",
              "Put a load balancer in front (ALB, Cloud Load Balancing, Azure LB, or equivalent) with a health check on /health.",
              "Service must be reachable over the internet via the load balancer's public URL.",
              "Use environment variables or a secrets manager - never hardcode credentials.",
            ],
          },
          {
            heading: "4. Set up CI/CD",
            bullets: [
              "Use GitHub Actions, GitLab CI, Cloud Build, or similar.",
              "A push to main must automatically build the image, push it to the registry, and redeploy the service.",
            ],
          },
          {
            heading: "Bonus - custom domain + HTTPS",
            bullets: [
              "Map a domain / subdomain to the load balancer via DNS (Route 53, Cloud DNS, Azure DNS, or registrar).",
              "Enable HTTPS with a valid cert (ACM, Google-managed certs, Let's Encrypt).",
              "Free options: DuckDNS / FreeDNS subdomain, or GitHub Student Developer Pack domain offers.",
            ],
          },
          {
            heading: "Documentation - video (5–10 min)",
            bullets: [
              "Architecture with a simple diagram + why you chose each service.",
              "Dockerfile walkthrough and how the container runs.",
              "Load balancing in action: refreshing the URL across instances, and what happens when one instance stops.",
              "CI/CD running live: a code change triggering an automatic redeploy.",
              "Custom domain with HTTPS (if done); challenges faced and how you solved them.",
            ],
          },
          {
            heading: "Documentation - README",
            bullets: [
              "Architecture diagram, setup steps, and approximate cost breakdown of services used.",
            ],
          },
        ],
        submission: [
          "URL of the deployed service (and custom domain, if done).",
          "Link to the walkthrough video.",
          "Link to the GitHub repo (Dockerfile + pipeline config).",
          "Upload everything to a Google Drive folder and paste the link in the task submission form below.",
          "Create a Google Drive folder or Google Doc and make sure it is shared with 'Anyone with the link' access.",
        ],
        contacts: [
          ...CO_LEADS,
          { name: "Samarth Zalkikar", role: "MAC Lead", phone: "+91 9075085950" },
          { name: "Vivian Demello", role: "MAC Co-Lead", phone: "+91 7588270066" },
        ],
      },
      {
        id: "android",
        label: "Android",
        position: "Android",
        overview:
          "Build an offline-first Android habit tracker: users create habits, log progress daily, get reminders, and see streaks and statistics over time. Everything must work offline. For product reference look at Habitized on the Play Store - build your own app, do not copy its code, assets, or branding. Frameworks allowed: Native (Kotlin/Java), Flutter, React Native, etc.",
        sections: [
          {
            heading: "Example behavior",
            paragraphs: [
              "User creates 'Read', a countable habit with a target of 20 pages per day, and 'Gym', a yes/no habit on Monday, Wednesday, Friday. Monday: 12 pages read, Gym done. Tuesday: 20 pages read. Wednesday: 25 pages read, Gym done. On Wednesday evening the app should show: Read streak 2 (Monday missed the target); Gym streak 2 (Tuesday was unscheduled, so it does not break the streak). If the user corrects Monday to 20 pages, the Read streak becomes 3.",
            ],
          },
          {
            heading: "1. Create habits",
            bullets: [
              "Create, edit, and delete habits with a name, type, schedule, target, and optional reminder.",
              "Types: yes/no, countable with a custom unit (e.g. pages, glasses), and timed (e.g. Pomodoro).",
              "Schedules: daily, specific weekdays, and N times per week.",
            ],
          },
          {
            heading: "2. Log progress",
            bullets: [
              "A Today screen showing today's habits and progress with quick logging.",
              "Allow correcting previous days.",
            ],
          },
          {
            heading: "3. Streaks and statistics",
            bullets: [
              "Current and longest streaks that respect the schedule.",
              "Completion rates and a calendar or chart view.",
            ],
          },
          {
            heading: "4. Reminders",
            bullets: [
              "Per-habit notifications that fire on time and still work after the phone restarts.",
            ],
          },
          {
            heading: "5. Store data on the device",
            paragraphs: [
              "Data must survive app and phone restarts. Design your own data model - something like: Habit -> id, name, type, schedule, target, unit, reminderTime; HabitLog -> habitId, date, value, completed.",
            ],
          },
          {
            heading: "6. Test the logic",
            bullets: [
              "Write at least 15 automated tests for the streak and statistics logic.",
              "Cover: a missed day breaking a daily streak, unscheduled days not breaking a streak, partial progress on countable habits, editing a past day, and logs close to midnight.",
            ],
          },
          {
            heading: "Rules",
            bullets: [
              "Core features must work offline, with no account or paid service required.",
              "Keep the UI separate from the habit, schedule, and streak logic, so the logic can be tested on its own.",
              "The project must build from a fresh clone by following your README.",
              "Feature count is not the goal. A small app that works offline, gets streaks right, and delivers reminders reliably scores higher than a large app with fragile logic.",
            ],
          },
          {
            heading: "Bonus (optional)",
            bullets: [
              "Home screen widget; mark a habit done from the notification; a simple to-do list for one-off tasks; light and dark themes; data export and import; optional cloud sync that keeps the app offline-first.",
              "Mention anything you add in your README.",
            ],
          },
          {
            heading: "Evaluation rubric (total 20 pts, +3 bonus)",
            bullets: [
              "Core functionality (5): habits, logging, reminders, and storage work end to end.",
              "Correctness (4): streaks and statistics are right across schedules and edits to past days.",
              "Architecture (4): well-structured code that is easy to extend.",
              "UI / UX (3): a clean app that is pleasant to use.",
              "Testing (2): meaningful automated tests.",
              "README and video (2): clear setup steps and explanation.",
              "Bonus (+3): additional features mentioned in the README.",
            ],
          },
          {
            heading: "Documentation - README",
            bullets: [
              "Setup and build steps, screenshots of the main screens, and any assumptions or limitations.",
              "Briefly answer: why did you choose your tech stack and architecture? How do you compute streaks, especially for 'N times per week' habits? How do reminders work, and what happens after a phone restart? How do you handle dates and time zones? What would you improve with more time?",
            ],
          },
          {
            heading: "Documentation - video walkthrough (5-10 min)",
            bullets: [
              "Your tech stack and architecture, and why you chose them.",
              "A live demo: creating habits, logging, a reminder firing, and streaks updating after editing a past day.",
              "Your tests running; challenges you faced and how you solved them.",
            ],
          },
          {
            heading: "Resources",
            links: [
              { label: "Habitized (reference app)", url: "https://play.google.com/store/apps/details?id=com.codewithdipesh.habitized" },
              { label: "Jetpack Compose", url: "https://developer.android.com/develop/ui/compose" },
              { label: "Room (local database)", url: "https://developer.android.com/training/data-storage/room" },
              { label: "Scheduling alarms", url: "https://developer.android.com/develop/background-work/services/alarms/schedule" },
              { label: "Testing on Android", url: "https://developer.android.com/training/testing/fundamentals" },
              { label: "Flutter local notifications", url: "https://pub.dev/packages/flutter_local_notifications" },
            ],
          },
        ],
        submission: [
          "Commit as you work on GitHub with clear commit messages - do not upload the final project in a single commit; history should show your process.",
          "Link to the GitHub repository, an installable APK, and the video.",
          "Upload everything to a Google Drive folder and paste the GitHub and Drive links in the task submission form below.",
          "Create a Google Drive folder or Google Doc and make sure it is shared with 'Anyone with the link' access.",
        ],
        note: "You may use chatbots and coding assistants as long as you understand and review every line they produce. State in your README which parts were written with an LLM.",
        contacts: [
          ...CO_LEADS,
          { name: "Samarth Zalkikar", role: "MAC Lead", phone: "+91 9075085950" },
          { name: "Vivian Demello", role: "MAC Co-Lead", phone: "+91 7588270066" },
        ],
      },
      {
        id: "ml",
        label: "ML",
        position: "Machine Learning",
        overview:
          "Build a local memory engine for AI chatbots that runs on your own laptop. It reads conversation messages, saves the useful facts about the user, updates them when they change, and returns the relevant ones when a chatbot asks a question. Languages allowed - any: Python, TypeScript, Go, Java, C++, etc.",
        sections: [
          {
            heading: "Example",
            paragraphs: [
              "Over a few conversations the user says: 'I use Arch Linux.' / 'I'm building a Next.js app.' / 'My project deadline is October 15.' / 'Actually, the deadline moved to November 2.' Later queries should return: 'What OS does the user use?' -> 'User uses Arch Linux.'; 'When is the project deadline?' -> 'Deadline is November 2.' (knowing it replaced October 15); 'What is the user's favourite food?' -> nothing, it should say it has no relevant memory instead of returning unrelated ones.",
            ],
          },
          {
            heading: "1. Save memories",
            bullets: [
              "Accept a message and decide what is worth remembering: facts, preferences, projects, events, goals. Small talk like 'ok thanks' should not become a memory.",
              "Store each memory with its type, timestamp, and source message.",
            ],
          },
          {
            heading: "2. Handle updates and contradictions",
            bullets: [
              "When new information changes an old memory, treat the new one as current.",
              "Keep the old one marked as replaced instead of silently deleting it.",
            ],
          },
          {
            heading: "3. Retrieve memories",
            bullets: [
              "Given a query, return the top matching memories with a relevance score, using embeddings (semantic search).",
              "Return nothing when no memory is relevant enough.",
            ],
          },
          {
            heading: "4. Persist and expose an API",
            paragraphs: [
              "Memories must survive a restart. SQLite, PostgreSQL, FAISS, Chroma, or similar are all fine. Expose a simple API: POST /memory (add a message or memory), POST /recall (relevant memories for a query), GET /memories (list all), DELETE /memory/:id (remove). Example: POST /recall { 'query': 'What database does the user prefer?', 'top_k': 5 } -> { 'memories': [ { 'text': 'User prefers PostgreSQL.', 'type': 'preference', 'score': 0.91 } ] }.",
            ],
          },
          {
            heading: "5. Evaluate it",
            bullets: [
              "Write at least 30 test cases (messages, a query, and the expected memory).",
              "Cover: direct facts, preferences, project details, updated information, contradictions, queries where several memories are relevant, and queries whose answer is not stored.",
              "Report how many your engine gets right (e.g. accuracy or recall@5).",
            ],
          },
          {
            heading: "Rules",
            bullets: [
              "It must run locally on a normal student laptop. No paid APIs for the core features.",
              "Use local models for embeddings and any LLM calls, e.g. Ollama or sentence-transformers.",
              "Keep ingestion, storage, and retrieval in separate modules.",
              "The core memory logic must be your own. Do not just wrap an existing memory library.",
              "Feature count is not the goal. A small engine that retrieves the right memories and is tested scores higher than a large one stitched together from libraries.",
            ],
          },
          {
            heading: "Bonus (optional)",
            bullets: [
              "Hybrid search: semantic + keyword (BM25); merging duplicate memories; importance scores so minor details rank lower; latency benchmarks (p50 / p95); Docker setup; a simple web UI to browse and search memories.",
              "Mention anything you add in your README.",
            ],
          },
          {
            heading: "Evaluation rubric (total 20 pts, +3 bonus)",
            bullets: [
              "Core functionality (6): saves, updates, retrieves, and persists memories end to end.",
              "Retrieval quality (4): right memories for realistic queries, nothing for unknown ones.",
              "Updates and contradictions (3): newer information wins; history is kept.",
              "Evaluation (3): a real test set with measured results, not just demos.",
              "Code quality and structure (2): clean, modular, readable code.",
              "README and video (2): clear setup steps and explanation.",
              "Bonus (+3): additional features mentioned in the README.",
            ],
          },
          {
            heading: "Documentation - README",
            bullets: [
              "Setup and run steps, an architecture diagram, example API requests, and your evaluation results.",
              "Briefly answer: why did you choose your storage and retrieval setup? How do you decide what becomes a memory? How do you handle updated or contradictory information? What happens when the answer is not in memory? What would break first with 10 million memories, and how would you fix it?",
            ],
          },
          {
            heading: "Documentation - video walkthrough (5-10 min)",
            bullets: [
              "Your architecture and why you chose each part.",
              "A live demo: adding messages, an update replacing an old memory, and recall queries.",
              "Your evaluation results and where the engine fails; challenges you faced and how you solved them.",
            ],
          },
          {
            heading: "Resources",
            links: [
              { label: "Ollama", url: "https://ollama.com" },
              { label: "nomic-embed-text model", url: "https://ollama.com/library/nomic-embed-text" },
              { label: "Sentence Transformers", url: "https://www.sbert.net" },
              { label: "FAISS", url: "https://github.com/facebookresearch/faiss" },
              { label: "sqlite-vec", url: "https://github.com/asg017/sqlite-vec" },
              { label: "Supermemory (ideas)", url: "https://supermemory.ai/" },
              { label: "Mem0 (ideas)", url: "https://github.com/mem0ai/mem0" },
            ],
          },
        ],
        submission: [
          "Commit as you work on GitHub with clear commit messages - do not upload the final project in a single commit; history should show your process.",
          "Link to the GitHub repository and the video.",
          "Upload everything to a Google Drive folder and paste the GitHub and Drive links in the task submission form below.",
          "Create a Google Drive folder or Google Doc and make sure it is shared with 'Anyone with the link' access.",
        ],
        note: "You may use chatbots and coding assistants as long as you understand and review every line they produce. State in your README which parts were written with an LLM.",
        contacts: [
          ...CO_LEADS,
          { name: "Samarth Zalkikar", role: "MAC Lead", phone: "+91 9075085950" },
          { name: "Vivian Demello", role: "MAC Co-Lead", phone: "+91 7588270066" },
        ],
      },
    ],
  },
  {
    id: "management",
    name: "Management",
    shortName: "MANAGEMENT",
    color: "#8338EC",
    description:
      "Lead and organize events, manage teams, handle logistics, and ensure every GDG RBU initiative runs smoothly from start to finish.",
    briefs: [MM_BRIEF],
  },
  {
    id: "marketing",
    name: "Marketing",
    shortName: "MARKETING",
    color: "#FF6D00",
    description:
      "Own the voice of GDG RBU - craft campaigns, content and outreach that fill rooms and grow the community on every platform.",
    briefs: [MM_BRIEF],
  },
  {
    id: "socials",
    name: "Socials",
    shortName: "SOCIALS",
    color: "#E91E63",
    description:
      "Create engaging content, manage social media channels, capture events through photography and video, and tell the GDG RBU story.",
    briefs: [
      {
        id: "cinematography",
        label: "Cinematography",
        position: "Cinematography",
        overview:
          "Choose ONE of the two reel options below - a 20–30 second cinematic reel (9:16 vertical) with a clear beginning, middle and ending. Tell a story; don't just montage.",
        sections: [
          {
            heading: "Option 1 - A Day, But Make It Cinematic",
            paragraphs: [
              "Take an ordinary part of your day (getting ready, studying, going to college, making coffee, anything routine) and make it cinematic. Plan your opening, close-ups, movement, lighting, and ending.",
            ],
            bullets: [
              "At least 5 different shots; at least one close-up; at least one wide / establishing shot.",
              "At least one creative camera angle; music and/or sound design.",
              "Duration 20–30 seconds · Format 9:16 vertical.",
            ],
          },
          {
            heading: "Option 2 - The Notification",
            paragraphs: [
              "A notification appears on someone's phone - what happens next is your story. The notification (text, email, missed call, reminder, or something fictional) is only the starting point; use visuals, expressions, objects, sound and editing to show the effect.",
            ],
            bullets: [
              "Tone can be funny, mysterious, emotional, suspenseful or unexpected.",
              "Clear opening hook + notification as the turning point + clear ending / reveal.",
              "At least 5 different shots; at least one close-up; at least one creative angle; intentional sound design.",
              "Duration 20–30 seconds · Format 9:16 vertical.",
            ],
          },
          {
            heading: "Bonus (optional but recommended)",
            paragraphs: [
              "Pick ONE 5–10 second scene from your reel and recreate it two ways - Version A (Cinematic: mood, composition, lighting, slow pacing) and Version B (High Energy: movement, faster cuts, dynamic sound). Same story beat, different treatment.",
            ],
          },
        ],
        submission: [
          "Export as YourName_CinematographyTask2026.mp4 and upload to Drive.",
          "Paste the link in the task submission form below.",
          "Create a Google Drive folder or Google Doc and make sure it is shared with 'Anyone with the link' access.",
        ],
        contacts: [
          ...CO_LEADS,
          { name: "Arshpreet Puri", role: "Socials Lead", phone: "+91 9699073889" },
        ],
      },
      {
        id: "content-outreach",
        label: "Content + Outreach",
        position: "Content Writing + Outreach",
        overview:
          "Turn a 2-day campus tech experience (talks, hands-on workshops, idea challenges, open mic, networking - for beginners and tech-curious students) into content people stop scrolling for. Originality, clarity and audience understanding over AI-sounding copy.",
        sections: [
          {
            heading: "Task 1 - Event identity",
            bullets: [
              "Come up with a new event name + tagline.",
              "Write a 50–70 word event concept.",
            ],
          },
          {
            heading: "Task 2 - Instagram content",
            bullets: [
              "A. Launch caption - hook the reader, create curiosity, explain the event, end with a CTA.",
              "B. 3-story sequence - Story 1: hook · Story 2: event / experience · Story 3: CTA (polls, questions, sliders welcome).",
              "C. Reel concept - idea + opening hook (first 3 seconds) + what happens + ending CTA. Keep it realistically executable by a college team.",
            ],
          },
          {
            heading: "Task 3 - 5-day outreach plan",
            bullets: [
              "Day 1 → Day 5: for each day mention what you're posting and where (college communities, clubs, GDG / tech communities, WhatsApp / Discord, IG collabs, LinkedIn, ambassadors).",
              "Bonus: one unconventional outreach idea.",
            ],
          },
          {
            heading: "Task 4 - Collaboration DM",
            paragraphs: [
              "Write a short Instagram DM asking a college tech club to promote the event - like something you'd actually send to another student/community, not a corporate email.",
            ],
          },
          {
            heading: "Task 5 - Optional but recommended",
            paragraphs: [
              "Suggest one content / outreach idea you think could genuinely improve student engagement at GDG RBU (recurring series, reel format, outreach strategy, event coverage, or something new) - in 100 words or less.",
            ],
          },
        ],
        submission: [
          "Compile everything into a document named YourName_SocialsCnOTask2026 and upload to Drive.",
          "Paste the link in the task submission form below.",
          "Create a Google Drive folder or Google Doc and make sure it is shared with 'Anyone with the link' access.",
        ],
        contacts: [
          ...CO_LEADS,
          { name: "Arshpreet Puri", role: "Socials Lead", phone: "+91 9699073889" },
        ],
      },
    ],
  },
];

export type DomainId =
  | "web-dev"
  | "cp"
  | "design"
  | "mac"
  | "management"
  | "marketing"
  | "socials";

// Domain preference options for the radio grid
export const DOMAIN_PREFERENCE_OPTIONS = [
  "Tech",
  "Management",
  "CP",
  "Design",
  "Socials",
  "Marketing",
] as const;

export const YEAR_OPTIONS = [
  { label: "2nd Year", value: 2 },
] as const;

export const TECH_DOMAIN_OPTIONS = [
  "Web Development",
  "Android Development",
  "Flutter",
  "Cloud Computing",
  "Machine Learning",
  "None",
] as const;

export const SOCIALS_DOMAIN_OPTIONS = [
  "Video Editing",
  "Content Writing",
  "Social and Outreach",
  "Photography",
  "None",
] as const;

// Form data shapes - split into personal details + task submission.
// Personal details are stored in `recruitment_applicants` (one row per user).
// Task submissions are stored in `recruitment_task_submissions`
// (one row per user per task_domain) and require an applicant row first.

export type PersonalDetailsData = {
  name: string;
  email: string;
  phone: string;
  year: number | null;
  branch: string;

  // Domain preferences (radio grid)
  domain_pref_1: string;
  domain_pref_2: string;
  domain_pref_3: string;

  // Sub-domain preferences
  tech_domain: string;
  socials_domain: string;

  // Profile links
  linkedin_url: string;
  github_url: string;
  codeforces_url: string;
  codechef_url: string;
  other_cp_url: string;

  // About
  cgpa: string;
  resume_url: string;
  resume_filename: string;
  motive: string;
  value_addition: string;
  projects: string;
};

export type TaskSubmissionData = {
  task_domain: string;
  task_links: string[];
  task_details: Record<string, unknown>;
};

// Combined shape (backwards compatible for preview/admin joins)
export type RecruitmentFormData = PersonalDetailsData & TaskSubmissionData;

export const EMPTY_PERSONAL_DETAILS: PersonalDetailsData = {
  name: "",
  email: "",
  phone: "",
  year: null,
  branch: "",
  domain_pref_1: "",
  domain_pref_2: "",
  domain_pref_3: "",
  tech_domain: "",
  socials_domain: "",
  linkedin_url: "",
  github_url: "",
  codeforces_url: "",
  codechef_url: "",
  other_cp_url: "",
  cgpa: "",
  resume_url: "",
  resume_filename: "",
  motive: "",
  value_addition: "",
  projects: "",
};

export const EMPTY_TASK_SUBMISSION: TaskSubmissionData = {
  task_domain: "",
  task_links: [""],
  task_details: {},
};

export const EMPTY_FORM: RecruitmentFormData = {
  ...EMPTY_PERSONAL_DETAILS,
  ...EMPTY_TASK_SUBMISSION,
};

export const PERSONAL_DETAILS_KEY = "gdg_recruitment_personal_draft";
export const TASK_DRAFT_KEY = "gdg_recruitment_task_draft";
export const LOCALSTORAGE_KEY = "gdg_recruitment_draft";
