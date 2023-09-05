<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\PassportInterface;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Component\Security\Http\Authenticator\Passport\UserPassportInterface;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\CredentialsInterface;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordAuthenticatedToken;
use Symfony\Component\Security\Http\Logout\LogoutSuccessHandlerInterface;
use Symfony\Component\Security\Http\Logout\DefaultLogoutSuccessHandler;

class CustomAuthenticator extends AbstractAuthenticator implements LogoutSuccessHandlerInterface
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function supports(Request $request): ?bool
    {
        return $request->attributes->get('_route') === 'app_login' && $request->isMethod('POST');
    }

    public function authenticate(Request $request): PassportInterface
    {
        $data = json_decode($request->getContent(), true);

        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';

        if (empty($username) || empty($password)) {
            throw new CustomUserMessageAuthenticationException('Missing username or password.');
        }

        return new SelfValidatingPassport(
            new UserPassport($username),
            new PasswordCredentials($password)
        );
    }

    public function onAuthenticationSuccess(Request $request, CredentialsInterface $credentials): ?Response
    {
        // You can customize the behavior after successful authentication here.
        // For example, you can generate a JWT token and return it in the response.
        // You can also redirect the user to a specific route.

        return new JsonResponse(['message' => 'Authentication successful']);
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return new JsonResponse(['message' => $exception->getMessage()], Response::HTTP_UNAUTHORIZED);
    }

    public function onLogoutSuccess(Request $request): ?Response
    {
        return new JsonResponse(['message' => 'Logout successful']);
    }
}
?>