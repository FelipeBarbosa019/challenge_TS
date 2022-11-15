CREATE TABLE public.user (
	"id" serial NOT NULL,
	"user_name" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"first_name" TEXT NOT NULL,
	"last_name" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"squad" int NOT NULL,
	"admin" BOOLEAN NOT NULL,
	"leader" BOOLEAN NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.squad (
	"id" serial NOT NULL,
	"leader" int NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "squad_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("squad") REFERENCES "squad"("id");

ALTER TABLE "squad" ADD CONSTRAINT "squad_fk0" FOREIGN KEY ("leader") REFERENCES "user"("id");