-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_user_id_fkey";

-- AlterTable
ALTER TABLE "comment" ALTER COLUMN "nickname" DROP NOT NULL,
ALTER COLUMN "content" SET DATA TYPE VARCHAR(160),
ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "user_id" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
