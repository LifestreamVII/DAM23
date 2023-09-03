<?php

namespace App\Entity;
enum TaskStatus: string
{
    case Pending = "EN ATTENTE";
    case Started = "EN COURS";
    case Completed = "TERMINÉE";
}

?>