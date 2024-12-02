interface NotificationEvent {
    id: string;
    type: string;
    deckId: string;
    message: string;
    timestamp: string;
    userId: string;
    source: string;
    priority: string;
    status: string;
    metadata: { [key: string]: string };
  }