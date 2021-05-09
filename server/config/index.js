const config = {
    db: {
      url: process.env.MONGO_URL || "mongodb://localhost:27017/chatdb",
    },
    redis: {
      url: process.env.REDIS_URL,
      port: process.env.REDIS_PORT,
    }
  }
  
  export default config