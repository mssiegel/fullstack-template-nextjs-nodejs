import { prisma } from '../lib/prisma';

async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

async function findById(id: number) {
  return prisma.user.findUnique({
    where: { id },
  });
}

async function createUser(email: string, password: string) {
  return prisma.user.create({
    data: {
      email,
      password,
    },
  });
}

export const userRepository = {
  findByEmail,
  findById,
  createUser,
};
