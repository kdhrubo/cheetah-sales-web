import { PickList } from './picklist.model';

export class Activity {
  id: string;
  subject: string;
  lastName: string;

  assignedTo: string;

  startDate: Date;

  endDate: Date;

  activityType: PickList;

  location: string;
  status: PickList;

  priority: PickList;

  sendNotification: boolean;

  description: string;

  // List<Reminder> reminders;

  relatedEntity: string;
  relatedEntityId: string;
}
