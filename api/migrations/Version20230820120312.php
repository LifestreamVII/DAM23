<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230820120312 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE project_step DROP FOREIGN KEY FK_7A28362473B21E9C');
        $this->addSql('CREATE TABLE user_project (user_id INT NOT NULL, project_id INT NOT NULL, INDEX IDX_77BECEE4A76ED395 (user_id), INDEX IDX_77BECEE4166D1F9C (project_id), PRIMARY KEY(user_id, project_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_project ADD CONSTRAINT FK_77BECEE4A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_project ADD CONSTRAINT FK_77BECEE4166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project_user DROP FOREIGN KEY FK_B4021E51A76ED395');
        $this->addSql('ALTER TABLE project_user DROP FOREIGN KEY FK_B4021E51166D1F9C');
        $this->addSql('ALTER TABLE project_task DROP FOREIGN KEY FK_6BEF133D166D1F9C');
        $this->addSql('ALTER TABLE project_task DROP FOREIGN KEY FK_6BEF133D8DB60186');
        $this->addSql('DROP TABLE project_user');
        $this->addSql('DROP TABLE step');
        $this->addSql('DROP TABLE project_task');
        $this->addSql('ALTER TABLE project_step DROP FOREIGN KEY FK_7A283624166D1F9C');
        $this->addSql('DROP INDEX IDX_7A28362473B21E9C ON project_step');
        $this->addSql('ALTER TABLE project_step ADD id INT AUTO_INCREMENT NOT NULL, ADD name VARCHAR(50) NOT NULL, ADD file VARCHAR(255) DEFAULT NULL, DROP step_id, CHANGE project_id project_id INT DEFAULT NULL, DROP PRIMARY KEY, ADD PRIMARY KEY (id)');
        $this->addSql('ALTER TABLE project_step ADD CONSTRAINT FK_7A283624166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE task ADD project_id INT DEFAULT NULL, ADD sender_id INT DEFAULT NULL, ADD receiver_id INT DEFAULT NULL, ADD created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD completed_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', DROP complete_date');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB25166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB25F624B39D FOREIGN KEY (sender_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB25CD53EDB6 FOREIGN KEY (receiver_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_527EDB25166D1F9C ON task (project_id)');
        $this->addSql('CREATE INDEX IDX_527EDB25F624B39D ON task (sender_id)');
        $this->addSql('CREATE INDEX IDX_527EDB25CD53EDB6 ON task (receiver_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE project_user (project_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_B4021E51166D1F9C (project_id), INDEX IDX_B4021E51A76ED395 (user_id), PRIMARY KEY(project_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE step (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, file VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE project_task (project_id INT NOT NULL, task_id INT NOT NULL, INDEX IDX_6BEF133D166D1F9C (project_id), INDEX IDX_6BEF133D8DB60186 (task_id), PRIMARY KEY(project_id, task_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE project_user ADD CONSTRAINT FK_B4021E51A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project_user ADD CONSTRAINT FK_B4021E51166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project_task ADD CONSTRAINT FK_6BEF133D166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project_task ADD CONSTRAINT FK_6BEF133D8DB60186 FOREIGN KEY (task_id) REFERENCES task (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_project DROP FOREIGN KEY FK_77BECEE4A76ED395');
        $this->addSql('ALTER TABLE user_project DROP FOREIGN KEY FK_77BECEE4166D1F9C');
        $this->addSql('DROP TABLE user_project');
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB25166D1F9C');
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB25F624B39D');
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB25CD53EDB6');
        $this->addSql('DROP INDEX IDX_527EDB25166D1F9C ON task');
        $this->addSql('DROP INDEX IDX_527EDB25F624B39D ON task');
        $this->addSql('DROP INDEX IDX_527EDB25CD53EDB6 ON task');
        $this->addSql('ALTER TABLE task ADD complete_date DATE DEFAULT NULL, DROP project_id, DROP sender_id, DROP receiver_id, DROP created_at, DROP completed_at');
        $this->addSql('ALTER TABLE project_step MODIFY id INT NOT NULL');
        $this->addSql('ALTER TABLE project_step DROP FOREIGN KEY FK_7A283624166D1F9C');
        $this->addSql('DROP INDEX `PRIMARY` ON project_step');
        $this->addSql('ALTER TABLE project_step ADD step_id INT NOT NULL, DROP id, DROP name, DROP file, CHANGE project_id project_id INT NOT NULL');
        $this->addSql('ALTER TABLE project_step ADD CONSTRAINT FK_7A28362473B21E9C FOREIGN KEY (step_id) REFERENCES step (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project_step ADD CONSTRAINT FK_7A283624166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('CREATE INDEX IDX_7A28362473B21E9C ON project_step (step_id)');
        $this->addSql('ALTER TABLE project_step ADD PRIMARY KEY (project_id, step_id)');
    }
}
