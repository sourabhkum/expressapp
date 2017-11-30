let env = process.env.NODE_ENV;
if (env === 'development') {
    MONGO_URI = process.env.MONGO_URI;
}
module.exports = {
    MONGO_URI: MONGO_URI
}