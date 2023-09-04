<?php

namespace App\Entity;

use App\Repository\ProjectStepRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProjectStepRepository::class)]
class ProjectStep
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: "string", enumType: Step::class)]
    private Step $name;

    #[ORM\ManyToOne(inversedBy: 'step')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Project $project = null;

    #[ORM\Column(type: Types::ARRAY, nullable: true)]
    private array $files = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): Step
    {
        return $this->name;
    }

    public function setName(Step $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getProject(): ?Project
    {
        return $this->project;
    }

    public function setProject(?Project $project): static
    {
        $this->project = $project;

        return $this;
    }

    public function getFiles(): array
    {
        return $this->files;
    }

    public function setFiles(array $files): static
    {
        $this->files = $files;

        return $this;
    }
}
