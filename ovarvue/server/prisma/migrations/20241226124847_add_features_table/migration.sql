-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "Features" (
    "id" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "label" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "age" TEXT NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Features_pkey" PRIMARY KEY ("gender","label","date","age")
);
