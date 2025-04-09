-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "showNotificaions" BOOLEAN NOT NULL DEFAULT false,
    "users" TEXT[],
    "messageCategories" TEXT[],
    "replies" TEXT[],

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
