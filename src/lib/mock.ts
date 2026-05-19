import lea from "@/assets/child-lea.jpg";
import noah from "@/assets/child-noah.jpg";
import marie from "@/assets/teacher-marie.jpg";
import painting from "@/assets/gallery-painting.jpg";
import blocks from "@/assets/gallery-blocks.jpg";
import outdoor from "@/assets/gallery-outdoor.jpg";
import story from "@/assets/gallery-story.jpg";
import risotto from "@/assets/meal-risotto.jpg";
import sophie from "@/assets/contact-sophie.jpg";
import mohamed from "@/assets/contact-mohamed.jpg";
import drawingLeo from "@/assets/drawing-leo.jpg";

export const assets = { lea, noah, marie, painting, blocks, outdoor, story, risotto, sophie, mohamed, drawingLeo };

export const parent = { name: "Marie", avatar: marie };

export type Child = {
  id: string;
  name: string;
  cycle: "CYCLE_0" | "CYCLE_1";
  room: string;
  avatar: string;
  status: "Present" | "Absent" | "Picked up";
  mood: string;
  arrivedAt: string;
  age: string;
  teacher: string;
};

export const children: Child[] = [
  { id: "lea", name: "Léa", cycle: "CYCLE_0", room: "Sunflower Room", avatar: lea, status: "Present", mood: "Happy & Playful", arrivedAt: "08:15", age: "2y 4m", teacher: "Mme Johnson" },
  { id: "noah", name: "Noah", cycle: "CYCLE_1", room: "Buttercup Class", avatar: noah, status: "Present", mood: "Curious", arrivedAt: "08:22", age: "4y 1m", teacher: "M. Diallo" },
];

export const todayHighlights = [
  { id: 1, child: "lea", icon: "utensils", text: "Lunch: Ate well", to: "/children" },
  { id: 2, child: "lea", icon: "image", text: "2 new photos", to: "/updates" },
  { id: 3, child: "noah", icon: "file-text", text: "Daily report ready", to: "/children" },
  { id: 4, child: "noah", icon: "thermometer", text: "Temp: 37.2° (normal)", to: "/children" },
];

export const activityFeed = [
  { id: 1, child: "lea", icon: "image", title: "New photo shared", time: "2 min ago", to: "/updates" },
  { id: 2, child: "noah", icon: "file-text", title: "Daily report ready", time: "20 min ago", to: "/children" },
  { id: 3, child: "lea", icon: "utensils", title: "Lunch: ate well", time: "1h ago", to: "/children" },
  { id: 4, child: null, icon: "calendar", title: "Spring Festival · April 20", time: "2h ago", to: "/calendar" },
  { id: 5, child: null, icon: "message", title: 'Mme Johnson: "Great day!"', time: "3h ago", to: "/messages" },
  { id: 6, child: null, icon: "receipt", title: "April invoice due in 3 days", time: "6h ago", to: "/account/payments" },
];

export const bus = { enabled: true, route: "Bus A", child: "Noah", status: "Boarded", stop: "Cocody Centre", eta: "08:35" };

export const todayTimeline = [
  { id: 1, time: "10:30 AM", tag: "ART TIME", icon: "palette", title: "Finger Painting Fun!", body: "Léa enjoyed finger painting today. She mixed colors to create a bright sunshine.", image: painting },
  { id: 2, time: "12:30 PM", tag: "LUNCH", icon: "utensils", title: "Ate all of her vegetables!", body: "Léa really enjoyed the roasted carrots today.", image: null },
  { id: 3, time: "2:00 PM", tag: "IMPORTANT", icon: "alert", title: "Please pack extra wipes tomorrow.", body: "We have a scheduled messy play activity.", important: true, image: null },
];

// Per-child daily reports (today)
export type VoiceNote = {
  url: string;
  duration: string;
  transcript: string;
  language: string;
};

export type DailyReport = {
  childId: string;
  date: string;
  sentAt: string;
  by: string;
  meals: { label: string; level: 0 | 1 | 2 | 3 | 4; note?: string }[];
  nap: { start: string; end: string; duration: string; quality: string };
  diapers?: { count: number; lastAt: string };
  health: { temperature: string; status: "Normal" | "Watch" | "Fever" };
  mood: { morning: string; afternoon: string };
  activities: string[];
  note: string;
  voiceNote?: VoiceNote;
};

export const dailyReports: Record<string, DailyReport> = {
  lea: {
    childId: "lea",
    date: "April 15",
    sentAt: "17:00",
    by: "Mme Johnson",
    meals: [
      { label: "Breakfast", level: 4 },
      { label: "Lunch", level: 4, note: "Loved roasted carrots" },
      { label: "Snack", level: 2, note: "Ate a little" },
    ],
    nap: { start: "12:30", end: "14:15", duration: "1h 45min", quality: "Good" },
    diapers: { count: 3, lastAt: "14:00" },
    health: { temperature: "37.2°C", status: "Normal" },
    mood: { morning: "😄 Happy", afternoon: "🙂 Good" },
    activities: ["Painting", "Story time", "Outdoor play"],
    note: "Léa was very enthusiastic during painting today. She made a drawing she'll bring home.",
  },
  noah: {
    childId: "noah",
    date: "April 15",
    sentAt: "17:05",
    by: "M. Diallo",
    meals: [
      { label: "Breakfast", level: 3 },
      { label: "Lunch", level: 4 },
      { label: "Snack", level: 4 },
    ],
    nap: { start: "13:00", end: "14:00", duration: "1h", quality: "Calm rest" },
    health: { temperature: "37.2°C", status: "Normal" },
    mood: { morning: "🙂 Good", afternoon: "😄 Happy" },
    activities: ["Block building", "Reading", "Garden exploration"],
    note: "Léa was very enthusiastic during painting today. She made a drawing she'll bring home.",
    voiceNote: {
      url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_3134f5f56b.mp3",
      duration: "0:42",
      language: "FR → EN",
      transcript:
        "Bonjour, c'est Mme Johnson. Léa a passé une superbe journée — très concentrée pendant l'atelier peinture. Elle a bien mangé à midi, surtout les carottes rôties. Sieste calme d'environ 1h45. Elle vous ramène un dessin ce soir. À demain !",
    },
  },
  noah: {
    childId: "noah",
    date: "April 15",
    sentAt: "17:05",
    by: "M. Diallo",
    meals: [
      { label: "Breakfast", level: 3 },
      { label: "Lunch", level: 4 },
      { label: "Snack", level: 4 },
    ],
    nap: { start: "13:00", end: "14:00", duration: "1h", quality: "Calm rest" },
    health: { temperature: "37.2°C", status: "Normal" },
    mood: { morning: "🙂 Good", afternoon: "😄 Happy" },
    activities: ["Block building", "Reading", "Garden exploration"],
    note: "Noah led a small group during construction time. Very proud of his tower!",
  },
};

export const pastReports = [
  { id: "r-apr14", childId: "lea", date: "Mon Apr 14", title: "Daily report", summary: "Ate well · Nap 1h 30m · 😄", by: "Mme Johnson" },
  { id: "r-apr11", childId: "lea", date: "Fri Apr 11", title: "Daily report", summary: "Ate a little · Nap 2h · 🙂", by: "Mme Johnson" },
  { id: "r-apr10", childId: "lea", date: "Thu Apr 10", title: "Daily report", summary: "Ate well · Nap 1h 50m · 😄", by: "Mme Johnson" },
  { id: "r-apr09", childId: "lea", date: "Wed Apr 9", title: "Daily report", summary: "Refused lunch · Quiet day · 😐", by: "Mme Johnson" },
];

export const healthData: Record<string, { allergies: { name: string; severity: "HIGH" | "MEDIUM" | "LOW" }[]; events: { date: string; type: string; detail: string; level: "ok" | "warn" | "alert" }[]; vaccinations: { name: string; date: string; due?: string }[] }> = {
  lea: {
    allergies: [
      { name: "Peanuts", severity: "HIGH" },
      { name: "Tree nuts", severity: "MEDIUM" },
    ],
    events: [
      { date: "Apr 15", type: "Temperature", detail: "37.2°C — Normal", level: "ok" },
      { date: "Apr 10", type: "Medication", detail: "Zyrtec 5ml — Administered at 14:00", level: "warn" },
      { date: "Apr 8", type: "Health", detail: "No events", level: "ok" },
      { date: "Apr 2", type: "Incident", detail: "Minor knee scrape during outdoor play", level: "alert" },
    ],
    vaccinations: [
      { name: "MMR (Measles, Mumps, Rubella)", date: "Up to date" },
      { name: "DTaP booster", date: "Due", due: "May 12" },
    ],
  },
  noah: {
    allergies: [{ name: "None registered", severity: "LOW" }],
    events: [
      { date: "Apr 15", type: "Temperature", detail: "37.0°C — Normal", level: "ok" },
      { date: "Apr 5", type: "Health", detail: "Mild cough — observation only", level: "warn" },
    ],
    vaccinations: [{ name: "All required vaccines", date: "Up to date" }],
  },
};

export const gallery = [
  { id: 1, src: painting, child: "Léa", tag: "Art", date: "Today" },
  { id: 2, src: outdoor, child: "Noah", tag: "Outdoor", date: "Today" },
  { id: 3, src: story, children: ["Léa", "Noah"], tag: "Story Time", date: "Yesterday" },
  { id: 4, src: blocks, child: "Noah", tag: "Building", date: "Yesterday" },
];

export const meals = [
  { day: "MON", date: "23", title: "Spaghetti Bolognese", body: "Whole wheat pasta with hidden vegetable sauce.", tags: ["Gluten", "Nuts (Léa's Allergy)"], snack: "Fresh Fruit & Yogurt", today: false },
  { day: "TUE", date: "24", title: "Chicken Risotto", body: "With creamed spinach and sweet potatoes.", tags: ["Dairy (Allergy)", "Soy Free"], snack: "Fresh Fruit Medley", today: true },
  { day: "WED", date: "25", title: "Turkey Meatballs", body: "Served with fluffy couscous and roasted zucchini.", tags: ["Gluten", "Egg"], snack: "Oat Clusters", today: false },
  { day: "THU", date: "26", title: "Mild Vegetable Korma", body: "Fragrant basmati rice with cauliflower & peas.", tags: ["Dairy Free", "Vegan Option"], snack: "Mini Cornbread", today: false },
  { day: "FRI", date: "27", title: "Baked Salmon", body: "With herbed quinoa and steamed broccoli.", tags: ["Fish", "Omega-3"], snack: "Apple Slices", today: false },
];

export const messages = [
  { id: 1, from: "Mme Johnson", role: "Lead Educator · Sunflower Room", avatar: marie, preview: "Léa was wonderful during story time today — she even helped pass out books.", time: "2h", unread: true },
  { id: 2, from: "Director — Anna Bell", role: "Digital Sanctuary", avatar: marie, preview: "Reminder: Spring Fair next Friday. RSVP by Wednesday please.", time: "Yesterday", unread: true },
  { id: 3, from: "Nurse Camille", role: "Health & Wellness", avatar: marie, preview: "Vaccination form for Noah is due before April 30.", time: "2d", unread: false },
  { id: 4, from: "Accounting", role: "Billing", avatar: marie, preview: "Your April invoice of €320 is now available.", time: "5d", unread: false },
];

// Calendar events with RSVP support
export type CalEvent = {
  id: string;
  date: string; // "Apr 18"
  day: number;
  title: string;
  tag: string;
  color: "primary" | "secondary" | "warning" | "destructive";
  time?: string;
  location?: string;
  child?: string;
  rsvp?: "needed" | "going" | "declined" | null;
};

export const calendar: CalEvent[] = [
  { id: "e1", date: "Apr 18", day: 18, title: "Parent meeting — Mme Johnson", tag: "Meeting", color: "secondary", time: "14:00", location: "In class · Léa", rsvp: "needed" },
  { id: "e2", date: "Apr 20", day: 20, title: "Spring Festival 🌸", tag: "Event", color: "primary", time: "10:00–12:00", location: "School garden · Both", rsvp: "going" },
  { id: "e3", date: "Apr 23", day: 23, title: "Spring Picnic", tag: "Event", color: "primary", time: "11:00–14:00", location: "Park", rsvp: null },
  { id: "e4", date: "Apr 25", day: 25, title: "Parent-Teacher Conference", tag: "Meeting", color: "secondary", time: "17:30", rsvp: "needed" },
  { id: "e5", date: "Apr 28", day: 28, title: "Monthly menu — May", tag: "Menu", color: "primary" },
  { id: "e6", date: "Apr 30", day: 30, title: "April Tuition Due", tag: "Payment", color: "warning" },
  { id: "e7", date: "May 02", day: 2, title: "Vaccination Form Deadline", tag: "Health", color: "destructive" },
];

export const milestones = {
  child: children[0],
  period: "Q1 2025 Progress Report",
  overall: 94,
  headline: "Spring Growth & Discovery.",
  intro: "Léa has shown remarkable curiosity this quarter. Her transition to more independent tasks demonstrates a growing confidence in both her physical surroundings and linguistic expression.",
  domains: [
    { n: "01", icon: "footprints", name: "Motor Development", items: [
      { title: "Walks independently", body: "Core mobility milestones", status: "Achieved" as const },
      { title: "Throws ball", body: "Hand-eye coordination", status: "Emerging" as const },
    ] },
    { n: "02", icon: "message-circle", name: "Language Development", items: [
      { title: "Points to pictures", body: "Receptive language skills", status: "Achieved" as const },
      { title: "Says 10+ words", body: "Expressive vocabulary", status: "Developing" as const },
    ] },
    { n: "03", icon: "users", name: "Social & Emotional", items: [
      { title: "Plays alongside peers", body: "Parallel play stage", status: "Achieved" as const },
      { title: "Names emotions", body: "Self-regulation foundations", status: "Developing" as const },
    ] },
  ],
  reflection: "\"Léa is a joy to have in the classroom. This quarter, her social interactions have blossomed; she is often seen encouraging her peers during group play. Her motor skills are advancing ahead of schedule, particularly her balance and confidence in navigating new obstacles.\"",
  teacher: { name: "Mme Johnson", role: "Lead Caregiver & Educator", avatar: marie },
};

// Evaluation list per child + detailed evaluation
export const evaluationList = [
  { id: "q1-2025-lea", childId: "lea", period: "Q1 2025", publishedAt: "March 20", status: "published" as const, summary: "In progress on all domains" },
  { id: "q2-2025-lea", childId: "lea", period: "Q2 2025", status: "pending" as const, summary: "Not yet available — director has not published" },
  { id: "q1-2025-noah", childId: "noah", period: "Q1 2025", publishedAt: "March 22", status: "published" as const, summary: "Strong progress in autonomy" },
];

export const evaluationDetail: Record<string, {
  childId: string;
  period: string;
  publishedAt: string;
  validatedBy: string;
  educator: string;
  domains: { name: string; icon: string; skills: { title: string; status: "Achieved" | "Developing" | "Emerging" | "NotYet" }[]; comment: string }[];
  generalComment: string;
}> = {
  "q1-2025-lea": {
    childId: "lea",
    period: "Q1 2025",
    publishedAt: "March 20, 2025",
    validatedBy: "Mme Koné, Director",
    educator: "Mme Johnson, Sunflower Room",
    domains: [
      { name: "Motor Development", icon: "footprints", skills: [
        { title: "Walks independently", status: "Achieved" },
        { title: "Climbs stairs with support", status: "Developing" },
        { title: "Throws ball overhead", status: "Emerging" },
      ], comment: "Great improvement in motor control since last term." },
      { name: "Language Development", icon: "message-circle", skills: [
        { title: "Points to pictures when named", status: "Achieved" },
        { title: "Says 10+ words clearly", status: "Achieved" },
        { title: "Combines 2 words", status: "Developing" },
      ], comment: "Vocabulary expanding rapidly with daily story routines." },
      { name: "Social & Emotional", icon: "users", skills: [
        { title: "Plays alongside peers", status: "Achieved" },
        { title: "Shares toys", status: "Developing" },
        { title: "Names emotions", status: "Emerging" },
      ], comment: "Léa is particularly social and loves group activities." },
    ],
    generalComment: "Léa is making excellent progress across all developmental areas. She's particularly social and loves group activities.",
  },
};

export const billing = {
  invoice: 320,
  due: "April 30",
  breakdown: [
    { child: "Léa", program: "Sunflower Room (Nursery)", avatar: lea,
      lines: [{ label: "Monthly fee", amount: 150 }, { label: "Art workshop", amount: 20 }],
      subtotal: 170 },
    { child: "Noah", program: "Buttercup Class (Preschool)", avatar: noah,
      lines: [{ label: "Monthly fee", amount: 130 }, { label: "Bus A transport", amount: 20 }],
      subtotal: 150 },
  ],
  history: [
    { id: "h1", label: "March invoice", date: "Paid Mar 28, 2025", amount: 290, receipt: true },
    { id: "h2", label: "February invoice", date: "Paid Feb 25, 2025", amount: 290, receipt: true },
    { id: "h3", label: "January late fee", date: "Paid Jan 31, 2025", amount: 15, receipt: true, late: true },
  ],
};

export type NotifKind = "report" | "message" | "event" | "schedule" | "payment" | "health";
export type NotifSection = "myChildren" | "school" | "payments";
export const notifications: Array<{
  id: number;
  kind: NotifKind;
  section: NotifSection;
  group: string;
  time: string;
  title: string;
  body: string;
  actor?: string;
  action?: string;
  accent?: "secondary";
  rsvp?: boolean;
  unread?: boolean;
  child?: string;
}> = [
  { id: 1, kind: "report", section: "myChildren", group: "Today", time: "17:00", title: "Léa — Daily report ready", body: "Léa's daily report is available. She had a wonderful afternoon!", actor: marie, action: "View report", unread: true, child: "Léa" },
  { id: 2, kind: "report", section: "myChildren", group: "Today", time: "17:00", title: "Noah — Daily report ready", body: "Noah's daily report is available — his tower made him very proud.", actor: marie, action: "View report", unread: true, child: "Noah" },
  { id: 3, kind: "health", section: "myChildren", group: "Today", time: "10:15", title: "Léa — Photo shared", body: "2 new photos in the class gallery.", action: "Open gallery", unread: true, child: "Léa" },
  { id: 4, kind: "message", section: "school", group: "Today", time: "11:00", title: "New message", body: "Mme Johnson: \"Please bring spare clothes for Léa tomorrow, thank you!\"", actor: marie, action: "Reply", accent: "secondary", unread: true },
  { id: 5, kind: "event", section: "school", group: "Yesterday", time: "14:30", title: "Parent meeting RSVP", body: "Mid-semester meeting on Thursday April 18 at 14:00. Please confirm.", rsvp: true },
  { id: 6, kind: "schedule", section: "school", group: "Yesterday", time: "09:00", title: "Weekly programme published", body: "Next week's activities are live. Theme: Colours of Spring." },
  { id: 7, kind: "payment", section: "payments", group: "This week", time: "Mon", title: "April invoice issued", body: "Your April tuition of €320 is due in 5 days.", action: "Pay now" },
];

export const authorizedContacts = [
  { id: "sophie", name: "Sophie", relation: "Aunt", avatar: sophie, code: "DS-7421" },
  { id: "mohamed", name: "Mohamed", relation: "Grandfather", avatar: mohamed, code: "DS-3098" },
];

export const conversation = {
  educator: { name: "Mme Johnson", role: "Sunflower Class Lead Educator", avatar: marie, online: true },
  thread: [
    { id: 1, who: "them" as const, time: "02:14 PM", text: "Hello! I wanted to share this beautiful drawing that Leo made during the morning session. He was so focused on the details of the garden today!", image: drawingLeo, fileName: "Leo_Garden.jpg" },
    { id: 2, who: "me" as const, time: "02:30 PM", text: "It looks wonderful! Thank you so much for sharing these moments. He talked about the \"giant sunflowers\" all the way home yesterday." },
  ],
  typing: true,
};

export const absenceReasons = [
  { id: "sick", label: "Sick", icon: "heart-pulse" },
  { id: "family", label: "Family", icon: "users" },
  { id: "vacation", label: "Vacation", icon: "palmtree" },
  { id: "other", label: "Other", icon: "more-horizontal" },
];

export const feedbackQuestions = [
  { id: "01", q: "How satisfied are you with school communication?", type: "choice" as const, options: ["Very Satisfied", "Somewhat Satisfied", "Neutral / Not Sure", "Dissatisfied"] },
  { id: "02", q: "Rate the quality of activities", type: "rating" as const },
  { id: "03", q: "Any suggestions?", type: "text" as const },
];

// Notification preferences (per spec §12.2)
export const notifPrefs = {
  essential: [
    { id: "temp", label: "Temperature alert", on: true, locked: true },
    { id: "incident", label: "Injury / incident report", on: true, locked: true },
    { id: "notpicked", label: "Child not collected alert", on: true, locked: true },
    { id: "urgent", label: "Urgent health events", on: true, locked: true },
  ],
  important: [
    { id: "arrival", label: "Arrival confirmation", on: true },
    { id: "departure", label: "Departure confirmation", on: true },
    { id: "report", label: "Daily report ready", on: true },
    { id: "msg", label: "New message", on: true },
  ],
  informational: [
    { id: "photo", label: "New photo shared", on: true },
    { id: "menu", label: "Menu published", on: false },
    { id: "schedule", label: "Activity schedule published", on: false },
    { id: "events", label: "Event reminders", on: true },
    { id: "invoice", label: "Invoice generated", on: true },
    { id: "overdue", label: "Invoice payment reminder", on: true },
  ],
};
