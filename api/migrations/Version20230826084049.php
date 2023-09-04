<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230826084049 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE task CHANGE created_at created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE completed_at completed_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE project_step ADD files LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', DROP file');
        $this->addSql('ALTER TABLE project ADD current_step VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE task CHANGE created_at created_at VARCHAR(255) NOT NULL, CHANGE completed_at completed_at VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE project_step ADD file VARCHAR(255) DEFAULT NULL, DROP files');
        $this->addSql('ALTER TABLE project DROP current_step');
    }
}
