import {MigrationInterface, QueryRunner} from "typeorm";

export class addActive2ColumnToLocationsTable1713837003285 implements MigrationInterface {
    name = 'addActive2ColumnToLocationsTable1713837003285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."event_category_enum" AS ENUM('Concert', 'Conference', 'Game')
        `);
        await queryRunner.query(`
            CREATE TABLE "event" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "date" TIMESTAMP NOT NULL,
                "availableAttendeesCount" integer NOT NULL,
                "description" character varying NOT NULL,
                "category" "public"."event_category_enum" NOT NULL,
                CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "event"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."event_category_enum"
        `);
    }

}
