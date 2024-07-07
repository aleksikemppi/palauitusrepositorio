# Running instructions 

1. npm install 
2. deposit secrets to frontend and back end .env-file
Form:
MONGODB_URI=mongodb+srv://username:password@cluster0.qye0a70.mongodb.net/bloglist?retryWrites=true&w=majority
PORT=3003
SECRET=you-secret
4. deposit login credentials 
POST http://localhost:3003/api/users
Content-Type: application/json

{
  "username": "user",
  "password": "salainen"
}

3. npm run dev
