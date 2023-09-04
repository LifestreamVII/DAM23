<?php

namespace App\Entity;
enum Step: string
{
    case programmation = "programmation";
    case captation = "captation";
    case postProduction = "post-production";
    case editorial = "editorial";
    case publication = "publication";
}

?>