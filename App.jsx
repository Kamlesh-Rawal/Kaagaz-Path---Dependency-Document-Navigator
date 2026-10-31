import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  FileText, CheckCircle2, AlertTriangle, Clock, ArrowRight, Shield, Download,
  Volume2, Eye, Search, Layers, BookOpen, UserCheck, HelpCircle, ChevronRight,
  Info, Sparkles, RefreshCw, Edit3, Plus, Trash2, Send, Check, Printer,
  Share2, ArrowLeft, Building2, MapPin, ExternalLink, Moon, Sun, Globe,
  FileCheck, AlertCircle, Award, Compass, Lock, Sliders, PlayCircle
} from 'lucide-react';

// --- MULTILINGUAL TRANSLATIONS & DICTIONARY ---
const TRANSLATIONS = {
  en: {
    appTitle: "Kaagaz Path",
    tagline: "AI-Powered Document Dependency Solver for Indian Citizens",
    navDashboard: "Dashboard",
    navSolver: "Dependency Solver",
    navSchemes: "Schemes & Services",
    navDocuments: "My Documents",
    navJourneys: "My Journeys",
    navAssistant: "AI Assistant",
    navDrafts: "Application Drafts",
    navAdmin: "Admin Rule Desk",
    navHelp: "Help & FAQs",
    availableDocs: "Documents Ready",
    missingDocs: "Missing Prerequisites",
    activeJourneys: "Active Journeys",
    servicesCatalog: "Verified Services",
    quickStart: "Quick Start Dependency Check",
    generatePath: "Calculate Document Path (DAG)",
    startJourney: "Start This Journey",
    statusAvailable: "Available",
    statusMissing: "Missing",
    statusInProgress: "In Progress",
    statusNotSure: "Not Sure",
    prerequisites: "Prerequisites Required",
    issuingAuthority: "Issuing Authority",
    jurisdiction: "Jurisdiction",
    disclaimerDemo: "Notice: Sample illustrative demo data for hackathon demonstration. Not an official legal authority.",
    stepOrder: "Actionable Step Sequence",
    printChecklist: "Print / Save as PDF",
    listenAudio: "Read Aloud (TTS)",
    speakStopping: "Stop Audio",
    whyNeeded: "Why is this required?",
    alternatives: "Accepted Alternatives",
    blockedNote: "Blocked until prerequisites are acquired",
    readyNote: "Ready to apply immediately",
    completedNote: "Completed",
    adminBadge: "Admin Portal",
    switchLanguage: "Language",
    toggleContrast: "High Contrast",
    fontSize: "Text Size"
  },
  hi: {
    appTitle: "कागज़ पथ",
    tagline: "नागरिकों के लिए एआई-संचालित दस्तावेज़ निर्भरता सॉल्वर",
    navDashboard: "डैशबोर्ड",
    navSolver: "निर्भरता सॉल्वर",
    navSchemes: "योजनाएं व सेवाएं",
    navDocuments: "मेरे दस्तावेज़",
    navJourneys: "मेरी यात्राएं",
    navAssistant: "एआई सहायक",
    navDrafts: "आवेदन पत्र प्रारूप",
    navAdmin: "व्यवस्थापक (Admin)",
    navHelp: "सहायता केंद्र",
    availableDocs: "उपलब्ध दस्तावेज़",
    missingDocs: "अपेक्षित पूर्वापेक्षाएँ",
    activeJourneys: "सक्रिय यात्राएं",
    servicesCatalog: "प्रमाणित सेवाएं",
    quickStart: "त्वरित दस्तावेज़ मार्ग जाँच",
    generatePath: "दस्तावेज़ मार्ग की गणना करें (DAG)",
    startJourney: "यह यात्रा शुरू करें",
    statusAvailable: "उपलब्ध है",
    statusMissing: "अनुपलब्ध (चाहिए)",
    statusInProgress: "प्रक्रिया में",
    statusNotSure: "पता नहीं",
    prerequisites: "आवश्यक पूर्व-दस्तावेज़",
    issuingAuthority: "जारीकर्ता प्राधिकरण",
    jurisdiction: "अधिकार क्षेत्र",
    disclaimerDemo: "सूचना: प्रदर्शनी एवं हैकथॉन हेतु नमूना डेटा। यह आधिकारिक कानूनी घोषणा नहीं है।",
    stepOrder: "कार्रवाई योग्य चरण क्रम",
    printChecklist: "प्रिंट / PDF सहेजें",
    listenAudio: "बोलकर सुनें (TTS)",
    speakStopping: "ऑडियो रोकें",
    whyNeeded: "यह क्यों आवश्यक है?",
    alternatives: "स्वीकृत विकल्प",
    blockedNote: "पूर्व-दस्तावेज़ मिलने तक अवरुद्ध",
    readyNote: "तुरंत आवेदन के लिए तैयार",
    completedNote: "पूर्ण हुआ",
    adminBadge: "व्यवस्थापक पोर्टल",
    switchLanguage: "भाषा",
    toggleContrast: "उच्च कंट्रास्ट",
    fontSize: "अक्षर आकार"
  },
  kn: {
    appTitle: "ಕಾಗದ ಪಥ",
    tagline: "ಭಾರತೀಯ ನಾಗರಿಕರಿಗಾಗಿ AI-ಚಾಲಿತ ದಾಖಲೆ ಅವಲಂಬನೆ ಪರಿಹಾರಕ",
    navDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    navSolver: "ಅವಲಂಬನೆ ಪರಿಹಾರಕ",
    navSchemes: "ಯೋಜನೆಗಳು & ಸೇವೆಗಳು",
    navDocuments: "ನನ್ನ ದಾಖಲೆಗಳು",
    navJourneys: "ನನ್ನ ಪ್ರಯಾಣಗಳು",
    navAssistant: "AI ಸಹಾಯಕ",
    navDrafts: "ಅರ್ಜಿ ಕರಡುಗಳು",
    navAdmin: "ನಿರ್ವಾಹಕ ಡೆಸ್ಕ್",
    navHelp: "ಸಹಾಯ ಮತ್ತು FAQ",
    availableDocs: "ಲಭ್ಯವಿರುವ ದಾಖಲೆಗಳು",
    missingDocs: "ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳು",
    activeJourneys: "ಸಕ್ರಿಯ ಪ್ರಕ್ರಿಯೆಗಳು",
    servicesCatalog: "ಪರಿಶೀಲಿಸಿದ ಸೇವೆಗಳು",
    quickStart: "ತ್ವರಿತ ದಾಖಲೆ ಪರಿಶೀಲನೆ",
    generatePath: "ದಾಖಲೆ ಹಾದಿ ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ (DAG)",
    startJourney: "ಪ್ರಯಾಣ ಪ್ರಾರಂಭಿಸಿ",
    statusAvailable: "ಲಭ್ಯವಿದೆ",
    statusMissing: "ಲಭ್ಯವಿಲ್ಲ",
    statusInProgress: "ಪ್ರಗತಿಯಲ್ಲಿದೆ",
    statusNotSure: "ಖಚಿತವಿಲ್ಲ",
    prerequisites: "ಪೂರ್ವಭಾವಿ ದಾಖಲೆಗಳು",
    issuingAuthority: "ನೀಡುವ ಪ್ರಾಧಿಕಾರ",
    jurisdiction: "ವ್ಯಾಪ್ತಿ",
    disclaimerDemo: "ಗಮನಿಸಿ: ಹ್ಯಾಕಥಾನ್ ಪ್ರಾತ್ಯಕ್ಷಿಕೆಗಾಗಿ ಸಚಿತ್ರ ಮಾದರಿ ಡೇಟಾ. ಅಧಿಕೃತ ಕಾನೂನು ಮಾಹಿತಿ ಅಲ್ಲ.",
    stepOrder: "ಕ್ರಮಬದ್ಧ ಹಂತಗಳು",
    printChecklist: "ಮುದ್ರಿಸಿ / PDF ಉಳಿಸಿ",
    listenAudio: "ಓದಿ ಕೇಳಿ (TTS)",
    speakStopping: "ಧ್ವನಿ ನಿಲ್ಲಿಸಿ",
    whyNeeded: "ಇದು ಏಕೆ ಬೇಕು?",
    alternatives: "ಪರ್ಯಾಯ ದಾಖಲೆಗಳು",
    blockedNote: "ಪೂರ್ವ ದಾಖಲೆಗಳು ಸಿಗುವವರೆಗೆ ತಡೆಹಿಡಿಯಲಾಗಿದೆ",
    readyNote: "ಈಗಲೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಸಿದ್ಧ",
    completedNote: "ಪೂರ್ಣಗೊಂಡಿದೆ",
    adminBadge: "ನಿರ್ವಾಹಕ ಪೋರ್ಟಲ್",
    switchLanguage: "ಭಾಷೆ",
    toggleContrast: "ಹೆಚ್ಚಿನ ಕಾಂಟ್ರಾಸ್ಟ್",
    fontSize: "ಅಕ್ಷರ ಗಾತ್ರ"
  }
};

// --- INITIAL MASTER DATABASE: DOCUMENTS CATALOGUE ---
const MASTER_DOCUMENTS = [
  {
    id: "DOC_AADHAAR",
    name: "Aadhaar Card / Identification Proof",
    issuingAuthority: "UIDAI (Govt of India)",
    jurisdiction: "All India",
    purpose: "Primary biometric identity and proof of personal residence.",
    prerequisites: [],
    alternatives: ["Voter ID Card", "Passport"],
    officialUrl: "https://uidai.gov.in",
    verifiedDate: "2026-02-15",
    version: "2.4"
  },
  {
    id: "DOC_RATION_CARD",
    name: "Ration Card (BPL / APL / Antyodaya)",
    issuingAuthority: "Food & Civil Supplies Dept",
    jurisdiction: "State-specific (Karnataka/Maharashtra/Delhi)",
    purpose: "Validates family composition, household categorization, and subsidized food grain entitlement.",
    prerequisites: ["DOC_AADHAAR", "DOC_RESIDENCE_PROOF", "DOC_FAMILY_PHOTO"],
    alternatives: [],
    officialUrl: "https://ahara.kar.nic.in",
    verifiedDate: "2026-01-20",
    version: "3.1"
  },
  {
    id: "DOC_RESIDENCE_PROOF",
    name: "Domicile / Residence Certificate",
    issuingAuthority: "Tahsildar / Revenue Department",
    jurisdiction: "State-specific",
    purpose: "Certifies continuous lawful residency in the respective state for 7+ years.",
    prerequisites: ["DOC_AADHAAR", "DOC_ELECTRICITY_BILL"],
    alternatives: ["Rental Agreement (Registered)", "Village Accountant Inspection Certificate"],
    officialUrl: "https://nadakacheri.karnataka.gov.in",
    verifiedDate: "2026-02-01",
    version: "1.9"
  },
  {
    id: "DOC_ELECTRICITY_BILL",
    name: "Recent Electricity / Utility Bill (Past 3 months)",
    issuingAuthority: "Electricity Supply Corporation (e.g. BESCOM/MSEDCL)",
    jurisdiction: "District/Local",
    purpose: "Proof of exact residential address and occupancy verification.",
    prerequisites: [],
    alternatives: ["Water Supply Bill", "LPG Gas Passbook"],
    officialUrl: "https://bescom.karnataka.gov.in",
    verifiedDate: "2025-11-12",
    version: "1.0"
  },
  {
    id: "DOC_FAMILY_PHOTO",
    name: "Passport-size Joint Family Photograph",
    issuingAuthority: "Applicant Self-Generated",
    jurisdiction: "All India",
    purpose: "Physical visual proof of all members residing in the applicant's single household.",
    prerequisites: [],
    alternatives: [],
    officialUrl: "https://services.india.gov.in",
    verifiedDate: "2025-08-10",
    version: "1.0"
  },
  {
    id: "DOC_SALARY_SLIP_OR_PATTA",
    name: "Income Proof (Salary Slip / Agricultural Land RTC/Pahani)",
    issuingAuthority: "Employer OR Revenue Department (Bhoomi)",
    jurisdiction: "State-specific",
    purpose: "Demonstrates household annual gross receipts from agriculture or organized labor.",
    prerequisites: [],
    alternatives: ["Self-declaration of agricultural turnover signed by Village Accountant"],
    officialUrl: "https://bhoomi.karnataka.gov.in",
    verifiedDate: "2026-01-11",
    version: "2.0"
  },
  {
    id: "DOC_INCOME_CERT",
    name: "Official Income Certificate (Revenue Dept)",
    issuingAuthority: "Revenue Dept / Tahsildar Office (Sakala)",
    jurisdiction: "State Revenue Dept",
    purpose: "Determines eligibility for welfare subsidies, scholarships, fee concessions, and quota schemes.",
    prerequisites: ["DOC_AADHAAR", "DOC_RESIDENCE_PROOF", "DOC_SALARY_SLIP_OR_PATTA", "DOC_RATION_CARD"],
    alternatives: [],
    officialUrl: "https://sakala.kar.nic.in",
    verifiedDate: "2026-02-18",
    version: "4.0"
  },
  {
    id: "DOC_SCHOOL_TC",
    name: "School Leaving Certificate / Transfer Certificate (TC)",
    issuingAuthority: "Recognized Educational Institution / Board of Education",
    jurisdiction: "Institutional",
    purpose: "Documents early educational record and historical recorded community/caste.",
    prerequisites: [],
    alternatives: ["Bonafide Student Certificate with caste mention"],
    officialUrl: "https://schooleducation.gov.in",
    verifiedDate: "2025-09-05",
    version: "1.1"
  },
  {
    id: "DOC_PARENT_CASTE_CERT",
    name: "Father / Mother Caste Certificate",
    issuingAuthority: "Revenue Dept (Tahsildar)",
    jurisdiction: "State-specific",
    purpose: "Pedigree evidence establishing hereditary lineage for reservation verification.",
    prerequisites: ["DOC_AADHAAR"],
    alternatives: ["Real Paternal Blood Relative's Valid Caste Certificate + Genealogy Tree"],
    officialUrl: "https://nadakacheri.karnataka.gov.in",
    verifiedDate: "2026-01-05",
    version: "3.2"
  },
  {
    id: "DOC_CASTE_CERT",
    name: "Caste / Community Certificate (SC / ST / OBC / SEBC)",
    issuingAuthority: "Tahsildar / Sub-Divisional Magistrate",
    jurisdiction: "District Administration",
    purpose: "Official certification of caste classification for affirmative action and constitutional rights.",
    prerequisites: ["DOC_AADHAAR", "DOC_RESIDENCE_PROOF", "DOC_PARENT_CASTE_CERT", "DOC_SCHOOL_TC"],
    alternatives: [],
    officialUrl: "https://services.india.gov.in",
    verifiedDate: "2026-02-14",
    version: "4.1"
  },
  {
    id: "DOC_COLLEGE_BONAFIDE",
    name: "College Admission Receipt & Bonafide Letter",
    issuingAuthority: "University / Recognized College Registrar",
    jurisdiction: "Higher Education Dept",
    purpose: "Proof of active current enrollment in an approved degree or diploma course.",
    prerequisites: ["DOC_SCHOOL_TC"],
    alternatives: ["College ID Card with Principal Stamp"],
    officialUrl: "https://dce.karnataka.gov.in",
    verifiedDate: "2026-01-30",
    version: "1.5"
  },
  {
    id: "DOC_BANK_PASSBOOK",
    name: "Bank Passbook with Aadhaar-Seeded NPCI Mapping",
    issuingAuthority: "Nationalized Bank / Post Office Payment Bank",
    jurisdiction: "RBI / NPCI",
    purpose: "Enables direct benefit transfer (DBT) of government financial aid and scholarship stipend.",
    prerequisites: ["DOC_AADHAAR"],
    alternatives: [],
    officialUrl: "https://npci.org.in",
    verifiedDate: "2026-02-10",
    version: "2.1"
  },
  {
    id: "DOC_SCHOLARSHIP_APPLICATION",
    name: "Post-Matric National / State Scholarship (SSP / NSP)",
    issuingAuthority: "Social Welfare Dept / Ministry of Minority & Tribal Affairs",
    jurisdiction: "National / State Combined",
    purpose: "Full fee reimbursement and maintenance allowance for post-secondary education.",
    prerequisites: ["DOC_AADHAAR", "DOC_INCOME_CERT", "DOC_CASTE_CERT", "DOC_COLLEGE_BONAFIDE", "DOC_BANK_PASSBOOK"],
    alternatives: [],
    officialUrl: "https://ssp.postmatric.karnataka.gov.in",
    verifiedDate: "2026-02-25",
    version: "5.0"
  }
];

// --- MASTER SERVICES / GOALS FOR JOURNEYS ---
const MASTER_SERVICES = [
  {
    id: "SRV_INCOME",
    targetDocId: "DOC_INCOME_CERT",
    title: "Income Certificate Readiness",
    category: "Revenue & Social Welfare",
    jurisdiction: "Karnataka (Nadakacheri / Sakala)",
    estimatedDays: "14 - 21 Days",
    department: "Department of Revenue",
    summary: "Essential for availing state fee exemptions, housing subsidies, and poverty-line welfare schemes.",
    icon: "Building2"
  },
  {
    id: "SRV_CASTE",
    targetDocId: "DOC_CASTE_CERT",
    title: "Caste / Community Certificate Readiness",
    category: "Affirmative Action & Quota",
    jurisdiction: "Karnataka / Pan-India",
    estimatedDays: "21 - 30 Days",
    department: "Social Welfare & Backward Classes Dept",
    summary: "Guarantees formal proof of category membership for education seats and government appointments.",
    icon: "Award"
  },
  {
    id: "SRV_SCHOLARSHIP",
    targetDocId: "DOC_SCHOLARSHIP_APPLICATION",
    title: "Post-Matric Scholarship Readiness (SSP)",
    category: "Higher Education Subsidy",
    jurisdiction: "State Scholarship Portal (SSP / NSP)",
    estimatedDays: "30 - 45 Days",
    department: "Department of Higher Education & Minority Welfare",
    summary: "Complete financial grant covering tuition and hostel allowances for eligible students.",
    icon: "BookOpen"
  }
];

// --- TOPOLOGICAL SORT & DEPENDENCY GRAPH ALGORITHM (DAG Engine) ---
function solveDocumentDependencies(targetDocId, userOwnedDocIds, docCatalogue) {
  const docMap = new Map();
  docCatalogue.forEach(d => docMap.set(d.id, d));

  const targetDoc = docMap.get(targetDocId);
  if (!targetDoc) return null;

  const allNeededIds = new Set();
  const visitedForCollection = new Set();

  function collectPrereqs(id) {
    if (visitedForCollection.has(id)) return;
    visitedForCollection.add(id);
    allNeededIds.add(id);
    const doc = docMap.get(id);
    if (doc && doc.prerequisites) {
      doc.prerequisites.forEach(pId => collectPrereqs(pId));
    }
  }
  collectPrereqs(targetDocId);

  const inDegree = new Map();
  const adjacency = new Map();

  allNeededIds.forEach(id => {
    inDegree.set(id, 0);
    adjacency.set(id, []);
  });

  allNeededIds.forEach(id => {
    const doc = docMap.get(id);
    if (doc && doc.prerequisites) {
      doc.prerequisites.forEach(pId => {
        if (allNeededIds.has(pId)) {
          adjacency.get(pId).push(id);
          inDegree.set(id, (inDegree.get(id) || 0) + 1);
        }
      });
    }
  });

  const queue = [];
  inDegree.forEach((deg, id) => {
    if (deg === 0) queue.push(id);
  });

  const sortedOrder = [];
  while (queue.length > 0) {
    const current = queue.shift();
    sortedOrder.push(current);

    const neighbors = adjacency.get(current) || [];
    for (const neighbor of neighbors) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  const hasCycle = sortedOrder.length !== allNeededIds.size;

  const stepsPlan = [];
  const ownedSet = new Set(userOwnedDocIds);

  sortedOrder.forEach((docId, index) => {
    const doc = docMap.get(docId);
    const isOwned = ownedSet.has(docId);
    const directPrereqs = doc.prerequisites || [];
    
    const unmetPrereqs = directPrereqs.filter(pId => !ownedSet.has(pId));
    const isBlocked = !isOwned && unmetPrereqs.length > 0;
    const isReady = !isOwned && unmetPrereqs.length === 0;

    stepsPlan.push({
      stepNumber: index + 1,
      docId: doc.id,
      name: doc.name,
      issuingAuthority: doc.issuingAuthority,
      jurisdiction: doc.jurisdiction,
      purpose: doc.purpose,
      officialUrl: doc.officialUrl,
      prerequisites: directPrereqs,
      unmetPrereqs: unmetPrereqs,
      alternatives: doc.alternatives || [],
      isOwned: isOwned,
      isBlocked: isBlocked,
      isReady: isReady,
      status: isOwned ? "AVAILABLE" : isBlocked ? "BLOCKED" : "READY_TO_APPLY"
    });
  });

  return {
    targetDocId,
    targetDocName: targetDoc.name,
    hasCycle,
    allNodesCount: allNeededIds.size,
    totalSteps: stepsPlan.length,
    stepsPlan,
    missingCount: stepsPlan.filter(s => !s.isOwned).length,
    availableCount: stepsPlan.filter(s => s.isOwned).length
  };
}

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [lang, setLang] = useState("en");
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [speaking, setSpeaking] = useState(false);

  const [docCatalogue, setDocCatalogue] = useState(MASTER_DOCUMENTS);
  const [userDocsStatus, setUserDocsStatus] = useState({
    DOC_AADHAAR: "AVAILABLE",
    DOC_FAMILY_PHOTO: "AVAILABLE",
    DOC_ELECTRICITY_BILL: "AVAILABLE",
    DOC_SCHOOL_TC: "IN_PROGRESS"
  });

  const [selectedServiceId, setSelectedServiceId] = useState("SRV_INCOME");
  const [selectedState, setSelectedState] = useState("Karnataka");
  const [solverResult, setSolverResult] = useState(null);

  const [savedJourneys, setSavedJourneys] = useState([
    {
      id: "JRN_101",
      serviceId: "SRV_INCOME",
      title: "Income Certificate Readiness",
      state: "Karnataka",
      createdAt: "2026-02-28",
      steps: [
        { id: "DOC_AADHAAR", status: "COMPLETED", name: "Aadhaar Card" },
        { id: "DOC_ELECTRICITY_BILL", status: "COMPLETED", name: "Recent Electricity Bill" },
        { id: "DOC_RESIDENCE_PROOF", status: "IN_PROGRESS", name: "Domicile / Residence Certificate" },
        { id: "DOC_SALARY_SLIP_OR_PATTA", status: "TO_DO", name: "Income Proof / Land RTC" },
        { id: "DOC_RATION_CARD", status: "BLOCKED", name: "Ration Card (BPL/APL)" },
        { id: "DOC_INCOME_CERT", status: "BLOCKED", name: "Income Certificate" }
      ]
    }
  ]);

  const [chatMessages, setChatMessages] = useState([
    {
      sender: "assistant",
      text: "Namaste! I am your Kaagaz Path AI Assistant. I can explain why certain documents are required, provide verified alternative documents, and guide you through Nadakacheri or Sakala procedures in simple language.",
      time: "10:00 AM"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);

  const [draftType, setDraftType] = useState("REQUEST_LETTER");
  const [draftForm, setDraftForm] = useState({
    applicantName: "Ramesh Gowda",
    guardianName: "Shri Manjunath Gowda",
    address: "Ward 4, Hunasuru Taluk, Mysuru District, Karnataka",
    targetAuthority: "The Tahsildar, Taluk Administrative Complex, Hunasuru",
    documentTarget: "Income Certificate for Fee Reimbursement",
    explanationReason: "Delayed RTC revenue record update due to recent ancestral partition."
  });
  const [generatedDraftText, setGeneratedDraftText] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    runSolverEngine("SRV_INCOME");
  }, [userDocsStatus, docCatalogue]);

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const cleanText = text.replace(/<[^>]*>?/gm, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'kn' ? 'kn-IN' : 'en-IN';
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const runSolverEngine = (srvId) => {
    const srv = MASTER_SERVICES.find(s => s.id === srvId) || MASTER_SERVICES[0];
    const ownedIds = Object.keys(userDocsStatus).filter(k => userDocsStatus[k] === "AVAILABLE");
    const result = solveDocumentDependencies(srv.targetDocId, ownedIds, docCatalogue);
    setSolverResult(result);
  };

  const handleUpdateDocStatus = (docId, newStatus) => {
    setUserDocsStatus(prev => ({
      ...prev,
      [docId]: newStatus
    }));
  };

  const handleSaveJourney = () => {
    if (!solverResult) return;
    const srv = MASTER_SERVICES.find(s => s.id === selectedServiceId);
    const newJourney = {
      id: `JRN_${Date.now().toString().slice(-4)}`,
      serviceId: selectedServiceId,
      title: srv ? srv.title : solverResult.targetDocName,
      state: selectedState,
      createdAt: new Date().toISOString().split('T')[0],
      steps: solverResult.stepsPlan.map(s => ({
        id: s.docId,
        name: s.name,
        status: s.isOwned ? "COMPLETED" : s.isReady ? "IN_PROGRESS" : "BLOCKED"
      }))
    };
    setSavedJourneys(prev => [newJourney, ...prev]);
    setActiveTab("journeys");
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const query = chatInput.trim();
    const newMsg = { sender: "user", text: query, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, newMsg]);
    setChatInput("");
    setAiTyping(true);

    setTimeout(() => {
      let reply = "";
      const lower = query.toLowerCase();

      if (lower.includes("income") || lower.includes("आय") || lower.includes("ಆದಾಯ")) {
        reply = lang === 'kn'
          ? "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರಕ್ಕೆ ಮುಖ್ಯವಾಗಿ ಆಧಾರ್ ಕಾರ್ಡ್, ನಿವಾಸ ಪ್ರಮಾಣಪತ್ರ, ಮತ್ತು ಸಂಬಳದ ಚೀಟಿ ಅಥವಾ ಜಮೀನಿನ ಪಹಣಿ (RTC) ಅಗತ್ಯವಿದೆ. ನಿಮ್ಮ ಪಡಿತರ ಚೀಟಿ ಇದ್ದರೆ ಪ್ರಕ್ರಿಯೆ ಇನ್ನಷ್ಟು ಸುಲಭವಾಗುತ್ತದೆ."
          : lang === 'hi'
          ? "आय प्रमाण पत्र हेतु आधार कार्ड, अधिवास/निवास प्रमाण पत्र, तथा वेतन पर्ची या भूमि रिकॉर्ड (खतौनी/RTC) अनिवार्य है। यदि आपके पास राशन कार्ड है तो सत्यापन जल्दी होता है।"
          : "For an Income Certificate, you strictly need: (1) Identity Proof, (2) Domicile/Residence proof, and (3) Land Record (RTC) or Employer Salary Slip. Note: Sakala guarantees delivery within 21 working days in Karnataka.";
      } else if (lower.includes("caste") || lower.includes("जाति") || lower.includes("ಜಾತಿ")) {
        reply = lang === 'kn'
          ? "ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಲು ನಿಮ್ಮ ಶಾಲಾ ವರ್ಗಾವಣೆ ಪ್ರಮಾಣಪತ್ರ (TC) ಮತ್ತು ತಂದೆಯವರ ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ ಅತಿ ಮುಖ್ಯ. ತಂದೆಯ ದಾಖಲೆ ಲಭ್ಯವಿಲ್ಲದಿದ್ದರೆ ವಂಶಾವಳಿ ಪ್ರಮಾಣಪತ್ರದೊಂದಿಗೆ ತಹಶೀಲ್ದಾರ್ ವಿಚಾರಣೆ ನಡೆಸಬೇಕಾಗುತ್ತದೆ."
          : lang === 'hi'
          ? "जाति प्रमाण पत्र हेतु आवेदक का स्कूल ट्रांसफर सर्टिफिकेट (TC) तथा पिता/माता का वैध जाति प्रमाण पत्र आवश्यक है। वंशावली के आधार पर भी राजस्व कार्यालय में सत्यापन कराया जा सकता है।"
          : "Caste/Community Certificate requires School TC displaying recorded caste and your Parent's existing Caste Certificate. If unavailable, an official Genealogical Tree affidavit certified by the Revenue Inspector is mandatory.";
      } else if (lower.includes("alternative") || lower.includes("विकल्प") || lower.includes("ಪರ್ಯಾಯ")) {
        reply = "Official verified alternatives: If Electricity Bill is unavailable for residence proof, a registered Rental Agreement or Village Accountant Local Inspection Report is legally accepted under Revenue circulars.";
      } else if (lower.includes("guarantee") || lower.includes("approve") || lower.includes("गारंटी") || lower.includes("ಖಾತರಿ")) {
        reply = "Important Guardrail: Kaagaz Path is an informational advisory tool. We do NOT guarantee official certificate approvals or scheme disbursements. Final authority rests solely with the competent Revenue Magistrate or Tahsildar.";
      } else {
        reply = lang === 'kn'
          ? `ನಿಮ್ಮ ಪ್ರಶ್ನೆ "${query}" ಕುರಿತು ಪರಿಶೀಲಿಸಲಾಗಿದೆ. ಅಗತ್ಯ ದಾಖಲೆಗಳ ಸರಪಳಿಯನ್ನು ವೀಕ್ಷಿಸಲು 'Dependency Solver' ಟ್ಯಾಬ್ ಬಳಸಿ. ಸರ್ಕಾರಿ ಆದೇಶದ ನಿಯಮಗಳ ಪ್ರಕಾರವೇ ಹಂತಗಳನ್ನು ಪಾಲಿಸಿ.`
          : lang === 'hi'
          ? `आपके प्रश्न "${query}" हेतु: कृपया सुनिश्चित करें कि पहले आपके प्राथमिक दस्तावेज़ (पहचान एवं निवास प्रमाण) तैयार हों। 'Dependency Solver' टैब में जाकर क्रमबद्ध सूची देखें।`
          : `Regarding "${query}": Our verified rules database shows this relies on your primary root proofs (Identity & Residence). Please check the 'Dependency Solver' tab to view your exact topological action order.`;
      }

      setChatMessages(prev => [
        ...prev,
        {
          sender: "assistant",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setAiTyping(false);
    }, 600);
  };

  useEffect(() => {
    let text = "";
    if (draftType === "REQUEST_LETTER") {
      text = `To,
${draftForm.targetAuthority}

Subject: Formal Application for issuance of ${draftForm.documentTarget}

Respected Sir/Madam,

I, ${draftForm.applicantName}, son/daughter of ${draftForm.guardianName}, residing at ${draftForm.address}, respectfully state that I am an Indian citizen and a bona fide resident of this jurisdiction.

I urgently require the ${draftForm.documentTarget} for educational welfare / constitutional benefit entitlement. I have enclosed my primary identity proof and residential credentials.

Kindly process my application in accordance with the Citizen's Service Charter (Sakala / Right to Public Services Act).

Place: ____________________
Date: ${new Date().toLocaleDateString()}

Yours faithfully,

(${draftForm.applicantName})
Applicant Signature`;
    } else if (draftType === "SELF_DECLARATION") {
      text = `AFFIDAVIT / SELF-DECLARATION FORM
(Under Section 4(1) of Right to Services Act)

I, ${draftForm.applicantName}, aged about 22 years, S/o or D/o ${draftForm.guardianName}, currently residing at:
${draftForm.address}

Do hereby solemnly affirm and state on oath as follows:
1. That all particulars, family composition, and annual household income furnished for obtaining the ${draftForm.documentTarget} are true and correct to the best of my knowledge.
2. That I have not suppressed or misrepresented any material fact.
3. In case any declaration is found false or fraudulent at a later stage, I shall be liable for legal action under Sections 199 and 200 of the Indian Penal Code / Bharatiya Nyaya Sanhita.

DEPONENT

Verification:
Verified at this location on ${new Date().toLocaleDateString()} that the contents of this declaration are true.

Deponent Signature: _______________________`;
    } else {
      text = `EXPLANATION PETITION REGARDING MISSING / DELAYED PREREQUISITE

To,
${draftForm.targetAuthority}

Subject: Explanation regarding delay / unavailability of prerequisite for ${draftForm.documentTarget}

Respected Officer,

With reference to my pending application for ${draftForm.documentTarget}, I bring to your kind notice:
Reason for non-production of primary document:
"${draftForm.explanationReason}"

I request the competent revenue officer to conduct a spot verification through the Village Accountant / Revenue Inspector and accept my secondary verified affidavits in lieu thereof.

Enclosures Attached:
1. Proof of identity
2. Family Ration Card Copy
3. Local Gram Panchayat / Ward recommendation letter

Date: ${new Date().toLocaleDateString()}
Applicant: ${draftForm.applicantName}`;
    }
    setGeneratedDraftText(text);
  }, [draftType, draftForm]);

  const availableCount = Object.values(userDocsStatus).filter(s => s === "AVAILABLE").length;
  const missingCount = MASTER_DOCUMENTS.length - availableCount;

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        highContrast ? "bg-black text-yellow-300" : "bg-[#f8fafc] text-slate-800"
      }`}
      style={{ fontSize: `${fontScale * 100}%` }}
    >
      <header
        className={`sticky top-0 z-50 border-b shadow-sm ${
          highContrast
            ? "bg-black border-yellow-400"
            : "bg-[#064e3b] text-white border-teal-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-300 flex items-center justify-center text-teal-200">
              <FileCheck className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  {t.appTitle}
                </span>
                <span className="text-[10px] bg-teal-800/80 text-teal-200 font-semibold px-2 py-0.5 rounded-full border border-teal-600">
                  DAG v3.4
                </span>
              </div>
              <p className="text-xs text-teal-200/90 hidden sm:block truncate max-w-xs">
                {t.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/20">
              <Globe className="w-3.5 h-3.5 ml-1.5 mr-1 text-teal-200" />
              <button
                onClick={() => setLang("en")}
                className={`text-xs px-2 py-1 rounded font-medium transition ${
                  lang === "en" ? "bg-white text-emerald-950 shadow" : "text-teal-100 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("hi")}
                className={`text-xs px-2 py-1 rounded font-medium transition ${
                  lang === "hi" ? "bg-white text-emerald-950 shadow" : "text-teal-100 hover:text-white"
                }`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLang("kn")}
                className={`text-xs px-2 py-1 rounded font-medium transition ${
                  lang === "kn" ? "bg-white text-emerald-950 shadow" : "text-teal-100 hover:text-white"
                }`}
              >
                ಕನ್ನಡ
              </button>
            </div>

            <button
              onClick={() =>
                speakText(
                  `${t.appTitle}. ${t.tagline}. You are currently on the ${activeTab} page. There are ${availableCount} ready documents and ${missingCount} missing documents.`
                )
              }
              title={speaking ? t.speakStopping : t.listenAudio}
              className={`p-2 rounded-lg border text-xs flex items-center space-x-1 font-semibold transition ${
                speaking
                  ? "bg-amber-400 text-black border-amber-500 animate-pulse"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden md:inline">{speaking ? "Stop" : "TTS"}</span>
            </button>

            <button
              onClick={() => setHighContrast(!highContrast)}
              title={t.toggleContrast}
              className={`p-2 rounded-lg border text-xs transition ${
                highContrast
                  ? "bg-yellow-400 text-black border-yellow-500 font-bold"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }`}
            >
              <Eye className="w-4 h-4" />
            </button>

            <div className="hidden lg:flex items-center space-x-1 bg-white/10 rounded-lg p-0.5 border border-white/20">
              <button
                onClick={() => setFontScale(Math.max(0.85, fontScale - 0.1))}
                className="px-2 py-0.5 text-xs text-white hover:bg-white/20 rounded font-bold"
                title="Decrease Text Size"
              >
                A-
              </button>
              <button
                onClick={() => setFontScale(1)}
                className="px-1.5 py-0.5 text-[10px] text-teal-200"
              >
                100%
              </button>
              <button
                onClick={() => setFontScale(Math.min(1.3, fontScale + 0.1))}
                className="px-2 py-0.5 text-xs text-white hover:bg-white/20 rounded font-bold"
                title="Increase Text Size"
              >
                A+
              </button>
            </div>

            <button
              onClick={() => setActiveTab("admin")}
              className={`text-xs px-2.5 py-1.5 rounded-lg border font-semibold flex items-center space-x-1 transition ${
                activeTab === "admin"
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow"
                  : "bg-emerald-900/60 text-emerald-200 border-emerald-700 hover:bg-emerald-800"
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">{t.adminBadge}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav
          className={`flex overflow-x-auto space-x-1 pb-2 border-b no-scrollbar ${
            highContrast ? "border-yellow-400" : "border-slate-200"
          }`}
        >
          {[
            { id: "dashboard", label: t.navDashboard, icon: Compass },
            { id: "solver", label: t.navSolver, icon: Layers, highlight: true },
            { id: "schemes", label: t.navSchemes, icon: BookOpen },
            { id: "documents", label: t.navDocuments, icon: FileText },
            { id: "journeys", label: t.navJourneys, icon: CheckCircle2 },
            { id: "assistant", label: t.navAssistant, icon: Sparkles },
            { id: "drafts", label: t.navDrafts, icon: Edit3 },
            { id: "help", label: t.navHelp, icon: HelpCircle }
          ].map(tab => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? highContrast
                      ? "bg-yellow-400 text-black shadow-md font-bold"
                      : "bg-[#0d9488] text-white shadow-md shadow-teal-700/20"
                    : highContrast
                    ? "text-yellow-300 hover:bg-yellow-900/40"
                    : tab.highlight
                    ? "text-teal-800 bg-teal-50 hover:bg-teal-100 font-bold border border-teal-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-3 py-2 px-3.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="font-medium">{t.disclaimerDemo}</span>
          </div>
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-300 hidden sm:inline">
            Zero PII Stored
          </span>
        </div>

        <main className="mt-6 mb-16">
          {activeTab === "dashboard" && (
            <DashboardView
              t={t}
              userDocsStatus={userDocsStatus}
              availableCount={availableCount}
              missingCount={missingCount}
              savedJourneys={savedJourneys}
              services={MASTER_SERVICES}
              onNavigate={setActiveTab}
              onStartService={(srvId) => {
                setSelectedServiceId(srvId);
                runSolverEngine(srvId);
                setActiveTab("solver");
              }}
              highContrast={highContrast}
            />
          )}

          {activeTab === "solver" && (
            <DependencySolverView
              t={t}
              services={MASTER_SERVICES}
              selectedServiceId={selectedServiceId}
              setSelectedServiceId={setSelectedServiceId}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              solverResult={solverResult}
              runSolverEngine={runSolverEngine}
              docCatalogue={docCatalogue}
              userDocsStatus={userDocsStatus}
              onUpdateDocStatus={handleUpdateDocStatus}
              onSaveJourney={handleSaveJourney}
              highContrast={highContrast}
              onOpenAssistant={() => setActiveTab("assistant")}
            />
          )}

          {activeTab === "schemes" && (
            <SchemesDirectoryView
              t={t}
              services={MASTER_SERVICES}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectScheme={(srvId) => {
                setSelectedServiceId(srvId);
                runSolverEngine(srvId);
                setActiveTab("solver");
              }}
              highContrast={highContrast}
            />
          )}

          {activeTab === "documents" && (
            <MyDocumentsView
              t={t}
              docCatalogue={docCatalogue}
              userDocsStatus={userDocsStatus}
              onUpdateDocStatus={handleUpdateDocStatus}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              highContrast={highContrast}
            />
          )}

          {activeTab === "journeys" && (
            <JourneysTrackerView
              t={t}
              savedJourneys={savedJourneys}
              setSavedJourneys={setSavedJourneys}
              onStartNew={() => setActiveTab("solver")}
              highContrast={highContrast}
            />
          )}

          {activeTab === "assistant" && (
            <AIAssistantView
              t={t}
              messages={chatMessages}
              input={chatInput}
              setInput={setChatInput}
              onSend={handleSendMessage}
              isTyping={aiTyping}
              highContrast={highContrast}
              onSelectQuickPrompt={(prompt) => {
                setChatInput(prompt);
              }}
            />
          )}

          {activeTab === "drafts" && (
            <ApplicationDraftsView
              t={t}
              draftType={draftType}
              setDraftType={setDraftType}
              draftForm={draftForm}
              setDraftForm={setDraftForm}
              generatedText={generatedDraftText}
              highContrast={highContrast}
            />
          )}

          {activeTab === "admin" && (
            <AdminRulesView
              t={t}
              docCatalogue={docCatalogue}
              setDocCatalogue={setDocCatalogue}
              highContrast={highContrast}
            />
          )}

          {activeTab === "help" && (
            <HelpCenterView t={t} highContrast={highContrast} />
          )}
        </main>
      </div>
    </div>
  );
}

function DashboardView({
  t,
  availableCount,
  missingCount,
  savedJourneys,
  services,
  onNavigate,
  onStartService,
  highContrast
}) {
  return (
    <div className="space-y-6">
      <div
        className={`rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm border ${
          highContrast
            ? "bg-black border-yellow-400 text-yellow-300"
            : "bg-gradient-to-r from-[#064e3b] via-[#0f766e] to-[#134e4a] text-white border-teal-800"
        }`}
      >
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-teal-200 mb-3 border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Topological Sorting DAG Engine Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Solve Government Paperwork Without Confusion.
          </h1>
          <p className="mt-2 text-sm sm:text-base text-teal-100 max-w-2xl leading-relaxed">
            Kaagaz Path calculates prerequisite document dependencies for state certificates and schemes, showing you exactly what to obtain first and how to avoid blocked applications.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate("solver")}
              className="bg-white text-emerald-950 font-bold px-5 py-2.5 rounded-xl shadow-lg hover:bg-teal-50 transition flex items-center space-x-2 text-sm"
            >
              <span>{t.quickStart}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate("assistant")}
              className="bg-teal-900/60 text-white font-semibold px-4 py-2.5 rounded-xl border border-teal-400/40 hover:bg-teal-800 transition flex items-center space-x-2 text-sm"
            >
              <Sparkles className="w-4 h-4 text-teal-300" />
              <span>Ask Document Assistant</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={`p-5 rounded-xl border transition shadow-sm ${
            highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.availableDocs}
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-emerald-700">{availableCount}</span>
            <span className="text-xs text-slate-500">in your locker</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Ready to serve as verified roots.</p>
        </div>

        <div
          className={`p-5 rounded-xl border transition shadow-sm ${
            highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.missingDocs}
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-amber-600">{missingCount}</span>
            <span className="text-xs text-slate-500">unresolved</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Requires DAG action sequence.</p>
        </div>

        <div
          className={`p-5 rounded-xl border transition shadow-sm ${
            highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.activeJourneys}
            </span>
            <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
              <Compass className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-teal-700">{savedJourneys.length}</span>
            <span className="text-xs text-slate-500">in progress</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Saved tracking records.</p>
        </div>

        <div
          className={`p-5 rounded-xl border transition shadow-sm ${
            highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.servicesCatalog}
            </span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-blue-700">{services.length}</span>
            <span className="text-xs text-slate-500">Verified Goals</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Karnataka Sakala & National</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Layers className="w-5 h-5 text-teal-700" />
            <span>Popular Citizen Welfare Services</span>
          </h2>
          <button
            onClick={() => onNavigate("schemes")}
            className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center space-x-1"
          >
            <span>View All Schemes</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map(srv => (
            <div
              key={srv.id}
              className={`rounded-xl border p-5 transition flex flex-col justify-between hover:shadow-md ${
                highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-200"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                    {srv.category}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{srv.estimatedDays}</span>
                  </span>
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-900">{srv.title}</h3>
                <p className="mt-1 text-xs text-slate-600 line-clamp-2">{srv.summary}</p>
                <div className="mt-3 text-xs text-slate-500 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{srv.jurisdiction}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">{srv.department}</span>
                <button
                  onClick={() => onStartService(srv.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0d9488] text-white text-xs font-bold hover:bg-teal-700 transition flex items-center space-x-1 shadow-sm"
                >
                  <span>Solve Path</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {savedJourneys.length > 0 && (
        <div
          className={`p-5 rounded-xl border ${
            highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <Clock className="w-4 h-4 text-teal-700" />
              <span>Resume Active Journey: {savedJourneys[0].title}</span>
            </h3>
            <button
              onClick={() => onNavigate("journeys")}
              className="text-xs font-semibold text-teal-700 hover:underline"
            >
              Open Full Tracker
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {savedJourneys[0].steps.map((st, idx) => (
              <div
                key={st.id}
                className={`p-2.5 rounded-lg border text-xs flex flex-col justify-between ${
                  st.status === "COMPLETED"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : st.status === "IN_PROGRESS"
                    ? "bg-amber-50 border-amber-200 text-amber-900"
                    : "bg-slate-50 border-slate-200 text-slate-500"
                }`}
              >
                <div className="font-semibold truncate" title={st.name}>
                  {idx + 1}. {st.name}
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-wider">
                  {st.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DependencySolverView({
  t,
  services,
  selectedServiceId,
  setSelectedServiceId,
  selectedState,
  setSelectedState,
  solverResult,
  runSolverEngine,
  docCatalogue,
  userDocsStatus,
  onUpdateDocStatus,
  onSaveJourney,
  highContrast,
  onOpenAssistant
}) {
  const [selectedNodeDetails, setSelectedNodeDetails] = useState(null);

  const currentService = services.find(s => s.id === selectedServiceId) || services[0];

  return (
    <div className="space-y-6">
      <div
        className={`p-5 rounded-2xl border shadow-sm ${
          highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-200"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1 text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md mb-1.5 border border-teal-200">
              <Layers className="w-3.5 h-3.5" />
              <span>Core Innovation: Directed Acyclic Graph (DAG) Solver</span>
            </div>
            <h2 className="text-xl font-black text-slate-900">
              Document Dependency Solver
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select your targeted welfare scheme and jurisdiction. The algorithm resolves multi-tier requirements in topological sequence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                Select Goal / Scheme:
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => {
                  setSelectedServiceId(e.target.value);
                  runSolverEngine(e.target.value);
                }}
                className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                {services.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.jurisdiction.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                Jurisdiction / State:
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="Karnataka">Karnataka (Sakala / Nadakacheri)</option>
                <option value="Maharashtra">Maharashtra (Aaple Sarkar)</option>
                <option value="Delhi">Delhi (e-District Portal)</option>
                <option value="Central">Central / Pan-India Unified</option>
              </select>
            </div>

            <button
              onClick={() => runSolverEngine(selectedServiceId)}
              className="mt-4 md:mt-4 px-4 py-2 bg-[#064e3b] text-white text-xs font-bold rounded-lg hover:bg-emerald-900 transition flex items-center space-x-1.5 shadow"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.generatePath}</span>
            </button>
          </div>
        </div>
      </div>

      {solverResult && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div
              className={`p-5 rounded-2xl border shadow-sm ${
                highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <Compass className="w-5 h-5 text-teal-700" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Interactive Dependency Graph (Visual DAG)
                  </h3>
                </div>
                <div className="flex items-center space-x-3 text-[11px]">
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="text-slate-600">Ready/Owned</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="text-slate-600">Action Step</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="text-slate-600">Blocked</span>
                  </span>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 overflow-x-auto min-h-[360px] flex items-center justify-center">
                <div className="w-full flex flex-col items-center space-y-6">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {solverResult.stepsPlan
                      .filter(s => s.prerequisites.length === 0)
                      .map(node => (
                        <div
                          key={node.docId}
                          onClick={() => setSelectedNodeDetails(node)}
                          className={`cursor-pointer px-3.5 py-2.5 rounded-xl border shadow-sm transition transform hover:-translate-y-0.5 text-center max-w-[170px] ${
                            node.isOwned
                              ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                              : "bg-white border-slate-300 text-slate-800 hover:border-teal-400"
                          } ${selectedNodeDetails?.docId === node.docId ? "ring-2 ring-teal-600" : ""}`}
                        >
                          <div className="flex items-center justify-center space-x-1 text-[10px] font-bold text-slate-400">
                            <span>ROOT</span>
                            {node.isOwned && <Check className="w-3 h-3 text-emerald-600" />}
                          </div>
                          <p className="text-xs font-bold leading-tight mt-1 line-clamp-2">
                            {node.name}
                          </p>
                          <span className="text-[9px] text-slate-500 block mt-1">
                            {node.issuingAuthority.split(' ')[0]}
                          </span>
                        </div>
                      ))}
                  </div>

                  <div className="flex items-center text-slate-400">
                    <div className="h-6 w-0.5 bg-slate-300"></div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {solverResult.stepsPlan
                      .filter(s => s.prerequisites.length > 0 && s.docId !== solverResult.targetDocId)
                      .map(node => (
                        <div
                          key={node.docId}
                          onClick={() => setSelectedNodeDetails(node)}
                          className={`cursor-pointer px-3.5 py-2.5 rounded-xl border shadow-sm transition transform hover:-translate-y-0.5 text-center max-w-[180px] ${
                            node.isOwned
                              ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                              : node.isBlocked
                              ? "bg-rose-50 border-rose-200 text-rose-900"
                              : "bg-amber-50 border-amber-300 text-amber-900"
                          } ${selectedNodeDetails?.docId === node.docId ? "ring-2 ring-teal-600" : ""}`}
                        >
                          <div className="flex items-center justify-center space-x-1 text-[10px] font-bold">
                            <span className={node.isBlocked ? "text-rose-600" : "text-amber-700"}>
                              {node.isOwned ? "VERIFIED" : node.isBlocked ? "BLOCKED" : "READY"}
                            </span>
                          </div>
                          <p className="text-xs font-bold leading-tight mt-1 line-clamp-2">
                            {node.name}
                          </p>
                          <span className="text-[9px] text-slate-500 block mt-1">
                            Requires {node.prerequisites.length} prerequisite(s)
                          </span>
                        </div>
                      ))}
                  </div>

                  <div className="flex items-center text-slate-400">
                    <div className="h-6 w-0.5 bg-slate-300"></div>
                  </div>

                  {(() => {
                    const targetNode = solverResult.stepsPlan.find(s => s.docId === solverResult.targetDocId);
                    if (!targetNode) return null;
                    return (
                      <div
                        onClick={() => setSelectedNodeDetails(targetNode)}
                        className={`cursor-pointer px-6 py-3.5 rounded-2xl border-2 shadow-md transition transform hover:-translate-y-0.5 text-center max-w-sm ${
                          targetNode.isOwned
                            ? "bg-emerald-100 border-emerald-500 text-emerald-950"
                            : targetNode.isBlocked
                            ? "bg-rose-50 border-rose-400 text-rose-950"
                            : "bg-teal-50 border-teal-500 text-teal-950"
                        } ${selectedNodeDetails?.docId === targetNode.docId ? "ring-2 ring-teal-700" : ""}`}
                      >
                        <div className="flex items-center justify-center space-x-1 text-xs font-black uppercase tracking-wider text-teal-800">
                          <Award className="w-4 h-4 text-teal-700" />
                          <span>TARGET GOAL CERTIFICATE</span>
                        </div>
                        <h4 className="text-sm font-extrabold mt-1">{targetNode.name}</h4>
                        <p className="text-[11px] text-slate-600 mt-1">
                          Status: {targetNode.isOwned ? "Already Acquired!" : targetNode.isBlocked ? "Blocked by Prerequisites" : "Ready for Final Submission"}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {selectedNodeDetails ? (
                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-800">
                      Document Details: {selectedNodeDetails.docId}
                    </span>
                    <button
                      onClick={() => setSelectedNodeDetails(null)}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Close
                    </button>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-1">
                    {selectedNodeDetails.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {selectedNodeDetails.purpose}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="font-semibold text-slate-500 block">Issuing Authority:</span>
                      <span className="text-slate-800">{selectedNodeDetails.issuingAuthority}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500 block">Accepted Alternatives:</span>
                      <span className="text-slate-800">
                        {selectedNodeDetails.alternatives.length > 0
                          ? selectedNodeDetails.alternatives.join(", ")
                          : "None (Strict requirement)"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t flex items-center justify-between">
                    <a
                      href={selectedNodeDetails.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-teal-700 font-bold hover:underline flex items-center space-x-1"
                    >
                      <span>Official Portal Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      onClick={() =>
                        onUpdateDocStatus(
                          selectedNodeDetails.docId,
                          selectedNodeDetails.isOwned ? "MISSING" : "AVAILABLE"
                        )
                      }
                      className={`text-xs px-3 py-1 rounded font-bold transition ${
                        selectedNodeDetails.isOwned
                          ? "bg-slate-200 text-slate-800"
                          : "bg-emerald-600 text-white"
                      }`}
                    >
                      {selectedNodeDetails.isOwned ? "Mark as Missing" : "I Have This Document"}
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-[11px] text-slate-400 text-center">
                  Click any node in the flowchart above to inspect accepted alternatives and official portal links.
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div
              className={`p-5 rounded-2xl border shadow-sm ${
                highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {t.stepOrder}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Calculated via Kahn's Topological Ordering Algorithm
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700">
                    {solverResult.availableCount} / {solverResult.totalSteps}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Completed</span>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {solverResult.stepsPlan.map((step, idx) => (
                  <div
                    key={step.docId}
                    className={`p-3.5 rounded-xl border text-xs transition ${
                      step.isOwned
                        ? "bg-emerald-50/70 border-emerald-200"
                        : step.isBlocked
                        ? "bg-rose-50/70 border-rose-200"
                        : "bg-amber-50/70 border-amber-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            step.isOwned
                              ? "bg-emerald-600 text-white"
                              : step.isBlocked
                              ? "bg-rose-500 text-white"
                              : "bg-amber-500 text-white"
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 leading-tight">
                            {step.name}
                          </h4>
                          <span className="text-[10px] text-slate-500 block mt-0.5">
                            {step.issuingAuthority}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          onUpdateDocStatus(
                            step.docId,
                            step.isOwned ? "MISSING" : "AVAILABLE"
                          )
                        }
                        className={`text-[11px] px-2 py-1 rounded font-bold uppercase transition ${
                          step.isOwned
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                        }`}
                      >
                        {step.isOwned ? "Have It" : "Missing"}
                      </button>
                    </div>

                    {step.isBlocked && (
                      <div className="mt-2.5 p-2 rounded bg-rose-100/70 text-rose-900 text-[11px] flex items-center space-x-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>
                          Blocked: Obtain{" "}
                          <strong>
                            {step.unmetPrereqs
                              .map(id => docCatalogue.find(d => d.id === id)?.name || id)
                              .join(", ")}
                          </strong>{" "}
                          first.
                        </span>
                      </div>
                    )}

                    {step.isReady && (
                      <div className="mt-2.5 p-2 rounded bg-amber-100/70 text-amber-900 text-[11px] flex items-center justify-between">
                        <span className="font-semibold">Ready to apply now! No prerequisites missing.</span>
                        <a
                          href={step.officialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-teal-800 underline flex items-center space-x-0.5"
                        >
                          <span>Apply</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={onSaveJourney}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#0d9488] text-white text-xs font-bold hover:bg-teal-700 transition flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Compass className="w-4 h-4" />
                  <span>Track This Path in My Journeys</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="py-2.5 px-3 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition flex items-center justify-center space-x-1"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t.printChecklist}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SchemesDirectoryView({
  t,
  services,
  searchQuery,
  setSearchQuery,
  onSelectScheme,
  highContrast
}) {
  const filtered = services.filter(
    s =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">
            {t.servicesCatalog}
          </h2>
          <p className="text-xs text-slate-500">
            Official government certificates, welfare schemes, and scholarships verified in Kaagaz Path.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by certificate name or dept..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filtered.map(srv => (
          <div
            key={srv.id}
            className={`rounded-2xl border p-5 flex flex-col justify-between shadow-sm transition hover:shadow-md ${
              highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-200"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                  {srv.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{srv.estimatedDays}</span>
                </span>
              </div>

              <h3 className="mt-3 text-base font-extrabold text-slate-900">
                {srv.title}
              </h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                {srv.summary}
              </p>

              <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{srv.department}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{srv.jurisdiction}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Verified Ruleset
              </span>
              <button
                onClick={() => onSelectScheme(srv.id)}
                className="px-4 py-2 rounded-xl bg-[#064e3b] text-white text-xs font-bold hover:bg-emerald-900 transition flex items-center space-x-1.5 shadow"
              >
                <span>{t.startJourney}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MyDocumentsView({
  t,
  docCatalogue,
  userDocsStatus,
  onUpdateDocStatus,
  searchQuery,
  setSearchQuery,
  highContrast
}) {
  const filtered = docCatalogue.filter(
    d =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.issuingAuthority.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">
            {t.navDocuments} (Digital Locker Checklist)
          </h2>
          <p className="text-xs text-slate-500">
            Mark which documents you currently possess. These act as verified foundation roots in the dependency DAG.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search document names..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(doc => {
          const currentStatus = userDocsStatus[doc.id] || "MISSING";
          return (
            <div
              key={doc.id}
              className={`p-5 rounded-2xl border transition shadow-sm flex flex-col justify-between ${
                highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-200"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    {doc.id}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Rule v{doc.version}
                  </span>
                </div>

                <h3 className="mt-2 font-bold text-slate-900 text-sm">
                  {doc.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {doc.purpose}
                </p>

                <div className="mt-3 text-xs text-slate-500 space-y-1">
                  <div>
                    <span className="font-semibold text-slate-700">Authority:</span> {doc.issuingAuthority}
                  </div>
                  {doc.alternatives && doc.alternatives.length > 0 && (
                    <div>
                      <span className="font-semibold text-teal-800">Alternatives:</span> {doc.alternatives.join(", ")}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-500">Your Status:</span>
                <div className="flex items-center space-x-1.5">
                  {["AVAILABLE", "IN_PROGRESS", "MISSING"].map(st => (
                    <button
                      key={st}
                      onClick={() => onUpdateDocStatus(doc.id, st)}
                      className={`text-[10px] px-2.5 py-1 rounded font-bold uppercase transition ${
                        currentStatus === st
                          ? st === "AVAILABLE"
                            ? "bg-emerald-600 text-white"
                            : st === "IN_PROGRESS"
                            ? "bg-amber-500 text-white"
                            : "bg-rose-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {st === "AVAILABLE" ? t.statusAvailable : st === "IN_PROGRESS" ? t.statusInProgress : t.statusMissing}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function JourneysTrackerView({
  t,
  savedJourneys,
  setSavedJourneys,
  onStartNew,
  highContrast
}) {
  const handleToggleStep = (journeyId, stepId) => {
    setSavedJourneys(prev =>
      prev.map(j => {
        if (j.id !== journeyId) return j;
        const newSteps = j.steps.map(s => {
          if (s.id !== stepId) return s;
          const nextStatus = s.status === "COMPLETED" ? "IN_PROGRESS" : s.status === "IN_PROGRESS" ? "BLOCKED" : "COMPLETED";
          return { ...s, status: nextStatus };
        });
        return { ...j, steps: newSteps };
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900">
            {t.navJourneys} (Active Progress Tracker)
          </h2>
          <p className="text-xs text-slate-500">
            Track your ongoing applications step-by-step. Update statuses as you receive physical certificates.
          </p>
        </div>

        <button
          onClick={onStartNew}
          className="px-4 py-2 rounded-xl bg-[#0d9488] text-white text-xs font-bold hover:bg-teal-700 transition flex items-center space-x-1.5 shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Start New Journey</span>
        </button>
      </div>

      {savedJourneys.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
          <Compass className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-bold">No active journeys saved yet.</p>
          <p className="text-xs mt-1">Run the Dependency Solver to compute and track your custom path.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {savedJourneys.map(journey => {
            const completedCount = journey.steps.filter(s => s.status === "COMPLETED").length;
            const progressPct = Math.round((completedCount / journey.steps.length) * 100);

            return (
              <div
                key={journey.id}
                className={`p-6 rounded-2xl border shadow-sm ${
                  highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                        {journey.id}
                      </span>
                      <span className="text-xs text-slate-400">Created: {journey.createdAt}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 mt-1">
                      {journey.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-36 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-slate-700">
                      {progressPct}% ({completedCount}/{journey.steps.length})
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {journey.steps.map((st, i) => (
                    <div
                      key={st.id}
                      onClick={() => handleToggleStep(journey.id, st.id)}
                      className={`cursor-pointer p-3 rounded-xl border text-xs flex items-center justify-between transition hover:shadow-sm ${
                        st.status === "COMPLETED"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                          : st.status === "IN_PROGRESS"
                          ? "bg-amber-50 border-amber-200 text-amber-950"
                          : "bg-slate-50 border-slate-200 text-slate-600"
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                            st.status === "COMPLETED"
                              ? "bg-emerald-600 text-white"
                              : st.status === "IN_PROGRESS"
                              ? "bg-amber-500 text-white"
                              : "bg-slate-300 text-slate-700"
                          }`}
                        >
                          {i + 1}
                        </div>
                        <span className="font-semibold truncate max-w-[200px]" title={st.name}>
                          {st.name}
                        </span>
                      </div>

                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                          st.status === "COMPLETED"
                            ? "bg-emerald-200 text-emerald-900"
                            : st.status === "IN_PROGRESS"
                            ? "bg-amber-200 text-amber-900"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {st.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AIAssistantView({
  t,
  messages,
  input,
  setInput,
  onSend,
  isTyping,
  highContrast,
  onSelectQuickPrompt
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="space-y-4">
      <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-teal-700 shrink-0" />
          <span>
            <strong>Grounded AI Assistant:</strong> Provides verified legal rules from official Karnataka Sakala & Revenue circulars. Does not invent rules or guarantee scheme approvals.
          </span>
        </div>
        <span className="text-[10px] font-bold bg-teal-200/60 px-2 py-0.5 rounded text-teal-900 hidden sm:inline">
          Deterministic Fallback Ready
        </span>
      </div>

      <div
        className={`rounded-2xl border flex flex-col h-[520px] shadow-sm ${
          highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-200"
        }`}
      >
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                  m.sender === "user"
                    ? "bg-[#0d9488] text-white rounded-br-none shadow-sm"
                    : "bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200"
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`text-[9px] block mt-1 ${
                    m.sender === "user" ? "text-teal-200 text-right" : "text-slate-400"
                  }`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-100 rounded-2xl px-4 py-2.5 text-xs text-slate-500 rounded-bl-none flex items-center space-x-1.5 border border-slate-200">
                <span className="animate-spin text-teal-700 font-bold">●</span>
                <span>Consulting verified rules database...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-2.5 border-t border-slate-100 bg-slate-50/70 flex flex-wrap gap-1.5 text-[11px]">
          <span className="text-slate-400 font-medium px-1">Try asking:</span>
          {[
            "Why is Land RTC needed for Income Certificate?",
            "What if I don't have Father's Caste Certificate?",
            "Accepted alternatives for Electricity Bill?",
            "Can this portal submit my application?"
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => onSelectQuickPrompt(prompt)}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-teal-50 hover:text-teal-900 transition"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-slate-200 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            placeholder="Ask questions about state certificates, alternatives, or procedures..."
            className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={onSend}
            className="p-2.5 rounded-xl bg-[#064e3b] text-white hover:bg-emerald-900 transition shadow"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ApplicationDraftsView({
  t,
  draftType,
  setDraftType,
  draftForm,
  setDraftForm,
  generatedText,
  highContrast
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-900">
          {t.navDrafts} (Editable Legal Templates)
        </h2>
        <p className="text-xs text-slate-500">
          Generate formal request letters, affidavits, and missing-document explanations for submission to the Tahsildar or revenue authorities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-4">
          <div
            className={`p-5 rounded-2xl border shadow-sm ${
              highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-200"
            }`}
          >
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Select Template Type:
            </label>
            <div className="grid grid-cols-1 gap-2 mb-4">
              {[
                { id: "REQUEST_LETTER", label: "Application Request Letter" },
                { id: "SELF_DECLARATION", label: "Self-Declaration / Affidavit Form" },
                { id: "MISSING_DOC_EXPLANATION", label: "Missing Document Explanation Petition" }
              ].map(tmpl => (
                <button
                  key={tmpl.id}
                  onClick={() => setDraftType(tmpl.id)}
                  className={`text-xs p-2.5 rounded-xl font-bold text-left transition border ${
                    draftType === tmpl.id
                      ? "bg-teal-50 border-teal-500 text-teal-900"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {tmpl.label}
                </button>
              ))}
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Applicant Full Name:
                </label>
                <input
                  type="text"
                  value={draftForm.applicantName}
                  onChange={(e) => setDraftForm({ ...draftForm, applicantName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Father / Guardian Name:
                </label>
                <input
                  type="text"
                  value={draftForm.guardianName}
                  onChange={(e) => setDraftForm({ ...draftForm, guardianName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Full Residential Address:
                </label>
                <textarea
                  rows={2}
                  value={draftForm.address}
                  onChange={(e) => setDraftForm({ ...draftForm, address: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Target Authority / Office:
                </label>
                <input
                  type="text"
                  value={draftForm.targetAuthority}
                  onChange={(e) => setDraftForm({ ...draftForm, targetAuthority: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {draftType === "MISSING_DOC_EXPLANATION" && (
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">
                    Specific Reason for Missing Document:
                  </label>
                  <textarea
                    rows={2}
                    value={draftForm.explanationReason}
                    onChange={(e) => setDraftForm({ ...draftForm, explanationReason: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div
            className={`p-6 rounded-2xl border shadow-sm flex flex-col justify-between h-full ${
              highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-200"
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-teal-800">
                  Live Generated Draft Preview
                </span>
                <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-semibold border border-amber-200">
                  Unofficial Template — Review Before Signing
                </span>
              </div>

              <pre className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed max-h-[420px] overflow-y-auto">
                {generatedText}
              </pre>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedText);
                  alert("Draft letter copied to clipboard!");
                }}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Copy Text
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-[#064e3b] text-white text-xs font-bold hover:bg-emerald-900 transition flex items-center space-x-1.5 shadow"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Copy</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminRulesView({
  t,
  docCatalogue,
  setDocCatalogue,
  highContrast
}) {
  const [editingDoc, setEditingDoc] = useState(null);
  const [newPrereqInput, setNewPrereqInput] = useState("");

  const handleSaveDoc = () => {
    if (!editingDoc) return;
    setDocCatalogue(prev =>
      prev.map(d => (d.id === editingDoc.id ? editingDoc : d))
    );
    setEditingDoc(null);
    alert("Rule successfully updated in verified repository!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-black text-slate-900">
              Admin Document Rule Manager
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Role-based rule engineering portal: Manage prerequisite dependency edges, rule versions, and official circular references.
          </p>
        </div>

        <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1.5 rounded-lg border border-amber-300 self-start">
          Admin Authenticated: Officer Level-3
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div
            className={`rounded-2xl border overflow-hidden shadow-sm ${
              highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-200"
            }`}
          >
            <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700">
              Master Document DAG Registry ({docCatalogue.length} Nodes)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/70 text-slate-600 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3">Doc ID</th>
                    <th className="p-3">Document Name</th>
                    <th className="p-3">Prerequisites</th>
                    <th className="p-3">Version</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {docCatalogue.map(doc => (
                    <tr key={doc.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3 font-mono font-bold text-slate-700">{doc.id}</td>
                      <td className="p-3 font-semibold text-slate-900 max-w-[200px] truncate">{doc.name}</td>
                      <td className="p-3">
                        <span className="bg-teal-50 text-teal-800 px-2 py-0.5 rounded text-[11px] font-semibold">
                          {doc.prerequisites.length} Direct Prereqs
                        </span>
                      </td>
                      <td className="p-3 font-mono text-slate-500">v{doc.version}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setEditingDoc({ ...doc })}
                          className="px-2.5 py-1 rounded bg-slate-200 hover:bg-teal-600 hover:text-white transition font-bold text-[11px]"
                        >
                          Edit Rule
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          {editingDoc ? (
            <div
              className={`p-5 rounded-2xl border shadow-sm space-y-3 text-xs ${
                highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-200"
              }`}
            >
              <h3 className="font-bold text-slate-900 text-sm pb-2 border-b">
                Edit Dependency Rule: {editingDoc.id}
              </h3>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Document Name:
                </label>
                <input
                  type="text"
                  value={editingDoc.name}
                  onChange={(e) => setEditingDoc({ ...editingDoc, name: e.target.value })}
                  className="w-full px-3 py-1.5 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Issuing Authority:
                </label>
                <input
                  type="text"
                  value={editingDoc.issuingAuthority}
                  onChange={(e) => setEditingDoc({ ...editingDoc, issuingAuthority: e.target.value })}
                  className="w-full px-3 py-1.5 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Prerequisite Document IDs (Comma-separated):
                </label>
                <input
                  type="text"
                  value={editingDoc.prerequisites.join(", ")}
                  onChange={(e) => {
                    const parsed = e.target.value
                      .split(",")
                      .map(s => s.trim())
                      .filter(Boolean);
                    setEditingDoc({ ...editingDoc, prerequisites: parsed });
                  }}
                  className="w-full px-3 py-1.5 border rounded-lg font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Official Verification Source URL:
                </label>
                <input
                  type="text"
                  value={editingDoc.officialUrl}
                  onChange={(e) => setEditingDoc({ ...editingDoc, officialUrl: e.target.value })}
                  className="w-full px-3 py-1.5 border rounded-lg"
                />
              </div>

              <div className="pt-3 flex items-center justify-end space-x-2">
                <button
                  onClick={() => setEditingDoc(null)}
                  className="px-3 py-1.5 rounded-lg border text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveDoc}
                  className="px-4 py-1.5 rounded-lg bg-[#064e3b] text-white font-bold hover:bg-emerald-900"
                >
                  Publish Rule v{editingDoc.version}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 text-center text-slate-400 text-xs">
              <Shield className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p>Select any document rule from the master table to modify its prerequisite DAG relationships.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HelpCenterView({ t, highContrast }) {
  const faqs = [
    {
      q: "What is a Document Dependency Solver?",
      a: "In India, applying for a government certificate (like an Income or Caste Certificate) often requires several intermediate proofs, each with their own requirements. Kaagaz Path uses a mathematical Directed Acyclic Graph (DAG) algorithm to determine the precise order in which you should gather paperwork so you never get stuck."
    },
    {
      q: "Is any real Aadhaar or banking data stored?",
      a: "No. Kaagaz Path follows strict zero-PII storage. No real identity numbers, biometric scans, or bank account credentials are ever requested or saved in any database."
    },
    {
      q: "What if I do not possess a required prerequisite document?",
      a: "Each document page lists 'Accepted Alternatives' officially verified under state circulars. For example, if you do not have an electricity bill, a registered rental agreement or Gram Panchayat tax receipt is legally admissible."
    },
    {
      q: "Can Kaagaz Path guarantee my certificate will be approved?",
      a: "No. Kaagaz Path is an educational and administrative assistance portal. Official approvals are solely determined by authorized state revenue officers and Tahsildars."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-900">
          {t.navHelp} (Frequently Asked Questions)
        </h2>
        <p className="text-xs text-slate-500">
          Learn how Kaagaz Path helps Indian citizens overcome administrative paperwork hurdles.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`p-5 rounded-2xl border shadow-sm ${
              highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-200"
            }`}
          >
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">
                {i + 1}
              </span>
              <span>{faq.q}</span>
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed pl-7">
              {faq.a}
            </p>
          </div>
        ))}
      </div>

      <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 text-xs">
        <h4 className="font-extrabold text-sm mb-1">State Citizen Grievance Portals:</h4>
        <p className="mb-2">For official service delays beyond statutory limits under Sakala / Right to Public Services Act:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Karnataka Sakala Helpline: 080-44554455 (sakala.kar.nic.in)</li>
          <li>National Government Services Portal: services.india.gov.in</li>
          <li>UIDAI Grievance: 1947 (uidai.gov.in)</li>
        </ul>
      </div>
    </div>
  );
}
