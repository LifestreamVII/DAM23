<?php

namespace App\Entity;
enum TaskStatus: string
{
    case Pending = "PENDING";
    case Accepted = "ACCEPTED";
    case Unassigned = "UNASSIGNED";
    case Started = "STARTED";
    case Completed = "COMPLETED";
}

?>