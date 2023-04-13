import { Sequelize } from "sequelize";
import {debug} from 'console'


// const sequelize = new Sequelize('sql7603424', 'sql7603424', 'D5FyPRGU1b', {
//     host:'sql7.freesqldatabase.com',
//     dialect: 'mysql'
// });

const dbPswd = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbDialect = process.env.DB_DIALECT

// console.log(host,pswd)
const sequelize = new Sequelize(dbName, dbUser, dbPswd, {
    host:dbHost,
    dialect: dbDialect
});

const checkConnection = async ()=> {
    try {
        await sequelize.authenticate();
        debug(`DB connected successfully`)
    } catch (error) {
        debug('Unable to connect to the DB')
    }
}

checkConnection()

export default sequelize;