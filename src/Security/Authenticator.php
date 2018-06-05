<?php
namespace App\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use App\Security\CaixaLoginLdap;
use Symfony\Component\Security\Core\Authentication\SimpleAuthenticatorInterface;
use Symfony\Component\Security\Http\Authentication\SimpleFormAuthenticatorInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use App\Entity\User;

class Authenticator implements SimpleFormAuthenticatorInterface
{
    private $encoderFactory;

    public function __construct(EncoderFactoryInterface $encoderFactory, $hostLdap, $portLdap = 489, $urlApiUser)
    {
        $this->encoderFactory = $encoderFactory;
        $this->hostLdap = $hostLdap;
        $this->portLdap = (int) $portLdap;
        $this->urlApiUser = $urlApiUser;
    }

    public function authenticateToken(
        TokenInterface $token,
        UserProviderInterface $userProvider,
        $providerKey
    ) {
        try {
            $user = $userProvider->loadUserByUsername($token->getUsername());
        } catch (UsernameNotFoundException $e) {
            throw new CustomUserMessageAuthenticationException('Usuário não encontrado');
        }

        $encoder = $this->encoderFactory->getEncoder($user);

        $matricula = $user->getUsername();
        $senha = $token->getCredentials();

        $caixaLdap = new CaixaLoginLdap($this->hostLdap, $this->portLdap);
        $passwordValid = $caixaLdap->login($matricula, $senha);

        if (! $passwordValid) {
            throw new CustomUserMessageAuthenticationException('Senha inválida');
        }

        # pega dados do usuário
        $user = $this->getDadosUsuario($user);

        return new UsernamePasswordToken(
            $user,
            $user->getPassword(),
            $providerKey,
            $user->getRoles()
        );
    }

    private function getDadosUsuario(User $user)
    {
        # password ok, então pega os dados do usuário da API LDAP
        $client = new \GuzzleHttp\Client([
            'headers' => [
                'Content-Type' => 'application/json',
                'User-Agent' => 'Mozilla/4.0'
            ]
        ]);
        
        $url = $this->urlApiUser . $user->getUsername();
        $res = $client->request('GET', $url);
        echo $res->getStatusCode();
        // 200
        echo $res->getHeaderLine('content-type');
        // 'application/json; charset=utf8'
        echo $res->getBody();
        $userData = json_decode($res->getBody(), true);

        if ($userData == null) {
            throw new CustomUserMessageAuthenticationException(error_get_last()["message"]);
        }

        $user->setFullName($userData["nome"]);
        return $user;
    }

    public function supportsToken(TokenInterface $token, $providerKey)
    {
        return $token instanceof UsernamePasswordToken
            && $token->getProviderKey() === $providerKey;
    }

    public function createToken(Request $request, $username, $password, $providerKey)
    {
        return new UsernamePasswordToken($username, $password, $providerKey);
    }
}
