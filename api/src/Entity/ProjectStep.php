<?php

namespace App\Entity;

use App\Repository\ProjectStepRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProjectStepRepository::class)]
class ProjectStep
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $projectId = null;

    #[ORM\Column]
    private ?int $stepId = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProjectId(): ?int
    {
        return $this->projectId;
    }

    public function setProjectId(int $projectId): static
    {
        $this->projectId = $projectId;

        return $this;
    }

    public function getStepId(): ?int
    {
        return $this->stepId;
    }

    public function setStepId(int $stepId): static
    {
        $this->stepId = $stepId;

        return $this;
    }
}
