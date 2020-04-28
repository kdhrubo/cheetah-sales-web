

export class Task {
  id: string;
  subject: string;
  dueDate: Date;
  assignedTo: string;
  estimatedTimeInHr: number;
  actualTimeInHr: number;
  statusId: string;
  priorityId: string;
  typeId: string;


  description: string;

  relatedEntity: string;
  relatedEntityId: string;
}
