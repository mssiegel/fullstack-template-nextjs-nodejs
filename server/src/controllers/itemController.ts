import { Request, Response } from 'express';
import createError from 'http-errors';

import { itemRepository } from '../dbRepositories/itemRepository';

// Create an item
export const createItem = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) throw createError(400, 'Name is required');

  const newItem = await itemRepository.createItem(name);
  res.status(201).json({ success: true, data: { item: newItem } });
};

// Read all items
export const getItems = async (req: Request, res: Response) => {
  const items = await itemRepository.getAllItems();
  res.json({ success: true, data: { items } });
};

// Read single item
export const getItemById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const item = await itemRepository.getById(id);
  if (!item) throw createError(404, 'Item not found');
  res.json({ success: true, data: { item } });
};

// Update an item
export const updateItem = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const { name } = req.body;

  try {
    const item = await itemRepository.updateItem(id, name);
    res.json({ success: true, data: { item } });
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw createError(404, 'Item not found');
    }
    throw error;
  }
};

// Delete an item
export const deleteItem = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);

  try {
    const deletedItem = await itemRepository.deleteById(id);
    res.json({ success: true, data: { item: deletedItem } });
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw createError(404, 'Item not found');
    }
    throw error;
  }
};
