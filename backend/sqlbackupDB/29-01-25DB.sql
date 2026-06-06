create table impdocs (id int auto_increment primary key, jobnumber varchar(255), orgname varchar(255), orgcode varchar(255), branchname varchar(255), branchcode varchar(255), filename varchar(255), filelocation varchar(255));

select * from impdocs;

select filename, filelocation from impdocs;


INSERT INTO impdocs 
   (jobnumber, orgname, orgcode, branchname, branchcode, filename, filelocation) 
   VALUES (2, 'ss', 'dsdd', 'frfr', 'fsdsd', 'sase.txt', '/past/sas/sase.txt');
   
SHOW TABLE STATUS LIKE 'impdocs';


select * from organizations;



