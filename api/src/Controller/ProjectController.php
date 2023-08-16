<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Project;
use App\Entity\User;

class ProjectController extends AbstractController
{
    #[Route('/projects', name: 'app_projects')]
    public function projects(EntityManagerInterface $entityManager): JsonResponse
    {
        $projects = $entityManager->getRepository(Project::class)->findAll();

        $data = [];

        foreach ($projects as $project) {
            $data[] = [
                'id' => $project->getId(),
                'title' => $project->getTitle(),
                'description' => $project->getDescription(),
                'completion' => $project->getCompletion(),
                'users' => $project->getUsers()
            ];
        }

        return new JsonResponse([
            'projects' => $data
        ]);
    }

    #[Route('/project', name: 'app_project')]
    public function project(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $body = json_decode($request->getContent(), true);
        $id = $body['id'];

        $project = $entityManager->getRepository(Project::class)->findOneBy(['id' => $id]);

        if (!$project) {
            return new JsonResponse([
                'message' => "Aucun projet trouvé pour l'id ".$id
            ], 404);
        }

        $data = [
            'id' => $project->getId(),
            'title' => $project->getTitle(),
            'description' => $project->getDescription(),
            'completion' => $project->getCompletion(),
            'users' => $project->getUsers()
        ];

        return new JsonResponse([
            'project' => $data
        ]);
    }

    #[Route('/project/new', name: 'app_project_new')]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $body = json_decode($request->getContent(), true);
        $title = $body['title'];
        $description = $body['description'];

        if (empty($title) || empty($description)) {
            return new JsonResponse([
                'message' => 'Veuillez remplir tout les champs'
            ], 400);
        }

        $completion = "en cours";
        // TODO get user from token
        $user = $entityManager->getRepository(User::class)->findOneBy(['mail' => 'user1@example.com']);

        $project = new Project();
        $project->setTitle($title);
        $project->setDescription($description);
        $project->setCompletion($completion);

        $project->addUser($user);

        $entityManager->persist($project);
        $entityManager->flush();
        
        return new JsonResponse([
            'message' => 'Projet créé avec succès !',
            'id' => $project->getId(),
        ]);
    }
}
