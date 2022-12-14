import { MigrationInterface, QueryRunner } from "typeorm";

export class modifiedEndDateToString1670972666836 implements MigrationInterface {
    name = 'modifiedEndDateToString1670972666836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "group" ADD "end_date" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "group" ADD "end_date" TIMESTAMP`);
    }

}
