<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AssetRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AssetRepository::class)]
#[ApiResource]
class Asset
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $file = null;

    #[ORM\ManyToOne(inversedBy: 'assets')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Metadata $metadata = null;

    #[ORM\ManyToOne(inversedBy: 'assets')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Project $project = null;

    #[ORM\OneToMany(mappedBy: 'asset', targetEntity: AssetHistory::class)]
    private Collection $assetHistory;

    public function __construct()
    {
        $this->assetHistory = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFile(): ?string
    {
        return $this->file;
    }

    public function setFile(string $file): static
    {
        $this->file = $file;

        return $this;
    }

    public function getMetadata(): ?Metadata
    {
        return $this->metadata;
    }

    public function setMetadata(?Metadata $metadata): static
    {
        $this->metadata = $metadata;

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

    /**
     * @return Collection<int, AssetHistory>
     */
    public function getAssetHistory(): Collection
    {
        return $this->assetHistory;
    }

    public function addAssetHistory(AssetHistory $assetHistory): static
    {
        if (!$this->assetHistory->contains($assetHistory)) {
            $this->assetHistory->add($assetHistory);
            $assetHistory->setAsset($this);
        }

        return $this;
    }

    public function removeAssetHistory(AssetHistory $assetHistory): static
    {
        if ($this->assetHistory->removeElement($assetHistory)) {
            // set the owning side to null (unless already changed)
            if ($assetHistory->getAsset() === $this) {
                $assetHistory->setAsset(null);
            }
        }

        return $this;
    }
}