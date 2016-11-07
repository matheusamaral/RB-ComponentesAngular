<?php
require 'iniciar.php';

define('DIR_DOC', '');
define('diretorio',DIR_BASE.'src/entrada');

include Ambiente::dir(DIR_BASE).'vendor/rubeus/generate-project/Doc/index.php';
