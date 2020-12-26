# Requirements
   Java - 1.8.x
   
   Maven - 3.x.x

# Steps to setup

   1. Install maven
        sudo apt install maven
        
   2. Install docker-compose
        sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
        
   3. Package using maven
        mvn package  
        
   4. Create and run docker
        docker-compose up --build

   5. Stop docker
        docker-compose stop
        
   6. Down docker
        docker-compose down


## BE PART

http://localhost:8080/main ==> Code Frontation 2020

##JUDGE SERVER PYTHON PART

python_src/judge-server/dmoj/main.py   run etmek gerek    localhost:9999 portunu dinliyor (API için 8081 portunu dinliyor)

## Postgres Install

https://www.postgresql.org/download/

sudo -u postgres psql

ALTER USER postgres PASSWORD 'postgres';


## FE PART

https://nodejs.org/en/download/

cd *******/fe_src

npm install

npm start

http://localhost:3000/   ==> Admin Dashboard Page

http://localhost:3000/users  ==> Admin User list Page

http://localhost:3000/test  ==> test table Page
