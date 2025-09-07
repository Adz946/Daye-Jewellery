import sqlite3 from 'sqlite3';
import path from 'path';

function queryDB(sql, params = []) {
    return new Promise((resolve, reject) => {
        const dbPath = path.join(process.cwd(), 'src/data/jewellery.db');
        const db = new sqlite3.Database(dbPath);
        
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
            db.close();
        });
    });
}

export async function POST() {
    try {
        const collections = await queryDB('SELECT * FROM vw_CollectionCurrent');
        
        return Response.json({
            success: true,
            resultCount: collections.length,
            results: collections
        });

    } catch (error) {
        console.error("Collections query failed:", error);
        return Response.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}