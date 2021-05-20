drop table users;
create table users(
  user_id varchar(20) primary key not null,
  user_name varchar(255) not null,
  password varchar(20) not null
);
insert into users values('hoge', 'ほげ', 'hoge');
insert into users values('hage', 'はげ', 'hage');