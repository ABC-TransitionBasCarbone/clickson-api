-- Inserts for "Energy" (id_emission_categorie = 1)
INSERT INTO public.emission_sub_categories (id, id_emission_categorie, label)
VALUES 
(1, 1, 'Energy - Fuel'),
(2, 1, 'Energy - Electricity'),
(3, 1, 'Energy - Advanced');

-- Inserts for "Food" (id_emission_categorie = 2)
INSERT INTO public.emission_sub_categories (id, id_emission_categorie, label)
VALUES 
(4, 2, 'Food - Basic 1'),
(5, 2, 'Food - Basic 2'),
(6, 2, 'Food - Delivery'),
(7, 2, 'Food - Organic Waste'),
(8, 2, 'Food - Other Waste');

-- Inserts for "Travel" (id_emission_categorie = 3)
INSERT INTO public.emission_sub_categories (id, id_emission_categorie, label)
VALUES 
(9, 3, 'Travel - Students'),
(10, 3, 'Travel - Personnel'),
(11, 3, 'Travel - School Trips');

-- Inserts for "Supplies" (id_emission_categorie = 4)
INSERT INTO public.emission_sub_categories (id, id_emission_categorie, label)
VALUES 
(12, 4, 'Supplies - Furnitures And Supplies'),
(13, 4, 'Supplies - Chemical Supplies For Electronic'),
(14, 4, 'Supplies - Sports Equipment');

-- Inserts for "Fixed Assets" (id_emission_categorie = 5)
INSERT INTO public.emission_sub_categories (id, id_emission_categorie, label)
VALUES 
(15, 5, 'Fixed Assets - Building'),
(16, 5, 'Fixed Assets - It Equipment');
