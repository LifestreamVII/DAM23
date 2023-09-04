<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TaskRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TaskRepository::class)]
#[ApiResource]
class Task
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\ManyToOne(targetEntity: Project::class, inversedBy: 'tasks')]
    #[ORM\JoinColumn(name: 'project_id', referencedColumnName: 'id')]
    private Project $project;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'tasksSent', fetch: 'EAGER')]
    #[ORM\JoinColumn(name: 'sender_id', referencedColumnName: 'id')]
    private User $taskSender;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'tasksReceived')]
    #[ORM\JoinColumn(name: 'receiver_id', referencedColumnName: 'id')]
    private User $taskReceiver;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $completedAt = null;

    #[ORM\Column(type: "string", enumType: TaskStatus::class)]
    private TaskStatus $status;

    public function __construct()
    {
        $this->projects = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getTaskSender(): User
    {
        return $this->taskSender;
    }

    public function setTaskSender(User $taskSender): static
    {
        $this->taskSender = $taskSender;

        return $this;
    }

    public function getTaskReceiver(): ?User
    {
        return $this->taskReceiver;
    }

    public function setTaskReceiver(User $taskReceiver): static
    {
        $this->taskReceiver = $taskReceiver;

        return $this;
    }

    public function getProject() : Project
    {
        return $this->project;
    }

    public function setProject(Project $project) : static
    {
        $this->project = $project;

        return $this;
    }

    public function getCreatedAt(): string
    {
        return $this->createdAt->format('d.m.Y');
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getCompletedAt(): ?\DateTimeImmutable
    {
        return $this->completedAt;
    }

    public function setCompletedAt(\DateTimeImmutable $completedAt): static
    {
        $this->completedAt = $completedAt;

        return $this;
    }

    public function getStatus(): TaskStatus
    {
        return $this->status;
    }

    public function setStatus(TaskStatus $status): static
    {
        $this->status = $status;

        return $this;
    }
}
