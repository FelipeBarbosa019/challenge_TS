CREATE TABLE public.users (
	"id" serial NOT NULL,
	"user_name" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"first_name" TEXT NOT NULL,
	"last_name" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"squad" int,
	"admin" BOOLEAN,
	"leader" BOOLEAN DEFAULT FALSE,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.squads (
	"id" serial NOT NULL,
	"leader" int NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "squads_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "users" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("squads") REFERENCES "squads"("id");

ALTER TABLE "squads" ADD CONSTRAINT "squads_fk0" FOREIGN KEY ("leader") REFERENCES "users"("id");