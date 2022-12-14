import { MigrationInterface, QueryRunner } from "typeorm";

export class updateNumberType1670953880594 implements MigrationInterface {
    name = 'updateNumberType1670953880594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "number" character varying(11) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "number" integer NOT NULL`);
    }

}
