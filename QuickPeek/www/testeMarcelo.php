<?php
// Inicia o cURL
$ch = curl_init();
// Define a URL original (do formulário de login)
curl_setopt($ch, CURLOPT_URL, 'http://rm.sistemabatista.com.br:8181/Corpore.Net/Login.aspx');
// Habilita o protocolo POST
curl_setopt ($ch, CURLOPT_POST, 1);
// Define os parâmetros que serão enviados (usuário e senha por exemplo)
curl_setopt ($ch, CURLOPT_POSTFIELDS, 'txtUser=00000005&txtPass=123456');
// Imita o comportamento patrão dos navegadores: manipular cookies
curl_setopt ($ch, CURLOPT_COOKIEJAR, 'cookie.txt');
// Define o tipo de transferência (Padrão: 1)
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
// Executa a requisição
$store = curl_exec ($ch);
// Define uma nova URL para ser chamada (após o login)
curl_setopt($ch, CURLOPT_URL, 'http://rm.sistemabatista.com.br:8181/Corpore.Net/Main.aspx?SelectedMenuIDKey=&ShowMode=2');
// Executa a segunda requisição
$content = curl_exec ($ch);
// Encerra o cURL
curl_close ($ch);