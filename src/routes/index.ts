import { Router } from 'express';
import routerProductos from './productos';
import cartRouter from './carrito';

const router = Router();

router.use('/productos', routerProductos);
router.use('/cart', cartRouter); // A REALIZAR PARA LA PROXIMA ENTREGA

export default router;
