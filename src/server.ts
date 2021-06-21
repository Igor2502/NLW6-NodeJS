import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.send('Olá NLW!');
});

app.post('/test-post', (req, res) => {
  return res.send('Olá NLW Post!');
});

app.listen(3000, () => console.log('Server is running!'));