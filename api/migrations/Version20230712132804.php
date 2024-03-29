<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230712132804 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE asset_history (id INT AUTO_INCREMENT NOT NULL, asset_id INT NOT NULL, file VARCHAR(255) NOT NULL, version VARCHAR(255) NOT NULL, date DATE NOT NULL, INDEX IDX_4454311D5DA1941 (asset_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE metadata_tag (metadata_id INT NOT NULL, tag_id INT NOT NULL, INDEX IDX_7A36A8A9DC9EE959 (metadata_id), INDEX IDX_7A36A8A9BAD26311 (tag_id), PRIMARY KEY(metadata_id, tag_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE project_task (project_id INT NOT NULL, task_id INT NOT NULL, INDEX IDX_6BEF133D166D1F9C (project_id), INDEX IDX_6BEF133D8DB60186 (task_id), PRIMARY KEY(project_id, task_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE project_user (project_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_B4021E51166D1F9C (project_id), INDEX IDX_B4021E51A76ED395 (user_id), PRIMARY KEY(project_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE asset_history ADD CONSTRAINT FK_4454311D5DA1941 FOREIGN KEY (asset_id) REFERENCES asset (id)');
        $this->addSql('ALTER TABLE metadata_tag ADD CONSTRAINT FK_7A36A8A9DC9EE959 FOREIGN KEY (metadata_id) REFERENCES metadata (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE metadata_tag ADD CONSTRAINT FK_7A36A8A9BAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project_task ADD CONSTRAINT FK_6BEF133D166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project_task ADD CONSTRAINT FK_6BEF133D8DB60186 FOREIGN KEY (task_id) REFERENCES task (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project_user ADD CONSTRAINT FK_B4021E51166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project_user ADD CONSTRAINT FK_B4021E51A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE asset ADD metadata_id INT NOT NULL, ADD project_id INT NOT NULL, ADD status VARCHAR(255) NOT NULL, ADD type VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE asset ADD CONSTRAINT FK_2AF5A5CDC9EE959 FOREIGN KEY (metadata_id) REFERENCES metadata (id)');
        $this->addSql('ALTER TABLE asset ADD CONSTRAINT FK_2AF5A5C166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('CREATE INDEX IDX_2AF5A5CDC9EE959 ON asset (metadata_id)');
        $this->addSql('CREATE INDEX IDX_2AF5A5C166D1F9C ON asset (project_id)');
        $this->addSql('ALTER TABLE chapter ADD metadata_id INT NOT NULL');
        $this->addSql('ALTER TABLE chapter ADD CONSTRAINT FK_F981B52EDC9EE959 FOREIGN KEY (metadata_id) REFERENCES metadata (id)');
        $this->addSql('CREATE INDEX IDX_F981B52EDC9EE959 ON chapter (metadata_id)');
        $this->addSql('ALTER TABLE metadata ADD composition_id INT NOT NULL, ADD compositor_id INT NOT NULL');
        $this->addSql('ALTER TABLE metadata ADD CONSTRAINT FK_4F14341487A2E12 FOREIGN KEY (composition_id) REFERENCES composition (id)');
        $this->addSql('ALTER TABLE metadata ADD CONSTRAINT FK_4F143414E74E5782 FOREIGN KEY (compositor_id) REFERENCES compositor (id)');
        $this->addSql('CREATE INDEX IDX_4F14341487A2E12 ON metadata (composition_id)');
        $this->addSql('CREATE INDEX IDX_4F143414E74E5782 ON metadata (compositor_id)');
        $this->addSql('ALTER TABLE subtitle ADD metadata_id INT NOT NULL');
        $this->addSql('ALTER TABLE subtitle ADD CONSTRAINT FK_518597B1DC9EE959 FOREIGN KEY (metadata_id) REFERENCES metadata (id)');
        $this->addSql('CREATE INDEX IDX_518597B1DC9EE959 ON subtitle (metadata_id)');
        $this->addSql('ALTER TABLE task ADD status VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE task_history ADD status VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE asset_history DROP FOREIGN KEY FK_4454311D5DA1941');
        $this->addSql('ALTER TABLE metadata_tag DROP FOREIGN KEY FK_7A36A8A9DC9EE959');
        $this->addSql('ALTER TABLE metadata_tag DROP FOREIGN KEY FK_7A36A8A9BAD26311');
        $this->addSql('ALTER TABLE project_task DROP FOREIGN KEY FK_6BEF133D166D1F9C');
        $this->addSql('ALTER TABLE project_task DROP FOREIGN KEY FK_6BEF133D8DB60186');
        $this->addSql('ALTER TABLE project_user DROP FOREIGN KEY FK_B4021E51166D1F9C');
        $this->addSql('ALTER TABLE project_user DROP FOREIGN KEY FK_B4021E51A76ED395');
        $this->addSql('DROP TABLE asset_history');
        $this->addSql('DROP TABLE metadata_tag');
        $this->addSql('DROP TABLE project_task');
        $this->addSql('DROP TABLE project_user');
        $this->addSql('ALTER TABLE chapter DROP FOREIGN KEY FK_F981B52EDC9EE959');
        $this->addSql('DROP INDEX IDX_F981B52EDC9EE959 ON chapter');
        $this->addSql('ALTER TABLE chapter DROP metadata_id');
        $this->addSql('ALTER TABLE task DROP status');
        $this->addSql('ALTER TABLE subtitle DROP FOREIGN KEY FK_518597B1DC9EE959');
        $this->addSql('DROP INDEX IDX_518597B1DC9EE959 ON subtitle');
        $this->addSql('ALTER TABLE subtitle DROP metadata_id');
        $this->addSql('ALTER TABLE asset DROP FOREIGN KEY FK_2AF5A5CDC9EE959');
        $this->addSql('ALTER TABLE asset DROP FOREIGN KEY FK_2AF5A5C166D1F9C');
        $this->addSql('DROP INDEX IDX_2AF5A5CDC9EE959 ON asset');
        $this->addSql('DROP INDEX IDX_2AF5A5C166D1F9C ON asset');
        $this->addSql('ALTER TABLE asset DROP metadata_id, DROP project_id, DROP status, DROP type');
        $this->addSql('ALTER TABLE task_history DROP status');
        $this->addSql('ALTER TABLE metadata DROP FOREIGN KEY FK_4F14341487A2E12');
        $this->addSql('ALTER TABLE metadata DROP FOREIGN KEY FK_4F143414E74E5782');
        $this->addSql('DROP INDEX IDX_4F14341487A2E12 ON metadata');
        $this->addSql('DROP INDEX IDX_4F143414E74E5782 ON metadata');
        $this->addSql('ALTER TABLE metadata DROP composition_id, DROP compositor_id');
    }
}
