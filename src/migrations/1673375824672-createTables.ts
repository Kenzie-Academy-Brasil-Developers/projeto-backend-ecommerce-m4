import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1673375824672 implements MigrationInterface {
    name = 'createTables1673375824672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
