import moment from 'moment';
import { sqliteDB } from './../services/db';

export const formatMessages = (data: { author: string; text: string }) => {
  const { author, text } = data;
  return {
    author,
    text,
    time: moment().format('DD/MM/YYYY hh:mm:ss'),
  };
};

interface Mensaje {
  author: string;
  text: string;
  time: string;
}
// const mensajes: Mensaje[] = [];

class Mensajes {
  // funcion para leer mis mensajes
  async leer() {
    try {
      // return mensajes;
      return await sqliteDB.from('mensajes').select();
    } catch (error) {
      console.log('No hay mensajes en el listado');
      return [];
    }
  }

  // funcion para agregar mensajes
  async guardar(author: string, text: string, time: string) {
    try {
      const mensajeNuevo: Mensaje = {
        author,
        text,
        time,
      };
      // mensajes.push(mensajeNuevo);
      return await sqliteDB.from('mensajes').insert(mensajeNuevo);
    } catch (error) {
      console.log('ERROR: No se pudo agregar un mensaje. ' + error);
    }
  }

  async leerUno(id: number) {
    try {
      return await sqliteDB.from('mensajes').where({ id: id }).select();
    } catch (error) {
      console.log('ERROR: No se pudo leer un mensaje. ' + error);
    }
  }

  async actualizar(id: number, data: any) {
    try {
      return await sqliteDB.from('mensajes').where({ id }).update(data);
    } catch (error) {
      console.log('ERROR: No se pudo actualizar un mensaje. ' + error);
    }
  }

  async delete(id: number) {
    try {
      return await sqliteDB.from('mensajes').where({ id }).del();
    } catch (error) {
      console.log('ERROR: No se pudo actualizar un mensaje. ' + error);
    }
  }
}

export const mensajesPersistencia = new Mensajes();
