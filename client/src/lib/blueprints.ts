import { Database, Presentation, CalendarCheck, Zap } from "lucide-react";

export type BlueprintType = "Blueprint / JSON Config" | "Template / Prompt Guide" | "Guide / Checklist";

export interface HowToUseStep {
  step: number;
  title: string;
  body: string;
  bodyHtml?: string;
}

export interface WorkflowSection {
  title: string;
  steps: { bodyHtml: string }[];
  goal: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface Blueprint {
  id: string;
  slug: string;
  title: string;
  type: BlueprintType;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  affiliateUrl: string;
  toolName: string;
  icon: typeof Database;
  copyableContent: string;
  copyableLabel: string;
  howToUseSteps: HowToUseStep[];
  workflowSection?: WorkflowSection;
}

export const blueprints: Blueprint[] = [
  {
    id: "automated-sales-machine",
    slug: "automated-sales-machine",
    title: "The Automated Sales Machine: Signal-Based Outreach with AI in 2026",
    type: "Guide / Checklist",
    description: "How to combine AI Scraping, ElevenLabs v3, and Amplemarket to build a high-conversion outbound engine.",
    ctaLabel: "Open Guide",
    ctaHref: "/resources/automated-sales-machine",
    affiliateUrl: "/go/amplemarket",
    toolName: "Amplemarket",
    icon: Zap,
    copyableLabel: "Copy Checklist",
    copyableContent: `□ Step 1: Data Sourcing — Use Browse AI, Apollo, or Clay for intent-based lead lists
□ Step 2: Personalized Content — ElevenLabs v3 for voiceovers (see our v3 Audio Tags guide)
□ Step 3: Content Creation — AdCreative.ai for creatives, Descript for audio post-production
□ Step 4: Execution — Amplemarket for AI-powered outreach sequences`,
    howToUseSteps: [
      {
        step: 1,
        title: "Data Sourcing",
        body: "Use AI scraping tools to build your lead list from intent signals.",
        bodyHtml: "Use AI scraping tools to build your lead list from intent signals. Our top picks: <a href=\"/go/browse-ai\" target=\"_blank\" rel=\"noopener sponsored\">Browse AI</a> for no-code extraction from directories and job boards, <a href=\"/go/apollo\" target=\"_blank\" rel=\"noopener sponsored\">Apollo</a> for 275M+ contacts with waterfall enrichment, and <a href=\"/go/clay\" target=\"_blank\" rel=\"noopener sponsored\">Clay</a> for hyper-targeted lists at scale.",
      },
      {
        step: 2,
        title: "Personalized Content",
        body: "Generate voiceovers with ElevenLabs v3.",
        bodyHtml: "Generate voiceovers and narration with ElevenLabs v3. Use audio tags for character direction and emotional nuance. See our <a href=\"/blog/mastering-eleven-v3-audio-tags-character-direction-2026\" target=\"_blank\" rel=\"noopener\">Eleven v3 Audio Tags & Character Direction Guide</a> for the full cheat sheet.",
      },
      {
        step: 3,
        title: "Content Creation",
        body: "Create visuals and post-produce audio.",
        bodyHtml: "Create matching ad creatives with <a href=\"/go/adcreative\" target=\"_blank\" rel=\"noopener sponsored\">AdCreative.ai</a>. Generate on-brand images and copy in minutes for rapid A/B testing across Meta and Google. <strong>Post-Production:</strong> Use <a href=\"/go/descript\" target=\"_blank\" rel=\"noopener sponsored\">Descript</a> to sync your ElevenLabs audio with b-roll. Use the 'Studio Sound' feature to ensure your AI-generated voice sounds like it was recorded in a $10k booth.",
      },
      {
        step: 4,
        title: "Execution",
        body: "Run your sequences with Amplemarket.",
        bodyHtml: "Run your sequences with <a href=\"/go/amplemarket\" target=\"_blank\" rel=\"noopener sponsored\">Amplemarket</a>. AI-powered sales intelligence and outreach to deliver personalized campaigns at scale.",
      },
    ],
    workflowSection: {
      title: "The 2026 Video Agent Workflow",
      steps: [
        {
          bodyHtml: "Use <a href=\"/go/mindstudio\" target=\"_blank\" rel=\"noopener sponsored\">MindStudio</a> to generate a personalized video script based on <a href=\"/go/apollo\" target=\"_blank\" rel=\"noopener sponsored\">Apollo.io</a> lead data.",
        },
        {
          bodyHtml: "Import the script into <a href=\"/go/descript\" target=\"_blank\" rel=\"noopener sponsored\">Descript</a>. Use the 'Underdub' feature to voice the script using your <a href=\"/go/elevenlabs\" target=\"_blank\" rel=\"noopener sponsored\">ElevenLabs</a> clone.",
        },
      ],
      goal: "Create 100 personalized sales videos in 10 minutes.",
      ctaLabel: "Download the 'Video Agent' MindStudio template here",
      ctaHref: "/go/mindstudio",
    },
  },
  {
    id: "browse-ai-lead-scraper",
    slug: "browse-ai-recipe",
    title: "The Browse AI Lead Scraper Recipe",
    type: "Blueprint / JSON Config",
    description: "A pre-configured robot setup to monitor niche directories and auto-export to CSV.",
    ctaLabel: "Download Config",
    ctaHref: "/resources/browse-ai-recipe",
    affiliateUrl: "/go/browse-ai",
    toolName: "Browse AI",
    icon: Database,
    copyableLabel: "Copy Config",
    copyableContent: `{
  "robot": "directory-monitor",
  "targets": ["niche-directory-url"],
  "extract": ["company", "contact", "listing_url"],
  "schedule": "daily",
  "export": "csv",
  "notify": true
}`,
    howToUseSteps: [
      { step: 1, title: "Create a new robot in Browse AI", body: "Log into Browse AI and create a new robot. Select the 'List Extractor' template for directory-style pages." },
      { step: 2, title: "Paste the config", body: "Replace the placeholder URL in the config with your target directory. Adjust the extract fields to match the columns you need." },
      { step: 3, title: "Set your schedule", body: "Configure daily or weekly runs. Enable CSV export and optional email alerts when new listings appear." },
      { step: 4, title: "Export and use", body: "Download your CSV or connect to Zapier/Make for automated pipelines into your CRM or enrichment tools." },
    ],
  },
  {
    id: "gamma-gtm-slide-master",
    slug: "gamma-gtm-slide-master",
    title: "The Gamma GTM Slide Master",
    type: "Template / Prompt Guide",
    description: "A master-list of AI prompts to generate high-converting sales decks in Gamma.",
    ctaLabel: "Get the Prompts",
    ctaHref: "/resources/gamma-gtm-slide-master",
    affiliateUrl: "/go/gamma",
    toolName: "Gamma",
    icon: Presentation,
    copyableLabel: "Copy Prompts",
    copyableContent: `PROMPT 1 - GTM Strategy Deck
Create a 12-slide GTM strategy deck for [PRODUCT] targeting [ICP]. Include: problem, solution, market size, competitive positioning, go-to-market motion, channels, pricing, and 90-day timeline.

PROMPT 2 - Sales One-Pager
Generate a one-page sales overview for [PRODUCT] with: headline, 3 key benefits, social proof, pricing tier, and clear CTA. Use a modern, minimal layout.

PROMPT 3 - Investor Update
Create a monthly investor update template with: metrics dashboard, key wins, challenges, learnings, and next 30-day priorities. Use data visualization placeholders.`,
    howToUseSteps: [
      { step: 1, title: "Open Gamma", body: "Log into Gamma and start a new presentation. Choose 'Generate with AI' to use the prompt workflow." },
      { step: 2, title: "Paste the prompt", body: "Copy one of the prompts above and paste it into Gamma's prompt field. Replace [PRODUCT], [ICP], and other placeholders with your specifics." },
      { step: 3, title: "Generate and refine", body: "Let Gamma generate the deck. Use the editor to tweak visuals, add your own data, and apply brand theming." },
      { step: 4, title: "Export or present", body: "Present directly from Gamma or export to PDF for distribution. Share the link for interactive, mobile-responsive viewing." },
    ],
  },
  {
    id: "founders-time-blocking-protocol",
    slug: "founders-time-blocking-protocol",
    title: "The Founder's Time-Blocking Protocol",
    type: "Guide / Checklist",
    description: "A step-by-step setup for Reclaim.ai to automate your work-life balance and project tasks.",
    ctaLabel: "Open Guide",
    ctaHref: "/resources/founders-time-blocking-protocol",
    affiliateUrl: "/go/reclaim",
    toolName: "Reclaim.ai",
    icon: CalendarCheck,
    copyableLabel: "Copy Checklist",
    copyableContent: `□ Connect Google Calendar
□ Add 2–3 focus blocks (90 min each) per week
□ Add 1 weekly review block (60 min)
□ Sync tasks from Asana/Linear/Jira/Notion
□ Set habit: "Deep Work" (recurring)
□ Set habit: "Email" (30 min daily)
□ Enable "Defend" mode for focus blocks
□ Configure team visibility (optional)`,
    howToUseSteps: [
      { step: 1, title: "Connect your calendar", body: "Link Reclaim.ai to your Google Calendar. Enable task sync from your project tool (Asana, Linear, Jira, or Notion)." },
      { step: 2, title: "Add your blocks", body: "Create 2–3 focus blocks (90 min) and one weekly review block. Reclaim will find the best slots and defend them from meetings." },
      { step: 3, title: "Set your habits", body: "Add recurring habits like 'Deep Work' and 'Email' so Reclaim schedules them consistently. Use Defend mode so blocks move instead of being deleted." },
      { step: 4, title: "Let it run", body: "Reclaim will auto-schedule and reschedule as your calendar changes. Review the analytics to see how your time is actually spent." },
    ],
  },
];

export function getBlueprintBySlug(slug: string): Blueprint | undefined {
  return blueprints.find((b) => b.slug === slug);
}
