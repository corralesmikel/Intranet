<?php
// Establecer la conexión LDAP
$ldapServer = 'ldap://localhost';
$ldapPort = 51144; // Puerto por defecto para LDAP
$ldapConnection = ldap_connect($ldapServer, $ldapPort);

// Verificar si la conexión se estableció correctamente
if ($ldapConnection) {
    echo 'Conexión LDAP exitosa.';
} else {
    echo 'Error al establecer la conexión LDAP.';
}

// Autenticar un usuario en el servidor LDAP
$ldapUsername = 'mikel mikel';
$ldapPassword = 'Admin123';

// Intentar autenticar el usuario
$ldapBind = ldap_bind($ldapConnection, $ldapUsername, $ldapPassword);

// Verificar si la autenticación fue exitosa
if ($ldapBind) {
    echo 'Autenticación LDAP exitosa.';
    // header ("Location: index.html");
} else {
    echo 'Error de autenticación LDAP.';
}
?>
