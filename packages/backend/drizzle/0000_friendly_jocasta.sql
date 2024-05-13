CREATE TABLE IF NOT EXISTS "contributors" (
	"id" serial PRIMARY KEY NOT NULL,
	"github" varchar(25) NOT NULL,
	"wallet" text NOT NULL,
	CONSTRAINT "contributors_github_unique" UNIQUE("github"),
	CONSTRAINT "contributors_wallet_unique" UNIQUE("wallet")
);
