db.auth("root", "example")
db = db.getSiblingDB('authentication-db')
db.safety.insert({ safekey: "some_value" })
db.createUser(
    {
        user: "root",
        pwd: "example",
        roles: [
            {
                role: "userAdmin",
                db: "authentication-db"
            },
            {
                role: "readWrite",
                db: "authentication-db"
            }
        ]
    }
)