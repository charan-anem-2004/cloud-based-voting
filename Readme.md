step 0:
docker network create voting-network

Step 1

run the mongo container

docker run --name mongodb-container -p 27017:27017 --network voting-network -d mongo:latest

step 2: Run the backend container

docker run --name backend -p 5001:5001 --network voting-network -d charanaravind/backend

step 3: Run the react container

docker run --name frontend -p 5174:80 --network voting-network -d charanaravind/cloudreact

if your containers already running

mongo running
docker start mongodb-container
backend running
docker start backend
frontend running
docker start frontend

docker network inspect voting-network

http://localhost:5174/

to insert admind creds

docker exec -it mongodb-container mongosh

use votingDb

db.users.insertOne({
username: "Admin",
email: "admin@gmail.com",
password: "123456",
isAdmin: true
})

if you make any changes in files
for frontend
docker build -t charanaravind/cloudreact .
docker stop frontend
docker rm frontend
docker run --name frontend -p 5174:80 --network voting-network charanaravind/cloudreact

for backend
docker build -t voting-backend .
docker stop backend
docker rm backend
docker run --name backend -p 5001:5001 --network voting-network voting-backend

docker push charnaravind/cloudreact
docker push charanaravind/backend
