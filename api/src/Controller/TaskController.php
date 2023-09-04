<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Task;
use App\Entity\User;
use DateTimeImmutable;
use App\Entity\TaskStatus;
use App\Entity\Project;

class TaskController extends AbstractController
{

    #[Route('/tasks', name: 'app_tasks')]
    public function tasks(EntityManagerInterface $entityManager): JsonResponse
    {
        $tasks = $entityManager->getRepository(Task::class)->findAll();

        $data = [];

        foreach ($tasks as $task) {

            $data[] = [
                'id' => $task->getId(),
                'title' => $task->getTitle(),
                'description' => $task->getDescription(),
                'status' => $task->getStatus(),
                'date' => $task->getCreatedAt(),
            ];
        }

        return new JsonResponse([
            'tasks' => $data
        ]);
    }

    #[Route('/task/new', name: 'app_task_new')]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $body = json_decode($request->getContent(), true);
        $title = $body['title'];
        $description = $body['description'];
        $projectId = $body['projectId'];
        $taskReceiverId = $body['taskReceiverId'];
        $taskStatus = TaskStatus::Pending;

        if (!$description || !$projectId || !$title || !$taskReceiverId) {
            return new JsonResponse([
                'message' => 'Veuillez remplir tout les champs'
            ], 400);
        }

        // TODO get user from token
        $user = $entityManager->getRepository(User::class)->findOneBy(['mail' => 'user2@example.com']);
        $taskReceiver = $entityManager->getRepository(User::class)->findOneBy(['id' => $taskReceiverId]);
        $project = $entityManager->getRepository(Project::class)->findOneBy(['id' => $projectId]);

        $task = new Task();
        $task->setTitle($title);
        $task->setDescription($description);
        $task->setCreatedAt(new DateTimeImmutable('now'));
        $task->setProject($project);
        $task->setTaskSender($user);
        $task->setTaskReceiver($taskReceiver);
        $task->setStatus($taskStatus);

        $entityManager->persist($task);
        $entityManager->flush();
        
        return new JsonResponse([
            'message' => 'Tâche créée avec succès',
        ]);
    }
    
    #[Route('/task/{id}', name: 'app_task')]
    public function task($id, EntityManagerInterface $entityManager): JsonResponse
    {
        $task = $entityManager->getRepository(Task::class)->findOneBy(['id' => $id]);
        $receiver = $task->getTaskReceiver();

        if ($receiver) {
            $receiver = $receiver->getUsername();
        }

        if (!$task) {
            return new JsonResponse([
                'message' => 'Tâche introuvable'
            ], 404);
        }

        $data = [
            'id' => $task->getId(),
            'title' => $task->getTitle(),
            'description' => $task->getDescription(),
            'status' => $task->getStatus(),
            'date' => $task->getCreatedAt(),
            'receiver' => $receiver,
            'sender' => $task->getTaskSender()->getUsername(),
            'project' => $task->getProject()->getTitle(),
        ];

        return new JsonResponse([
            'task' => $data
        ]);
    }

}
