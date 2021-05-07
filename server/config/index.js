const config = {
    db: {
      url: process.env.MONGO_URL || "mongodb://localhost:27017/chatdb",
    }
  }
  
  export default config