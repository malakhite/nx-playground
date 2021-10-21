import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTsVector1634853745778 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query(`
            CREATE FUNCTION articles_trigger() RETURNS trigger AS $$
            begin
            new.tsv :=
                setweight(to_tsvector('pg_catalog.english', coalesce(new.title,'')), 'A') ||
                setweight(to_tsvector('pg_catalog.english', coalesce(new.content,'')), 'D');
            return new;
            end
            $$ LANGUAGE plpgsql;
            
            CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
                ON articles FOR EACH ROW EXECUTE FUNCTION articles_trigger();
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query(`
            DROP TRIGGER tsvectorupdate ON articles;
            DROP FUNCTION articles_trigger;
        `);
	}
}
