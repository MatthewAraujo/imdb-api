-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "spotifySongId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "durationMs" INTEGER NOT NULL,
    "previewUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Song_spotifySongId_key" ON "Song"("spotifySongId");
