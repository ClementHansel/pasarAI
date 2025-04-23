-- DropForeignKey
ALTER TABLE "Seller" DROP CONSTRAINT "Seller_brandId_fkey";

-- CreateTable
CREATE TABLE "_BrandSellers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BrandSellers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BrandSellers_B_index" ON "_BrandSellers"("B");

-- AddForeignKey
ALTER TABLE "_BrandSellers" ADD CONSTRAINT "_BrandSellers_A_fkey" FOREIGN KEY ("A") REFERENCES "Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrandSellers" ADD CONSTRAINT "_BrandSellers_B_fkey" FOREIGN KEY ("B") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;
