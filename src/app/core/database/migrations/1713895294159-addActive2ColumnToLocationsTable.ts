import {MigrationInterface, QueryRunner} from "typeorm";

export class addActive2ColumnToLocationsTable1713895294159 implements MigrationInterface {
    name = 'addActive2ColumnToLocationsTable1713895294159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "ticket" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "attendeesCount" integer NOT NULL,
                "userId" integer,
                "eventId" integer,
                CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "ticket"
            ADD CONSTRAINT "FK_0e01a7c92f008418bad6bad5919" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "ticket"
            ADD CONSTRAINT "FK_cb22a51617991265571be41b74f" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "ticket" DROP CONSTRAINT "FK_cb22a51617991265571be41b74f"
        `);
        await queryRunner.query(`
            ALTER TABLE "ticket" DROP CONSTRAINT "FK_0e01a7c92f008418bad6bad5919"
        `);
        await queryRunner.query(`
            DROP TABLE "ticket"
        `);
    }

}
