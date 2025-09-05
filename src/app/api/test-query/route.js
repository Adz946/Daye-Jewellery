import sqlite3 from 'sqlite3';
import path from 'path';

// Your existing JewelryQueryBuilder class (keep it the same as before)
class JewelryQueryBuilder {
    constructor() {
        this.viewMap = {
            'Q1': 'vw_JewellerySimple',
            'Q2': 'vw_JewelleryWithMaterials', 
            'Q3': 'vw_JewelleryWithGems',
            'Q4': 'vw_JewelleryComplete'
        };
        
        this.typeMap = {
            'Ring': 'R', 'Necklace': 'N', 
            'Bracelet': 'B', 'Earring': 'E'
        };
    }

    getQueryType(filters) {
        if (filters.materialQuery && filters.gemQuery) return 'Q4';
        if (filters.materialQuery) return 'Q2';
        if (filters.gemQuery) return 'Q3';
        return 'Q1';
    }

    buildQuery(filters, limit = 20, offset = 0) {
        const queryType = this.getQueryType(filters);
        const viewName = this.viewMap[queryType];
        
        let query = `SELECT * FROM ${viewName}`;
        const whereConditions = [];
        const params = [];

        if (filters.search && filters.search.trim()) {
            whereConditions.push('Desc LIKE ?');
            params.push(`%${filters.search.trim()}%`);
        }

        if (filters.onSale) {
            whereConditions.push('SalePrice IS NOT NULL');
        }

        if (filters.price && filters.price.min > 0) {
            whereConditions.push('EffectivePrice >= ?');
            params.push(filters.price.min);
        }

        if (filters.price && filters.price.max < 5000) {
            whereConditions.push('EffectivePrice <= ?');
            params.push(filters.price.max);
        }

        if (filters.types && filters.types.length > 0 && filters.types.length < 4) {
            const typeCodes = filters.types.map(type => this.typeMap[type]).filter(Boolean);
            if (typeCodes.length > 0) {
                whereConditions.push(`Type IN (${typeCodes.map(() => '?').join(',')})`);
                params.push(...typeCodes);
            }
        }

        if (whereConditions.length > 0) {
            query += ' WHERE ' + whereConditions.join(' AND ');
        }

        if (filters.sort) {
            switch (filters.sort) {
                case 'price_asc': query += ' ORDER BY EffectivePrice ASC'; break;
                case 'price_desc': query += ' ORDER BY EffectivePrice DESC'; break;
                case 'name_asc': query += ' ORDER BY Desc ASC'; break;
                case 'name_desc': query += ' ORDER BY Desc DESC'; break;
                case 'sale_first': query += ' ORDER BY (SalePrice IS NOT NULL) DESC, EffectivePrice ASC'; break;
                case 'in_demand': query += ' ORDER BY InStock ASC, EffectivePrice ASC'; break;
                case 'random': query += ' ORDER BY RANDOM()'; break;
                default: query += ' ORDER BY EffectivePrice ASC';
            }
        } else {
            query += ' ORDER BY EffectivePrice ASC';
        }

        query += ` LIMIT ${limit} OFFSET ${offset}`;

        return { query, params, queryType, viewName };
    }
}

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

// POST endpoint that reads from sessionStorage (sent in request)
export async function POST(request) {
    try {
        const { filters, page = 0, limit = 20 } = await request.json();
        const queryBuilder = new JewelryQueryBuilder();
        
        const offset = page * limit;
        const result = queryBuilder.buildQuery(filters, limit, offset);
        const data = await queryDB(result.query, result.params);
        
        return Response.json({
            success: true,
            filters: filters,
            queryType: result.queryType,
            page: page,
            limit: limit,
            resultCount: data.length,
            hasMore: data.length === limit, // If we got full limit, assume more exist
            results: data
        });

    } catch (error) {
        console.error("Query failed:", error);
        return Response.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}