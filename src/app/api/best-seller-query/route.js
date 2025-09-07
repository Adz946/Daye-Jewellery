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

export async function POST(request) {
    try {
        const query = `SELECT * FROM vw_BestSellers LIMIT 15`;
        const bestSellers = await queryDB(query);
        
        return Response.json({
            success: true,
            resultCount: bestSellers.length,
            results: bestSellers
        });

    } catch (error) {
        console.error("Best sellers query failed:", error);
        return Response.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
