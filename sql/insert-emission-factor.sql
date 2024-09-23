-- TODO créer une table id_type/id_type_traduction et id_unit/id_unit_traduction

INSERT INTO public.emission_factor(
        id,
        id_emission_sub_categorie,
        label,
        type,
        unit,
        value,
        uncertainty
    )
VALUES 
-- Fuel
(1, 1, 'Heating oil', 'Fuel', 'kgCO2e/kWh net heating', 0.324, 0),
(2, 1, 'Heavy fuel oil', 'Fuel', 'kgCO2e/kWh net heating', 0.324, 0),
(3, 1, 'Natural gas', 'Fuel', 'kgCO2e/kWh gross heating', 0.214, 0),
(4, 1, 'Wood pellets (8% humidity)', 'Fuel', 'kgCO2e/kWh net heating', 0.0304, 4),

-- Electricity
(5, 2, 'Grid electricity', 'Electricity', 'kgCO2e/kWh', 0.0647, 1),

-- Other gas
(6, 3, 'R134a', 'Refrigerant gas', 'kgCO2e/kg', 1300, 3),
(7, 3, 'R22 (sales banned since 2015)', 'Refrigerant gas', 'kgCO2e/kg', 1760, 3),
(8, 3, 'R32', 'Refrigerant gas', 'kgCO2e/kg', 675, 3),
(9, 3, 'R404a (sales banned since 2020)', 'Refrigerant gas', 'kgCO2e/kg', 3943, 3),
(10, 3, 'R407c', 'Refrigerant gas', 'kgCO2e/kg', 1624, 3),
(11, 3, 'R410a', 'Refrigerant gas', 'kgCO2e/kg', 2088, 3),
(12, 3, 'R452a', 'Refrigerant gas', 'kgCO2e/kg', 2140, 3),
(13, 3, 'R513a', 'Refrigerant gas', 'kgCO2e/kg', 631, 5),
(14, 3, 'R744 - CO2', 'Refrigerant gas', 'kgCO2e/kg', 1, 3),
(15, 3, 'CO2', 'Principal greenhouse gas', 'kgCO2e/kg', 1, 0),
(16, 3, 'Fossil CH4', 'Principal greenhouse gas', 'kgCO2e/kg', 30, 0),
(17, 3, 'Biogenic CH4', 'Principal greenhouse gas', 'kgCO2e/kg', 28, 0),
(18, 3, 'N2O', 'Principal greenhouse gas', 'kgCO2e/kg', 265, 0),
(19, 3, 'SF6', 'Principal greenhouse gas', 'kgCO2e/kg', 23500, 0),
(20, 3, 'NF3', 'Principal greenhouse gas', 'kgCO2e/kg', 16100, 0),

-- Meals
(21, 5, 'Typical meal', 'Meal', 'kgCO2e/meal', 2.25, 4),
(22, 5, 'Vegetarian meal', 'Meal', 'kgCO2e/meal', 0.45, 4),
(23, 5, 'Main course of red meat', 'Meal', 'kgCO2e/meal', 7.26, 4),
(24, 5, 'Main course of white meat', 'Meal', 'kgCO2e/meal', 1.58, 4),

-- Road haulage of goods
(25, 6, 'Delivery truck (authorized loaded weight 19t)', 'Road haulage', 'kgCO2e/tonne.km', 0.379, 4),
(26, 6, 'Local delivery vehicle (authorized loaded weight 7.5t)', 'Road haulage', 'kgCO2e/tonne.km', 0.848, 4),
(27, 6, 'Large volume 26t articulated lorry', 'Road haulage', 'kgCO2e/tonne.km', 0.178, 4),
(28, 6, 'Large volume 40t articulated lorry', 'Road haulage', 'kgCO2e/tonne.km', 0.105, 4),
(29, 6, 'Light utility vehicle', 'Road haulage', 'kgCO2e/tonne.km', 1.2, 4),
(30, 6, 'Air freight – aeroplane > 250 seats, distance travelled 3 000-4 000 km, A1 jet fuel', 'Air freight', 'kgCO2e/tonne.km', 2.51, 4),
(31, 6, 'Freight train (Europe)', 'Freight train', 'kgCO2e/tonne.km', 0.0226, 4),
(32, 6, 'Freight train, electric traction, dense merchandise', 'Freight train', 'kgCO2e/tonne.km', 0.00146, 4),
(33, 6, 'Cargo ship – under 1 200 TEU', 'Cargo ship', 'kgCO2e/tonne.km', 0.0331, 4),
(34, 6, 'Cargo ship – 3 850 to 7 499 TEU', 'Cargo ship', 'kgCO2e/tonne.km', 0.0137, 4),

-- Organic waste
(35, 7, 'Typical end-of-life treatment', 'Organic waste', 'kgCO2e/tonne', 48.1, 5),
(36, 7, 'Landfill', 'Organic waste', 'kgCO2e/tonne', 649, 5),
(37, 7, 'Incineration', 'Organic waste', 'kgCO2e/tonne', 46.6, 5),
(38, 7, 'Compost (industrial)', 'Organic waste', 'kgCO2e/tonne', 86.7, 5),

-- Other waste
(39, 8, 'Paper – typical end of life', 'Other waste', 'kgCO2e/tonne', 43.1, 5),
(40, 8, 'Cardboard – typical end of life', 'Other waste', 'kgCO2e/tonne', 37.9, 5),
(41, 8, 'Glass – typical end of life', 'Other waste', 'kgCO2e/tonne', 33, 5),
(42, 8, 'Plastic – typical end of life', 'Other waste', 'kgCO2e/tonne', 877, 5),

-- Means of transport
(43, 10, 'Personal car – gasoline/petrol', 'Transport', 'kgCO2e/km', 0.259, 2),
(44, 10, 'Personal car – diesel', 'Transport', 'kgCO2e/km', 0.251, 2),
(45, 10, 'City bus: agglomerations population 100 000 – 250 000', 'Transport', 'kgCO2e/passenger.km', 0.146, 5),
(46, 10, 'City bus: agglomerations population under 100 000', 'Transport', 'kgCO2e/passenger.km', 0.137, 5),
(47, 10, 'City bus: agglomerations population over 250 000', 'Transport', 'kgCO2e/passenger.km', 0.129, 5),
(48, 10, 'Metro', 'Transport', 'kgCO2e/passenger.km', 0.006, 2),
(49, 10, 'Suburban commuter train', 'Transport', 'kgCO2e/passenger.km', 0.006, 2),
(50, 10, 'Tramway', 'Transport', 'kgCO2e/passenger.km', 0.006, 2),
(51, 10, 'Train (average for France)', 'Transport', 'kgCO2e/passenger.km', 0.004, 5),

-- Ajout de l'avion en 11
(52, 11, 'Plane', 'Transport', 'kgCO2e/passenger.km', 0.187, 5),

(53, 12, 'Standard table (furniture)', 'Office equipment', 'kgCO2e/unit', 60.100, 2),
(54, 12, 'Chair (wood)', 'Office equipment', 'kgCO2e/unit', 18.600, 1),
(55, 12, 'Book', 'Office equipment', 'kgCO2e/unit', 1.100, 4),
(56, 12, 'Office supplies and consumables (€)', 'Office equipment', 'kgCO2e/€ of expense', 0.917, 1),
(57, 12, 'Paper (ream)', 'Office equipment', 'kgCO2e/unit', 2.290, 2),

(58, 13, 'AAA batteries (alkaline)', 'Electronics and chemical products', 'kgCO2e/unit', 0.065, 4),
(59, 13, 'AA batteries (alkaline)', 'Electronics and chemical products', 'kgCO2e/unit', 0.137, 4),
(60, 13, 'Hydrochloric acid (litres)', 'Electronics and chemical products', 'kgCO2e/L', 1.440, 4),
(61, 13, 'Sulphuric acid (litres)', 'Electronics and chemical products', 'kgCO2e/L', 2.200, 4),

(62, 14, 'Basketball', 'Sports equipment', 'kgCO2e/unit', 4.600, 3),
(63, 14, 'Soccer ball', 'Sports equipment', 'kgCO2e/unit', 4.120, 3),
(64, 14, 'Volleyball', 'Sports equipment', 'kgCO2e/unit', 2.250, 3),
(65, 14, 'Handball', 'Sports equipment', 'kgCO2e/unit', 2.500, 3),

(66, 15, 'School building (concrete)', 'Construction', 'kgCO2e/m²', 440000, 4),
(67, 15, 'Parking lot (concrete)', 'Construction', 'kgCO2e/m²', 319000, 2),
(68, 15, 'Parking lot (asphalt)', 'Construction', 'kgCO2e/m²', 73000, 2),
(69, 15, 'Parking lot (semi-hard surface)', 'Construction', 'kgCO2e/m²', 165000, 2),

(70, 16, 'Workstation computer', 'Equipment', 'kgCO2e/unit', 169000, 4),
(71, 16, 'Tablets', 'Equipment', 'kgCO2e/unit', 63200, 4),
(72, 16, 'Photocopiers', 'Equipment', 'kgCO2e/unit', 2935000, 4),
(73, 16, 'Video projector', 'Equipment', 'kgCO2e/unit', 94000, 5),
(74, 16, 'Printer', 'Equipment', 'kgCO2e/unit', 87900, 4);