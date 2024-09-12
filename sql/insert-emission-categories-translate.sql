-- Insert translations for different languages  'en', 'fr', 'es', 'it', 'gr', 'hr', 'hu', 'ro'
INSERT INTO public.emission_categories_translation(
        id,
        id_emission_categorie,
        language_code,
        translated_label
    )
VALUES -- Translations for "Energy"
    (1, 1, 'en', 'Energy'),
    (2, 1, 'fr', 'Énergie'),
    (3, 1, 'es', 'Energía'),
    (4, 1, 'it', 'Energia'),
    (5, 1, 'gr', 'Ενέργεια'),
    (6, 1, 'hr', 'Energija'),
    (7, 1, 'hu', 'Energia'),
    (8, 1, 'ro', 'Energie'),
    -- Translations for "Food service"
    (9, 2, 'en', 'Food Service'),
    (10, 2, 'fr', 'Service Alimentaire'),
    (11, 2, 'es', 'Servicio de Alimentos'),
    (12, 2, 'it', 'Servizio di Ristorazione'),
    (13, 2, 'gr', 'Υπηρεσία Τροφίμων'),
    (14, 2, 'hr', 'Usluga Prehrane'),
    (15, 2, 'hu', 'Élelmiszer Szolgáltatás'),
    (16, 2, 'ro', 'Serviciu Alimentar'),
    -- Translations for "Travel"
    (17, 3, 'en', 'Travel'),
    (18, 3, 'fr', 'Voyage'),
    (19, 3, 'es', 'Viaje'),
    (20, 3, 'it', 'Viaggio'),
    (21, 3, 'gr', 'Ταξίδι'),
    (22, 3, 'hr', 'Putovanje'),
    (23, 3, 'hu', 'Utazás'),
    (24, 3, 'ro', 'Călătorie'),
    -- Translations for "Supplies"
    (25, 4, 'en', 'Supplies'),
    (26, 4, 'fr', 'Fournitures'),
    (27, 4, 'es', 'Suministros'),
    (28, 4, 'it', 'Forniture'),
    (29, 4, 'gr', 'Προμήθειες'),
    (30, 4, 'hr', 'Zalihe'),
    (31, 4, 'hu', 'Kellékek'),
    (32, 4, 'ro', 'Aprovizionări'),
    -- Translations for "Fixed assets"
    (33, 5, 'en', 'Fixed Assets'),
    (34, 5, 'fr', 'Actifs Fixes'),
    (35, 5, 'es', 'Activos Fijos'),
    (36, 5, 'it', 'Beni Fissi'),
    (37, 5, 'gr', 'Πάγια Περιουσιακά Στοιχεία'),
    (38, 5, 'hr', 'Stalna Imovina'),
    (39, 5, 'hu', 'Tárgyi Eszközök'),
    (40, 5, 'ro', 'Active Fixe');