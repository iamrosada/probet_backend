-- CreateTable
CREATE TABLE "refresh_token" (
    "uuid" TEXT NOT NULL,
    "expireIn" INTEGER NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_customerId_key" ON "refresh_token"("customerId");

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
