<?php
namespace App\Security;

use Zend\Ldap\Ldap;
use Zend\Ldap\Exception\LdapException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;

/**
 * CaixaLdap
 *
 */
class CaixaLoginLdap
{
    protected $host;

    protected $port;

    public function __construct($host, $port)
    {
        if (! filter_var($host, FILTER_VALIDATE_IP)) {
            $msg = "Servidor inválido $host:$port";
            throw new CustomUserMessageAuthenticationException($msg);
        }

        $this->host = $host;
        $this->port = (int) $port;

        return $this;
    }

    public function login($matricula, $senha)
    {
        $options = array(
            'host'           => $this->host,
            'port'           => $this->port,
            'username'       => $this->buildUsernameLdap($matricula),
            'password'       => $senha,
            'bindRequiresDn' => false,
            'networkTimeout' => 2,
        );

        $ldap = new Ldap($options);

        try {
            $ldap->bind();
            return true;
        } catch (LdapException $zle) {
            echo '  ' . $zle->getMessage() . "\n";
            throw new CustomUserMessageAuthenticationException($zle->getMessage());
        }

        return false;
    }

    private function connectAndBindLdap($hostname, $usuario, $senha)
    {
        $ldap_handle = ldap_connect($hostname);

        if (!$ldap_handle) {
            return false;
        }

        ldap_set_option($ldap_handle, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($ldap_handle, LDAP_OPT_REFERRALS, 0);

        $ldap_bind = @ldap_bind($ldap_handle, 'uid='.$usuario.',ou=People,o=caixa', $senha);

        if ($ldap_bind) {
            return true;
        }

        return false;
    }

    public function login3($usuario, $senha)
    {
        $hostname = 'ldap://10.222.158.50:489';

        if ($this->connectAndBindLdap($hostname, $usuario, $senha)) {
            return true;
        }

        $hostname = 'ldap://10.224.4.121:389';

        if ($this->connectAndBindLdap($hostname, $usuario, $senha)) {
            return true;
        }

        $hostname = 'ldap://10.196.8.182:389';

        if ($this->connectAndBindLdap($hostname, $usuario, $senha)) {
            return true;
        }

        return false;
    }

    private function buildUsernameLdap($matricula)
    {
        return 'uid='.$matricula.',ou=People,o=caixa';
    }
}
