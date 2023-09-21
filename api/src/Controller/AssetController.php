<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Asset;

class AssetController extends AbstractController
{
    public function __invoke(Request $request): Asset
    {
		$asset = new Asset();
		$asset->setFile($request->request->get("name"));
		$asset->setAsset($request->request->get("file"));
		return $video;
    }
    /**
    * #[Route('/assets', name='app_assets', methods={"POST","GET"})]
    */
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $assets = $entityManager->getRepository(Asset::class)->findAll();

        $data = [];

        foreach ($assets as $asset) {
            $data[] = [
                'id' => $asset->getId(),
                'filename' => $asset->getFile(),
            ];
        }

        return new JsonResponse([
            'assets' => $data
        ]);
    }
}

