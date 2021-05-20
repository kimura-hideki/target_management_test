drop table items;
create table items(
  item_id int(5) primary key not null AUTO_INCREMENT,
  item_name varchar(255) not null,
  price int(5) not null,
  image varchar(255) not null
);
insert into items values(0,'ほげ',100,'hoge.jpg');
insert into items values(0,'はげ',2000,'hage.jpg');
insert into items values(0,'ひげ',30000,'hige.jpg');
