import { prisma } from '../lib/prisma';

// GET
async function getAllItems() {
  return prisma.item.findMany();
}

async function getById(id: number) {
  return prisma.item.findUnique({
    where: { id },
  });
}

// POST
async function createItem(name: string) {
  return prisma.item.create({
    data: {
      name,
    },
  });
}

// PUT
async function updateItem(id: number, name: string) {
  return prisma.item.update({
    where: { id },
    data: { name },
  });
}

// DELETE
async function deleteById(id: number) {
  return prisma.item.delete({
    where: { id },
  });
}

export const itemRepository = {
  getAllItems,
  getById,
  createItem,
  updateItem,
  deleteById,
};
