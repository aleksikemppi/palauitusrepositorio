require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT
const SECRET = process.env.SECRET

console.log('MONGODB_URI:', MONGODB_URI)
console.log('PORT:', PORT)
console.log('SECRET:', SECRET)

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET
}