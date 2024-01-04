import express from 'express';
import hbs from 'express-handlebars';
import home from './controllers/home.js';

start();

async function start() {
  const app = express();
  const port = 3000;
  
  app.engine('hbs', hbs.create({
    extname: '.hbs',
    defaultLayout: 'main',
  }).engine);
  
  app.set('view engine', 'hbs');

  app.get('/', home);
  
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
