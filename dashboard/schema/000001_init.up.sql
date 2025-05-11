create table public.user (
	user_id serial4 NOT null primary key,
	login varchar(64) not null UNIQUE,
	password varchar(255) not null,
	email varchar(64) not null UNIQUE,
	phone varchar(64) not null,
	status varchar(30) not null
	
);

create table public.Desk (
	desk_id serial4 NOT null primary key,
	description varchar(512),
	start_date date not null,
	title varchar(100) not null,
	changeable varchar(20) not null
);

create table public.Task (
	task_id serial4 NOT null primary key,
	desk_id serial4 NOT null references public.desk(desk_id),
	start_date date not null,
	title varchar(64) not null,
	description varchar(64) not null,
	priority int not null,
	employee_id serial4 NOT null references public.user(user_id),
	author_id serial4 NOT null references public.user(user_id),
	status varchar(30) not null
);

create table public.Room (
	room_id serial4 NOT null primary key,
	user_id serial4 references public.user(user_id),
	manager_id serial4 NOT null references public.user(user_id),
	desk_id serial4 NOT null references public.Desk(desk_id),
	privacy varchar(30) not null
);

create table public.Comment (
	comment_id serial4 NOT null,
	task_id serial4 not null references public.Task(task_id),
	post_date date not null,
	comment_author_id serial4 NOT null references public.user(user_id),
	message varchar(512) not null
);

-- create table public.Task_room (
-- 	task_room_id serial4 NOT null,
-- 	desk_id serial4 NOT null references public.Desk(desk_id),
-- 	task_id serial4 NOT null references public.task(task_id)
-- );