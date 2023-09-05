<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function save(User $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(User $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
    //Rechercher les utilisateurs associés à un fichier multimédia
    public function findUsersByMedia(Media $media): array
    {
    return $this->createQueryBuilder('u')
        ->join('u.mediaAccess', 'ma')
        ->where('ma.media = :media')
        ->setParameter('media', $media)
        ->getQuery()
        ->getResult();
    }

    // Rechercher les utilisateurs avec des rôles spécifiques
    public function findUsersByRole(string $role): array
    {
    return $this->createQueryBuilder('u')
        ->where(':role MEMBER OF u.roles')
        ->setParameter('role', $role)
        ->getQuery()
        ->getResult();
    }
    // Rechercher les utilisateurs en fonction de critères spécifiques
    public function findActiveUsers(\DateTime $since): array
    {
    return $this->createQueryBuilder('u')
        ->where('u.lastActiveAt >= :since')
        ->setParameter('since', $since)
        ->getQuery()
        ->getResult();
    }
//    /**
//     * @return User[] Returns an array of User objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('u.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?User
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
