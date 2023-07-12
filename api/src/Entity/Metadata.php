<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\MetadataRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MetadataRepository::class)]
#[ApiResource]
class Metadata
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\OneToMany(mappedBy: 'metadata', targetEntity: Asset::class)]
    private Collection $assets;

    #[ORM\ManyToMany(targetEntity: Tag::class, inversedBy: 'metadata')]
    private Collection $tags;

    #[ORM\OneToMany(mappedBy: 'metadata', targetEntity: Chapter::class)]
    private Collection $chapters;

    #[ORM\ManyToOne(inversedBy: 'metadata')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Composition $composition = null;

    #[ORM\OneToMany(mappedBy: 'metadata', targetEntity: Subtitle::class)]
    private Collection $subtitles;

    #[ORM\ManyToOne(inversedBy: 'metadata')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Compositor $compositor = null;

    public function __construct()
    {
        $this->assets = new ArrayCollection();
        $this->tags = new ArrayCollection();
        $this->chapters = new ArrayCollection();
        $this->subtitles = new ArrayCollection();
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
            $asset->setMetadata($this);
        }

        return $this;
    }

    public function removeAsset(Asset $asset): static
    {
        if ($this->assets->removeElement($asset)) {
            // set the owning side to null (unless already changed)
            if ($asset->getMetadata() === $this) {
                $asset->setMetadata(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Tag>
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tag $tag): static
    {
        if (!$this->tags->contains($tag)) {
            $this->tags->add($tag);
        }

        return $this;
    }

    public function removeTag(Tag $tag): static
    {
        $this->tags->removeElement($tag);

        return $this;
    }

    /**
     * @return Collection<int, Chapter>
     */
    public function getChapters(): Collection
    {
        return $this->chapters;
    }

    public function addChapter(Chapter $chapter): static
    {
        if (!$this->chapters->contains($chapter)) {
            $this->chapters->add($chapter);
            $chapter->setMetadata($this);
        }

        return $this;
    }

    public function removeChapter(Chapter $chapter): static
    {
        if ($this->chapters->removeElement($chapter)) {
            // set the owning side to null (unless already changed)
            if ($chapter->getMetadata() === $this) {
                $chapter->setMetadata(null);
            }
        }

        return $this;
    }

    public function getComposition(): ?Composition
    {
        return $this->composition;
    }

    public function setComposition(?Composition $composition): static
    {
        $this->composition = $composition;

        return $this;
    }

    /**
     * @return Collection<int, Subtitle>
     */
    public function getSubtitles(): Collection
    {
        return $this->subtitles;
    }

    public function addSubtitle(Subtitle $subtitle): static
    {
        if (!$this->subtitles->contains($subtitle)) {
            $this->subtitles->add($subtitle);
            $subtitle->setMetadata($this);
        }

        return $this;
    }

    public function removeSubtitle(Subtitle $subtitle): static
    {
        if ($this->subtitles->removeElement($subtitle)) {
            // set the owning side to null (unless already changed)
            if ($subtitle->getMetadata() === $this) {
                $subtitle->setMetadata(null);
            }
        }

        return $this;
    }

    public function getCompositor(): ?Compositor
    {
        return $this->compositor;
    }

    public function setCompositor(?Compositor $compositor): static
    {
        $this->compositor = $compositor;

        return $this;
    }
}
