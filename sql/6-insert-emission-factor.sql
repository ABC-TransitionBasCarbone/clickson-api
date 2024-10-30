INSERT INTO emission_factors(
        id,
        id_emission_sub_categorie,
        id_language,
        label,
        id_type,
        id_unit,
        value,
        uncertainty
    )
VALUES 
(1, 1, 1, 'Heating oil', 1, 1, 0.324, 0),
(2, 1, 1, 'Heavy fuel oil', 1, 1, 0.324, 0),
(3, 1, 1, 'Natural gas', 1, 2, 0.214, 0),
(4, 1, 1, 'Wood pellets (8% humidity)', 1, 1, 0.0304, 4),

(5, 9, 1, 'Grid electricity', 2, 3, 0.0647, 1),

(6, 17, 1, 'R134a', 3, 4, 1300, 3),
(7, 17, 1, 'R22 (sales banned since 2015)', 3, 4, 1760, 3),
(8, 17, 1, 'R32', 3, 4, 675, 3),
(9, 17, 1, 'R404a (sales banned since 2020)', 3, 4, 3943, 3),
(10, 17, 1, 'R407c', 3, 4, 1624, 3),
(11, 17, 1, 'R410a', 3, 4, 2088, 3),
(12, 17, 1, 'R452a', 3, 4, 2140, 3),
(13, 17, 1, 'R513a', 3, 4, 631, 5),
(14, 17, 1, 'R744 - CO2', 3, 4, 1, 3),
(15, 17, 1, 'CO2', 4, 4, 1, 0),
(16, 17, 1, 'Fossil CH4', 4, 4, 30, 0),
(17, 17, 1, 'Biogenic CH4', 4, 4, 28, 0),
(18, 17, 1, 'N2O', 4, 4, 265, 0),
(19, 17, 1, 'SF6', 4, 4, 23500, 0),
(20, 17, 1, 'NF3', 4, 4, 16100, 0),

(21, 5, 1, 'Typical meal', 5, 5, 2.25, 4),
(22, 5, 1, 'Vegetarian meal', 5, 5, 0.45, 4),
(23, 5, 1, 'Main course of red meat', 5, 5, 7.26, 4),
(24, 5, 1, 'Main course of white meat', 5, 5, 1.58, 4),

(25, 6, 1, 'Delivery truck (authorized loaded weight 19t)', 6, 6, 0.379, 4),
(26, 6, 1, 'Local delivery vehicle (authorized loaded weight 7.5t)', 6, 6, 0.848, 4),
(27, 6, 1, 'Large volume 26t articulated lorry', 6, 6, 0.178, 4),
(28, 6, 1, 'Large volume 40t articulated lorry', 6, 6, 0.105, 4),
(29, 6, 1, 'Light utility vehicle', 6, 6, 1.2, 4),
(30, 6, 1, 'Air freight – aeroplane > 250 seats, distance travelled 3 000-4 000 km, A1 jet fuel', 7, 6, 2.51, 4),
(31, 6, 1, 'Freight train (Europe)', 8, 6, 0.0226, 4),
(32, 6, 1, 'Freight train, electric traction, dense merchandise', 8, 6, 0.00146, 4),
(33, 6, 1, 'Cargo ship – under 1 200 TEU', 9, 6, 0.0331, 4),
(34, 6, 1, 'Cargo ship – 3 850 to 7 499 TEU', 9, 6, 0.0137, 4),

(35, 7, 1, 'Typical end-of-life treatment', 10, 7, 48.1, 5),
(36, 7, 1, 'Landfill', 10, 7, 649, 5),
(37, 7, 1, 'Incineration', 10, 7, 46.6, 5),
(38, 7, 1, 'Compost (industrial)', 10, 7, 86.7, 5),

(39, 8, 1, 'Paper – typical end of life', 11, 7, 43.1, 5),
(40, 8, 1, 'Cardboard – typical end of life', 11, 7, 37.9, 5),
(41, 8, 1, 'Glass – typical end of life', 11, 7, 33, 5),
(42, 8, 1, 'Plastic – typical end of life', 11, 7, 877, 5),

(43, 65, 1, 'Personal car – gasoline/petrol', 12, 8, 0.259, 2),
(44, 65, 1, 'Personal car – diesel', 12, 8, 0.251, 2),
(45, 65, 1, 'City bus: agglomerations population 100 000 – 250 000', 12, 9, 0.146, 5),
(46, 65, 1, 'City bus: agglomerations population under 100 000', 12, 9, 0.137, 5),
(47, 65, 1, 'City bus: agglomerations population over 250 000', 12, 9, 0.129, 5),
(48, 65, 1, 'Metro', 12, 9, 0.006, 2),
(49, 65, 1, 'Suburban commuter train', 12, 9, 0.006, 2),
(50, 65, 1, 'Tramway', 12, 9, 0.006, 2),
(51, 65, 1, 'Train (average for France)', 12, 9, 0.004, 5),

-- TODO Add plane subcategory
(52, 11, 1, 'Plane', 12, 9, 0.187, 5),

(53, 77, 1, 'Standard table (furniture)', 13, 10, 60.100, 2),
(54, 77, 1, 'Chair (wood)', 13, 10, 18.600, 1),
(55, 77, 1, 'Book', 13, 10, 1.100, 4),
(56, 77, 1, 'Office supplies and consumables (€)', 13, 11, 0.917, 1),
(57, 77, 1, 'Paper (ream)', 13, 10, 2.290, 2),

(58, 85, 1, 'AAA batteries (alkaline)', 14, 10, 0.065, 4),
(59, 85, 1, 'AA batteries (alkaline)', 14, 10, 0.137, 4),
(60, 85, 1, 'Hydrochloric acid (litres)', 14, 12, 1.440, 4),
(61, 85, 1, 'Sulphuric acid (litres)', 14, 12, 2.200, 4),

(62, 93, 1, 'Basketball', 15, 10, 4.600, 3),
(63, 93, 1, 'Soccer ball', 15, 10, 4.120, 3),
(64, 93, 1, 'Volleyball', 15, 10, 2.250, 3),
(65, 93, 1, 'Handball', 15, 10, 2.500, 3),

(66, 117, 1, 'School building (concrete)', 16, 13, 440000, 4),
(67, 117, 1, 'Parking lot (concrete)', 16, 13, 319000, 2),
(68, 117, 1, 'Parking lot (asphalt)', 16, 13, 73000, 2),
(69, 117, 1, 'Parking lot (semi-hard surface)', 16, 13, 165000, 2),

(70, 125, 1, 'Workstation computer', 17, 10, 169000, 4),
(71, 125, 1, 'Tablets', 17, 10, 63200, 4),
(72, 125, 1, 'Photocopiers', 17, 10, 2935000, 4),
(73, 125, 1, 'Video projector', 17, 10, 94000, 5),
(74, 125, 1, 'Printer', 17, 10, 87900, 4);
