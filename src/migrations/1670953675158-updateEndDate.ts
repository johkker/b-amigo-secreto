import { MigrationInterface, QueryRunner } from "typeorm";

export class updateEndDate1670953675158 implements MigrationInterface {
    name = 'updateEndDate1670953675158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" ALTER COLUMN "end_date" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" ALTER COLUMN "end_date" SET NOT NULL`);
    }

}
