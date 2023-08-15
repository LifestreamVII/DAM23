<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ProjectController extends AbstractController
{
    #[Route('/project', name: 'app_project')]
    public function index(): Response
    {
        return $this->render('project/index.html.twig', [
            'controller_name' => 'ProjectController',
        ]);
    }

    #[Route('/projects/new', name: 'app_projects_new')]
    public function new(Request $request,  $entityManager): JsonResponse
    {
        $body = json_decode($request->getContent());
        $title = $body->title;
        $description = $body->description;

        if (empty($title) || empty($description)) {
            return new JsonResponse([
                'message' => 'Veuillez remplir tout les champs'
            ], 400);
        }

        $completion = "en cours";
        $user = 'todo';

        $entityManager = $this->getDoctrine()->getManager();        

        return new JsonResponse([
            'message' => 'Projet créé avec succès !'
        ]);
    }
}
