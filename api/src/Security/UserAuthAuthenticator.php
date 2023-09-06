<?php

namespace App\Security;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;


class UserAuthAuthenticator extends AbstractAuthenticator
{

    private $jwtManager;
    public function __construct(JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
    }


    public function supports(Request $request): ?bool
    {
        // Vérifie si la demande contient un token JWT valide

        return isset(getallheaders()["Authorization"]);    }
        
    public function authenticate(Request $request): Passport
    {
        $jwt = str_replace('Bearer ', "", $request->headers->get('Authorization'));
        try {
            $jwtDecoded = JWT::decode($jwt, new Key( $_ENV['JWT_PASSPHRASE'], "HS256"));
            if (isset($jwtDecoded->exp) && $jwtDecoded->exp >= time()) {

                return new SelfValidatingPassport(new UserBadge($jwtDecoded->mail));
            } else {
                throw new CustomUserMessageAuthenticationException('Le token JWT a expiré.');
            }
        } catch (\Exception $e) {
            throw new AuthenticationException();
        }
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        // TODO: Implement onAuthenticationSuccess() method.
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        // TODO: Implement onAuthenticationFailure() method.
        return new Response('Auth failed');
    }
}
