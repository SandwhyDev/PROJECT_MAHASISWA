-- SQLite
DROP TABLE Avatar;
DROP TABLE Biodata;
DROP TABLE User;

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Biodata" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_lengkap" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "telp" INTEGER NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "pendidikan" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Biodata_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Avatar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image_path" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Avatar_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Biodata_user_id_key" ON "Biodata"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_user_id_key" ON "Avatar"("user_id");
