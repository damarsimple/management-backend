/*
  Warnings:

  - Added the required column `role` to the `EmployeeStudio` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmployeeStudioRole" AS ENUM ('OWNER', 'MANAGER', 'EMPLOYEE', 'CONTRACTOR');

-- AlterTable
ALTER TABLE "EmployeeStudio" ADD COLUMN     "role" "EmployeeStudioRole" NOT NULL;
