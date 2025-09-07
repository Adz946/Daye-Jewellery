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
        const { collectionID } = await request.json();
        
        if (!collectionID) {
            return Response.json({
                success: false,
                error: "CollectionID is required"
            }, { status: 400 });
        }
        
        const query = `SELECT * FROM vw_CollectionItems WHERE CollectionID = ?`;
        const collectionItems = await queryDB(query, [collectionID]);
        
        return Response.json({
            success: true,
            collectionID: collectionID,
            resultCount: collectionItems.length,
            results: collectionItems
        });

    } catch (error) {
        console.error("Collection items query failed:", error);
        return Response.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}