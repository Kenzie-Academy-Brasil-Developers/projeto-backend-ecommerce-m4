import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1673987222005 implements MigrationInterface {
    name = 'createTables1673987222005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "amount" TO "stock"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "stock" TO "amount"`);
    }

}
