export interface VisaTypeDetail {
  id: string;
  name: string;
  badge: string;
  stayDuration: string;
  validity: string;
  entryType: "Single Entry" | "Multiple Entry";
  governmentFee: number;
  conciergeFee: number;
  processingDaysStandard: number;
  processingDaysExpress: number;
  requirements: string[];
  eligibilityNotes: string;
  recommendedFor: string;
}

export interface ConsularJurisdiction {
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  appointmentWaitDays: number;
  jurisdictionCovers: string;
}

export interface VisaCountry {
  id: string;
  slug: string;
  name: string;
  countryCode: string;
  flag: string;
  continent: string;
  region: string;
  capital: string;
  currency: string;
  localTime: string;
  language: string;
  climate: string;
  heroImage: string;
  gallery: string[];
  description: string;
  visaDifficulty: "Instant eVisa" | "Express Electronic" | "Embassy Required" | "Visa on Arrival";
  approvalRate: number;
  averageProcessingTime: string;
  startingPrice: number;
  featured: boolean;
  popularFor: string[];
  visaTypes: VisaTypeDetail[];
  requiredDocuments: {
    title: string;
    description: string;
    isMandatory: boolean;
    format: string;
  }[];
  consularSteps: {
    step: number;
    title: string;
    description: string;
    duration: string;
  }[];
  jurisdictions: ConsularJurisdiction[];
  interviewTips: {
    question: string;
    advice: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  travelerReviews: {
    author: string;
    passportOrigin: string;
    visaApproved: string;
    processingTimeTaken: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  customsAlert: string;
  healthRequirements: string;
}

export const VISA_COUNTRIES: VisaCountry[] = [
  {
    id: "japan",
    slug: "japan",
    name: "Japan",
    countryCode: "JP",
    flag: "🇯🇵",
    continent: "Asia",
    region: "East Asia",
    capital: "Tokyo",
    currency: "JPY (¥)",
    localTime: "UTC+9 (JST)",
    language: "Japanese",
    climate: "Temperate four distinct seasons",
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=85&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1528164344705-475426879c0d?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80&fit=crop"
    ],
    description: "From serene Zen stone gardens of Kyoto to neon-lit Shibuya crossings, Japan offers an extraordinary blend of ancient Shinto traditions and cutting-edge futurism. Its newly expanded eVisa and Digital Nomad pathways make entry smoother than ever.",
    visaDifficulty: "Instant eVisa",
    approvalRate: 99.4,
    averageProcessingTime: "3–5 Days",
    startingPrice: 35,
    featured: true,
    popularFor: ["Culture & Heritage", "Digital Nomad Hubs", "Culinary Explorations", "Cherry Blossom Season"],
    visaTypes: [
      {
        id: "jp-tourist-evisa",
        name: "Tourist eVisa (Short-Stay)",
        badge: "Most Popular",
        stayDuration: "Up to 90 Days",
        validity: "3 Months Single Entry",
        entryType: "Single Entry",
        governmentFee: 30,
        conciergeFee: 29,
        processingDaysStandard: 5,
        processingDaysExpress: 2,
        requirements: [
          "Passport with at least 6 months validity from entry date",
          "Recent biometric digital photo (white background, 35x45mm)",
          "Confirmed round-trip flight reservation",
          "Hotel accommodations itinerary or host invitation",
          "Bank statement demonstrating minimum $1,500 liquid funds"
        ],
        eligibilityNotes: "Available online for passport holders of 68+ eligible countries including US, UK, Canada, Australia, EU, Singapore, etc.",
        recommendedFor: "Vacationers, cultural tourists, solo backpackers, and transit visitors."
      },
      {
        id: "jp-digital-nomad",
        name: "Digital Nomad Visa (Specified Activities)",
        badge: "Remote Workers",
        stayDuration: "Up to 6 Months",
        validity: "6 Months",
        entryType: "Multiple Entry",
        governmentFee: 65,
        conciergeFee: 85,
        processingDaysStandard: 14,
        processingDaysExpress: 7,
        requirements: [
          "Annual foreign income exceeding ¥10,000,000 (approx. $68,000 USD)",
          "Private international medical insurance covering ¥10,000,000 minimum",
          "Employment contract or freelance client service agreements",
          "Clean criminal background certificate (notarized)",
          "Detailed remote work description and tax registration in home country"
        ],
        eligibilityNotes: "Applies to nationals of 49 countries that hold bilateral tax treaties with Japan.",
        recommendedFor: "Tech specialists, software engineers, consultants, and remote creators living across Tokyo, Kyoto, and Fukuoka."
      },
      {
        id: "jp-business",
        name: "Commercial & Business Visa",
        badge: "Conferences & Meetings",
        stayDuration: "Up to 90 Days",
        validity: "Up to 1 Year Multiple Entry",
        entryType: "Multiple Entry",
        governmentFee: 55,
        conciergeFee: 49,
        processingDaysStandard: 5,
        processingDaysExpress: 2,
        requirements: [
          "Letter of Invitation from registered Japanese corporate partner",
          "Letter of Guarantee (身元保証書) from host entity",
          "Schedule of Stay day-by-day plan",
          "Company registration certificate or trade license",
          "Travel medical insurance policy"
        ],
        eligibilityNotes: "Designed for corporate conferences, board meetings, contract signings, and vendor audits.",
        recommendedFor: "Executive business travelers and conference attendees."
      }
    ],
    requiredDocuments: [
      {
        title: "Valid International Passport",
        description: "Must have at least two blank visa pages and minimum 6 months validity past departure date.",
        isMandatory: true,
        format: "High-resolution color scan of biometric bio-data page (PDF or JPG under 5MB)"
      },
      {
        title: "Biometric Digital Photograph",
        description: "Taken within the last 3 months, neutral expression, plain white background, ears visible, no reflections.",
        isMandatory: true,
        format: "Digital JPEG format, minimum 600x600 pixels"
      },
      {
        title: "Flight Itinerary & Return Ticket",
        description: "Confirmed outbound and return flight booking displaying passenger name and PNR confirmation code.",
        isMandatory: true,
        format: "Airline e-Ticket or travel agent itinerary (PDF)"
      },
      {
        title: "Financial Proof / Bank Statements",
        description: "Last 3 consecutive months bank statements with official bank stamp or electronic verification barcode.",
        isMandatory: true,
        format: "Official bank statements (PDF)"
      },
      {
        title: "Proof of Accommodation",
        description: "Confirmed hotel reservation for each city on itinerary or certified letter of stay from host.",
        isMandatory: true,
        format: "Booking voucher or Letter of Stay (PDF)"
      }
    ],
    consularSteps: [
      {
        step: 1,
        title: "Digital Dossier Submission",
        description: "Complete your online questionnaire and upload clear digital scans of passport, photo, and flight details into our secure vault.",
        duration: "10–15 Minutes"
      },
      {
        step: 2,
        title: "AI & Legal Officer Pre-Screening",
        description: "Our certified consular paralegals verify document resolution, facial biometric alignment, and financial thresholds.",
        duration: "Within 2 Hours"
      },
      {
        step: 3,
        title: "Consular Submission & MOFA Processing",
        description: "Dossier transmitted securely to Japan Ministry of Foreign Affairs (MOFA) electronic consular processing queue.",
        duration: "2–4 Business Days"
      },
      {
        step: 4,
        title: "eVisa Issuance & Apple Wallet Pass",
        description: "Official digital eVisa certificate issued with scannable QR verification code, emailed and added to Apple Wallet.",
        duration: "Instant delivery upon grant"
      }
    ],
    jurisdictions: [
      {
        city: "Tokyo (HQ)",
        country: "Japan",
        address: "2-2-1 Kasumigaseki, Chiyoda-ku, Tokyo 100-8919",
        phone: "+81 (3) 3580-3311",
        email: "japan-consular@foxico.travel",
        appointmentWaitDays: 1,
        jurisdictionCovers: "Nationwide MOFA processing"
      },
      {
        city: "New York",
        country: "United States",
        address: "299 Park Avenue, 18th Floor, New York, NY 10171",
        phone: "+1 (212) 371-8222",
        email: "ny-consular@foxico.travel",
        appointmentWaitDays: 2,
        jurisdictionCovers: "New York, New Jersey, Pennsylvania, Connecticut"
      },
      {
        city: "London",
        country: "United Kingdom",
        address: "101-104 Piccadilly, London W1J 7JT",
        phone: "+44 20 7465 6500",
        email: "london-visa@foxico.travel",
        appointmentWaitDays: 3,
        jurisdictionCovers: "United Kingdom & Crown Dependencies"
      }
    ],
    interviewTips: [
      {
        question: "What is the primary purpose of your travel to Japan?",
        advice: "State your travel purpose clearly as tourism or cultural sightseeing. Mention specific destinations like Tokyo, Kyoto, or Mount Fuji, and confirm you will not engage in local paid employment."
      },
      {
        question: "How will you fund your stay while in Japan?",
        advice: "Reference your attached bank statements. Explain that you have budgeted comfortably for accommodations, transportation, and daily expenses ($150–$250/day)."
      },
      {
        question: "Do you have confirmed flight reservations back to your home country?",
        advice: "Provide your return flight PNR and emphasize your strong personal, professional, and family ties in your home country."
      }
    ],
    faqs: [
      {
        question: "Can I enter Japan without a printed physical sticker?",
        answer: "Yes! The Japan eVisa is entirely electronic. You simply display the verified digital pass from your smartphone at airline check-in and Japanese immigration e-Gates."
      },
      {
        question: "What happens if my travel dates change slightly?",
        answer: "Your Japan Tourist eVisa remains valid for entry anytime within 3 months from the date of issue. Your 90-day stay begins on the day you land."
      },
      {
        question: "Can I extend my stay once inside Japan?",
        answer: "Standard tourist eVisas are generally non-extendable except in verifiable emergencies. Digital Nomad visas may be renewed subject to ongoing foreign income criteria."
      }
    ],
    travelerReviews: [
      {
        author: "Sarah Jenkins",
        passportOrigin: "United States (US)",
        visaApproved: "Tourist eVisa (90 Days)",
        processingTimeTaken: "48 Hours",
        rating: 5,
        comment: "Foxico made this completely painless. Submitted my passport scan on Tuesday evening, and by Thursday afternoon my verified Japan eVisa was in my Apple Wallet!",
        date: "October 14, 2026"
      },
      {
        author: "Marcus Lindqvist",
        passportOrigin: "Sweden (EU)",
        visaApproved: "Digital Nomad Visa (6 Months)",
        processingTimeTaken: "8 Business Days",
        rating: 5,
        comment: "Navigating the 10-million-yen income threshold and health insurance docs seemed intimidating, but Foxico's legal team reviewed every translation beforehand. Seamless arrival at Narita.",
        date: "September 28, 2026"
      }
    ],
    customsAlert: "Japan strictly prohibits import of certain over-the-counter allergy medications containing pseudoephedrine. Always declare prescription medication.",
    healthRequirements: "No mandatory vaccinations required. Travel medical insurance covering COVID-19 and acute hospitalization is strongly recommended."
  },
  {
    id: "indonesia",
    slug: "indonesia",
    name: "Indonesia (Bali)",
    countryCode: "ID",
    flag: "🇮🇩",
    continent: "Asia",
    region: "Southeast Asia",
    capital: "Jakarta / Nusantara",
    currency: "IDR (Rp)",
    localTime: "UTC+8 (WITA - Bali)",
    language: "Bahasa Indonesia & Balinese",
    climate: "Tropical warm sunshine year-round",
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=85&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1573790387438-4da905039392?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1550570985-fd4a0e3f5b4c?w=800&q=80&fit=crop"
    ],
    description: "The emerald crown of Southeast Asia. Bali and the Indonesian archipelago welcome millions with sacred water temples, world-class surf breaks, lush Ubud rice terraces, and thriving nomad hubs.",
    visaDifficulty: "Instant eVisa",
    approvalRate: 99.8,
    averageProcessingTime: "24–48 Hours",
    startingPrice: 35,
    featured: true,
    popularFor: ["Island Paradise", "Digital Nomads & Co-working", "Yoga & Wellness Retreats", "Scuba Diving & Coral Reefs"],
    visaTypes: [
      {
        id: "id-b1-voa",
        name: "e-VOA Tourist Visa (B1)",
        badge: "Instant Approval",
        stayDuration: "30 Days (Extendable to 60 Days)",
        validity: "90 Days to Enter",
        entryType: "Single Entry",
        governmentFee: 35,
        conciergeFee: 24,
        processingDaysStandard: 1,
        processingDaysExpress: 1,
        requirements: [
          "Passport valid for at least 6 months upon arrival",
          "Biometric passport photo",
          "Confirmed return or onward ticket out of Indonesia",
          "Payment card for immigration processing"
        ],
        eligibilityNotes: "Available for 97 eligible countries. Can be extended online once for an additional 30 days without visiting immigration.",
        recommendedFor: "Vacationers, short-term retreat participants, and backpackers."
      },
      {
        id: "id-b211a-visit",
        name: "Visit Visa B211A (Social & Cultural)",
        badge: "Long Stay 180 Days",
        stayDuration: "60 Days (Extendable up to 180 Days)",
        validity: "90 Days to Enter",
        entryType: "Single Entry",
        governmentFee: 95,
        conciergeFee: 75,
        processingDaysStandard: 4,
        processingDaysExpress: 2,
        requirements: [
          "Passport with minimum 12 months validity",
          "Bank statement with minimum $2,000 USD balance",
          "Indonesian corporate or registered sponsor letter (provided by Foxico)",
          "Color copy of passport cover and bio page",
          "Confirmed outbound flight itinerary within 60 days"
        ],
        eligibilityNotes: "Extendable twice within Indonesia, giving up to 180 continuous days.",
        recommendedFor: "Slow travelers, writers, yogis, and creative professionals exploring Indonesia long-term."
      },
      {
        id: "id-e33g-nomad",
        name: "Remote Worker Visa (E33G)",
        badge: "1-Year Remote Work",
        stayDuration: "1 Year Multiple Entry",
        validity: "1 Year",
        entryType: "Multiple Entry",
        governmentFee: 150,
        conciergeFee: 120,
        processingDaysStandard: 10,
        processingDaysExpress: 5,
        requirements: [
          "Proof of employment with an overseas company outside Indonesia",
          "Annual foreign earnings of at least $60,000 USD",
          "Valid passport with at least 18 months validity",
          "Personal bank statements for the past 3 months",
          "Proof of accommodation / residential lease in Bali"
        ],
        eligibilityNotes: "Zero tax liability on overseas income while residing in Indonesia.",
        recommendedFor: "Full-time remote tech workers, digital founders, and consultants residing in Canggu, Pererenan, or Ubud."
      }
    ],
    requiredDocuments: [
      {
        title: "Valid Passport",
        description: "Must be in pristine condition with 6+ months remaining validity.",
        isMandatory: true,
        format: "Full color bio-page scan (JPG or PDF)"
      },
      {
        title: "Passport Style Headshot",
        description: "High resolution digital portrait photo, neutral expression.",
        isMandatory: true,
        format: "JPG format, 400x600 pixels or larger"
      },
      {
        title: "Proof of Onward Travel",
        description: "Confirmed airline ticket leaving Indonesia before visa expiration.",
        isMandatory: true,
        format: "PDF e-Ticket"
      },
      {
        title: "Electronic Customs Declaration (e-CD)",
        description: "Mandatory official Indonesian Customs declaration QR pass filled 3 days before landing.",
        isMandatory: true,
        format: "Generated QR Code"
      }
    ],
    consularSteps: [
      {
        step: 1,
        title: "Submit e-Application",
        description: "Upload your passport bio page and flight details via our liquid glass intake portal.",
        duration: "5 Minutes"
      },
      {
        step: 2,
        title: "Immigration Clearance",
        description: "Transmitted directly to Indonesian Directorate General of Immigration API system.",
        duration: "12–24 Hours"
      },
      {
        step: 3,
        title: "e-Visa Delivery & VoA Lane Pass",
        description: "Receive your verified PDF e-Visa with fast-track immigration barcode for Denpasar (DPS) / Jakarta (CGK).",
        duration: "Instant delivery"
      },
      {
        step: 4,
        title: "Arrival & e-Gate Scan",
        description: "Scan your barcode at autogates at Ngurah Rai Airport for seamless 60-second entry.",
        duration: "Airport arrival"
      }
    ],
    jurisdictions: [
      {
        city: "Denpasar, Bali",
        country: "Indonesia",
        address: "Jl. Raya Puputan No.12, Renon, Denpasar, Bali 80234",
        phone: "+62 361 227828",
        email: "bali-liaison@foxico.travel",
        appointmentWaitDays: 1,
        jurisdictionCovers: "Bali, Lombok, Nusa Tenggara"
      },
      {
        city: "Singapore",
        country: "Singapore",
        address: "7 Chatsworth Road, Singapore 249761",
        phone: "+65 6737 7422",
        email: "sg-indo@foxico.travel",
        appointmentWaitDays: 1,
        jurisdictionCovers: "Southeast Asia regional liaison"
      }
    ],
    interviewTips: [
      {
        question: "Where are you staying in Bali?",
        advice: "Provide the specific name and address of your villa, hotel, or guesthouse in Canggu, Ubud, Seminyak, or Uluwatu."
      },
      {
        question: "Do you have your outbound flight ready?",
        advice: "Have your return or onward flight itinerary readily accessible on your mobile phone."
      }
    ],
    faqs: [
      {
        question: "Can I extend my B1 e-VOA online without visiting an immigration office?",
        answer: "Yes! If you applied for an electronic B1 e-VOA through Foxico, your 30-day extension can be completed entirely online in one click without fingerprinting."
      },
      {
        question: "What is the Bali Tourist Levy and how do I pay it?",
        answer: "Bali levies an official IDR 150,000 (approx. $10 USD) tourism fee. Foxico automatically includes this in your package and provides your Love Bali digital tax voucher."
      }
    ],
    travelerReviews: [
      {
        author: "David Moreau",
        passportOrigin: "France",
        visaApproved: "e-VOA (30 + 30 Days)",
        processingTimeTaken: "18 Hours",
        rating: 5,
        comment: "Bypassed the huge payment queues at Denpasar airport. Just walked straight to the electronic autogates, scanned my barcode, and was outside catching my taxi in 4 minutes.",
        date: "October 19, 2026"
      }
    ],
    customsAlert: "Strict electronic goods and vape regulations. Declare electronic devices worth over $500 USD for IMEI registration if staying over 90 days.",
    healthRequirements: "No yellow fever certificate required unless arriving from endemic regions. Dengue prevention advised."
  },
  {
    id: "thailand",
    slug: "thailand",
    name: "Thailand",
    countryCode: "TH",
    flag: "🇹🇭",
    continent: "Asia",
    region: "Southeast Asia",
    capital: "Bangkok",
    currency: "THB (฿)",
    localTime: "UTC+7 (ICT)",
    language: "Thai",
    climate: "Tropical tropical monsoon, warm and balmy",
    heroImage: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1920&q=85&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1571619671891-f433a21cc30a?w=800&q=80&fit=crop"
    ],
    description: "The Kingdom of Thailand sparkles with ornate gilded temples, world-famous street food night markets, tropical turquoise islands, and the revolutionary 5-Year Destination Thailand Visa (DTV).",
    visaDifficulty: "Instant eVisa",
    approvalRate: 99.1,
    averageProcessingTime: "2–4 Days",
    startingPrice: 40,
    featured: true,
    popularFor: ["Destination Thailand Visa (DTV)", "Bangkok Street Food", "Phi Phi & Krabi Beaches", "Muay Thai & Culture"],
    visaTypes: [
      {
        id: "th-dtv-5yr",
        name: "Destination Thailand Visa (DTV)",
        badge: "5-Year Nomad Visa",
        stayDuration: "180 Days per Entry (Extendable to 360 Days)",
        validity: "5 Years Multiple Entry",
        entryType: "Multiple Entry",
        governmentFee: 280,
        conciergeFee: 95,
        processingDaysStandard: 7,
        processingDaysExpress: 3,
        requirements: [
          "Proof of financial assets/bank balance of at least 500,000 THB (approx. $14,000 USD)",
          "Employment contract as remote worker, digital nomad, freelancer, or proof of soft power activity (Muay Thai / Thai Cooking / Medical)",
          "Passport with at least 6 months validity",
          "Color passport photo matching Thai consular standards"
        ],
        eligibilityNotes: "Valid for 5 years! You can stay up to 180 days per entry, extendable once per entry for another 180 days.",
        recommendedFor: "Remote employees, entrepreneurs, digital nomads, and cultural learners."
      },
      {
        id: "th-tourist-tr",
        name: "Single-Entry Tourist Visa (TR)",
        badge: "Standard Tourist",
        stayDuration: "60 Days (Extendable by 30 Days)",
        validity: "3 Months",
        entryType: "Single Entry",
        governmentFee: 40,
        conciergeFee: 29,
        processingDaysStandard: 4,
        processingDaysExpress: 2,
        requirements: [
          "Passport with 6 months validity",
          "Confirmed flight ticket entering and exiting Thailand",
          "Proof of accommodation in Thailand",
          "Bank statement with minimum $700 USD balance"
        ],
        eligibilityNotes: "Can be extended for another 30 days at any Thai immigration office for 1,900 THB.",
        recommendedFor: "Travelers staying beyond the standard 30-day visa exemption period."
      }
    ],
    requiredDocuments: [
      {
        title: "Passport Bio-Data Scan",
        description: "Full double-page scan including signature page.",
        isMandatory: true,
        format: "PDF or JPG (clear, no glare)"
      },
      {
        title: "Financial Proof / Bank Statement",
        description: "Showing equivalent of 500,000 THB for DTV or $700 for Tourist TR.",
        isMandatory: true,
        format: "Official bank statement PDF"
      },
      {
        title: "Remote Work or Soft Power Activity Proof",
        description: "Employment letter, business registration, or enrollment letter in certified Thai cultural course.",
        isMandatory: true,
        format: "Official letter on company letterhead (PDF)"
      }
    ],
    consularSteps: [
      {
        step: 1,
        title: "Dossier Auditing",
        description: "Review bank balance verification and employment documentation.",
        duration: "Within 4 Hours"
      },
      {
        step: 2,
        title: "Royal Thai Embassy e-Visa Portal Submission",
        description: "Transmitted to the authorized Royal Thai Embassy jurisdiction.",
        duration: "2–4 Business Days"
      },
      {
        step: 3,
        title: "Approval Certificate Issuance",
        description: "Official Thai e-Visa confirmation document with QR authentication.",
        duration: "Delivered immediately"
      }
    ],
    jurisdictions: [
      {
        city: "Bangkok",
        country: "Thailand",
        address: "Chaeng Watthana Road, Thung Song Hong, Lak Si, Bangkok 10210",
        phone: "+66 2 141 9889",
        email: "bangkok-consular@foxico.travel",
        appointmentWaitDays: 2,
        jurisdictionCovers: "Central Thailand Immigration"
      }
    ],
    interviewTips: [
      {
        question: "What is your remote work setup while in Thailand?",
        advice: "Explain that your income originates from foreign clients or companies outside Thailand, and your work will be conducted online without servicing the local Thai domestic market."
      }
    ],
    faqs: [
      {
        question: "Can my spouse and dependents join me on the DTV Visa?",
        answer: "Yes! Legal spouses and unmarried children under 20 years old can apply as DTV dependents with marriage and birth certificates."
      }
    ],
    travelerReviews: [
      {
        author: "Liam O'Connor",
        passportOrigin: "United Kingdom",
        visaApproved: "Destination Thailand Visa (5 Years)",
        processingTimeTaken: "5 Days",
        rating: 5,
        comment: "Getting 5 years of multiple entries to Thailand with 180 days per stay has completely transformed my remote work life. Foxico ensured my bank statement and remote contract sailed through.",
        date: "October 11, 2026"
      }
    ],
    customsAlert: "Strict prohibition against e-cigarettes and vaping equipment. Heavy fines apply.",
    healthRequirements: "Routine immunizations recommended. No yellow fever required unless traveling from infected zones."
  },
  {
    id: "united-kingdom",
    slug: "united-kingdom",
    name: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    continent: "Europe",
    region: "Western Europe",
    capital: "London",
    currency: "GBP (£)",
    localTime: "UTC+0 / UTC+1",
    language: "English",
    climate: "Maritime temperate with mild summers and cool winters",
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=85&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=80&fit=crop"
    ],
    description: "Royal landmarks, historic castles, world-class theater in the West End, and iconic countryside landscapes. The UK Standard Visitor Visa and newly rolled out UK ETA offer clear routes for global travelers.",
    visaDifficulty: "Express Electronic",
    approvalRate: 97.6,
    averageProcessingTime: "5–15 Days",
    startingPrice: 120,
    featured: true,
    popularFor: ["London Heritage", "Oxford & Cambridge", "Scottish Highlands", "Premier League & Arts"],
    visaTypes: [
      {
        id: "uk-standard-visitor",
        name: "Standard Visitor Visa (6 Months)",
        badge: "Tourism & Family",
        stayDuration: "Up to 6 Months",
        validity: "6 Months Multiple Entry",
        entryType: "Multiple Entry",
        governmentFee: 145,
        conciergeFee: 85,
        processingDaysStandard: 15,
        processingDaysExpress: 5,
        requirements: [
          "Current valid passport with at least 1 blank page",
          "Comprehensive 6-month bank statements showing reliable funds",
          "Employment verification letter and pay slips",
          "Accommodation details and travel itinerary in the UK",
          "Biometrics appointment at VFS Global / TLScontact"
        ],
        eligibilityNotes: "For nationals who require a visa prior to travel to England, Scotland, Wales, and Northern Ireland.",
        recommendedFor: "Vacations, family visits, short training, and business conferences."
      },
      {
        id: "uk-eta",
        name: "Electronic Travel Authorisation (ETA)",
        badge: "Instant Travel Permit",
        stayDuration: "Up to 6 Months per visit",
        validity: "2 Years Multiple Entry",
        entryType: "Multiple Entry",
        governmentFee: 15,
        conciergeFee: 20,
        processingDaysStandard: 3,
        processingDaysExpress: 1,
        requirements: [
          "Biometric passport from eligible ETA nation (GCC, US, Canada, EU starting late 2025/2026)",
          "Passport photo scan",
          "Brief travel history disclosure"
        ],
        eligibilityNotes: "Digitally linked to your passport without needing sticker or embassy visit.",
        recommendedFor: "Eligible visa-exempt nationalities."
      }
    ],
    requiredDocuments: [
      {
        title: "Valid Passport",
        description: "Must be valid for entire duration of proposed UK stay.",
        isMandatory: true,
        format: "Original passport presented at biometrics"
      },
      {
        title: "Proof of Financial Ties & Employment",
        description: "Bank statements showing consistent cash flow, tax returns, and employer leave approval letter.",
        isMandatory: true,
        format: "Certified PDF documents"
      },
      {
        title: "Ties to Home Country",
        description: "Property ownership, family ties, or enrollment in higher education.",
        isMandatory: true,
        format: "Official documentation"
      }
    ],
    consularSteps: [
      {
        step: 1,
        title: "Online UKVI Application",
        description: "We compile your UKVI visa application and supporting evidence dossier.",
        duration: "1 Day"
      },
      {
        step: 2,
        title: "Biometric Appointment Booking",
        description: "We secure your preferred priority slot at your nearest VFS or TLScontact center.",
        duration: "Selected by applicant"
      },
      {
        step: 3,
        title: "UK Visas and Immigration Adjudication",
        description: "UKVI review with optional 5-Day Priority Service.",
        duration: "5–15 Working Days"
      },
      {
        step: 4,
        title: "Passport Collection / eVisa Notification",
        description: "Courier return of passport with vignette or digital status activation.",
        duration: "Next day courier"
      }
    ],
    jurisdictions: [
      {
        city: "London (UKVI HQ)",
        country: "United Kingdom",
        address: "Lunar House, 40 Wellesley Road, Croydon CR9 2BY",
        phone: "+44 300 790 6268",
        email: "uk-adjudication@foxico.travel",
        appointmentWaitDays: 3,
        jurisdictionCovers: "All UKVI Applications"
      }
    ],
    interviewTips: [
      {
        question: "Why do you wish to visit the United Kingdom at this time?",
        advice: "Mention specific sites (e.g., British Museum, Edinburgh Castle) and dates. Emphasize that your visit is strictly temporary."
      }
    ],
    faqs: [
      {
        question: "Can I use the UK Priority Visa service for faster decisions?",
        answer: "Yes, UKVI offers a 5-working-day Priority Service and 24-hour Super Priority Service at select international VAC centers."
      }
    ],
    travelerReviews: [
      {
        author: "Priya Patel",
        passportOrigin: "India",
        visaApproved: "UK Standard Visitor (6 Months)",
        processingTimeTaken: "5 Days (Priority)",
        rating: 5,
        comment: "Used Foxico's document audit before my VFS London appointment. Zero delays and passport arrived back in 5 working days with 6-month multiple entry stamped.",
        date: "September 15, 2026"
      }
    ],
    customsAlert: "Strict meat and dairy restrictions from outside the EU. Declare all gifts over £390 in value.",
    healthRequirements: "TB (Tuberculosis) screening test certificate required if residing in specified countries for >6 months."
  },
  {
    id: "france-schengen",
    slug: "france-schengen",
    name: "France (Schengen Area)",
    countryCode: "FR",
    flag: "🇫🇷",
    continent: "Europe",
    region: "Western Europe",
    capital: "Paris",
    currency: "EUR (€)",
    localTime: "UTC+1 (CET)",
    language: "French",
    climate: "Temperate maritime and Mediterranean south",
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=85&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1509299349698-dd22323b5963?w=800&q=80&fit=crop"
    ],
    description: "The romantic avenues of Paris, sun-drenched vineyards of Bordeaux, and glittering beaches of the French Riviera. A single Schengen Visa unlocks unrestricted travel across 29 European member states.",
    visaDifficulty: "Express Electronic",
    approvalRate: 96.8,
    averageProcessingTime: "7–14 Days",
    startingPrice: 90,
    featured: true,
    popularFor: ["Schengen 29-Country Access", "Paris Architecture & Fashion", "French Riviera & Provence", "Gastronomy & Wine Tours"],
    visaTypes: [
      {
        id: "fr-schengen-c",
        name: "Uniform Schengen Short-Stay (Type C)",
        badge: "29 Countries in 1 Visa",
        stayDuration: "90 Days in any 180-day period",
        validity: "Up to 5 Years Multiple Entry",
        entryType: "Multiple Entry",
        governmentFee: 90,
        conciergeFee: 79,
        processingDaysStandard: 12,
        processingDaysExpress: 5,
        requirements: [
          "Passport valid for at least 3 months after departure from Schengen zone",
          "Approved travel medical insurance covering minimum €30,000 for emergency medical care & repatriation",
          "Detailed travel plan covering internal Schengen transport",
          "Proof of accommodation for all nights in Europe",
          "Last 3 months certified personal bank statements"
        ],
        eligibilityNotes: "Allows travel across France, Germany, Italy, Spain, Switzerland, Greece, Netherlands, and all 29 Schengen states.",
        recommendedFor: "Tourists, culture enthusiasts, and multi-country European explorers."
      }
    ],
    requiredDocuments: [
      {
        title: "Schengen-Compliant Travel Insurance",
        description: "Mandatory zero-deductible policy covering €30,000 across all 29 Schengen countries.",
        isMandatory: true,
        format: "Certificate of Insurance with European repatriation clause (PDF)"
      },
      {
        title: "Bank Statements & Solvency Proof",
        description: "Demonstrating minimum €65 per day for hotel stay or €120/day if hotel not prepaid.",
        isMandatory: true,
        format: "Bank stamped statements (PDF)"
      },
      {
        title: "Full Day-by-Day Europe Itinerary",
        description: "Flight, rail, or car reservations across cities.",
        isMandatory: true,
        format: "Trip Planner Document"
      }
    ],
    consularSteps: [
      {
        step: 1,
        title: "France-Visas Application Prep",
        description: "Official France-Visas registry entry and document verification.",
        duration: "24 Hours"
      },
      {
        step: 2,
        title: "VFS Global / TLS Appointment",
        description: "Biometric enrollment and passport deposit.",
        duration: "Appointment day"
      },
      {
        step: 3,
        title: "French Consulate Decision",
        description: "Adjudication and biometric visa printing.",
        duration: "7–12 Business Days"
      }
    ],
    jurisdictions: [
      {
        city: "Paris",
        country: "France",
        address: "Ministère de l'Intérieur, Place Beauvau, 75008 Paris",
        phone: "+33 1 40 07 60 60",
        email: "france-visas@foxico.travel",
        appointmentWaitDays: 2,
        jurisdictionCovers: "European Consular Services"
      }
    ],
    interviewTips: [
      {
        question: "Which Schengen country will you spend the most nights in?",
        advice: "Always apply to the consulate of the country where you spend the highest number of nights. If equal, apply to the country of first entry."
      }
    ],
    faqs: [
      {
        question: "How does the 90/180-day rule work?",
        answer: "On any given day of travel, look back at the past 180 days. Your total days inside the Schengen Area cannot exceed 90 days. Our interactive calculator tracks this automatically."
      }
    ],
    travelerReviews: [
      {
        author: "Elena Rostova",
        passportOrigin: "Kazakhstan",
        visaApproved: "Schengen Multiple Entry (1 Year)",
        processingTimeTaken: "8 Days",
        rating: 5,
        comment: "Foxico's insurance bundle met the €30,000 consular criteria perfectly. Received a 1-year multiple entry visa from the French consulate!",
        date: "October 5, 2026"
      }
    ],
    customsAlert: "Declaration required for cash amounts equal to or exceeding €10,000 upon entering or leaving the European Union.",
    healthRequirements: "No compulsory vaccinations. Valid European travel insurance mandatory."
  },
  {
    id: "united-states",
    slug: "united-states",
    name: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    continent: "North America",
    region: "North America",
    capital: "Washington, D.C.",
    currency: "USD ($)",
    localTime: "UTC-5 to UTC-8",
    language: "English",
    climate: "Diverse from Mediterranean California to Alpine Rockies and tropical Florida",
    heroImage: "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?w=1920&q=85&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80&fit=crop"
    ],
    description: "From Manhattan skylines to California Pacific coasts, Grand Canyon expanses, and world-class tech epicenters. We guide you through the DS-160, MRV fee appointment slots, and consular interview preparation.",
    visaDifficulty: "Embassy Required",
    approvalRate: 94.2,
    averageProcessingTime: "Interview Wait + 3 Days",
    startingPrice: 185,
    featured: true,
    popularFor: ["B1/B2 Visitor Visas", "ESTA Visa Waiver", "Tech Conferences & Silicon Valley", "Cross-Country Road Trips"],
    visaTypes: [
      {
        id: "us-b1-b2",
        name: "B1/B2 Tourist & Business Visitor Visa",
        badge: "Up to 10 Years",
        stayDuration: "Up to 6 Months per entry",
        validity: "Up to 10 Years Multiple Entry",
        entryType: "Multiple Entry",
        governmentFee: 185,
        conciergeFee: 99,
        processingDaysStandard: 5,
        processingDaysExpress: 2,
        requirements: [
          "Completed Form DS-160 online barcode confirmation",
          "MRV visa fee payment receipt",
          "US Visa format 2x2 inch biometric photograph",
          "Valid passport with at least 6 months remaining past intended stay",
          "Proof of strong economic, employment, and social ties to home country"
        ],
        eligibilityNotes: "Requires in-person interview at nearest US Embassy or Consulate (interview waiver available for renewals).",
        recommendedFor: "Tourists, family visits, business negotiations, and medical treatment."
      },
      {
        id: "us-esta",
        name: "ESTA (Electronic System for Travel Authorization)",
        badge: "Instant Approval",
        stayDuration: "Up to 90 Days",
        validity: "2 Years",
        entryType: "Multiple Entry",
        governmentFee: 21,
        conciergeFee: 25,
        processingDaysStandard: 1,
        processingDaysExpress: 1,
        requirements: [
          "e-Passport with embedded electronic chip from Visa Waiver Program (VWP) country",
          "Valid credit card for fee payment",
          "Valid email address"
        ],
        eligibilityNotes: "For citizens of 41 Visa Waiver nations (UK, Australia, Japan, France, Germany, Singapore, etc.).",
        recommendedFor: "Eligible citizens taking short trips."
      }
    ],
    requiredDocuments: [
      {
        title: "DS-160 Confirmation Page",
        description: "Official confirmation page with alphanumeric CEAC barcode.",
        isMandatory: true,
        format: "Printed confirmation sheet"
      },
      {
        title: "Appointment Confirmation Sheet",
        description: "Issued after scheduling biometrics and interview slot.",
        isMandatory: true,
        format: "PDF Confirmation document"
      },
      {
        title: "Evidence of Ties to Home Nation",
        description: "Employment letter, business ownership, property title deeds, tax filings.",
        isMandatory: true,
        format: "Physical originals brought to interview"
      }
    ],
    consularSteps: [
      {
        step: 1,
        title: "DS-160 Preparation & Error-Check",
        description: "We review your work history, travel background, and family details for 100% compliance.",
        duration: "24 Hours"
      },
      {
        step: 2,
        title: "Appointment Booking & Rescheduling Bot",
        description: "We monitor consulate appointment calendar to secure early interview dates.",
        duration: "Continuous monitoring"
      },
      {
        step: 3,
        title: "Consular Interview Prep Session",
        description: "1-on-1 mock interview with former visa officers covering the 10 most common questions.",
        duration: "30 Minutes"
      },
      {
        step: 4,
        title: "Embassy Interview & Passport Return",
        description: "Attend brief 3-minute interview; approved passport returned via courier in 3–5 days.",
        duration: "3–5 Days post-interview"
      }
    ],
    jurisdictions: [
      {
        city: "Washington, D.C.",
        country: "United States",
        address: "U.S. Department of State, 2201 C St NW, Washington, DC 20520",
        phone: "+1 (202) 647-4000",
        email: "us-liaison@foxico.travel",
        appointmentWaitDays: 5,
        jurisdictionCovers: "Consular Affairs Support"
      }
    ],
    interviewTips: [
      {
        question: "What ties do you have that will ensure your return to your home country?",
        advice: "The US Immigration and Nationality Act (Section 214b) presumes all visitor applicants intend to immigrate until proven otherwise. Clearly articulate your stable career, family responsibilities, and assets in your country."
      },
      {
        question: "Have you ever traveled internationally before?",
        advice: "Mention your previous compliant international travels to Europe, Asia, or elsewhere. A history of adhering to visa limits builds high credibility."
      }
    ],
    faqs: [
      {
        question: "Can I renew my expired US B1/B2 visa without attending an interview?",
        answer: "Yes! If your previous 10-year US visa expired within the last 48 months, you generally qualify for the Interview Waiver (Drop-box) program."
      }
    ],
    travelerReviews: [
      {
        author: "Felipe Gomez",
        passportOrigin: "Colombia",
        visaApproved: "US B1/B2 (10 Years)",
        processingTimeTaken: "Interview approved on spot",
        rating: 5,
        comment: "The Foxico mock interview was the best preparation possible. The officer asked the exact questions we practiced. Approved for 10 full years!",
        date: "October 2, 2026"
      }
    ],
    customsAlert: "Strict agricultural inspections. All food, fruits, seeds, and meats must be declared upon arrival at US Customs and Border Protection (CBP).",
    healthRequirements: "No mandatory vaccinations required for entry."
  },
  {
    id: "uae-dubai",
    slug: "uae-dubai",
    name: "United Arab Emirates (Dubai)",
    countryCode: "AE",
    flag: "🇦🇪",
    continent: "Asia",
    region: "Middle East",
    capital: "Abu Dhabi / Dubai",
    currency: "AED (د.إ)",
    localTime: "UTC+4 (GST)",
    language: "Arabic & English",
    climate: "Desert warm with golden sunshine and luxury air-conditioned marvels",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=85&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1546412414-e1885259563a?w=800&q=80&fit=crop"
    ],
    description: "The city of the future. Soaring skyscrapers like the Burj Khalifa, luxurious Palm Jumeirah beach resorts, desert dune safaris, and ultra-fast 24-hour electronic visa issuance through GDRFA and ICP.",
    visaDifficulty: "Instant eVisa",
    approvalRate: 99.6,
    averageProcessingTime: "24–48 Hours",
    startingPrice: 85,
    featured: true,
    popularFor: ["24-Hour Express eVisa", "Luxury & World Record Landmarks", "Virtual Working Remote Nomad Visa", "Golden Visa Residency"],
    visaTypes: [
      {
        id: "ae-tourist-30",
        name: "Tourist eVisa (30 Days)",
        badge: "Instant Approval",
        stayDuration: "30 Days (Extendable by 30 Days)",
        validity: "60 Days to Enter",
        entryType: "Single Entry",
        governmentFee: 85,
        conciergeFee: 35,
        processingDaysStandard: 2,
        processingDaysExpress: 1,
        requirements: [
          "Color copy of passport bio page (valid 6+ months)",
          "Passport size photo with white background",
          "Confirmed return ticket"
        ],
        eligibilityNotes: "Processed directly via Dubai GDRFA or Federal ICP system. No embassy visit required.",
        recommendedFor: "Vacationers, weekend getaways, shopping festival visitors."
      },
      {
        id: "ae-tourist-60",
        name: "Tourist eVisa (60 Days)",
        badge: "Extended Vacation",
        stayDuration: "60 Days",
        validity: "60 Days to Enter",
        entryType: "Single Entry",
        governmentFee: 140,
        conciergeFee: 45,
        processingDaysStandard: 2,
        processingDaysExpress: 1,
        requirements: [
          "Passport copy (6 months validity)",
          "White background photo",
          "Hotel reservation"
        ],
        eligibilityNotes: "Ideal for travelers planning extended stays across Dubai, Abu Dhabi, and Ras Al Khaimah.",
        recommendedFor: "Long-stay vacationers and visiting friends and relatives."
      },
      {
        id: "ae-virtual-work",
        name: "Virtual Working Program (Remote Nomad)",
        badge: "1-Year Nomad Resident",
        stayDuration: "1 Year (Renewable)",
        validity: "1 Year",
        entryType: "Multiple Entry",
        governmentFee: 287,
        conciergeFee: 110,
        processingDaysStandard: 7,
        processingDaysExpress: 3,
        requirements: [
          "Passport with 6 months validity",
          "Proof of employment with 1-year contract from current employer outside UAE",
          "Minimum $3,500 USD monthly salary (bank statement + payslip)",
          "Valid health insurance policy with UAE coverage"
        ],
        eligibilityNotes: "Grants Emirates ID, ability to rent long-term apartment, open bank account, and zero personal income tax.",
        recommendedFor: "Remote tech employees, digital entrepreneurs, and creators."
      }
    ],
    requiredDocuments: [
      {
        title: "Passport Bio Page Scan",
        description: "Clear colored scan of passport bio-data page with minimum 6 months validity.",
        isMandatory: true,
        format: "JPG or PDF (high resolution)"
      },
      {
        title: "Passport Size Digital Photograph",
        description: "Clear front-facing digital photo with pure white background.",
        isMandatory: true,
        format: "JPEG format"
      }
    ],
    consularSteps: [
      {
        step: 1,
        title: "Instant Portal Upload",
        description: "Submit your passport scan and photo through our liquid intake form.",
        duration: "3 Minutes"
      },
      {
        step: 2,
        title: "GDRFA Official Processing",
        description: "Transmitted to the General Directorate of Residency and Foreigners Affairs in Dubai.",
        duration: "12–24 Hours"
      },
      {
        step: 3,
        title: "Official e-Visa Issuance",
        description: "Approved electronic visa entry permit delivered to your email with barcoded entry pass.",
        duration: "Direct download"
      }
    ],
    jurisdictions: [
      {
        city: "Dubai",
        country: "United Arab Emirates",
        address: "GDRFA Headquarters, Al Jafiliya, Dubai",
        phone: "+971 4 313 9999",
        email: "dubai-visa@foxico.travel",
        appointmentWaitDays: 1,
        jurisdictionCovers: "Emirate of Dubai Entry Permits"
      }
    ],
    interviewTips: [
      {
        question: "No interview required for UAE Tourist eVisas",
        advice: "UAE Tourist visas are 100% electronic and do not require in-person consular appearances."
      }
    ],
    faqs: [
      {
        question: "Can I extend my Dubai tourist visa while staying inside the UAE?",
        answer: "Yes! A 30-day in-country extension is available without leaving the country. Foxico handles the digital extension request directly."
      }
    ],
    travelerReviews: [
      {
        author: "Tariq Al-Mansoor",
        passportOrigin: "Canada",
        visaApproved: "Dubai Tourist eVisa (60 Days)",
        processingTimeTaken: "16 Hours",
        rating: 5,
        comment: "Fastest visa I've ever gotten. Submitted on Sunday evening, woke up Monday morning with the official entry permit in my inbox.",
        date: "October 18, 2026"
      }
    ],
    customsAlert: "Strict drug laws. Check medication list as certain prescription drugs require pre-approval via MOHAP portal.",
    healthRequirements: "No compulsory vaccines. Comprehensive medical insurance recommended."
  },
  {
    id: "switzerland",
    slug: "switzerland",
    name: "Switzerland",
    countryCode: "CH",
    flag: "🇨🇭",
    continent: "Europe",
    region: "Central Europe",
    capital: "Bern",
    currency: "CHF (Fr.)",
    localTime: "UTC+1 (CET)",
    language: "German, French, Italian, Romansh",
    climate: "Alpine mountain climate with crisp fresh air",
    heroImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=85&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=800&q=80&fit=crop"
    ],
    description: "Towering snow-capped peaks of the Matterhorn, mirror-like alpine lakes of Lucerne, luxury panoramic rail journeys, and world-renowned precision. Switzerland is part of the Schengen area, granting smooth entry.",
    visaDifficulty: "Express Electronic",
    approvalRate: 98.2,
    averageProcessingTime: "7–10 Days",
    startingPrice: 90,
    featured: false,
    popularFor: ["Swiss Alps Trekking", "Glacier Express Rail", "Lake Geneva & Zurich", "Luxury Ski Resorts"],
    visaTypes: [
      {
        id: "ch-schengen",
        name: "Swiss Schengen Tourist Visa",
        badge: "Alpine & Europe Access",
        stayDuration: "90 Days in any 180-day period",
        validity: "Up to 2 Years Multiple Entry",
        entryType: "Multiple Entry",
        governmentFee: 90,
        conciergeFee: 75,
        processingDaysStandard: 10,
        processingDaysExpress: 5,
        requirements: [
          "Passport valid for at least 3 months after departure from Switzerland",
          "Proof of sufficient financial means: CHF 100 per day of stay (CHF 30/day for students)",
          "Travel medical insurance covering minimum €30,000 / CHF 50,000 with emergency rescue & hospital care",
          "Confirmed flight and Swiss hotel bookings or mountain hut reservations"
        ],
        eligibilityNotes: "Allows travel through Switzerland and all 29 Schengen member states.",
        recommendedFor: "Hikers, alpine rail travelers, watch enthusiasts, and winter sports lovers."
      }
    ],
    requiredDocuments: [
      {
        title: "Proof of Financial Solvency (CHF 100/day)",
        description: "Official bank statements from past 3 months demonstrating at least 100 Swiss Francs per day.",
        isMandatory: true,
        format: "Certified bank statements (PDF)"
      },
      {
        title: "Swiss Alpine Medical Insurance",
        description: "Must explicitly cover mountain search & rescue and repatriation.",
        isMandatory: true,
        format: "Insurance confirmation certificate"
      }
    ],
    consularSteps: [
      {
        step: 1,
        title: "Swiss e-Dossier Preparation",
        description: "Verification of financial capacity and alpine itinerary.",
        duration: "24 Hours"
      },
      {
        step: 2,
        title: "Embassy / VFS Biometrics",
        description: "In-person fingerprint submission.",
        duration: "Selected day"
      },
      {
        step: 3,
        title: "Swiss Consular Approval",
        description: "Passport stamped with official Swiss Schengen sticker.",
        duration: "7–10 Working Days"
      }
    ],
    jurisdictions: [
      {
        city: "Bern",
        country: "Switzerland",
        address: "Federal Department of Foreign Affairs, Bundesgasse 32, 3003 Bern",
        phone: "+41 58 462 21 11",
        email: "swiss-consular@foxico.travel",
        appointmentWaitDays: 2,
        jurisdictionCovers: "Swiss Federal Consular Administration"
      }
    ],
    interviewTips: [
      {
        question: "How will you navigate between Swiss cities?",
        advice: "Mentioning the Swiss Travel Pass or booked SBB train tickets demonstrates a thoroughly planned journey."
      }
    ],
    faqs: [
      {
        question: "Do I need a separate visa if I already have a French or Italian Schengen visa?",
        answer: "No! If you possess a valid multiple-entry Schengen visa issued by any member state, you can freely enter Switzerland without any additional visa."
      }
    ],
    travelerReviews: [
      {
        author: "Klaus Weber",
        passportOrigin: "South Africa",
        visaApproved: "Swiss Schengen Tourist",
        processingTimeTaken: "7 Days",
        rating: 5,
        comment: "Everything went smoothly. The mountain rescue insurance proof provided by Foxico satisfied the Swiss consulate on the first try.",
        date: "September 12, 2026"
      }
    ],
    customsAlert: "Strict meat and alcohol limits when crossing Swiss borders.",
    healthRequirements: "High altitude precautions recommended for peaks above 3,000m."
  },
  {
    id: "india-kerala",
    slug: "india-kerala",
    name: "India (Kerala)",
    countryCode: "IN",
    flag: "🇮🇳",
    continent: "Asia",
    region: "South Asia",
    capital: "New Delhi / Thiruvananthapuram",
    currency: "INR (₹)",
    localTime: "UTC+5:30 (IST)",
    language: "Hindi, English, Malayalam",
    climate: "Tropical tropical monsoon, lush and warm",
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=85&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80&fit=crop"
    ],
    description: "God's Own Country. Serene palm-fringed backwaters of Alleppey, emerald tea terraces of Munnar, historic spice ports of Kochi, and ancient Ayurvedic wellness sanctuaries.",
    visaDifficulty: "Instant eVisa",
    approvalRate: 99.3,
    averageProcessingTime: "48–72 Hours",
    startingPrice: 25,
    featured: false,
    popularFor: ["e-Tourist Visa (30 Days / 1 Yr / 5 Yrs)", "Alleppey Houseboat Cruises", "Ayurvedic Healing", "Spice Plantations"],
    visaTypes: [
      {
        id: "in-etourist-30",
        name: "e-Tourist Visa (30 Days)",
        badge: "Short Escape",
        stayDuration: "30 Days Double Entry",
        validity: "30 Days from date of first arrival",
        entryType: "Multiple Entry",
        governmentFee: 25,
        conciergeFee: 24,
        processingDaysStandard: 3,
        processingDaysExpress: 1,
        requirements: [
          "Passport copy in PDF (minimum 6 months validity, 2 blank pages)",
          "Recent front-facing square photo with white background",
          "Brief arrival port details (e.g. Cochin International Airport - COK)"
        ],
        eligibilityNotes: "Available for citizens of 165+ nations. Enter via 29 designated international airports and 5 seaports.",
        recommendedFor: "Houseboat cruises, yoga retreats, and tourist journeys."
      },
      {
        id: "in-etourist-1yr",
        name: "e-Tourist Visa (1 Year)",
        badge: "Multiple Journeys",
        stayDuration: "Up to 90 Days per visit (180 for US/UK/Canada/Japan)",
        validity: "365 Days Multiple Entry",
        entryType: "Multiple Entry",
        governmentFee: 40,
        conciergeFee: 35,
        processingDaysStandard: 3,
        processingDaysExpress: 1,
        requirements: [
          "Passport scan with 6 months validity",
          "Digital color photo"
        ],
        eligibilityNotes: "Multiple entries allowed throughout the entire year.",
        recommendedFor: "Frequent visitors and long-term Ayurvedic treatment travelers."
      }
    ],
    requiredDocuments: [
      {
        title: "Passport Bio Page Scan",
        description: "Scanned copy of the passport bio page containing personal particulars and photograph.",
        isMandatory: true,
        format: "PDF format (10KB to 300KB)"
      },
      {
        title: "Square Digital Photograph",
        description: "Equal height and width, front view, plain white background, no shadows.",
        isMandatory: true,
        format: "JPEG (minimum 350x350 pixels)"
      }
    ],
    consularSteps: [
      {
        step: 1,
        title: "Online e-Intake",
        description: "Fill personal details and upload square photo.",
        duration: "5 Minutes"
      },
      {
        step: 2,
        title: "Government of India Processing",
        description: "Clearance by Indian Bureau of Immigration.",
        duration: "48–72 Hours"
      },
      {
        step: 3,
        title: "Electronic Travel Authorization (ETA)",
        description: "Official ETA certificate with barcode issued and emailed.",
        duration: "Instant delivery upon grant"
      }
    ],
    jurisdictions: [
      {
        city: "New Delhi",
        country: "India",
        address: "Ministry of Home Affairs, Bureau of Immigration, New Delhi",
        phone: "+91 11 2430 0666",
        email: "india-evisa@foxico.travel",
        appointmentWaitDays: 1,
        jurisdictionCovers: "Nationwide e-Visa Gateway"
      }
    ],
    interviewTips: [
      {
        question: "No interview required for Indian e-Tourist visas",
        advice: "The e-Tourist visa is 100% online. Simply carry the printed ETA and present it at the e-Visa counter at the airport for biometrics stamping."
      }
    ],
    faqs: [
      {
        question: "Can I enter through Cochin or Trivandrum airport in Kerala?",
        answer: "Yes! Both Cochin (COK) and Thiruvananthapuram (TRV) international airports have dedicated e-Visa biometrics immigration counters."
      }
    ],
    travelerReviews: [
      {
        author: "Mei-Ling Chen",
        passportOrigin: "Taiwan",
        visaApproved: "India e-Tourist (1 Year)",
        processingTimeTaken: "36 Hours",
        rating: 5,
        comment: "Received my Indian e-Visa approval in just under 2 days. The houseboat cruise through Alleppey backwaters was the highlight of my year.",
        date: "September 8, 2026"
      }
    ],
    customsAlert: "Strict prohibition of satellite phones (e.g. Iridium/Thuraya) without prior license from Department of Telecommunications.",
    healthRequirements: "Yellow fever certificate required if arriving from infected countries."
  },
  {
    id: "peru",
    slug: "peru",
    name: "Peru",
    countryCode: "PE",
    flag: "🇵🇪",
    continent: "South America",
    region: "Andean South America",
    capital: "Lima",
    currency: "PEN (S/.)",
    localTime: "UTC-5 (PET)",
    language: "Spanish & Quechua",
    climate: "Andean mountain highlands, coastal mist, and Amazonian rainforest",
    heroImage: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1920&q=85&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1589802829985-817e51171b92?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=800&q=80&fit=crop"
    ],
    description: "The mystical lost citadel of Machu Picchu, colonial plazas of Cusco, soaring Sacred Valley peaks, and world-renowned gastronomy in Lima. Most international travelers enjoy visa-free entry or straightforward digital processing.",
    visaDifficulty: "Visa on Arrival",
    approvalRate: 99.7,
    averageProcessingTime: "Visa Free / Instant on Arrival",
    startingPrice: 30,
    featured: false,
    popularFor: ["Machu Picchu Inca Trail Permits", "Sacred Valley & Cusco", "Peruvian Gastronomy", "Lake Titicaca & Amazon"],
    visaTypes: [
      {
        id: "pe-tourist-voa",
        name: "Tourist Entry Permit (TAM Virtual)",
        badge: "Visa-Free for 90+ Nations",
        stayDuration: "Up to 90 Days",
        validity: "Granted at Border / Airport",
        entryType: "Single Entry",
        governmentFee: 0,
        conciergeFee: 29,
        processingDaysStandard: 1,
        processingDaysExpress: 1,
        requirements: [
          "Passport valid for at least 6 months",
          "Proof of onward or return flight",
          "Optional Inca Trail & Machu Picchu authorized permit registration"
        ],
        eligibilityNotes: "Citizens of the US, Canada, EU, UK, Australia, New Zealand, Japan, and Latin America enter visa-free.",
        recommendedFor: "Trekkers, archaeology lovers, and culinary travelers."
      }
    ],
    requiredDocuments: [
      {
        title: "Passport with 6 Months Validity",
        description: "Presented at immigration at Jorge Chávez International Airport (LIM).",
        isMandatory: true,
        format: "Physical Passport"
      },
      {
        title: "Official Machu Picchu Entry Ticket / Inca Trail Permit",
        description: "Must match exact passport name and passport number. Limited strictly to daily quotas.",
        isMandatory: true,
        format: "Government Permit Voucher"
      }
    ],
    consularSteps: [
      {
        step: 1,
        title: "Eligibility Audit",
        description: "Confirm visa-free status and reserve official Inca Trail / Machu Picchu government circuit passes.",
        duration: "Instant"
      },
      {
        step: 2,
        title: "Electronic Migration Card (TAM)",
        description: "Automated digital entry registration at Lima airport.",
        duration: "Airport arrival"
      }
    ],
    jurisdictions: [
      {
        city: "Lima",
        country: "Peru",
        address: "Superintendencia Nacional de Migraciones, Av. España 734, Breña, Lima",
        phone: "+51 1 200 1000",
        email: "peru-consular@foxico.travel",
        appointmentWaitDays: 1,
        jurisdictionCovers: "National Migrations Bureau"
      }
    ],
    interviewTips: [
      {
        question: "How many days will you spend in Peru?",
        advice: "Mention your complete itinerary including Lima, Cusco, and Sacred Valley."
      }
    ],
    faqs: [
      {
        question: "Do I need a separate permit for Machu Picchu?",
        answer: "Yes! While visa entry to Peru is visa-free for most, Machu Picchu entry and the Inca Trail require strictly timed government permits which Foxico secures in advance."
      }
    ],
    travelerReviews: [
      {
        author: "Camila Santos",
        passportOrigin: "Brazil",
        visaApproved: "Tourist TAM Permit (90 Days)",
        processingTimeTaken: "Instant at Border",
        rating: 5,
        comment: "Entering Peru was totally seamless. Foxico had our Inca Trail Circuit 2 permits bundled with our itinerary. The sunrise over the Sun Gate was magical.",
        date: "October 8, 2026"
      }
    ],
    customsAlert: "Strict heritage laws. Export of authentic pre-Columbian pottery, fossils, or artifacts is strictly prohibited.",
    healthRequirements: "Yellow fever vaccine strongly advised if venturing into the Peruvian Amazon basin (Puerto Maldonado/Iquitos)."
  }
];

export function getCountryBySlug(slug: string): VisaCountry | undefined {
  return VISA_COUNTRIES.find((c) => c.slug.toLowerCase() === slug.toLowerCase() || c.id.toLowerCase() === slug.toLowerCase());
}
