CREATE TABLE IF NOT EXISTS "contributions" (
	"id" serial PRIMARY KEY NOT NULL,
	"contributor_id" integer NOT NULL,
	"repository_id" integer NOT NULL,
	"issues_created" integer DEFAULT 0,
	"issues_commented" integer DEFAULT 0,
	"issues_closed" integer DEFAULT 0,
	"score" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "repositories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"owner" varchar(100) NOT NULL,
	CONSTRAINT "repositories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "contributors" DROP COLUMN IF EXISTS "issues_closed";--> statement-breakpoint
ALTER TABLE "contributors" DROP COLUMN IF EXISTS "pull_requests";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contributions" ADD CONSTRAINT "contributions_contributor_id_contributors_id_fk" FOREIGN KEY ("contributor_id") REFERENCES "contributors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contributions" ADD CONSTRAINT "contributions_repository_id_repositories_id_fk" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
