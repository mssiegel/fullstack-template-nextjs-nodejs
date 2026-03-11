import { Request, Response } from 'express';
import createError from 'http-errors';

import { prisma } from '../lib/prisma';

// Create an item
export const createItem = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) throw createError(400, 'Name is required');

  const newItem = await prisma.item.create({
    data: { name },
  });
  res.status(201).json({ success: true, data: { item: newItem } });
};

// Read all items
export const getItems = async (req: Request, res: Response) => {
  const items = await prisma.item.findMany();
  res.json({ success: true, data: { items } });
};

// Read single item
export const getItemById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const item = await prisma.item.findUnique({
    where: { id },
  });
  if (!item) throw createError(404, 'Item not found');
  res.json({ success: true, data: { item } });
};

// Update an item
export const updateItem = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const { name } = req.body;

  const item = await prisma.item.update({
    where: { id },
    data: { name },
  });

  // TODO: if not found: throw createError(404, 'Item not found');
  res.json({ success: true, data: { item } });
};

// Delete an item
export const deleteItem = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);

  const deletedItem = await prisma.item.delete({
    where: { id },
  });

  // TODO: if not found: throw createError(404, 'Item not found');
  res.json({ success: true, data: { item: deletedItem } });
};
