import viewingHealthData from "./assets/app-market/viewingHealth-data.png";
import apiData from "./assets/app-market/api-data.png";

import sleepwellIcon from "./assets/app-market/sleepwell-icon.png";
import sleepwellBanner from "./assets/app-market/sleepwell-banner.png";
import sleepwellScreenshot1 from "./assets/app-market/sleepwell-ss-1.png";
import sleepwellScreenshot2 from "./assets/app-market/sleepwell-ss-2.png";
import sleepwellScreenshot3 from "./assets/app-market/sleepwell-ss-3.png";

import weatherlyIcon from "./assets/app-market/weatherly-icon.png";
import weatherlyBanner from "./assets/app-market/weatherly-banner.png";
import weatherlyScreenshot1 from "./assets/app-market/weatherly-ss-1.png";
import weatherlyScreenshot2 from "./assets/app-market/weatherly-ss-2.png";
import weatherlyScreenshot3 from "./assets/app-market/weatherly-ss-3.png";

import dryrunIcon from "./assets/app-market/dryrun-icon.png";
import dryrunBanner from "./assets/app-market/dryrun-banner.png";
import dryrunScreenshot1 from "./assets/app-market/dryrun-ss-1.png";
import dryrunScreenshot2 from "./assets/app-market/dryrun-ss-2.png";
import dryrunScreenshot3 from "./assets/app-market/dryrun-ss-3.png";

import holistichealthIcon from "./assets/app-market/holistichealth-icon.png";
import holistichealthBanner from "./assets/app-market/holistichealth-banner.png";
import holistichealthScreenshot1 from "./assets/app-market/holistichealth-ss-1.png";
import holistichealthScreenshot2 from "./assets/app-market/holistichealth-ss-2.png";
import holistichealthScreenshot3 from "./assets/app-market/holistichealth-ss-3.png";

import clockIcon from "./assets/app-market/clock-icon.png";
import clockBanner from "./assets/app-market/clock-banner.png";
import clockScreenshot1 from "./assets/app-market/clock-ss-1.png";
import clockScreenshot2 from "./assets/app-market/clock-ss-2.png";
import clockScreenshot3 from "./assets/app-market/clock-ss-3.png";

export const widgetsManifest = [
  {
    title: "Sleepwell",
    name: "sleepwellWidget",
    publisher: "Prifina Inc",
    icon: sleepwellIcon,
    bannerImage: sleepwellBanner,
    settings: [{ field: "city", value: "New York" }],
    description: "Weather widget description",
    shortDescription:
      "What makes a good nights sleep? What movie gives you the best ZZZs? This Sleep Quality widget compares your daily streaming activities and their impact on your sleep.",
    longDescription:
      "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath of that universal love which bears and sustains us, as it floats around us in an eternity of bliss; and then, my friend, when darkness overspreads my eyes, and heaven and earth seem to dwell in my soul and absorb its power, like the form of a",
    dataType: "User-held data",
    category: "Health",
    deviceSupport: "Desktop browser",
    languages: "ENG",
    age: "10+ suitable",
    screenshots: [
      sleepwellScreenshot1,
      sleepwellScreenshot2,
      sleepwellScreenshot3,
    ],
    keyFeatures: [
      "A wonderful serenity has taken possession of my entire soul.",
      "Like these sweet mornings of spring which I enjoy with my whole heart.",
      "I am alone, and feel the charm of existence in this spot. ",
    ],
    userHeld: ["Total deep sleep", "Session time", "Session duration"],
    userGenerated: [],
    public: [],
    dataConnectionsImage: viewingHealthData,
  },
  {
    title: "Weatherly",
    name: "weatherlyWidget",
    publisher: "Prifina Inc",
    icon: weatherlyIcon,
    bannerImage: weatherlyBanner,
    settings: [{ field: "city", value: "New York" }],
    description: "Weather widget description",
    shortDescription:
      "Heads up widget for showing you the weather in relevant locations to you.",
    longDescription:
      "This simple widget gives you insight into the weather in different locations you choose. You can access it in your account from where ever you access the internet.",
    dataType: "User-held data",
    category: "Weather",
    deviceSupport: "Desktop browser",
    languages: "ENG",
    age: "3+",
    screenshots: [
      weatherlyScreenshot1,
      weatherlyScreenshot2,
      weatherlyScreenshot3,
    ],
    keyFeatures: ["Public data display"],
    userHeld: [],
    userGenerated: ["Location settings"],
    public: ["Weather data"],
    dataConnectionsImage: apiData,
  },
  {
    title: "Dry Run",
    name: "dryrunWidget",
    publisher: "Prifina Inc",
    icon: dryrunIcon,
    bannerImage: dryrunBanner,
    settings: [{ field: "city", value: "New York" }],
    description: "Weather widget description",
    shortDescription:
      "Tired of running in bad weather? With Dry Run, utilize your activity data and you get a heads up when your typical time for a run collides with a sleet or a tropical storm.",
    longDescription:
      "Dry Run wants to keep you dry while you exercise. By utilizing your activity habits and open weather data, Dry Run looks out for you and lets you know when it might make sense to deviate from your normal routines. Planned updates for Dry Run include utilizing other weather data types, such as allergens, air quality or pollen.",
    dataType: "User-held data",
    category: "Health & Fitness",
    deviceSupport: "Desktop browser",
    languages: "ENG",
    age: "12+",
    screenshots: [dryrunScreenshot1, dryrunScreenshot2, dryrunScreenshot3],
    keyFeatures: ["Personalized activity scheduling suggestions"],
    userHeld: ["Session time", "Session duration"],
    userGenerated: ["Location input"],
    public: ["Weather data"],
    dataConnectionsImage: viewingHealthData,
  },
  {
    title: "Holistic Health",
    name: "holistichealthWidget",
    publisher: "Prifina Inc",
    icon: holistichealthIcon,
    bannerImage: holistichealthBanner,
    settings: [{ field: "city", value: "New York" }],
    description: "Weather widget description",
    shortDescription:
      "Track your activity from your wearables in one place, see what targets you have hit and view a snapshot of your daily goals.",
    longDescription:
      "With Holistic Health, you can track your activity from all your wearables in one place, see what targets you have hit and view a snapshot of your daily goals.Utilizing your activity data (active minutes, steps, calories etc) from your wearable devices, you can quickly for an idea of your progress toward your goals and keep yourself accountable.",
    dataType: "User-held data",
    category: "Health",
    deviceSupport: "Desktop browser",
    languages: "ENG",
    age: "12+",
    screenshots: [
      holistichealthScreenshot1,
      holistichealthScreenshot2,
      holistichealthScreenshot3,
    ],
    keyFeatures: [
      "Snapshot of Activity Progress",
      "Local data - use your data without external sharing",
    ],
    userHeld: ["Calories burnt", "Total deep sleep", "Steps taken"],
    userGenerated: ["Goals"],
    public: [],
    dataConnectionsImage: viewingHealthData,
  },
  {
    title: "Clock",
    name: "clockWidget",
    publisher: "Prifina Inc",
    icon: clockIcon,
    bannerImage: clockBanner,
    settings: [{ field: "city", value: "New York" }],
    description: "Weather widget description",
    shortDescription: "Compare the time for four separate locations.",
    longDescription:
      "Set important timezones for you to follow or simply keep track of the time next to other widgets you use. This simple clock widget exists in your Prifina account and is accessible from where ever you use the Internet. ",
    dataType: "Public",
    category: "Productivity",
    deviceSupport: "Desktop browser",
    languages: "ENG",
    age: "3+",
    screenshots: [clockScreenshot1, clockScreenshot2, clockScreenshot3],
    keyFeatures: ["Time display", "Multiple timezones"],
    userHeld: ["Session time ", "Session duration"],
    userGenerated: ["Location input"],
    public: ["Weather data"],
    dataConnectionsImage: apiData,
  },
];
