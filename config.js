const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer

let server = null

module.exports = {
  getUri: async () => {
    if (!server) {
      server = await MongoMemoryServer.create()
    }

    return server.getUri()
  }
}