ALTER TABLE "contributors" ADD COLUMN "issues_closed" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "contributors" ADD COLUMN "pull_requests" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "contributors" ADD COLUMN "score" integer DEFAULT 0;