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
};

export const children: Child[] = [
  { id: "lea", name: "Léa", cycle: "CYCLE_0", room: "Sunflower Room", avatar: lea, status: "Present", mood: "Happy & Playful" },
  { id: "noah", name: "Noah", cycle: "CYCLE_1", room: "Butterfly Class", avatar: noah, status: "Present", mood: "Curious" },
];

export const todayTimeline = [
  { id: 1, time: "10:30 AM", tag: "ART TIME", icon: "palette", title: "Finger Painting Fun!", body: "Léa enjoyed finger painting today. She mixed colors to create a bright sunshine.", image: painting },
  { id: 2, time: "12:30 PM", tag: "LUNCH", icon: "utensils", title: "Ate all of her vegetables!", body: "Léa really enjoyed the roasted carrots today.", image: null },
  { id: 3, time: "2:00 PM", tag: "IMPORTANT", icon: "alert", title: "Please pack extra wipes tomorrow.", body: "We have a scheduled messy play activity.", important: true, image: null },
];

export const gallery = [
  { id: 1, src: painting, child: "Léa", tag: "Art" },
  { id: 2, src: outdoor, child: "Noah", tag: "Outdoor" },
  { id: 3, src: story, children: ["Léa", "Noah"], tag: "Story Time" },
  { id: 4, src: blocks, child: "Noah", tag: "Building" },
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

export const calendar = [
  { date: "Apr 23", title: "Spring Picnic", tag: "Event", color: "primary" },
  { date: "Apr 25", title: "Parent-Teacher Conference", tag: "Meeting", color: "secondary" },
  { date: "Apr 30", title: "April Tuition Due", tag: "Payment", color: "warning" },
  { date: "May 02", title: "Vaccination Form Deadline", tag: "Health", color: "destructive" },
  { date: "May 10", title: "Mother's Day Workshop", tag: "Workshop", color: "primary" },
];

export const milestones = {
  child: children[0],
  period: "Q1 2025 Progress Report",
  overall: 94,
  headline: "Spring Growth & Discovery.",
  intro: "Léa has shown remarkable curiosity this quarter. Her transition to more independent tasks demonstrates a growing confidence in both her physical surroundings and linguistic expression.",
  domains: [
    {
      n: "01", icon: "footprints", name: "Motor Development",
      items: [
        { title: "Walks independently", body: "Core mobility milestones", status: "Achieved" as const },
        { title: "Throws ball", body: "Hand-eye coordination", status: "Emerging" as const },
      ],
    },
    {
      n: "02", icon: "message-circle", name: "Language Development",
      items: [
        { title: "Points to pictures", body: "Receptive language skills", status: "Achieved" as const },
        { title: "Says 10+ words", body: "Expressive vocabulary", status: "Developing" as const },
      ],
    },
    {
      n: "03", icon: "users", name: "Social & Emotional",
      items: [
        { title: "Plays alongside peers", body: "Parallel play stage", status: "Achieved" as const },
        { title: "Names emotions", body: "Self-regulation foundations", status: "Developing" as const },
      ],
    },
  ],
  reflection: "\"Léa is a joy to have in the classroom. This quarter, her social interactions have blossomed; she is often seen encouraging her peers during group play. Her motor skills are advancing ahead of schedule, particularly her balance and confidence in navigating new obstacles.\"",
  teacher: { name: "Mme Johnson", role: "Lead Caregiver & Educator", avatar: marie },
};

export const billing = {
  invoice: 320,
  due: "April 30",
  breakdown: [
    {
      child: "Noah", program: "Pre-K Program", avatar: noah,
      lines: [{ label: "Base Tuition", amount: 250 }, { label: "Meals (April)", amount: 40 }],
      subtotal: 290,
    },
    {
      child: "Léa", program: "Nursery Care", avatar: lea,
      lines: [{ label: "Art Supplies", amount: 15 }, { label: "Workshop Fee", amount: 15 }],
      subtotal: 30,
    },
  ],
  history: [
    { label: "March Tuition", date: "Paid Mar 2, 2025", amount: 305 },
    { label: "Spring Field Trip Fee", date: "Paid Feb 15, 2025", amount: 25 },
    { label: "February Tuition", date: "Paid Feb 1, 2025", amount: 280 },
  ],
};

export type NotifKind = "report" | "message" | "event" | "schedule" | "payment";
export const notifications = [
  { id: 1, kind: "report" as NotifKind, group: "Today", time: "17:00", title: "Daily report ready", body: "Léa's daily report is available. She had a wonderful afternoon!", actor: marie, action: "View report", unread: true },
  { id: 2, kind: "message" as NotifKind, group: "Today", time: "11:00", title: "New message", body: "Mme Johnson: \"Please bring spare clothes for Léa tomorrow, thank you!\"", actor: marie, action: "Reply", accent: "secondary" as const, unread: true },
  { id: 3, kind: "event" as NotifKind, group: "Yesterday", time: "14:30", title: "Parent-Teacher meeting", body: "Mid-semester meeting is on Thursday April 15 at 6 PM. Please confirm.", rsvp: true },
  { id: 4, kind: "schedule" as NotifKind, group: "Yesterday", time: "09:00", title: "Weekly programme published", body: "Next week's activities are live. Theme: Colours of Autumn." },
  { id: 5, kind: "payment" as NotifKind, group: "This week", time: "Mon", title: "April invoice issued", body: "Your April tuition of €320 is due in 5 days." },
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
