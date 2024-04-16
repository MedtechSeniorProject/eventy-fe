/**User Types */
export type LoginUser = {
  email: string;
  password: string;
};

export type ValidateUser = {
  email: string;
  validationCode?: string;
};

export type user = {
  accessToken: string;
  id: string;
  email: string;
  name: string;
  isSuperAdmin: boolean;
};

/** Events Types */
export type Event = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  description: string;
  address: string;
  eventManager: string;
};

export type EventForm = {
  name: string;
  startTime: string;
  endTime: string;
  latitude: string;
  longitude: string;
  description: string;
};

export type EventUpdateForm = {
  id: string;
  name?: string;
  startTime?: string;
  endTime?: string;
  description?:string;
  latitude?: string;
  longitude?: string;
  address?: string;
  emailTemplate?: string
};

export type EventAttendees = {
  id: string;
  name: string;
  time: string;
  attendees: Attendee[];
};

/**Event Manager Types */
export type EventManager = {
  name: string;
  email: string;
  password: string;
};

export type EventManagerUpdateForm = {
  id: string;
  name: string;
  email: string;
};

/**Attendee Types */
export type Attendee = {
  id: number;
  name: string;
  email: string;
  addedBy: string;
  attended: boolean;
};

export type AttendeeForm = {
  name: string;
  email: string;
};

export type AddAttendees = {
  eventId: string;
  attendees: AttendeeForm[];
};

export type RemoveAttendees = {
  eventId: string;
  attendeeIds: string[];
};

/**Address */
export type Address = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    road: string;
    suburb: string;
    city_district: string;
    city: string;
    state: string;
    "ISO3166-2-lvl4": string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: [string, string, string, string];
};

/** Desk Agent types */
export type DeskAgentForm = {
  username: string,
  password: string,
  eventId: string
}

export type DeskAgentsDisplay= {
  id: string,
  username: string
}

export type Question =  {
  id: string,
  options: string[],
  question: string,
  type: string,
  isRequired: boolean
}

export type QuestionForm = {
  eventId: string,
  questions: Question[]
}

export type response = {
  id: string,
  responses: string[]
}

export type responseForm = {
  eventId: string,
  attendeeId: string,
  responses: response[]
}