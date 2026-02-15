/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `tag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `tag` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nickname` on table `comment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `slug` to the `tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comment" ALTER COLUMN "nickname" SET NOT NULL;

-- AlterTable
ALTER TABLE "tag" ADD COLUMN     "slug" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tag_slug_key" ON "tag"("slug");
