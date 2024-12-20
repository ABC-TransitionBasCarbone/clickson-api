import { Language } from "./languages";

export const LANGUAGES: Language[] = [
  {
    languageCode: 'fr',
    flagUrl: 'https://flagcdn.com/h20/fr.png',
    categories: [
      {
        label: 'Énergie',
        detail:
          "La catégorie énergie se concentre sur la consommation d'énergie de l'école sur une année scolaire. Initialement, les données sur la consommation d'électricité et de chauffage seront collectées. Pour une approche complète, les consommations liées aux laboratoires de chimie seront également ajoutées.",
        subCategories: [
          {
            label: 'Combustible',
            detail:
              "Votre école possède probablement une ou plusieurs chaudières ou fournaises pour le chauffage. Pour fonctionner, ces appareils peuvent utiliser différents types de combustibles fossiles (fioul, gaz naturel, etc.). Les émissions de gaz à effet de serre (GES) générées par cet équipement correspondent à la consommation d'énergie du combustible brûlé.",
            emissionFactors: [
              { label: 'Fioul domestique', type: 'Combustible', unit: 'kWh chauffage net', value: 0.324, uncertainty: 0 },
              { label: 'Fioul lourd', type: 'Combustible', unit: 'kWh chauffage net', value: 0.324, uncertainty: 0 },
              { label: 'Gaz naturel', type: 'Combustible', unit: 'kWh chauffage brut', value: 0.214, uncertainty: 0 },
              {
                label: 'Granulés de bois (8% d\'humidité)',
                type: 'Combustible',
                unit: 'kWh chauffage net',
                value: 0.0304,
                uncertainty: 4,
              },
            ],
          },
          {
            label: 'Électricité',
            detail:
              'Votre école est connectée au réseau électrique de votre pays. L\'électricité est produite de différentes manières (centrales nucléaires, énergies renouvelables, centrales à combustibles fossiles, etc.). Chaque mode de production émet des gaz à effet de serre (GES) en quantités différentes.',
            emissionFactors: [
              { label: 'Janvier', type: 'Électricité', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'Février', type: 'Électricité', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'Mars', type: 'Électricité', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'Avril', type: 'Électricité', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'Mai', type: 'Électricité', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'Juin', type: 'Électricité', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'Juillet', type: 'Électricité', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'Août', type: 'Électricité', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'Septembre', type: 'Électricité', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'Octobre', type: 'Électricité', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'Novembre', type: 'Électricité', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'Décembre', type: 'Électricité', unit: 'kWh', value: 0.233, uncertainty: 0 },
            ],
          },
          {
            label: 'Avancée',
            detail:
              'Votre école dispose sans doute de laboratoires scientifiques équipés de becs Bunsen ou d\'autres équipements qui consomment de l\'énergie. Il peut également y avoir des serveurs informatiques qui consomment de l\'électricité pour le stockage ou d\'autres services. Ceux-ci consomment de l\'énergie, contribuant aux émissions de gaz à effet de serre.',
            emissionFactors: [
              { label: 'R134a', type: 'Gaz réfrigérant', unit: 'kg', value: 1300, uncertainty: 3 },
              {
                label: 'R22 (vente interdite depuis 2015)',
                type: 'Gaz réfrigérant',
                unit: 'kg',
                value: 1760,
                uncertainty: 3,
              },
              { label: 'R32', type: 'Gaz réfrigérant', unit: 'kg', value: 675, uncertainty: 3 },
              {
                label: 'R404a (vente interdite depuis 2020)',
                type: 'Gaz réfrigérant',
                unit: 'kg',
                value: 3943,
                uncertainty: 3,
              },
              { label: 'R407c', type: 'Gaz réfrigérant', unit: 'kg', value: 1624, uncertainty: 3 },
              { label: 'R410a', type: 'Gaz réfrigérant', unit: 'kg', value: 2088, uncertainty: 3 },
              { label: 'R452a', type: 'Gaz réfrigérant', unit: 'kg', value: 2140, uncertainty: 3 },
              { label: 'R513a', type: 'Gaz réfrigérant', unit: 'kg', value: 631, uncertainty: 5 },
              { label: 'R744 - CO2', type: 'Gaz réfrigérant', unit: 'kg', value: 1, uncertainty: 3 },
              { label: 'CO2', type: 'Gaz à effet de serre principal', unit: 'kg', value: 1, uncertainty: 0 },
              { label: 'CH4 fossile', type: 'Gaz à effet de serre principal', unit: 'kg', value: 30, uncertainty: 0 },
              { label: 'CH4 biogénique', type: 'Gaz à effet de serre principal', unit: 'kg', value: 28, uncertainty: 0 },
              { label: 'N2O', type: 'Gaz à effet de serre principal', unit: 'kg', value: 265, uncertainty: 0 },
              { label: 'SF6', type: 'Gaz à effet de serre principal', unit: 'kg', value: 23500, uncertainty: 0 },
              { label: 'NF3', type: 'Gaz à effet de serre principal', unit: 'kg', value: 16100, uncertainty: 0 },
            ],
          },
        ],
      },
      {
        label: 'Restauration',
        detail:
          'Dans la catégorie Restauration, les élèves doivent calculer les émissions liées aux repas servis. Dans certaines écoles, des données sur les aliments vendus dans les cantines et les distributeurs automatiques seront également collectées.',
        subCategories: [
          {
            label: 'Repas',
            detail:
              'Ici, vous calculerez les émissions liées aux repas servis dans votre cantine scolaire, cafétéria ou self-service. Assurez-vous de calculer le nombre total de repas pour toute l\'année ! Nous vous suggérons d\'utiliser la période de janvier à décembre. Nombre de repas fournis par l\'école divisés en options. Si votre école ne fournit pas de restauration, vous pouvez toujours compter les déjeuners que vous consommez pendant l\'année scolaire. De cette façon, vous pourrez comparer vos données au niveau européen !',
            emissionFactors: [
              { label: 'Repas typique', type: 'Repas', unit: 'repas', value: 2.25, uncertainty: 4 },
              { label: 'Repas végétarien', type: 'Repas', unit: 'repas', value: 0.45, uncertainty: 4 },
              { label: 'Plat principal de viande rouge', type: 'Repas', unit: 'repas', value: 7.26, uncertainty: 4 },
              { label: 'Plat principal de viande blanche', type: 'Repas', unit: 'repas', value: 1.58, uncertainty: 4 },
            ],
          },
          {
            label: 'Livraison',
            detail:
              'Votre école dispose probablement d\'une cantine, cafétéria ou self-service. Tous les aliments que vous y consommez sont apportés par divers moyens de transport, qui ont émis des gaz à effet de serre. Enregistrez ici les véhicules utilisés pour livrer les fournitures alimentaires à la cantine ou à la cafétéria. Couvrez toute l\'année si vous le pouvez ! Faites attention aux unités demandées). Fournisseurs de nourriture dans votre école, comment livrent-ils la nourriture aux écoles et pour combien de km parcourent-ils.',
            emissionFactors: [
              {
                label: 'Camion de livraison (poids autorisé en charge 19t)',
                type: 'Transport routier',
                unit: 'tonne.km',
                value: 0.379,
                uncertainty: 4,
              },
              {
                label: 'Véhicule de livraison local (poids autorisé en charge 7,5t)',
                type: 'Transport routier',
                unit: 'tonne.km',
                value: 0.848,
                uncertainty: 4,
              },
              {
                label: 'Camion articulé grand volume 26t',
                type: 'Transport routier',
                unit: 'tonne.km',
                value: 0.178,
                uncertainty: 4,
              },
              {
                label: 'Camion articulé grand volume 40t',
                type: 'Transport routier',
                unit: 'tonne.km',
                value: 0.105,
                uncertainty: 4,
              },
              { label: 'Véhicule utilitaire léger', type: 'Transport routier', unit: 'tonne.km', value: 1.2, uncertainty: 4 },
              {
                label: 'Fret aérien – avion > 250 sièges, distance parcourue 3 000-4 000 km, carburant A1',
                type: 'Fret aérien',
                unit: 'tonne.km',
                value: 2.51,
                uncertainty: 4,
              },
              {
                label: 'Train de fret (Europe)',
                type: 'Train de fret',
                unit: 'tonne.km',
                value: 0.0226,
                uncertainty: 4,
              },
              {
                label: 'Train de fret, traction électrique, marchandises denses',
                type: 'Train de fret',
                unit: 'tonne.km',
                value: 0.00146,
                uncertainty: 4,
              },
              {
                label: 'Navire cargo – moins de 1 200 EVP',
                type: 'Navire cargo',
                unit: 'tonne.km',
                value: 0.0331,
                uncertainty: 4,
              },
              {
                label: 'Navire cargo – 3 850 à 7 499 EVP',
                type: 'Navire cargo',
                unit: 'tonne.km',
                value: 0.0137,
                uncertainty: 4,
              },
            ],
          },
        ],
      },
      {
        label: 'Déplacements',
        detail:
          'La catégorie Déplacements se concentre sur les émissions liées aux déplacements domicile-établissement des élèves, des enseignants et du personnel non enseignant, ainsi que sur les voyages scolaires s\'ils ont lieu.',
        subCategories: [
          {
            label: 'Bus scolaires',
            detail:
              'L\'utilisation des bus scolaires pour le transport des élèves contribue aux émissions de gaz à effet de serre. Une planification efficace des itinéraires, l\'entretien des véhicules et l\'utilisation de véhicules à faibles émissions peuvent aider à réduire ces émissions.',
            emissionFactors: [
              {
                label: 'Bus de ville : agglomérations population 100 000 – 250 000',
                type: 'Transport',
                unit: 'passager.km',
                value: 0.146,
                uncertainty: 5,
              },
              {
                label: 'Bus de ville : agglomérations population moins de 100 000',
                type: 'Transport',
                unit: 'passager.km',
                value: 0.137,
                uncertainty: 5,
              },
              {
                label: 'Bus de ville : agglomérations population plus de 250 000',
                type: 'Transport',
                unit: 'passager.km',
                value: 0.129,
                uncertainty: 5,
              },
            ],
          },
          {
            label: 'Véhicules du personnel',
            detail:
              'Les véhicules utilisés par le personnel scolaire pour les trajets domicile-travail ou autres activités liées à l\'école contribuent également aux émissions de gaz à effet de serre. Le covoiturage, l\'utilisation des transports en commun ou la transition vers des véhicules électriques peuvent atténuer ces émissions.',
            emissionFactors: [
              {
                label: 'Voiture personnelle – essence',
                type: 'Transport',
                unit: 'km',
                value: 0.259,
                uncertainty: 2,
              },
              { label: 'Voiture personnelle – diesel', type: 'Transport', unit: 'km', value: 0.251, uncertainty: 2 },
              {
                label: 'Bus de ville : agglomérations population 100 000 – 250 000',
                type: 'Transport',
                unit: 'passager.km',
                value: 0.146,
                uncertainty: 5,
              },
              {
                label: 'Bus de ville : agglomérations population moins de 100 000',
                type: 'Transport',
                unit: 'passager.km',
                value: 0.137,
                uncertainty: 5,
              },
              {
                label: 'Bus de ville : agglomérations population plus de 250 000',
                type: 'Transport',
                unit: 'passager.km',
                value: 0.129,
                uncertainty: 5,
              },
              { label: 'Métro', type: 'Transport', unit: 'passager.km', value: 0.006, uncertainty: 2 },
              {
                label: 'Train de banlieue',
                type: 'Transport',
                unit: 'passager.km',
                value: 0.006,
                uncertainty: 2,
              },
              { label: 'Tramway', type: 'Transport', unit: 'passager.km', value: 0.006, uncertainty: 2 },
              {
                label: 'Train (moyenne pour la France)',
                type: 'Transport',
                unit: 'passager.km',
                value: 0.004,
                uncertainty: 5,
              },
              { label: 'Avion', type: 'Transport', unit: 'passager.km', value: 0.187, uncertainty: 5 },
            ],
          },
          {
            label: 'Personnel',
            detail:
              'Pour aller un peu plus loin, il serait intéressant d\'enregistrer les déplacements du personnel scolaire également. Comme pour les élèves, un questionnaire est un bon moyen de commencer à collecter des données pour chaque type de déplacement. Travaillez avec les enquêtes pour estimer : le nombre total de km (aller-retour) et dans quelle proportion les différents moyens de transport sont utilisés par le personnel.',
            emissionFactors: [
              {
                label: 'Voiture personnelle – essence',
                type: 'Transport',
                unit: 'km',
                value: 0.259,
                uncertainty: 2,
              },
              { label: 'Voiture personnelle – diesel', type: 'Transport', unit: 'km', value: 0.251, uncertainty: 2 },
              {
                label: 'Bus de ville : agglomérations population 100 000 – 250 000',
                type: 'Transport',
                unit: 'passager.km',
                value: 0.146,
                uncertainty: 5,
              },
              {
                label: 'Bus de ville : agglomérations population moins de 100 000',
                type: 'Transport',
                unit: 'passager.km',
                value: 0.137,
                uncertainty: 5,
              },
              {
                label: 'Bus de ville : agglomérations population plus de 250 000',
                type: 'Transport',
                unit: 'passager.km',
                value: 0.129,
                uncertainty: 5,
              },
              { label: 'Métro', type: 'Transport', unit: 'passager.km', value: 0.006, uncertainty: 2 },
              {
                label: 'Train de banlieue',
                type: 'Transport',
                unit: 'passager.km',
                value: 0.006,
                uncertainty: 2,
              },
              { label: 'Tramway', type: 'Transport', unit: 'passager.km', value: 0.006, uncertainty: 2 },
              {
                label: 'Train (moyenne pour la France)',
                type: 'Transport',
                unit: 'passager.km',
                value: 0.004,
                uncertainty: 5,
              },
              { label: 'Avion', type: 'Transport', unit: 'passager.km', value: 0.187, uncertainty: 5 },
            ],
          },
          {
            label: 'Voyages scolaires',
            detail:
              'Si votre école organise des sorties scolaires, ces déplacements doivent également être comptabilisés. Additionnez la distance parcourue et multipliez par le nombre de personnes qui font le voyage. Travaillez avec les enquêtes pour estimer : le ratio entre le nombre de passagers et le nombre total de km (aller-retour) utilisés par les voyages scolaires.',
            emissionFactors: [
              {
                label: 'Voiture personnelle – essence',
                type: 'Transport',
                unit: 'km',
                value: 0.259,
                uncertainty: 2,
              },
              { label: 'Voiture personnelle – diesel', type: 'Transport', unit: 'km', value: 0.251, uncertainty: 2 },
              {
                label: 'Bus de ville : agglomérations population 100 000 – 250 000',
                type: 'Transport',
                unit: 'passager.km',
                value: 0.146,
                uncertainty: 5,
              },
              {
                label: 'Bus de ville : agglomérations population moins de 100 000',
                type: 'Transport',
                unit: 'passager.km',
                value: 0.137,
                uncertainty: 5,
              },
              {
                label: 'Bus de ville : agglomérations population plus de 250 000',
                type: 'Transport',
                unit: 'passager.km',
                value: 0.129,
                uncertainty: 5,
              },
              { label: 'Métro', type: 'Transport', unit: 'passager.km', value: 0.006, uncertainty: 2 },
              {
                label: 'Train de banlieue',
                type: 'Transport',
                unit: 'passager.km',
                value: 0.006,
                uncertainty: 2,
              },
              { label: 'Tramway', type: 'Transport', unit: 'passager.km', value: 0.006, uncertainty: 2 },
              {
                label: 'Train (moyenne pour la France)',
                type: 'Transport',
                unit: 'passager.km',
                value: 0.004,
                uncertainty: 5,
              },
              { label: 'Avion', type: 'Transport', unit: 'passager.km', value: 0.187, uncertainty: 5 },
            ],
          },
        ],
      },
      {
        label: 'Achats',
        detail:
          'Dans la catégorie Fournitures, tout le matériel acheté pour l\'année scolaire est enregistré. Il s\'agit principalement de consommables ou de produits de courte durée qui seront utilisés pendant l\'année et devront être rachetés l\'année suivante.',
        subCategories: [
          {
            label: 'Fournitures',
            detail:
              'Votre collège ou lycée achète du matériel et du mobilier pour que les cours puissent se dérouler et que les élèves puissent apprendre dans de bonnes conditions. Ici, vous estimerez les émissions de GES liées à l\'achat de fournitures autres que les denrées alimentaires (les achats alimentaires sont reportés dans l\'onglet restauration). Comptez la totalité des articles achetés par l\'école pendant l\'année scolaire et insérez les données.',
            emissionFactors: [
              { label: 'Livre', type: 'Équipement de bureau', unit: 'unité', value: 1.1, uncertainty: 4 },
              {
                label: 'Fournitures de bureau et consommables (€)',
                type: 'Équipement de bureau',
                unit: '€ de dépense',
                value: 0.917,
                uncertainty: 1,
              },
              { label: 'Papier (ramette)', type: 'Équipement de bureau', unit: 'unité', value: 2.29, uncertainty: 2 },
            ],
          },
          {
            label: 'Fournitures chimiques pour électronique',
            detail:
              'Pensez aux matériaux que vous utilisez dans les cours de sciences et de technologie et dans les laboratoires. Ces produits émettent des gaz à effet de serre qui doivent être comptabilisés. Vous pouvez trouver les quantités de matériaux achetés chaque année en consultant les factures payées par l\'école. Comptez la totalité des articles dans l\'école et insérez les données.',
            emissionFactors: [
              {
                label: 'Piles AAA (alcalines)',
                type: 'Produits électroniques et chimiques',
                unit: 'unité',
                value: 0.065,
                uncertainty: 4,
              },
              {
                label: 'Piles AA (alcalines)',
                type: 'Produits électroniques et chimiques',
                unit: 'unité',
                value: 0.137,
                uncertainty: 4,
              },
              {
                label: 'Acide chlorhydrique (litres)',
                type: 'Produits électroniques et chimiques',
                unit: 'L',
                value: 1.44,
                uncertainty: 4,
              },
              {
                label: 'Acide sulfurique (litres)',
                type: 'Produits électroniques et chimiques',
                unit: 'L',
                value: 2.2,
                uncertainty: 4,
              },
            ],
          },
          {
            label: 'Équipement sportif',
            detail:
              'L\'équipement est également utilisé en éducation physique et doit parfois être remplacé. Ici, vous pouvez déclarer les achats de nouveaux équipements achetés pendant l\'année de votre inventaire. Comptez la totalité des articles dans l\'école et insérez les données.',
            emissionFactors: [
              { label: 'Ballon de basket', type: 'Équipement sportif', unit: 'unité', value: 4.6, uncertainty: 3 },
              { label: 'Ballon de football', type: 'Équipement sportif', unit: 'unité', value: 4.12, uncertainty: 3 },
              { label: 'Ballon de volley', type: 'Équipement sportif', unit: 'unité', value: 2.25, uncertainty: 3 },
              { label: 'Ballon de handball', type: 'Équipement sportif', unit: 'unité', value: 2.5, uncertainty: 3 },
            ],
          },
        ],
      },
      {
        label: 'Immobilisations',
        detail:
          'La catégorie des immobilisations couvre les bâtiments/rénovations et les biens classés comme "long terme" tels que les équipements informatiques, les machines de production, etc. Les émissions générées par la fabrication de ces biens sont réparties sur une période conventionnellement choisie (20 ans pour les bâtiments, 5 ans pour les équipements informatiques).',
        subCategories: [
          {
            label: 'Bâtiment',
            detail:
              "Toute construction implique des émissions de gaz à effet de serre. Quelles sont les émissions de votre bâtiment scolaire ou de vos bâtiments ? Même si l'école a été construite il y a longtemps, c'est ce qu'on appelle un 'ammortissement'. Pour tenir compte de la durée de vie du bâtiment, les émissions de construction sont réparties sur les années (amortissement). Insérez le nombre de m² du bâtiment de votre école et de ses parkings (ils peuvent être de différents types !).",
            emissionFactors: [
              {
                label: 'Bâtiment scolaire (béton)',
                type: 'Construction',
                unit: 'm²',
                value: 440000,
                uncertainty: 4,
                depreciationPeriod: 20,
              },
              {
                label: 'Parking (béton)', type: 'Construction', unit: 'm²', value: 319000, uncertainty: 2, depreciationPeriod: 20
              },
              { label: 'Parking (asphalte)', type: 'Construction', unit: 'm²', value: 73000, uncertainty: 2, depreciationPeriod: 20 },
              {
                label: 'Parking (surface semi-dure)',
                type: 'Construction',
                unit: 'm²',
                value: 165000,
                uncertainty: 2,
                depreciationPeriod: 20
              },
            ],
          },
          {
            label: 'Mobilier',
            detail:
              'Votre collège ou lycée achète du mobilier pour que les cours puissent se dérouler et que les élèves puissent apprendre dans de bonnes conditions. Ici, vous estimerez les émissions de GES liées à l\'achat de fournitures autres que les denrées alimentaires (les achats alimentaires sont reportés dans l\'onglet restauration). Comptez la totalité des articles achetés par l\'école pendant l\'année scolaire et insérez les données.',
            emissionFactors: [
              {
                label: 'Table standard (mobilier)',
                type: 'Équipement de bureau',
                unit: 'unité',
                value: 60.1,
                uncertainty: 2, depreciationPeriod: 5
              },
              { label: 'Chaise (bois)', type: 'Équipement de bureau', unit: 'unité', value: 18.6, uncertainty: 1, depreciationPeriod: 5 }
            ],
          },
          {
            label: 'Équipement Informatique',
            detail:
              'Vous vous souvenez de notre discussion sur l\'impact environnemental des smartphones ? De même, des matières premières sont utilisées pour fabriquer des ordinateurs et des équipements informatiques. Ce sont également des immobilisations. La même méthode comptable est utilisée pour répartir les émissions sur la durée de vie de l\'équipement (amortissement). Comptez la totalité des articles dans l\'école et insérez les données.',
            emissionFactors: [
              { label: 'Ordinateur de bureau', type: 'Équipement', unit: 'unité', value: 169000, uncertainty: 4, depreciationPeriod: 5 },
              { label: 'Tablettes', type: 'Équipement', unit: 'unité', value: 63200, uncertainty: 4, depreciationPeriod: 5 },
              { label: 'Photocopieurs', type: 'Équipement', unit: 'unité', value: 2935000, uncertainty: 4, depreciationPeriod: 5 },
              { label: 'Vidéoprojecteur', type: 'Équipement', unit: 'unité', value: 94000, uncertainty: 5, depreciationPeriod: 5 },
              { label: 'Imprimante', type: 'Équipement', unit: 'unité', value: 87900, uncertainty: 4, depreciationPeriod: 5 },
            ],
          },
        ],
      }
    ]
  },
  {
    languageCode: 'en',
    flagUrl: 'https://flagcdn.com/h20/gb.png',
    categories: [
      {
        label: 'Energy',
        detail:
          "The energy category focuses on the school's energy consumption over a school year. Initially, data on electricity and heating consumption will be collected. For a complete approach, consumptions linked to chemistry laboratories will also be added.",
        subCategories: [
          {
            label: 'Fuel',
            detail:
              'Your school probably has one or several boilers or furnaces for heating. To operate, these devices may use different types of fossil fuels (fuel oil, natural gas, etc.). The greenhouse gas (GHG) emissions generated by this equipment correspond to the energy consumption of the fuel burned.',
            emissionFactors: [
              { label: 'Heating oil', type: 'Fuel', unit: 'kWh net heating', value: 0.324, uncertainty: 0 },
              { label: 'Heavy fuel oil', type: 'Fuel', unit: 'kWh net heating', value: 0.324, uncertainty: 0 },
              { label: 'Natural gas', type: 'Fuel', unit: 'kWh gross heating', value: 0.214, uncertainty: 0 },
              {
                label: 'Wood pellets (8% humidity)',
                type: 'Fuel',
                unit: 'kWh net heating',
                value: 0.0304,
                uncertainty: 4,
              },
            ],
          },
          {
            label: 'Electricity',
            detail:
              'Your school is connected to the power grid in your country. Electricity is produced in different ways (nuclear power plants, renewable energies, fossil fuel power plants, etc.). Each mode of production emits greenhouse gases (GHGs) in different quantities.',
            emissionFactors: [
              { label: 'January', type: 'Electricity', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'February', type: 'Electricity', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'March', type: 'Electricity', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'April', type: 'Electricity', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'May', type: 'Electricity', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'June', type: 'Electricity', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'July', type: 'Electricity', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'August', type: 'Electricity', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'September', type: 'Electricity', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'October', type: 'Electricity', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'November', type: 'Electricity', unit: 'kWh', value: 0.233, uncertainty: 0 },
              { label: 'December', type: 'Electricity', unit: 'kWh', value: 0.233, uncertainty: 0 },],
          },
          {
            label: 'Advanced',
            detail:
              'Your school undoubtedly has science labs equipped with bunsen burners or other equipment that consume energy. There may also be computer servers that consume electricity for storage or other services. These consume energy, contributing to greenhouse gas emissions.',
            emissionFactors: [
              { label: 'R134a', type: 'Refrigerant gas', unit: 'kg', value: 1300, uncertainty: 3 },
              {
                label: 'R22 (sales banned since 2015)',
                type: 'Refrigerant gas',
                unit: 'kg',
                value: 1760,
                uncertainty: 3,
              },
              { label: 'R32', type: 'Refrigerant gas', unit: 'kg', value: 675, uncertainty: 3 },
              {
                label: 'R404a (sales banned since 2020)',
                type: 'Refrigerant gas',
                unit: 'kg',
                value: 3943,
                uncertainty: 3,
              },
              { label: 'R407c', type: 'Refrigerant gas', unit: 'kg', value: 1624, uncertainty: 3 },
              { label: 'R410a', type: 'Refrigerant gas', unit: 'kg', value: 2088, uncertainty: 3 },
              { label: 'R452a', type: 'Refrigerant gas', unit: 'kg', value: 2140, uncertainty: 3 },
              { label: 'R513a', type: 'Refrigerant gas', unit: 'kg', value: 631, uncertainty: 5 },
              { label: 'R744 - CO2', type: 'Refrigerant gas', unit: 'kg', value: 1, uncertainty: 3 },
              { label: 'CO2', type: 'Principal greenhouse gas', unit: 'kg', value: 1, uncertainty: 0 },
              { label: 'Fossil CH4', type: 'Principal greenhouse gas', unit: 'kg', value: 30, uncertainty: 0 },
              { label: 'Biogenic CH4', type: 'Principal greenhouse gas', unit: 'kg', value: 28, uncertainty: 0 },
              { label: 'N2O', type: 'Principal greenhouse gas', unit: 'kg', value: 265, uncertainty: 0 },
              { label: 'SF6', type: 'Principal greenhouse gas', unit: 'kg', value: 23500, uncertainty: 0 },
              { label: 'NF3', type: 'Principal greenhouse gas', unit: 'kg', value: 16100, uncertainty: 0 },
            ],
          },
        ],
      },
      {
        label: 'Food Service',
        detail:
          'In the Food service category, students must calculate emissions linked to meals served. In certain schools, data on food sold in canteens and vending machines will also be collected.',
        subCategories: [
          {
            label: 'Basic 1',
            detail:
              'Here you will calculate emissions related to meals served in your school lunchroom, canteen or self-service cafeteria. Be sure you calculate the total number of meals for the entire year! We suggest you use the period January through December.Number of meals provided by the school divided into options. If your schools is not providing a food service you can still count the lunches you consume during the school year. In this way you’ll be able to compare your data at European level!',
            emissionFactors: [
              { label: 'Typical meal', type: 'Meal', unit: 'meal', value: 2.25, uncertainty: 4 },
              { label: 'Vegetarian meal', type: 'Meal', unit: 'meal', value: 0.45, uncertainty: 4 },
              { label: 'Main course of red meat', type: 'Meal', unit: 'meal', value: 7.26, uncertainty: 4 },
              { label: 'Main course of white meat', type: 'Meal', unit: 'meal', value: 1.58, uncertainty: 4 },
            ],
          },
          {
            label: 'Delivery',
            detail:
              'Your school probably has a lunchroom, canteen or self-service cafeteria. All the food that you eat there is brought in by various means of transport, which have emitted greenhouse gases. Record here the vehicles used to deliver food supplies to the canteen or cafeteria. Cover the whole year if you can! Pay attention to the units requested). Suppliers of food in your school, how do they deliver the food to the schools and for how many km do they travel.',
            emissionFactors: [
              {
                label: 'Delivery truck (authorized loaded weight 19t)',
                type: 'Road haulage',
                unit: 'tonne.km',
                value: 0.379,
                uncertainty: 4,
              },
              {
                label: 'Local delivery vehicle (authorized loaded weight 7.5t)',
                type: 'Road haulage',
                unit: 'tonne.km',
                value: 0.848,
                uncertainty: 4,
              },
              {
                label: 'Large volume 26t articulated lorry',
                type: 'Road haulage',
                unit: 'tonne.km',
                value: 0.178,
                uncertainty: 4,
              },
              {
                label: 'Large volume 40t articulated lorry',
                type: 'Road haulage',
                unit: 'tonne.km',
                value: 0.105,
                uncertainty: 4,
              },
              { label: 'Light utility vehicle', type: 'Road haulage', unit: 'tonne.km', value: 1.2, uncertainty: 4 },
              {
                label: 'Air freight – aeroplane > 250 seats, distance travelled 3 000-4 000 km, A1 jet fuel',
                type: 'Air freight',
                unit: 'tonne.km',
                value: 2.51,
                uncertainty: 4,
              },
              {
                label: 'Freight train (Europe)',
                type: 'Freight train',
                unit: 'tonne.km',
                value: 0.0226,
                uncertainty: 4,
              },
              {
                label: 'Freight train, electric traction, dense merchandise',
                type: 'Freight train',
                unit: 'tonne.km',
                value: 0.00146,
                uncertainty: 4,
              },
              {
                label: 'Cargo ship – under 1 200 TEU',
                type: 'Cargo ship',
                unit: 'tonne.km',
                value: 0.0331,
                uncertainty: 4,
              },
              {
                label: 'Cargo ship – 3 850 to 7 499 TEU',
                type: 'Cargo ship',
                unit: 'tonne.km',
                value: 0.0137,
                uncertainty: 4,
              },
            ],
          },
        ],
      },
      {
        label: 'Travel',
        detail:
          'The Travel category focuses on emissions linked to home-establishment travel of students, teachers, and non-teaching staff, as well as school trips if any take place.',
        subCategories: [
          {
            label: 'School Buses',
            detail:
              'The use of school buses for student transportation contributes to greenhouse gas emissions. Efficient route planning, vehicle maintenance, and the use of low-emission vehicles can help reduce these emissions.',
            emissionFactors: [
              {
                label: 'City bus: agglomerations population 100 000 – 250 000',
                type: 'Transport',
                unit: 'passenger.km',
                value: 0.146,
                uncertainty: 5,
              },
              {
                label: 'City bus: agglomerations population under 100 000',
                type: 'Transport',
                unit: 'passenger.km',
                value: 0.137,
                uncertainty: 5,
              },
              {
                label: 'City bus: agglomerations population over 250 000',
                type: 'Transport',
                unit: 'passenger.km',
                value: 0.129,
                uncertainty: 5,
              },
            ],
          },
          {
            label: 'Staff Vehicles',
            detail:
              'The vehicles used by school staff for commuting or other school-related activities also contribute to greenhouse gas emissions. Carpooling, use of public transport, or transitioning to electric vehicles can mitigate these emissions.',
            emissionFactors: [
              {
                label: 'Personal car – gasoline/petrol',
                type: 'Transport',
                unit: 'km',
                value: 0.259,
                uncertainty: 2,
              },
              { label: 'Personal car – diesel', type: 'Transport', unit: 'km', value: 0.251, uncertainty: 2 },
              {
                label: 'City bus: agglomerations population 100 000 – 250 000',
                type: 'Transport',
                unit: 'passenger.km',
                value: 0.146,
                uncertainty: 5,
              },
              {
                label: 'City bus: agglomerations population under 100 000',
                type: 'Transport',
                unit: 'passenger.km',
                value: 0.137,
                uncertainty: 5,
              },
              {
                label: 'City bus: agglomerations population over 250 000',
                type: 'Transport',
                unit: 'passenger.km',
                value: 0.129,
                uncertainty: 5,
              },
              { label: 'Metro', type: 'Transport', unit: 'passenger.km', value: 0.006, uncertainty: 2 },
              {
                label: 'Suburban commuter train',
                type: 'Transport',
                unit: 'passenger.km',
                value: 0.006,
                uncertainty: 2,
              },
              { label: 'Tramway', type: 'Transport', unit: 'passenger.km', value: 0.006, uncertainty: 2 },
              {
                label: 'Train (average for France)',
                type: 'Transport',
                unit: 'passenger.km',
                value: 0.004,
                uncertainty: 5,
              },
              { label: 'Plane', type: 'Transport', unit: 'passenger.km', value: 0.187, uncertainty: 5 },
            ],
          },
          {
            label: 'Personnel',
            detail:
              'To go a bit farther, it would be interesting to record travel by school staff as well. As for students, a questionnaire is a good way to start collecting data for each type of travel. Work with the surveys to estimate: total amount of km (round trip) and in which percentage the different means of transportation are used by the personnel.',
            emissionFactors: [
              {
                label: 'Personal car – gasoline/petrol',
                type: 'Transport',
                unit: 'km',
                value: 0.259,
                uncertainty: 2,
              },
              { label: 'Personal car – diesel', type: 'Transport', unit: 'km', value: 0.251, uncertainty: 2 },
              {
                label: 'City bus: agglomerations population 100 000 – 250 000',
                type: 'Transport',
                unit: 'passenger.km',
                value: 0.146,
                uncertainty: 5,
              },
              {
                label: 'City bus: agglomerations population under 100 000',
                type: 'Transport',
                unit: 'passenger.km',
                value: 0.137,
                uncertainty: 5,
              },
              {
                label: 'City bus: agglomerations population over 250 000',
                type: 'Transport',
                unit: 'passenger.km',
                value: 0.129,
                uncertainty: 5,
              },
              { label: 'Metro', type: 'Transport', unit: 'passenger.km', value: 0.006, uncertainty: 2 },
              {
                label: 'Suburban commuter train',
                type: 'Transport',
                unit: 'passenger.km',
                value: 0.006,
                uncertainty: 2,
              },
              { label: 'Tramway', type: 'Transport', unit: 'passenger.km', value: 0.006, uncertainty: 2 },
              {
                label: 'Train (average for France)',
                type: 'Transport',
                unit: 'passenger.km',
                value: 0.004,
                uncertainty: 5,
              },
              { label: 'Plane', type: 'Transport', unit: 'passenger.km', value: 0.187, uncertainty: 5 },
            ],
          },
          {
            label: 'School Trips',
            detail:
              'If your school organizes field trips this travel should be counted as well. Add up the distance travelled and multiply by the number of persons who take the trip. Work with the surveys to estimate: the ratio between the number of passengers and the total amount of km (round trip) used by school trips.',
            emissionFactors: [
              {
                label: 'Personal car – gasoline/petrol',
                type: 'Transport',
                unit: 'km',
                value: 0.259,
                uncertainty: 2,
              },
              { label: 'Personal car – diesel', type: 'Transport', unit: 'km', value: 0.251, uncertainty: 2 },
              {
                label: 'City bus: agglomerations population 100 000 – 250 000',
                type: 'Transport',
                unit: 'passenger.km',
                value: 0.146,
                uncertainty: 5,
              },
              {
                label: 'City bus: agglomerations population under 100 000',
                type: 'Transport',
                unit: 'passenger.km',
                value: 0.137,
                uncertainty: 5,
              },
              {
                label: 'City bus: agglomerations population over 250 000',
                type: 'Transport',
                unit: 'passenger.km',
                value: 0.129,
                uncertainty: 5,
              },
              { label: 'Metro', type: 'Transport', unit: 'passenger.km', value: 0.006, uncertainty: 2 },
              {
                label: 'Suburban commuter train',
                type: 'Transport',
                unit: 'passenger.km',
                value: 0.006,
                uncertainty: 2,
              },
              { label: 'Tramway', type: 'Transport', unit: 'passenger.km', value: 0.006, uncertainty: 2 },
              {
                label: 'Train (average for France)',
                type: 'Transport',
                unit: 'passenger.km',
                value: 0.004,
                uncertainty: 5,
              },
              { label: 'Plane', type: 'Transport', unit: 'passenger.km', value: 0.187, uncertainty: 5 },
            ],
          },
        ],
      },
      {
        label: 'Supplies',
        detail:
          'In the Supplies category, all the material bought for the school year is entered. These are mostly consumables or short-life products that will be used during the year and will have to be bought again next year.',
        subCategories: [
          {
            label: 'Furnitures And Supplies',
            detail:
              'Your middle school or high school buys equipment and furniture so that classes can be held and students can learn in good conditions. Here you will estimate the GHG emissions linked to the purchase of supplies other than foodstuffs (food purchases are reported in the Food service tab). Count the totality of the items purchased by the school during the school year and insert the data.',
            emissionFactors: [
              {
                label: 'Standard table (furniture)',
                type: 'Office equipment',
                unit: 'unit',
                value: 60.1,
                uncertainty: 2,
              },
              { label: 'Chair (wood)', type: 'Office equipment', unit: 'unit', value: 18.6, uncertainty: 1 },
              { label: 'Book', type: 'Office equipment', unit: 'unit', value: 1.1, uncertainty: 4 },
              {
                label: 'Office supplies and consumables (€)',
                type: 'Office equipment',
                unit: '€ of expense',
                value: 0.917,
                uncertainty: 1,
              },
              { label: 'Paper (ream)', type: 'Office equipment', unit: 'unit', value: 2.29, uncertainty: 2 },
            ],
          },
          {
            label: 'Chemical Supplies For Electronic',
            detail:
              'Think about the materials you use in science and technology classes and labs. These products emit greenhouse gases which should be counted. You can find the quantities of materials purchased each year by consulting the invoices paid by the school. Count the totality of the items in the school and insert the data.',
            emissionFactors: [
              {
                label: 'AAA batteries (alkaline)',
                type: 'Electronics and chemical products',
                unit: 'unit',
                value: 0.065,
                uncertainty: 4,
              },
              {
                label: 'AA batteries (alkaline)',
                type: 'Electronics and chemical products',
                unit: 'unit',
                value: 0.137,
                uncertainty: 4,
              },
              {
                label: 'Hydrochloric acid (litres)',
                type: 'Electronics and chemical products',
                unit: 'L',
                value: 1.44,
                uncertainty: 4,
              },
              {
                label: 'Sulphuric acid (litres)',
                type: 'Electronics and chemical products',
                unit: 'L',
                value: 2.2,
                uncertainty: 4,
              },
            ],
          },
          {
            label: 'Sports Equipment',
            detail:
              'Equipment is also used in physical education, and has to be replaced sometimes. Here you can report purchases of new equipment bought during the year of your inventory. Count the totality of the items in the school and insert the data.',
            emissionFactors: [
              { label: 'Basketball', type: 'Sports equipment', unit: 'unit', value: 4.6, uncertainty: 3 },
              { label: 'Soccer ball', type: 'Sports equipment', unit: 'unit', value: 4.12, uncertainty: 3 },
              { label: 'Volleyball', type: 'Sports equipment', unit: 'unit', value: 2.25, uncertainty: 3 },
              { label: 'Handball', type: 'Sports equipment', unit: 'unit', value: 2.5, uncertainty: 3 },
            ],
          },
        ],
      },
      {
        label: 'Fixed Assets',
        detail:
          'The Fixed assets category covers buildings/renovations and goods classified as "long-term" such as IT equipment, production machinery, etc. The emissions generated by the manufacture of these goods are spread over a conventionally chosen period (20 years for buildings, 5 years for IT equipment).',
        subCategories: [
          {
            label: 'Building',
            detail:
              "All construction involves greenhouse gas emissions. What are the emissions of your school building or buildings? Even if the school was built long ago, it is what is known as a 'fixed asset'. To account for the building's life span, the construction emissions are spread out over the years (depreciation). Insert the number of m2 of the building of your school and of its parking lots (they can be of different kinds!).",
            emissionFactors: [
              {
                label: 'School building (concrete)',
                type: 'Construction',
                unit: 'm²',
                value: 440000,
                uncertainty: 4,
              },
              { label: 'Parking lot (concrete)', type: 'Construction', unit: 'm²', value: 319000, uncertainty: 2 },
              { label: 'Parking lot (asphalt)', type: 'Construction', unit: 'm²', value: 73000, uncertainty: 2 },
              {
                label: 'Parking lot (semi-hard surface)',
                type: 'Construction',
                unit: 'm²',
                value: 165000,
                uncertainty: 2,
              },
            ],
          },
          {
            label: 'IT Equipment',
            detail:
              'Do you remember our discussion of the environmental impact of smartphones? Likewise, raw materials are used to make computers and IT equipment. These are also fixed assets. The same accounting method is used to spread out the emissions over the life of the equipment (depreciation). Count the totality of the items in the school and insert the data.',
            emissionFactors: [
              { label: 'Workstation computer', type: 'Equipment', unit: 'unit', value: 169000, uncertainty: 4 },
              { label: 'Tablets', type: 'Equipment', unit: 'unit', value: 63200, uncertainty: 4 },
              { label: 'Photocopiers', type: 'Equipment', unit: 'unit', value: 2935000, uncertainty: 4 },
              { label: 'Video projector', type: 'Equipment', unit: 'unit', value: 94000, uncertainty: 5 },
              { label: 'Printer', type: 'Equipment', unit: 'unit', value: 87900, uncertainty: 4 },
            ],
          },
        ],
      }
    ]
  }
]
