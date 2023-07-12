<?php
namespace App\Entity;

enum AssetStatus: string
{
    case NotStarted = "NOT_STARTED";
    case InProgress = "IN_PROGRESS";
    case Completed = "COMPLETED";
    case Retired = "RETIRED";
}

?>