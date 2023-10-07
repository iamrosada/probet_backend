-- CreateTable
CREATE TABLE "customers_only_one_bet" (
    "uuid" TEXT NOT NULL,
    "numberPhone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customers_only_one_bet_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_only_one_bet_uuid_key" ON "customers_only_one_bet"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "customers_only_one_bet_numberPhone_key" ON "customers_only_one_bet"("numberPhone");
