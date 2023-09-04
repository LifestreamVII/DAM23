<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;

class UserController extends AbstractController
{
    #[Route('/users', name: 'app_users')]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $users = $entityManager->getRepository(User::class)->findAll();

        $data = [];

        foreach ($users as $user) {
            $data[] = [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'mail' => $user->getMail(),
                'projects' => $user->getProjects()
            ];
        }

        return new JsonResponse([
            'users' => $data
        ]);
    }

    #[Route('/user/{id}', name: 'app_user')]
    public function user(EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $user = $entityManager->getRepository(User::class)->findOneBy(['id' => $id]);

        if (!$user) {
            return new JsonResponse([
                'message' => "Aucun utilisateur trouvé pour l'id ".$id
            ], 404);
        }

        $data = [
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'mail' => $user->getMail(),
            'projects' => $user->getProjects()
        ];

        return new JsonResponse([
            'user' => $data
        ]);
    }
}
