export interface BranchItem {
  branchCode: string;
  name: string;
  shortName: string;
  address: string;
  phone: string;
  rawPhone: string;
  email: string;
  openingHours: string;
  serviceablePincodes: string[];
  city: string;
  pickupAvailable: boolean;
  mapQuery: string;
  mapUrl?: string;
  landmark: string;
}

export const OFFICIAL_BRANCHES: BranchItem[] = [
  {
    branchCode: 'CCW-KL-01',
    name: "Chef's Cake World - Alamcode",
    shortName: 'Alamcode',
    address: 'Near Alamcode Junction, Attingal, Thiruvananthapuram, Kerala 695102',
    phone: '+91 98479 60677',
    rawPhone: '9847960677',
    email: 'alamcode@chefscakeworld.com',
    openingHours: '09:00 AM - 10:30 PM',
    serviceablePincodes: ['695102', '695103', '695104', '695105', '695605', '695606', '695601'],
    city: 'Alamcode, Attingal',
    pickupAvailable: true,
    mapQuery: "Chef's Cake World Alamcode Attingal",
    landmark: 'Near Alamcode Town Junction'
  },
  {
    branchCode: 'CCW-KL-02',
    name: "Chef's Cake World - Ambalathinkara",
    shortName: 'Ambalathinkara',
    address: 'Ambalathinkara, Kazhakootam, Thiruvananthapuram, Kerala 695582',
    phone: '+91 70252 17777',
    rawPhone: '7025217777',
    email: 'ambalathinkara@chefscakeworld.com',
    openingHours: '09:00 AM - 11:00 PM',
    serviceablePincodes: ['695582', '695581', '695583', '695584', '695585', '695586'],
    city: 'Kazhakootam',
    pickupAvailable: true,
    mapQuery: "Chef's Cake World Ambalathinkara Kazhakootam",
    landmark: 'Near Ambalathinkara Main Road'
  },
  {
    branchCode: 'CCW-KL-03',
    name: "Chef's Cake World - Kumarapuram",
    shortName: 'Kumarapuram',
    address: 'Kumarapuram, Medical College PO, Thiruvananthapuram, Kerala 695011',
    phone: '+91 90722 22655',
    rawPhone: '9072222655',
    email: 'kumarapuram@chefscakeworld.com',
    openingHours: '09:00 AM - 10:30 PM',
    serviceablePincodes: ['695011', '695033', '695037', '695024', '695035', '695001', '695004', '695014', '695030'],
    city: 'Trivandrum City',
    pickupAvailable: true,
    mapQuery: "Chef's Cake World Kumarapuram Thiruvananthapuram",
    landmark: 'Near Medical College - Kumarapuram Road'
  },
  {
    branchCode: 'CCW-KL-04',
    name: "Chef's Cake World - Ulloor",
    shortName: 'Ulloor',
    address: 'Ulloor Junction, Medical College Road, Thiruvananthapuram, Kerala 695011',
    phone: '+91 80866 66207',
    rawPhone: '8086666207',
    email: 'ulloor@chefscakeworld.com',
    openingHours: '09:00 AM - 10:30 PM',
    serviceablePincodes: ['695011', '695017', '695015', '695016', '695081', '695044', '695031', '695005'],
    city: 'Trivandrum City',
    pickupAvailable: true,
    mapQuery: "Chef's Cake World Ulloor Thiruvananthapuram",
    landmark: 'Near Ulloor Signal Junction'
  },
  {
    branchCode: 'CCW-KL-05',
    name: "Chef's Cake World - Vattappara",
    shortName: 'Vattappara',
    address: 'Main Road, Vattappara, Thiruvananthapuram, Kerala 695028',
    phone: '+91 97458 41777',
    rawPhone: '9745841777',
    email: 'vattappara@chefscakeworld.com',
    openingHours: '09:00 AM - 10:30 PM',
    serviceablePincodes: ['695028', '695043', '695561', '695541', '695542', '695562'],
    city: 'Vattappara',
    pickupAvailable: true,
    mapQuery: "Chef's Cake World Vattappara Thiruvananthapuram",
    landmark: 'Vattappara Main Junction'
  },
  {
    branchCode: 'CCW-KL-06',
    name: "Chef's Cake World - Vetturoad",
    shortName: 'Vetturoad',
    address: 'Vetturoad Junction, Kaniyapuram, Kazhakootam, Thiruvananthapuram, Kerala 695301',
    phone: '+91 89210 29932',
    rawPhone: '8921029932',
    email: 'vetturoad@chefscakeworld.com',
    openingHours: '09:00 AM - 11:00 PM',
    serviceablePincodes: ['695301', '695582', '695317', '695316', '695584', '695589', '695302'],
    city: 'Vetturoad, Kazhakootam',
    pickupAvailable: true,
    mapQuery: "Chef's Cake World Vetturoad Kazhakoottm",
    mapUrl: 'https://maps.app.goo.gl/kZZ4BkUdYE1kBwKn6',
    landmark: 'Vetturoad Junction, NH Bypass (near Kaniyapuram)'
  },
  {
    branchCode: 'CCW-KL-07',
    name: "Chef's Cake World - Attingal",
    shortName: 'Attingal',
    address: 'Near KSRTC Bus Stand, Main Road, Attingal, Kerala 695101',
    phone: '+91 98479 60677',
    rawPhone: '9847960677',
    email: 'attingal@chefscakeworld.com',
    openingHours: '09:00 AM - 10:30 PM',
    serviceablePincodes: ['695101', '695102', '695103', '695104', '695301', '695304', '695306', '695308', '695309'],
    city: 'Attingal Town',
    pickupAvailable: true,
    mapQuery: "Chef's Cake World Attingal Main Road",
    landmark: 'Near KSRTC Bus Stand & Municipal Town Hall'
  },
  {
    branchCode: 'CCW-KL-08',
    name: "Chef's Cake World - Kazhakootam",
    shortName: 'Kazhakootam',
    address: 'Near Technopark Campus, Kazhakootam, Thiruvananthapuram, Kerala 695582',
    phone: '+91 89210 29932',
    rawPhone: '8921029932',
    email: 'kazhakootam@chefscakeworld.com',
    openingHours: '09:00 AM - 11:00 PM',
    serviceablePincodes: ['695582', '695581', '695583', '695584', '695585', '695586'],
    city: 'Kazhakootam',
    pickupAvailable: true,
    mapQuery: "Chef's Cake World Kazhakootam Technopark",
    landmark: 'Opposite Technopark Main Entrance'
  }
];

export interface NearestBranchResult {
  branch: BranchItem;
  isDirectServiceable: boolean;
  distanceEstimate: string;
  estimatedDeliveryHours: number;
  deliveryFee: number;
  message: string;
}

export function findNearestBranchByPincode(rawPin: string): NearestBranchResult | null {
  const pin = rawPin.replace(/\D/g, '').trim();
  if (pin.length !== 6) return null;

  // 1. Exact match in branch's dedicated serviceable pincodes
  for (const b of OFFICIAL_BRANCHES) {
    if (b.serviceablePincodes.includes(pin)) {
      return {
        branch: b,
        isDirectServiceable: true,
        distanceEstimate: 'Under 3-5 km (Primary Hub)',
        estimatedDeliveryHours: 2,
        deliveryFee: 40,
        message: `Great news! Your location (${pin}) is within direct 2-hour doorstep delivery from our ${b.shortName} shop.`
      };
    }
  }

  // 2. Regional prefix proximity rules for Kerala / Trivandrum PIN codes
  const prefix3 = pin.substring(0, 3);
  const prefix4 = pin.substring(0, 4);

  // Attingal & Alamcode belt (6951xx)
  if (prefix4 === '6951') {
    const isAlamcodeArea = ['695102', '695104', '695105'].includes(pin);
    const target = OFFICIAL_BRANCHES.find(b => b.branchCode === (isAlamcodeArea ? 'CCW-KL-01' : 'CCW-KL-07'))!;
    return {
      branch: target,
      isDirectServiceable: true,
      distanceEstimate: 'Approx. 4-6 km',
      estimatedDeliveryHours: 2,
      deliveryFee: 49,
      message: `Your nearest branch is Chef's Cake World ${target.shortName}. Express delivery is available!`
    };
  }

  // Kazhakootam, Ambalathinkara & Vetturoad belt (69558x, 69531x)
  if (prefix4 === '6955' || prefix4 === '6953') {
    const target = OFFICIAL_BRANCHES.find(b => b.branchCode === 'CCW-KL-02')!;
    return {
      branch: target,
      isDirectServiceable: true,
      distanceEstimate: 'Approx. 3-6 km',
      estimatedDeliveryHours: 2,
      deliveryFee: 45,
      message: `Your nearest shop is Chef's Cake World ${target.shortName} (Kazhakootam). Delivery ready within 2 hours.`
    };
  }

  // Trivandrum City / Medical College / Ulloor / Kumarapuram belt (6950xx)
  if (prefix4 === '6950') {
    const isVattapparaBelt = ['695028', '695043', '695020'].includes(pin);
    const target = OFFICIAL_BRANCHES.find(b => b.branchCode === (isVattapparaBelt ? 'CCW-KL-05' : 'CCW-KL-04'))!;
    return {
      branch: target,
      isDirectServiceable: true,
      distanceEstimate: 'Approx. 4-8 km',
      estimatedDeliveryHours: 2,
      deliveryFee: 49,
      message: `Your nearest shop is Chef's Cake World ${target.shortName}. Rapid delivery available.`
    };
  }

  // Other Trivandrum / Kerala (695xxx)
  if (prefix3 === '695') {
    const target = OFFICIAL_BRANCHES.find(b => b.branchCode === 'CCW-KL-07')!;
    return {
      branch: target,
      isDirectServiceable: true,
      distanceEstimate: 'Within Trivandrum District',
      estimatedDeliveryHours: 3,
      deliveryFee: 60,
      message: `Nearest fulfillment hub: Chef's Cake World ${target.shortName}. Same-day doorstep delivery available.`
    };
  }

  // Outside Trivandrum / General Kerala
  const defaultHub = OFFICIAL_BRANCHES.find(b => b.branchCode === 'CCW-KL-07')!;
  return {
    branch: defaultHub,
    isDirectServiceable: false,
    distanceEstimate: 'Extended Kerala Zone',
    estimatedDeliveryHours: 4,
    deliveryFee: 99,
    message: `Nearest hub is our Attingal branch. For special out-of-district deliveries, please call our hotline directly at ${defaultHub.phone}.`
  };
}

