<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProjectRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Step;
use App\Entity\ProjectStep;

#[ORM\Entity(repositoryClass: ProjectRepository::class)]
#[ApiResource]
class Project
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    private ?string $completion = null;

    #[ORM\OneToMany(mappedBy: 'project', targetEntity: Asset::class)]
    private Collection $assets;

    #[ORM\OneToMany(mappedBy: 'project', targetEntity: Task::class)]
    private Collection $tasks;

    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'projects', fetch: 'EAGER')]
    private Collection $users;

    #[ORM\OneToMany(mappedBy: 'project', targetEntity: ProjectStep::class, orphanRemoval: true, cascade: ['persist'])]
    private Collection $step;

    #[ORM\Column(type: "string", enumType: Step::class)]
    private Step $currentStep;

    public function __construct()
    {
        $this->assets = new ArrayCollection();
        $this->tasks = new ArrayCollection();
        $this->users = new ArrayCollection();
        $this->step = new ArrayCollection();
        $programmation = new ProjectStep();
        $captation = new ProjectStep();
        $postProduction = new ProjectStep();
        $editorial = new ProjectStep();
        $publication = new ProjectStep();
        $this->addStep($programmation->setName(Step::programmation));
        $this->addStep($captation->setName(Step::captation));
        $this->addStep($postProduction->setName(Step::postProduction));
        $this->addStep($editorial->setName(Step::editorial));
        $this->addStep($publication->setName(Step::publication));
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

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCompletion(): ?string
    {
        return $this->completion;
    }

    public function setCompletion(string $completion): static
    {
        $this->completion = $completion;

        return $this;
    }

    /**
     * @return Collection<int, Asset>
     */
    public function getAssets(): Collection
    {
        return $this->assets;
    }

    public function addAsset(Asset $asset): static
    {
        if (!$this->assets->contains($asset)) {
            $this->assets->add($asset);
            $asset->setProject($this);
        }

        return $this;
    }

    public function removeAsset(Asset $asset): static
    {
        if ($this->assets->removeElement($asset)) {
            if ($asset->getProject() === $this) {
                $asset->setProject(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Task>
     */
    public function getTasks(): Collection
    {
        return $this->tasks;
    }

    public function addTask(Task $task): static
    {
        if (!$this->tasks->contains($task)) {
            $this->tasks->add($task);
        }

        return $this;
    }

    public function removeTask(Task $task): static
    {
        $this->tasks->removeElement($task);

        return $this;
    }

    public function getUsers(EntityManagerInterface $entityManager, $doctrine) : array
    {
        $conn = $entityManager->getConnection();

        $sql = '
            SELECT * FROM project_user p
            WHERE p.project_id = :id
        ';

        $resultSet = $conn->executeQuery($sql, ['id' => $this->getId()]);

        $usersId = $resultSet->fetchAllAssociative();

        $users = [];

        foreach ($usersId as $userId) {
            $user = $doctrine->getRepository(User::class)->findOneBy(['id' => $userId['user_id']]);
            array_push($users, [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'mail' => $user->getMail()
            ]);
        }

        return $users;
    }

    public function addUser(User $user): static
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        $this->users->removeElement($user);

        return $this;
    }

    public function getCurrentStep(): Step
    {
        return $this->currentStep;
    }

    public function setCurrentStep(Step $currentStep): static
    {
        $this->currentStep = $currentStep;

        return $this;
    }

    /**
     * @return Collection<int, ProjectStep>
     */
    public function getStep(): Collection
    {
        return $this->step;
    }

    public function addStep(ProjectStep $step): static
    {
        if (!$this->step->contains($step)) {
            $this->step->add($step);
            $step->setProject($this);
        }

        return $this;
    }

    public function removeStep(ProjectStep $step): static
    {
        if ($this->step->removeElement($step)) {
            // set the owning side to null (unless already changed)
            if ($step->getProject() === $this) {
                $step->setProject(null);
            }
        }

        return $this;
    }

}
