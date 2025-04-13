CREATE TABLE public.roles (
	role_id serial4 NOT NULL,
	role_name varchar(100) NOT NULL,
	CONSTRAINT role_id_pkey PRIMARY KEY (role_id)
);

create table public.user (
  user_id serial4 NOT null primary key,
  login varchar(64) not null UNIQUE,
  password varchar(255) not null,
  email varchar(64) not null UNIQUE,
  phone varchar(64) not null,
  full_name varchar(150) not null,
	position VARCHAR(100),
	team VARCHAR(100),
	department VARCHAR(100),
	division VARCHAR(100),
  status varchar(30) not null,
  role_id integer REFERENCES "roles" (role_id)
);

CREATE TABLE public.todo (
	"todo_id" serial4 NOT NULL,
	"start_date" date NOT NULL,
	"title" varchar(250) NOT NULL,
	"description" varchar(1000) NOT NULL,
	"priority" int4 NOT NULL,
	"user_id" serial4 NOT null REFERENCES "user" ("user_id") on delete cascade,
	"status" varchar(30) NOT NULL,
	CONSTRAINT todo_id_pkey PRIMARY KEY ("todo_id")
);


create table public.firm (
  firm_id serial4 NOT null primary key,
  name varchar(64) not null UNIQUE,
  inn varchar(255) not null
  );


CREATE TABLE public."groups" (
	group_id serial4 NOT NULL,
	"group_name" varchar(64) NOT NULL,
	CONSTRAINT group_id_pkey PRIMARY KEY (group_id)
);

CREATE TABLE public.tests (
	test_id serial4 NOT NULL,
	test_title varchar(64) NOT NULL,
	test_category varchar(255) NOT NULL,
	author_id integer REFERENCES "user" (user_id) on delete cascade,
	group_id integer REFERENCES "groups" (group_id) on delete cascade,
	begindate date NULL,
	enddate date NULL,
	CONSTRAINT test_id_pkey PRIMARY KEY (test_id)
);

CREATE TABLE public.task (
	task_id serial4 NOT NULL,
	task_question varchar(1500) NOT NULL,
	test_id integer REFERENCES tests (test_id) on delete cascade,
	CONSTRAINT task_id_pkey PRIMARY KEY (task_id)
);

CREATE TABLE public.con_group_user (
	con_group_user_id serial4 NOT NULL,
	user_id integer REFERENCES "user" (user_id) on delete cascade,
	group_id integer REFERENCES "groups" (group_id) on delete cascade,
	CONSTRAINT con_group_user_id_pkey PRIMARY KEY (con_group_user_id)
);

CREATE TABLE public.task_variants (
	task_variants_id serial4 NOT NULL,
	task_id integer REFERENCES "task" (task_id) on delete cascade,
	task_variant  varchar(2500),
	correct_variant boolean,
	CONSTRAINT task_variants_id_pkey PRIMARY KEY (task_variants_id)
);

CREATE TABLE public.tests_result (
	tests_result_id serial4 NOT NULL,
	user_id integer REFERENCES "user" (user_id) on delete cascade,
	task_id integer REFERENCES "task" (task_id) on delete cascade,
	answer_result  varchar(2500),
	answer_correct boolean,
	chosen_variant integer REFERENCES "task_variants" (task_variants_id) on delete cascade,
	CONSTRAINT tests_result_id_pkey PRIMARY KEY (tests_result_id)
);

create table public.sections (
  sections_id serial4 NOT NULL,
  title text,
  "content" text,
  created_at date,
  updated_at date,
  CONSTRAINT sections_pkey PRIMARY KEY (sections_id)
);

create table public.articles (
  articles_id serial4 NOT NULL,
  section_id integer REFERENCES "sections" (sections_id)  on delete cascade,
  title text,
  "content" text,
  CONSTRAINT articles_pkey PRIMARY KEY (articles_id)
);

create table public."comments_lib"(
  comments_id serial4 NOT null,
  article_id integer REFERENCES "articles" (articles_id)  on delete cascade,
  user_id integer REFERENCES "user" (user_id)  on delete cascade,
  created_at date,
  "content" text,
  CONSTRAINT comments_pkey PRIMARY KEY (comments_id)
);

create table public."article_files"(
  article_files_id serial4 NOT null,
  author_id integer REFERENCES "user" (user_id)  on delete cascade,
  article_id integer REFERENCES "articles" (articles_id)  on delete cascade,
  filename text,
  filepath text,
  created_at date,
  CONSTRAINT article_files_pkey PRIMARY KEY (article_files_id)
);

create table public.articles_word (
  articles_word_id serial4 NOT NULL,
  articles_id integer REFERENCES "articles" (articles_id)  on delete cascade,
  title text,
  "content" text,
  CONSTRAINT articles_word_pkey PRIMARY KEY (articles_word_id)
);
