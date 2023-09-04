<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Project;
use App\Entity\User;
use App\Entity\Step;

class ProjectController extends AbstractController
{
    #[Route('/projects', name: 'app_projects')]
    public function projects(EntityManagerInterface $entityManager, ManagerRegistry $doctrine): JsonResponse
    {
        $projects = $entityManager->getRepository(Project::class)->findAll();

        $data = [];

        foreach ($projects as $project) {

            $data[] = [
                'id' => $project->getId(),
                'title' => $project->getTitle(),
                'description' => $project->getDescription(),
                'completion' => $project->getCompletion(),
                'users' => $project->getUsers($entityManager, $doctrine)
            ];
        }

        return new JsonResponse([
            'projects' => $data
        ]);
    }

    #[Route('/project/new', name: 'app_project_new')]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $body = json_decode($request->getContent(), true);
        $title = $body['title'];
        $description = $body['description'];
        $usersId = $body['usersId'];

        if (empty($title) || empty($description)) {
            return new JsonResponse([
                'message' => 'Veuillez remplir tout les champs'
            ], 400);
        }

        if (empty($usersId)) {
            return new JsonResponse([
                'message' => 'Veuillez ajouter au moins un utilisateur'
            ], 400);
        }

        $completion = "en cours";

        // TODO get user from token
        $admin = $entityManager->getRepository(User::class)->findOneBy(['mail' => 'user1@example.com']);

        $project = new Project();
        $project->addUser($admin);
        $project->setTitle($title);
        $project->setDescription($description);
        $project->setCompletion($completion);
        $project->setCurrentStep(Step::programmation);

        for ($i=0; $i < count($usersId); $i++) { 
            $user = $entityManager->getRepository(User::class)->findOneBy(['id' => $usersId[$i]]);
            $project->addUser($user);
        }

        $entityManager->persist($project);
        $entityManager->flush();
        
        return new JsonResponse([
            'message' => 'Projet créé avec succès !',
        ]);
    }

    #[Route('/project/{id}/edit', name: 'app_project_edit')]
    public function edit(Request $request, EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $body = json_decode($request->getContent(), true);
        $title = $body['title'];
        $description = $body['description'];
        $users = $body['users'];
        $step = $body['step'];
        $file = $body['file'];

        $project = $entityManager->getRepository(Project::class)->findOneBy(['id' => $id]);

        if (!$project) {
            return new JsonResponse([
                'message' => "Aucun projet trouvé pour l'id ".$id
            ], 404);
        }

        if(!empty($title))
            $project->setTitle($title);
        if(!empty($description))
            $project->setDescription($description);
        if(!empty($users))
            // TODO can't remove admin from project
            for ($i=0; $i < count($users); $i++) {
                // check if user already in project
                if($project->getUsers()->contains($users[$i])) {
                    $project->removeUser($users[$i]);
                } else {
                    $user = $entityManager->getRepository(User::class)->findOneBy(['id' => $users[$i]]);
                    $project->addUser($user);
                }
            }        

        $entityManager->persist($project);
        $entityManager->flush();

        return new JsonResponse([
            'message' => $project->getUsers(),
        ]);
    }

    #[Route('/project/{id}', name: 'app_project')]
    public function project(EntityManagerInterface $entityManager, int $id, ManagerRegistry $doctrine): JsonResponse
    {
        $project = $entityManager->getRepository(Project::class)->findOneBy(['id' => $id]);

        if (!$project) {
            return new JsonResponse([
                'message' => "Aucun projet trouvé pour l'id ".$id
            ], 404);
        }

        $steps = [];

        foreach ($project->getStep() as $step) {
            $steps[] = [
                'id' => $step->getId(),
                'name' => $step->getName(),
                'files' => $step->getFiles()
            ];
        }
        
        $data = [
            'id' => $project->getId(),
            'title' => $project->getTitle(),
            'description' => $project->getDescription(),
            'completion' => $project->getCompletion(),
            'users' => $project->getUsers($entityManager, $doctrine),
            'steps' => $steps,
            'currentStep' => $project->getCurrentStep(),
        ];

        return new JsonResponse([
            'project' => $data,
        ]);
    }
}