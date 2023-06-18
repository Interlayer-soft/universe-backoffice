import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('1234567890', 10);
  const username = 'admin';
  await prisma.admin.upsert({
    where: { username },
    create: {
      username,
      password: hashedPassword,
    },
    update: {},
  });
  return { ok: true };
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
