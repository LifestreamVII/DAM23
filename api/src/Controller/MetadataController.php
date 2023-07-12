<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MetadataController extends AbstractController
{
    #[Route('/metadata', name: 'app_metadata')]
    public function index(): Response
    {
        return $this->render('metadata/index.html.twig', [
            'controller_name' => 'MetadataController',
        ]);
    }
}
