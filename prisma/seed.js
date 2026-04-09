import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import bcrypt from 'bcryptjs';
import convertToSlug from '../config/slugify.js';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding started...');
  await prisma.role.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, name: 'Member' },
  });

  await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, name: 'Admin' },
  });

  const encryptedAdminPass = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  await prisma.user.upsert({
    where: { userName: process.env.ADMIN_USER },
    update: {},
    create: { id: 1, userName: process.env.ADMIN_USER, password: encryptedAdminPass, roleId: 2 },
  });

  await prisma.tag.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, name: 'Video Games', slug: 'video-games' },
  });

  await prisma.tag.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, name: 'Music', slug: 'music' },
  });

  await prisma.tag.upsert({
    where: { id: 3 },
    update: {},
    create: { id: 3, name: 'Movies', slug: 'movies' },
  });

  const fortniteTitle = 'Fortnite: A Gaming Phenomenon';
  const fortniteSlug = convertToSlug(fortniteTitle);
  await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: fortniteTitle,
      rawText:
        'Fortnite, developed by Epic Games, has become one of the most influential titles in modern gaming. Launched in 2017, it quickly captured global attention with its unique blend of fast-paced battle royale action, creative building mechanics, and vibrant art style. At its core, Fortnite drops 100 players onto an island where they must gather resources, build structures, and fight to be the last one standing. What sets it apart from other battle royale games is the ability to construct walls, ramps, and forts in real time, adding a strategic layer that rewards creativity as much as combat skill. Beyond gameplay, Fortnite thrives as a cultural hub. Its frequent collaborations with musicians, athletes, and movie franchises transform the game into a virtual stage for pop culture. Events like live concerts and cinematic experiences have blurred the line between gaming and entertainment, attracting millions of viewers worldwide. The game’s free-to-play model, supported by cosmetic purchases, has also reshaped industry economics. Skins, emotes, and seasonal battle passes keep players engaged while fueling Epic’s revenue. Fortnite isn’t just a game—it’s a social platform, a creative outlet, and a digital gathering space. Whether competing for victory royales or attending in-game events, players continue to shape its ever-evolving world.',
      formattedText: `
      <article>
        <p>
          Fortnite, developed by Epic Games, has become one of the most influential titles in modern gaming. 
          Launched in 2017, it quickly captured global attention with its unique blend of fast-paced battle royale 
          action, creative building mechanics, and vibrant art style.
        </p>
        <p>
          At its core, Fortnite drops 100 players onto an island where they must gather resources, build structures, 
          and fight to be the last one standing. What sets it apart from other battle royale games is the ability 
          to construct walls, ramps, and forts in real time, adding a strategic layer that rewards creativity as 
          much as combat skill.
        </p>
        <p>
          Beyond gameplay, Fortnite thrives as a cultural hub. Its frequent collaborations with musicians, athletes, 
          and movie franchises transform the game into a virtual stage for pop culture. Events like live concerts 
          and cinematic experiences have blurred the line between gaming and entertainment, attracting millions of 
          viewers worldwide.
        </p>
        <p>
          The game’s free-to-play model, supported by cosmetic purchases, has also reshaped industry economics. 
          Skins, emotes, and seasonal battle passes keep players engaged while fueling Epic’s revenue.
        </p>
        <p>
          Fortnite isn’t just a game—it’s a social platform, a creative outlet, and a digital gathering space. 
          Whether competing for victory royales or attending in-game events, players continue to shape its 
          ever-evolving world.
        </p>
      </article>
    `,
      published: true,
      slug: fortniteSlug,
      user: {
        connect: {
          id: 1,
        },
      },
      tags: { connect: { id: 1 } },
    },
  });

  console.log('Seed complete.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
