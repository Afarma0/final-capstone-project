import { User } from './user';

export class Request {
  id: number;
  user: User;
  requestNumber: string;
  description: string;
  justification: string;
  dateNeeded: string;
  deliveryMode: string;
  status: string;
  total: number;
  submittedDate: string;
  reasonForRejection: string;

  constructor() {
    this.id = 0;
    this.user = new User();
    this.requestNumber = '';
    this.description = '';
    this.justification = '';
    this.dateNeeded = '';
    this.deliveryMode = '';
    this.status = '';
    this.total = 0;
    this.submittedDate = '';
    this.reasonForRejection = '';
  }
}