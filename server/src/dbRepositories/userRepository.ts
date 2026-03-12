import { prisma } from '../lib/prisma';

// GET
async function getByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

async function getById(id: number) {
  return prisma.user.findUnique({
    where: { id },
  });
}

// POST
async function createUser(email: string, password: string) {
  return prisma.user.create({
    data: {
      email,
      password,
    },
  });
}

export const userRepository = {
  getByEmail,
  getById,
  createUser,
};
