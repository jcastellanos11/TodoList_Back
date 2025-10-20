import pool from '../../../lib/db.js';

export default async function handler(req, res) {
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';

    console.log(`📡 Petición recibida en ${baseUrl}${req.url}`);


    // ✅ Cabeceras CORS
    const allowedOrigin = process.env.FRONTEND_URL || '*';
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            const result = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
            return res.status(200).json(result.rows);
        }

        if (req.method === 'POST') {
            const { title, description } = req.body;

            // Validación mínima
            if (!title) {
                return res.status(400).json({ error: 'El título es obligatorio' });
            }

            const result = await pool.query(
                'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *', [title, description]
            );

            return res.status(201).json(result.rows[0]);
        }

        // Si llega aquí, método no permitido
        return res.status(405).json({ error: 'Método no permitido' });
    } catch (error) {
        console.error('❌ Error en /api/tasks:', error);
        return res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
}