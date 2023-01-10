import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnDeleteInComments1673393314911 implements MigrationInterface {
    name = 'AddColumnDeleteInComments1673393314911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "deletedAt"`);
    }

}
