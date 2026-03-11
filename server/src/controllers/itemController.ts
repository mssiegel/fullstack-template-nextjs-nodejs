import { Request, Response } from 'express';
import createError from 'http-errors';

import { items, Item } from '../models/itemModel';

// Create an item
export const createItem = (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) throw createError(400, 'Name is required');

  const newItem: Item = { id: Date.now(), name };
  items.push(newItem);
  res.status(201).json({ success: true, data: { item: newItem } });
};

// Read all items
export const getItems = (req: Request, res: Response) => {
  res.json({ success: true, data: items });
};

// Read single item
export const getItemById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const item = items.find((i) => i.id === id);
  if (!item) throw createError(404, 'Item not found');
  res.json({ success: true, data: item });
};

// Update an item
export const updateItem = (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const { name } = req.body;
  const itemIndex = items.findIndex((i) => i.id === id);
  if (itemIndex === -1) throw createError(404, 'Item not found');

  items[itemIndex].name = name;
  res.json({ success: true, data: { item: items[itemIndex] } });
};

// Delete an item
export const deleteItem = (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const itemIndex = items.findIndex((i) => i.id === id);
  if (itemIndex === -1) throw createError(404, 'Item not found');

  const deletedItem = items.splice(itemIndex, 1)[0];
  res.json({ success: true, data: { item: deletedItem } });
};
