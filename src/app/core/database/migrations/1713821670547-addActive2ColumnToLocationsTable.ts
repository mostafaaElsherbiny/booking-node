import {MigrationInterface, QueryRunner} from "typeorm";

export class addActive2ColumnToLocationsTable1713821670547 implements MigrationInterface {
    name = 'addActive2ColumnToLocationsTable1713821670547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "roles" text NOT NULL DEFAULT '["user"]',
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "token" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "token" character varying NOT NULL,
                "userId" integer,
                CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "token"
            ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"
        `);
        await queryRunner.query(`
            DROP TABLE "token"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
