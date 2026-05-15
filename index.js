
console.log("FUNCIONA");
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors({
    origin: "*"
}));
app.use(express.json());

app.get('/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar projetos');
  }
});

app.post('/projects', async (req, res) => {
  try {
    const { name, donor, start_date, end_date, budget, status, currency, spent, progress } = req.body;

    await pool.query(
      'INSERT INTO projects (name, donor, start_date, end_date, budget, status, currency, spent, progress) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
      [name, donor, start_date, end_date, budget, status, currency, spent, progress]
);

    res.send('Project created');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar projeto');
  }
});

app.put('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, donor, start_date, end_date, budget, status, currency, spent, progress } = req.body;

    await pool.query(
      'UPDATE projects SET name=$1, donor=$2, start_date=$3, end_date=$4, budget=$5, status=$6, currency=$7, spent=$8, progress=$9 WHERE id=$10',
      [name, donor, start_date, end_date, budget, status, currency, spent, progress, id]
    );

    res.send('Project updated');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao atualizar projeto');
  }
});

app.delete('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM projects WHERE id=$1', [id]);

    res.send('Project deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao apagar projeto');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});