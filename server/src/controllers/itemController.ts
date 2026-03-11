import { Request, Response, NextFunction } from 'express';

import { items, Item } from '../models/itemModel';

// Create an item
export const createItem = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const newItem: Item = { id: Date.now(), name };
  items.push(newItem);
  res.status(201).json(newItem);
};

// Read all items
export const getItems = (req: Request, res: Response, next: NextFunction) => {
  res.json(items);
};

// Read single item
export const getItemById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = parseInt(req.params.id as string);
  const item = items.find((i) => i.id === id);
  if (!item) {
    res.status(404).json({ message: 'Item not found' });
    return;
  }
  res.json(item);
};

// Update an item
export const updateItem = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string);
  const { name } = req.body;
  const itemIndex = items.findIndex((i) => i.id === id);
  if (itemIndex === -1) {
    res.status(404).json({ message: 'Item not found' });
    return;
  }
  items[itemIndex].name = name;
  res.json(items[itemIndex]);
};

// Delete an item
export const deleteItem = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string);
  const itemIndex = items.findIndex((i) => i.id === id);
  if (itemIndex === -1) {
    res.status(404).json({ message: 'Item not found' });
    return;
  }
  const deletedItem = items.splice(itemIndex, 1)[0];
  res.json(deletedItem);
};
