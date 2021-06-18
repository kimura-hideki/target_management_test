drop table items;
create table items(
  item_id int(5) primary key not null AUTO_INCREMENT,
  item_name varchar(255) not null,
  price int(10) not null,
  image varchar(255) not null,
  user_id varchar(20) not null,
  created_at datetime not null,
  updated_at datetime not null
);
insert into items values(0,'はげ',100,'hage.jpg','hage','2021-06-17 00:00:00','2021-06-17 00:00:00');
insert into items values(0,'ひげ',200,'hige.jpg','hage','2021-06-17 00:00:00','2021-06-17 00:00:00');
insert into items values(0,'ふげ',300,'huge.jpg','hage','2021-06-17 00:00:00','2021-06-17 00:00:00');
insert into items values(0,'へげ',400,'hege.jpg','hage','2021-06-17 00:00:00','2021-06-17 00:00:00');
insert into items values(0,'ほげ',500,'hoge.jpg','hage','2021-06-17 00:00:00','2021-06-17 00:00:00');
