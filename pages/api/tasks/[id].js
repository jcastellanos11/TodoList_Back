import pool from '../../../lib/db.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { id } = req.query;

    try {
        if (req.method === 'PUT') {
            const { title, description, completed } = req.body;

            const result = await pool.query(
                'UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *', [title, description, completed, id]
            );

            if (result.rowCount === 0)
                return res.status(404).json({ error: 'Tarea no encontrada' });

            return res.status(200).json(result.rows[0]);
        }

        if (req.method === 'DELETE') {
            await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
            return res.status(204).end();
        }

        return res.status(405).json({ error: 'Método no permitido' });
    } catch (error) {
        console.error('❌ Error en /api/tasks/[id]:', error);
        return res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
}