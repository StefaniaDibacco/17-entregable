import { mySQLDB } from './../services/db';
interface Product {
  title: string;
  price: number;
  thumbnail: string;
}
/*
let elementos = [
  {
    title: 'mochila',
    price: 20,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Backpack-256.png',
    id: 1,
  },
];
*/
class Productos {
  // Metodo para leer mis productos
  async leer() {
    try {
      // return elementos;
      return await mySQLDB.from('productos').select();
    } catch (error) {
      console.log('No hay productos en el listado');
      return [];
    }
  }

  // Metodo para agregar productos
  async guardar(title: string, price: number, thumbnail: string) {
    try {
      if (typeof title !== 'string')
        throw new Error('Titulo tiene que ser string');
      if (isNaN(price)) throw new Error('Price tiene que ser un nro');
      if (typeof thumbnail !== 'string')
        throw new Error('Thumbnail tiene que ser string de url');

      const elemento: Product = {
        title: title,
        price: price,
        thumbnail: thumbnail,
      };

      // elementos.push(elemento);
      await mySQLDB.from('productos').insert(elemento);
      return elemento;
    } catch (error) {
      console.log('ERROR: No se pudo agregar un producto. ' + error);
    }
  }

  // Metodo para agregar uno
  async leerUno(id: number) {
    try {
      // const producto = elementos.find((aProduct) => aProduct.id === id);
      const producto = await mySQLDB
        .from('productos')
        .where({ id: id })
        .select();
      return producto;
    } catch (error) {
      console.log('Producto no encontrado');
    }
  }

  // Metodo para actualizar productos
  async actualizar(
    id: number,
    title: string | null = null,
    price: number | null = null,
    thumbnail: string | null = null
  ) {
    try {
      if (typeof title !== 'string')
        throw new Error('Titulo tiene que ser string');
      if (typeof price !== 'number')
        throw new Error('Price tiene que ser un nro');
      if (typeof thumbnail !== 'string')
        throw new Error('Thumbnail tiene que ser string de url');

      // const index = elementos.map((aProduct) => aProduct.id).indexOf(id);
      /*
      if (index === -1) {
        throw new Error('Producto no encontrado');
      }
      

      elementos[index].title = title;
      elementos[index].price = price;
      elementos[index].thumbnail = thumbnail;
      */
      const data = { title, price, thumbnail };
      return await mySQLDB.from('productos').where({ id }).update(data);
      // return elementos[index];
    } catch (error) {
      console.log(error);
    }
  }

  // Metodo para borrar un producto
  async borrarUno(id: number) {
    try {
      /*
      const idBuscado = id;
      const productoEliminado = elementos.find(
        (aProduct) => aProduct.id === idBuscado
      );
      elementos = elementos.filter((aProduct) => aProduct.id !== idBuscado);

      return productoEliminado;
      */
      return await mySQLDB.from('productos').where({ id }).del();
    } catch (error) {
      console.log(`Producto no encontrado`);
    }
  }
}

export const productsPersistencia = new Productos();
