
import { Router } from 'express';
import { register, login } from '../../interface-adapters/controllers/authController';
import { adaptRoute } from '../../interface-adapters/gateways/expressRouteAdapter';

const router = Router();

router.post('/register', adaptRoute(register));
router.post('/login', adaptRoute(login));

export default router;
