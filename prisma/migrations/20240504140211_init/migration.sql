-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Etudiant', 'Administrateur');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "image" TEXT,
    "nom" TEXT NOT NULL,
    "postnom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "universite" TEXT NOT NULL,
    "faculte" TEXT NOT NULL,
    "departement" TEXT NOT NULL,
    "promotion" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,
    "comfirmMotDePasse" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participation" (
    "id" SERIAL NOT NULL,
    "activiteId" INTEGER NOT NULL,
    "usersId" INTEGER NOT NULL,

    CONSTRAINT "Participation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activites" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_motDePasse_key" ON "Users"("motDePasse");

-- CreateIndex
CREATE UNIQUE INDEX "Users_comfirmMotDePasse_key" ON "Users"("comfirmMotDePasse");

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_activiteId_fkey" FOREIGN KEY ("activiteId") REFERENCES "Activites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
