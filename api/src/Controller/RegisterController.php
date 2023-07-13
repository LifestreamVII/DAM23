<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Firebase\JWT\JWT;

class RegisterController extends AbstractController
{
    #[Route('/login', name: 'app_login')]
    public function show(Request $request,EntityManagerInterface $entityManager, string $appSecret): JsonResponse
    {
        $password = $request->request->get('password');
        $mail = $request->request->get('mail');

        $user = $entityManager->getRepository(User::class)->findOneBy(['mail' => $mail]);

        if (!$user) {
            return $this->json([
                'message' => 'No user found with this mail adress : '.$mail,
            ], Response::HTTP_UNAUTHORIZED);
        }

        if ($user->getPassword() !== $password) {
            return $this->json([
                'message' => 'Wrong password',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $jwt = JWT::encode([
            'username' => $user->getUsername(),
            'id' => $user->getId()
        ],
            $appSecret,
            'HS256');

        return $this->json([
            'message' => 'Welcome '.$user->getUsername().' !',
            'jwt' => $jwt
        ]);

    }
    
    #[Route('/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

    #[Route('/signup', name: 'app_signup')]
    public function createUser(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $hasher): JsonResponse
    {
        $password = $request->request->get('password');
        $mail = $request->request->get('mail');

        $user = new User();
        $user->setPassword($hasher->hashPassword($user, $password))
            ->setMail($mail)
            ->setUsername('username');

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json([
            'message' => 'New user created',
            'password' => $password,
            'mail' => $mail
        ]);
    }
}
