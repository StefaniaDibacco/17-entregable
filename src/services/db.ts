import knex from 'knex';

export const sqliteDB = knex({
  client: 'sqlite3',
  connection: { filename: './src/db/mensajes.sqlite' },
  useNullAsDefault: true,
});

export const mySQLDB = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'prueba',
  },
  pool: { min: 0, max: 2 },
});

sqliteDB.schema.hasTable('mensajes').then((exists) => {
  if (!exists) {
    console.log('NO EXISTE LA TABLA mensajes.');
    sqliteDB.schema
      .createTable('mensajes', (tabla) => {
        tabla.increments('id');
        tabla.string('author');
        tabla.string('text');
        tabla.string('time');
      })
      .then(() => {
        console.log('DONE');
      });
  }
});

mySQLDB.schema.hasTable('productos').then((exists) => {
  if (!exists) {
    console.log('NO EXISTE LA TABLA productos.');
    mySQLDB.schema
      .createTable('productos', (productosTable) => {
        productosTable.increments('id');
        productosTable.string('title').notNullable();
        productosTable.string('thumbnail').notNullable();
        productosTable.decimal('price', 4, 2);
      })
      .then(() => {
        console.log('DONE');
      });
  }
});
