<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\CsrfTokenBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Util\TargetPathTrait;

class UserAuthenticator extends AbstractLoginFormAuthenticator
{
    use TargetPathTrait;

    private $secretKey;
    private UrlGeneratorInterface $urlGenerator;

    public const LOGIN_ROUTE = 'app_login';

    public function __construct($secretKey, UrlGeneratorInterface $urlGenerator)
    {
        $this->secretKey = $secretKey;
        $this->urlGenerator = $urlGenerator;
    }

    public function authenticate(Request $request): Passport
    {
        $token = $request->cookies->get('token');
        if ($token) {
            $tokenValue = $request->cookies->get('token');
            error_log('Token_authenticate Value: ' . $tokenValue);
        }
        try {
            error_log('Token Value: ' . print_r($token, true));
            $jwt = JWT::decode($token, new Key($this->secretKey, 'HS256'));
            error_log('JWT Decoded: ' . print_r($jwt, true));

            if (!isset($jwt->data->username)) {
                throw new CustomUserMessageAuthenticationException('JWT ne contient pas de propriété username');
            }

            return new SelfValidatingPassport(new UserBadge($jwt->data->username));

        } catch (\Exception $exception) {
            error_log('Error during authentication: ' . $exception->getMessage());
            throw new CustomUserMessageAuthenticationException('JWT invalide');
        }

    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        if ($targetPath = $this->getTargetPath($request->getSession(), $firewallName)) {
            return new RedirectResponse($targetPath);
        }

        // For example:
        return new RedirectResponse($this->urlGenerator->generate('app_home'));
        //throw new \Exception('TODO: provide a valid redirect inside '.__FILE__);
    }

    protected function getLoginUrl(Request $request): string
    {
        return $this->urlGenerator->generate(self::LOGIN_ROUTE);
    }
}
