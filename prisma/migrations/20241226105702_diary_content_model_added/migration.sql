-- CreateTable
CREATE TABLE "DiaryContent" (
    "id" SERIAL NOT NULL,
    "Content" TEXT NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "DiaryContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DiaryContent" ADD CONSTRAINT "DiaryContent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
