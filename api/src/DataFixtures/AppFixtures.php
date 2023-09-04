<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        for ($i = 1; $i <= 10; $i++) {
            $user = new User();
            $username = 'user'.$i;
            $email = 'user'.$i.'@example.com';

            $user->setUsername($username);
            $user->setMail($email);
            $user->setPassword('password');

            $manager->persist($user);
        }
        $manager->flush();
    }    
}