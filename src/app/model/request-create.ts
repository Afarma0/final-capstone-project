export class RequestCreate {
    userId: number;
    description: string;
    justification: string;
    dateNeeded: string;
    deliveryMode: string;
  
    constructor() {
      this.userId = 0;
      this.description = '';
      this.justification = '';
      this.dateNeeded = '';
      this.deliveryMode = '';
    }
  }
  