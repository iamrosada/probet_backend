-- CreateTable
CREATE TABLE "Customer" (
    "uuid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "numberPhone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Admin" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "numberPhone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "forgotPasswordAccessToken" INTEGER NOT NULL,
    "forgotPasswordExpiresIn" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_uuid_key" ON "Customer"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_numberPhone_key" ON "Customer"("numberPhone");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_uuid_key" ON "Admin"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_numberPhone_key" ON "Admin"("numberPhone");
