import { Router } from 'express';
import { units } from '../data/units.js';

export const unitsRouter = Router();

unitsRouter.get('/', (_req, res) => {
  res.json(units);
});

unitsRouter.get('/:id', (req, res) => {
  const unit = units.find((u) => u.id === Number(req.params.id));
  if (!unit) {
    res.status(404).json({ error: 'Unit not found' });
    return;
  }
  res.json(unit);
});
