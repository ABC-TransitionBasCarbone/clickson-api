export const EMISSIONFACTORS = [
  { id: 1, idEmissionSubCategorie: 1, idLanguage: 1, label: "Heating oil", idType: 1, idUnit: 1, value: 0.324, uncertainty: 0 },
  { id: 2, idEmissionSubCategorie: 1, idLanguage: 1, label: "Heavy fuel oil", idType: 1, idUnit: 1, value: 0.324, uncertainty: 0 },
  { id: 3, idEmissionSubCategorie: 1, idLanguage: 1, label: "Natural gas", idType: 1, idUnit: 2, value: 0.214, uncertainty: 0 },
  { id: 4, idEmissionSubCategorie: 1, idLanguage: 1, label: "Wood pellets (8% humidity)", idType: 1, idUnit: 1, value: 0.0304, uncertainty: 4 },
  { id: 5, idEmissionSubCategorie: 9, idLanguage: 1, label: "Grid electricity", idType: 2, idUnit: 3, value: 0.0647, uncertainty: 1 },
  { id: 6, idEmissionSubCategorie: 17, idLanguage: 1, label: "R134a", idType: 3, idUnit: 4, value: 1300, uncertainty: 3 },
  { id: 7, idEmissionSubCategorie: 17, idLanguage: 1, label: "R22 (sales banned since 2015)", idType: 3, idUnit: 4, value: 1760, uncertainty: 3 },
  { id: 8, idEmissionSubCategorie: 17, idLanguage: 1, label: "R32", idType: 3, idUnit: 4, value: 675, uncertainty: 3 },
  { id: 9, idEmissionSubCategorie: 17, idLanguage: 1, label: "R404a (sales banned since 2020)", idType: 3, idUnit: 4, value: 3943, uncertainty: 3 },
  { id: 10, idEmissionSubCategorie: 17, idLanguage: 1, label: "R407c", idType: 3, idUnit: 4, value: 1624, uncertainty: 3 },
  { id: 11, idEmissionSubCategorie: 17, idLanguage: 1, label: "R410a", idType: 3, idUnit: 4, value: 2088, uncertainty: 3 },
  { id: 12, idEmissionSubCategorie: 17, idLanguage: 1, label: "R452a", idType: 3, idUnit: 4, value: 2140, uncertainty: 3 },
  { id: 13, idEmissionSubCategorie: 17, idLanguage: 1, label: "R513a", idType: 3, idUnit: 4, value: 631, uncertainty: 5 },
  { id: 14, idEmissionSubCategorie: 17, idLanguage: 1, label: "R744 - CO2", idType: 3, idUnit: 4, value: 1, uncertainty: 3 },
  { id: 15, idEmissionSubCategorie: 17, idLanguage: 1, label: "CO2", idType: 4, idUnit: 4, value: 1, uncertainty: 0 },
  { id: 16, idEmissionSubCategorie: 17, idLanguage: 1, label: "Fossil CH4", idType: 4, idUnit: 4, value: 30, uncertainty: 0 },
  { id: 17, idEmissionSubCategorie: 17, idLanguage: 1, label: "Biogenic CH4", idType: 4, idUnit: 4, value: 28, uncertainty: 0 },
  { id: 18, idEmissionSubCategorie: 17, idLanguage: 1, label: "N2O", idType: 4, idUnit: 4, value: 265, uncertainty: 0 },
  { id: 19, idEmissionSubCategorie: 17, idLanguage: 1, label: "SF6", idType: 4, idUnit: 4, value: 23500, uncertainty: 0 },
  { id: 20, idEmissionSubCategorie: 17, idLanguage: 1, label: "NF3", idType: 4, idUnit: 4, value: 16100, uncertainty: 0 },
  { id: 21, idEmissionSubCategorie: 5, idLanguage: 1, label: "Typical meal", idType: 5, idUnit: 5, value: 2.25, uncertainty: 4 },
  { id: 22, idEmissionSubCategorie: 5, idLanguage: 1, label: "Vegetarian meal", idType: 5, idUnit: 5, value: 0.45, uncertainty: 4 },
  { id: 23, idEmissionSubCategorie: 5, idLanguage: 1, label: "Main course of red meat", idType: 5, idUnit: 5, value: 7.26, uncertainty: 4 },
  { id: 24, idEmissionSubCategorie: 5, idLanguage: 1, label: "Main course of white meat", idType: 5, idUnit: 5, value: 1.58, uncertainty: 4 },
  { id: 25, idEmissionSubCategorie: 6, idLanguage: 1, label: "Delivery truck (authorized loaded weight 19t)", idType: 6, idUnit: 6, value: 0.379, uncertainty: 4 },
  { id: 26, idEmissionSubCategorie: 6, idLanguage: 1, label: "Local delivery vehicle (authorized loaded weight 7.5t)", idType: 6, idUnit: 6, value: 0.848, uncertainty: 4 },
  { id: 27, idEmissionSubCategorie: 6, idLanguage: 1, label: "Large volume 26t articulated lorry", idType: 6, idUnit: 6, value: 0.178, uncertainty: 4 },
  { id: 28, idEmissionSubCategorie: 6, idLanguage: 1, label: "Large volume 40t articulated lorry", idType: 6, idUnit: 6, value: 0.105, uncertainty: 4 },
  { id: 29, idEmissionSubCategorie: 6, idLanguage: 1, label: "Light utility vehicle", idType: 6, idUnit: 6, value: 1.2, uncertainty: 4 },
  { id: 30, idEmissionSubCategorie: 6, idLanguage: 1, label: "Air freight – aeroplane > 250 seats, distance travelled 3 000-4 000 km, A1 jet fuel", idType: 7, idUnit: 6, value: 2.51, uncertainty: 4 },
  { id: 31, idEmissionSubCategorie: 6, idLanguage: 1, label: "Freight train (Europe)", idType: 8, idUnit: 6, value: 0.0226, uncertainty: 4 },
  { id: 32, idEmissionSubCategorie: 6, idLanguage: 1, label: "Freight train, electric traction, dense merchandise", idType: 8, idUnit: 6, value: 0.00146, uncertainty: 4 },
  { id: 33, idEmissionSubCategorie: 6, idLanguage: 1, label: "Cargo ship – under 1 200 TEU", idType: 9, idUnit: 6, value: 0.0331, uncertainty: 4 },
  { id: 34, idEmissionSubCategorie: 6, idLanguage: 1, label: "Cargo ship – 3 850 to 7 499 TEU", idType: 9, idUnit: 6, value: 0.0137, uncertainty: 4 },
  { id: 35, idEmissionSubCategorie: 7, idLanguage: 1, label: "Typical end-of-life treatment", idType: 10, idUnit: 7, value: 48.1, uncertainty: 5 },
  { id: 36, idEmissionSubCategorie: 7, idLanguage: 1, label: "Landfill", idType: 10, idUnit: 7, value: 649, uncertainty: 5 },
  { id: 37, idEmissionSubCategorie: 7, idLanguage: 1, label: "Incineration", idType: 10, idUnit: 7, value: 46.6, uncertainty: 5 },
  { id: 38, idEmissionSubCategorie: 7, idLanguage: 1, label: "Compost (industrial)", idType: 10, idUnit: 7, value: 86.7, uncertainty: 5 },
  { id: 39, idEmissionSubCategorie: 8, idLanguage: 1, label: "Paper – typical end of life", idType: 11, idUnit: 7, value: 43.1, uncertainty: 5 },
  { id: 40, idEmissionSubCategorie: 8, idLanguage: 1, label: "Cardboard – typical end of life", idType: 11, idUnit: 7, value: 37.9, uncertainty: 5 },
  { id: 41, idEmissionSubCategorie: 8, idLanguage: 1, label: "Glass – typical end of life", idType: 11, idUnit: 7, value: 33, uncertainty: 5 },
  { id: 42, idEmissionSubCategorie: 8, idLanguage: 1, label: "Plastic – typical end of life", idType: 11, idUnit: 7, value: 877, uncertainty: 5 },
  { id: 43, idEmissionSubCategorie: 65, idLanguage: 1, label: "Personal car – gasoline/petrol", idType: 12, idUnit: 8, value: 0.259, uncertainty: 2 },
  { id: 44, idEmissionSubCategorie: 65, idLanguage: 1, label: "Personal car – diesel", idType: 12, idUnit: 8, value: 0.251, uncertainty: 2 },
  { id: 45, idEmissionSubCategorie: 65, idLanguage: 1, label: "City bus: agglomerations population 100 000 – 250 000", idType: 12, idUnit: 9, value: 0.146, uncertainty: 5 },
  { id: 46, idEmissionSubCategorie: 65, idLanguage: 1, label: "City bus: agglomerations population under 100 000", idType: 12, idUnit: 9, value: 0.137, uncertainty: 5 },
  { id: 47, idEmissionSubCategorie: 65, idLanguage: 1, label: "City bus: agglomerations population over 250 000", idType: 12, idUnit: 9, value: 0.129, uncertainty: 5 },
  { id: 48, idEmissionSubCategorie: 65, idLanguage: 1, label: "Metro", idType: 12, idUnit: 9, value: 0.006, uncertainty: 2 },
  { id: 49, idEmissionSubCategorie: 65, idLanguage: 1, label: "Suburban commuter train", idType: 12, idUnit: 9, value: 0.006, uncertainty: 2 },
  { id: 50, idEmissionSubCategorie: 65, idLanguage: 1, label: "Tramway", idType: 12, idUnit: 9, value: 0.006, uncertainty: 2 },
  { id: 51, idEmissionSubCategorie: 65, idLanguage: 1, label: "Train (average for France)", idType: 12, idUnit: 9, value: 0.004, uncertainty: 5 },
  { id: 52, idEmissionSubCategorie: 11, idLanguage: 1, label: "Plane", idType: 12, idUnit: 9, value: 0.187, uncertainty: 5 },
  { id: 53, idEmissionSubCategorie: 77, idLanguage: 1, label: "Standard table (furniture)", idType: 13, idUnit: 10, value: 60.100, uncertainty: 2 },
  { id: 54, idEmissionSubCategorie: 77, idLanguage: 1, label: "Chair (wood)", idType: 13, idUnit: 10, value: 18.600, uncertainty: 1 },
  { id: 55, idEmissionSubCategorie: 77, idLanguage: 1, label: "Book", idType: 13, idUnit: 10, value: 1.100, uncertainty: 4 },
  { id: 56, idEmissionSubCategorie: 77, idLanguage: 1, label: "Office supplies and consumables (€)", idType: 13, idUnit: 11, value: 0.917, uncertainty: 1 },
  { id: 57, idEmissionSubCategorie: 77, idLanguage: 1, label: "Paper (ream)", idType: 13, idUnit: 10, value: 2.290, uncertainty: 2 },
  { id: 58, idEmissionSubCategorie: 85, idLanguage: 1, label: "AAA batteries (alkaline)", idType: 14, idUnit: 10, value: 0.065, uncertainty: 4 },
  { id: 59, idEmissionSubCategorie: 85, idLanguage: 1, label: "AA batteries (alkaline)", idType: 14, idUnit: 10, value: 0.137, uncertainty: 4 },
  { id: 60, idEmissionSubCategorie: 85, idLanguage: 1, label: "Hydrochloric acid (litres)", idType: 14, idUnit: 12, value: 1.440, uncertainty: 4 },
  { id: 61, idEmissionSubCategorie: 85, idLanguage: 1, label: "Sulphuric acid (litres)", idType: 14, idUnit: 12, value: 2.200, uncertainty: 4 },
  { id: 62, idEmissionSubCategorie: 93, idLanguage: 1, label: "Basketball", idType: 15, idUnit: 10, value: 4.600, uncertainty: 3 },
  { id: 63, idEmissionSubCategorie: 93, idLanguage: 1, label: "Soccer ball", idType: 15, idUnit: 10, value: 4.120, uncertainty: 3 },
  { id: 64, idEmissionSubCategorie: 93, idLanguage: 1, label: "Volleyball", idType: 15, idUnit: 10, value: 2.250, uncertainty: 3 },
  { id: 65, idEmissionSubCategorie: 93, idLanguage: 1, label: "Handball", idType: 15, idUnit: 10, value: 2.500, uncertainty: 3 },
  { id: 66, idEmissionSubCategorie: 117, idLanguage: 1, label: "School building (concrete)", idType: 16, idUnit: 13, value: 440000, uncertainty: 4 },
  { id: 67, idEmissionSubCategorie: 117, idLanguage: 1, label: "Parking lot (concrete)", idType: 16, idUnit: 13, value: 319000, uncertainty: 2 },
  { id: 68, idEmissionSubCategorie: 117, idLanguage: 1, label: "Parking lot (asphalt)", idType: 16, idUnit: 13, value: 73000, uncertainty: 2 },
  { id: 69, idEmissionSubCategorie: 117, idLanguage: 1, label: "Parking lot (semi-hard surface)", idType: 16, idUnit: 13, value: 165000, uncertainty: 2 },
  { id: 70, idEmissionSubCategorie: 125, idLanguage: 1, label: "Workstation computer", idType: 17, idUnit: 10, value: 169000, uncertainty: 4 },
  { id: 71, idEmissionSubCategorie: 125, idLanguage: 1, label: "Tablets", idType: 17, idUnit: 10, value: 63200, uncertainty: 4 },
  { id: 72, idEmissionSubCategorie: 125, idLanguage: 1, label: "Photocopiers", idType: 17, idUnit: 10, value: 2935000, uncertainty: 4 },
  { id: 73, idEmissionSubCategorie: 125, idLanguage: 1, label: "Video projector", idType: 17, idUnit: 10, value: 94000, uncertainty: 5 },
  { id: 74, idEmissionSubCategorie: 125, idLanguage: 1, label: "Printer", idType: 17, idUnit: 10, value: 87900, uncertainty: 4 },
];