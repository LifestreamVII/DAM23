<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Video;

class AssetController extends AbstractController
{
    #[Route('/asset', name: 'app_asset')]
    public function index(): Response
    {
        return $this->render('asset/index.html.twig', [
            'controller_name' => 'AssetController',
        ]);
    }
    #[Route('/asset/add', name: 'app_asset_add')]
    public function addVideo(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['url'])) {
            return new JsonResponse(['message' => 'L\'URL de la vidéo est manquante.'], 400);
        }

        $video = new Video();
        
        $video->setUrl($data['url']);

        $entityManager->persist($video);
        $entityManager->flush(); 

        return new JsonResponse(['message' => 'La vidéo a été ajoutée avec succès.']);
    }
}

