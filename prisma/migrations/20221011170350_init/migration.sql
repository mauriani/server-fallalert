-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Dependents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "photo" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "road" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Dependents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SensorData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fallen" TEXT NOT NULL,
    "heartRate" TEXT NOT NULL,
    "oxigenLevel" TEXT NOT NULL,
    "dependentsId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SensorData_dependentsId_fkey" FOREIGN KEY ("dependentsId") REFERENCES "Dependents" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dependents_cpf_key" ON "Dependents"("cpf");
