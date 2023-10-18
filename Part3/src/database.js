"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const password_1 = require("../password");
const pool = new pg_1.Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: password_1.PASSWORD,
    database: 'WebDev-Lab2'
});
pool.connect();
exports.default = pool;
