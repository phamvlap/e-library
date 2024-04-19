export default {
    app: {
        port: process.env.PORT || 5000,
    },
    db: {
        uri: process.env.DATABASE_URI,
    },
};
