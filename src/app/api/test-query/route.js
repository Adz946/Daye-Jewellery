import sqlite3 from 'sqlite3';
import path from 'path';

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

    addMaterialGemFilters(whereConditions, params, filters) {
        // Material filtering
        if (filters.materialQuery && filters.material && filters.material.length > 0) {
            const materialConditions = [];
            
            filters.material.forEach(material => {
                // Build exact pattern matching
                const conditions = [`MaterialData LIKE ?`];
                let pattern = `%${material.type}|%`; // Match material type
                
                if (material.purity && material.color) {
                    // Both specified: "Gold|58|Yellow"
                    pattern = `%${material.type}|${material.purity}|${material.color}%`;
                } else if (material.purity) {
                    // Only purity: "Gold|58|%"
                    pattern = `%${material.type}|${material.purity}|%`;
                } else if (material.color) {
                    // Only color: "Gold|%|Yellow"
                    pattern = `%${material.type}|%|${material.color}%`;
                }
                // Else: just material type "Gold|%"
                
                materialConditions.push(`MaterialData LIKE ?`);
                params.push(pattern);
            });
            
            if (materialConditions.length > 0) {
                whereConditions.push(`(${materialConditions.join(' OR ')})`);
            }
        }

        // Gem filtering (similar pattern-based approach)
        if (filters.gemQuery && filters.gem && filters.gem.length > 0) {
            const gemConditions = [];
            
            filters.gem.forEach(gem => {
                let pattern = `%${gem.type}|%`; // Match gem type
                
                if (gem.cut && gem.clarity) {
                    pattern = `%${gem.type}|${gem.cut}|${gem.clarity}%`;
                } else if (gem.cut) {
                    pattern = `%${gem.type}|${gem.cut}|%`;
                } else if (gem.clarity) {
                    pattern = `%${gem.type}|%|${gem.clarity}%`;
                }
                
                gemConditions.push(`GemData LIKE ?`);
                params.push(pattern);
            });
            
            if (gemConditions.length > 0) {
                whereConditions.push(`(${gemConditions.join(' OR ')})`);
            }
        }
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

        this.addMaterialGemFilters(whereConditions, params, filters);

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
            hasMore: data.length === limit,
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