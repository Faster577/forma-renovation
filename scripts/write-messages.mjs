import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
mkdirSync(join(root, "messages"), { recursive: true });

const projectMeta = {
  "byt-vinohrady": { gallery: 5, beforeAfter: true },
  "loft-karlin": { gallery: 6, beforeAfter: false },
  "apartman-mala-strana": { gallery: 4, beforeAfter: false },
  "byt-zizkov": { gallery: 5, beforeAfter: true },
  "byt-smichov": { gallery: 5, beforeAfter: true },
  "byt-holesovice": { gallery: 5, beforeAfter: false },
};

const csProjects = {
  "byt-vinohrady": {
    title: "Byt Vinohrady",
    district: "Vinohrady",
    location: "Praha 2 — Vinohrady",
    summary:
      "Citlivá obnova secesního bytu s otevřeným obytným prostorem a klidnou materiálovou paletou.",
    description:
      "Ukázkový projekt kompletní rekonstrukce bytu v činžovním domě na Vinohradech. Cílem bylo zachovat charakter původních stropů a oken a zároveň vytvořit soudobý, vzdušný interiér vhodný pro každodenní život. Dispozice se otevřela směrem k dennímu světlu, technické rozvody se sjednotily a materiálová paleta zůstala střídmá — dub, kámen a jemné omítky.",
    heroAlt: "Světlý obývací pokoj bytu na Vinohradech po rekonstrukci",
    gallery: [
      "Otevřený obytný prostor s jídelním stolem",
      "Kuchyňská linka s kamennou pracovní deskou",
      "Ložnice s textilními závěsy a měkkým světlem",
      "Koupelna s velkoformátovým obkladem",
      "Detail úložného prostoru a stolního osvětlení",
    ],
    beforeAlt: "Ilustrativní stav prostoru před úpravou",
    afterAlt: "Ilustrativní návrhová atmosféra po úpravě",
    beforeAfterCaption:
      "Ilustrativní srovnání materiálů a světla — demonstrační fotografie, nikoli dokumentace konkrétní stavby.",
    challenges: [
      "Zachovat původní výšku stropů při nové skladbě podlah a skrytých rozvodech.",
      "Otevřít dispozici bez ztráty akustického soukromí ložnice.",
      "Skloubit historické detaily domu se soudobým technickým standardem.",
    ],
    solutions: [
      "Nízké podlahové skladby a pečlivě vedené instalace ve stávajících jádrech.",
      "Posuvné dveřní křídlo a jemné zonování nábytkem místo těžkých příček.",
      "Obnova okenních špalet a sjednocení povrchů do jedné klidné palety.",
    ],
  },
  "loft-karlin": {
    title: "Loft Karlín",
    district: "Karlín",
    location: "Praha 8 — Karlín",
    summary:
      "Industriální loft s teplým interiérem, ateliérovým světlem a pečlivě skrytou technikou.",
    description:
      "Rozsáhlý loftový byt v Karlíně vyžadoval nové členění zón: práce, odpočinek i společenské bydlení v jednom otevřeném objemu. Návrh pracuje s výškou prostoru, teplými textiliemi a kontrastem hladkých ploch vůči industriálnímu charakteru domu. Technika je skrytá, světlo řízené ve vrstvách.",
    heroAlt: "Otevřený loftový obytný prostor v Karlíně",
    gallery: [
      "Obývací zóna loftu s vysokým stropem",
      "Kuchyňský ostrůvek v otevřené dispozici",
      "Spací galerie a textilní závěsy",
      "Koupelna s betonovou estetikou",
      "Pracovní kout s denním světlem",
      "Detail sedací soupravy a osvětlení",
    ],
    challenges: [
      "Zkrotit akustiku velkého otevřeného prostoru.",
      "Vytvořit intimní spací zónu bez uzavření celého loftu.",
      "Skrytě umístit klimatizaci a silové rozvody.",
    ],
    solutions: [
      "Textilní závěsy, koberec a akustické obklady ve vybraných stěnách.",
      "Polootevřená spací nika s jemným oddělením světelných scén.",
      "Technická šachta a nábytkové sestavy navržené zároveň jako úložný systém.",
    ],
  },
  "apartman-mala-strana": {
    title: "Apartmán Malá Strana",
    district: "Malá Strana",
    location: "Praha 1 — Malá Strana",
    summary:
      "Kompaktní bydlení s důrazem na řemeslo, úložný prostor a atmosféru historického domu.",
    description:
      "Menší apartmán v historickém jádru města ukazuje, že omezená metráž nemusí znamenat kompromis v atmosféře. Pracovali jsme s vestavěným nábytkem na míru, světlými povrchy a pečlivým rytmem úložných prvků. Každý detail má funkci — a přitom působí klidně.",
    heroAlt: "Kompaktní obývací pokoj apartmánu na Malé Straně",
    gallery: [
      "Obývací zóna s vestavěnou knihovnou",
      "Kompaktní kuchyň s úložným systémem",
      "Ložnice s textilním čelem postele",
      "Koupelna s jemným kamenem",
    ],
    challenges: [
      "Získat dostatek úložného prostoru bez vizuálního zahlcení.",
      "Zachovat pocit vzdušnosti v hluboké dispozici.",
      "Sjednotit různé výšky podlah historického domu.",
    ],
    solutions: [
      "Celostěnové skříně v barvě stěn a skryté madla.",
      "Světlé povrchy, zrcadlové plochy a kontinuální podlaha.",
      "Vyrovnání podlah a jednotný obvodový sokl v celém bytě.",
    ],
  },
  "byt-zizkov": {
    title: "Byt Žižkov",
    district: "Žižkov",
    location: "Praha 3 — Žižkov",
    summary:
      "Proměna panelového bytu v světlý domov s logickou dispozicí a praktickou kuchyní.",
    description:
      "Typický žižkovský byt prošel kompletní obnovou: nové jádro, kuchyň, povrchy i osvětlení. Důraz byl na praktický provoz rodiny, dostatek denního světla a materiály, které snesou každodenní zátěž. Výsledek je civilní, teplý a snadno obyvatelný.",
    heroAlt: "Obývací pokoj bytu na Žižkově po kompletní rekonstrukci",
    gallery: [
      "Obytná zóna s pohovkou a stolním světlem",
      "Kuchyň s jídelním barovým posezením",
      "Ložnice s vestavěnými skříněmi",
      "Koupelna s walk-in sprchou",
      "Chodba s úložným nábytkem",
    ],
    beforeAlt: "Ilustrativní neutrální stav před úpravou",
    afterAlt: "Ilustrativní světlý interiér po úpravě",
    beforeAfterCaption:
      "Ilustrativní před/po — stock fotografie pro demonstrační portfolio, nikoli záznam reálné stavby FORMA.",
    challenges: [
      "Modernizovat bytové jádro v panelové konstrukci.",
      "Propojit kuchyň s obývákem bez ztráty pracovních ploch.",
      "Zajistit kvalitní odvětrání koupelny a kuchyně.",
    ],
    solutions: [
      "Nové příčky lehké konstrukce a přesné zaměření instalací.",
      "Ostrůvek a lineární linka s kontinuální pracovní deskou.",
      "Nucené větrání napojené na stávající šachty domu.",
    ],
  },
  "byt-smichov": {
    title: "Byt Smíchov",
    district: "Smíchov",
    location: "Praha 5 — Smíchov",
    summary:
      "Cílená obnova mokrého provozu a kuchyně s důrazem na materiál a denní světlo.",
    description:
      "Majitelé chtěli ponechat celkovou dispozici, ale výrazně pozvednout kvalitu kuchyně a koupelen. Navrhli jsme nové materiálové skladby, skryté úložné systémy a jemné osvětlení. Zásah je koncentrovaný — a přesto mění pocit celého bytu.",
    heroAlt: "Kuchyň bytu na Smíchově s kamennou deskou",
    gallery: [
      "Kuchyňská linka s ostrůvkem",
      "Hlavní koupelna s vanou",
      "Hostovská koupelna se sprchou",
      "Jídelní kout navazující na kuchyň",
      "Detail baterie a kamenného obkladu",
    ],
    beforeAlt: "Ilustrativní starší kuchyňský charakter",
    afterAlt: "Ilustrativní soudobá kuchyňská atmosféra",
    beforeAfterCaption:
      "Ilustrativní srovnání kuchyně — demonstrační snímky pro portfolio, ne doklad dokončené zakázky.",
    challenges: [
      "Obnovit mokré provozy bez zásahu do celé dispozice bytu.",
      "Získat více úložného prostoru v kuchyni stejné stopy.",
      "Sjednotit dvě koupelny do jednoho materiálového jazyka.",
    ],
    solutions: [
      "Přesné přeložení rozvodů ve stávajících jádrech.",
      "Vysoké skříně až ke stropu a hlubší ostrůvek.",
      "Společná paleta kamene, dřeva a matných kovů.",
    ],
  },
  "byt-holesovice": {
    title: "Byt Holešovice",
    district: "Holešovice",
    location: "Praha 7 — Holešovice",
    summary:
      "Soudobý městský byt s otevřeným denním traktem a klidnými nočními zónami.",
    description:
      "Holešovický byt spojuje otevřený denní trakt s oddělenými ložnicemi a pracovnou. Rekonstrukce zahrnovala nové povrchy, kuchyň, koupelny i úpravy dispozice. Výsledkem je vyvážený interiér — městský, ale měkký, s důrazem na světlo a pohyb.",
    heroAlt: "Denní trakt bytu v Holešovicích s jídelním stolem",
    gallery: [
      "Obývací pokoj s velkým oknem",
      "Otevřená kuchyň navazující na jídelnu",
      "Hlavní ložnice s textilními závěsy",
      "Koupelna s dvojitým umyvadlem",
      "Pracovna s knihovnou",
    ],
    challenges: [
      "Oddělit noční klid od společenského provozu bytu.",
      "Zlepšit přirozené prosvětlení hlubší dispozice.",
      "Zajistit jednotný charakter napříč všemi místnostmi.",
    ],
    solutions: [
      "Jasné zónování a dveřní křídla s dobrou akustikou.",
      "Prosklené průhledy a světlé kontinuální podlahy.",
      "Jedna materiálová osa: dřevo, omítka, textil, matný kov.",
    ],
  },
};

const enProjects = {
  "byt-vinohrady": {
    title: "Vinohrady Apartment",
    district: "Vinohrady",
    location: "Prague 2 — Vinohrady",
    summary:
      "A careful renewal of a period apartment with an open living space and a calm material palette.",
    description:
      "A demonstration of a full apartment renovation in a Vinohrady tenement building. The aim was to keep the character of the original ceilings and windows while creating a contemporary, airy interior for everyday life. The layout opens towards daylight, services are consolidated, and the materials stay restrained — oak, stone and soft plaster.",
    heroAlt: "Bright living room in a Vinohrady apartment after renovation",
    gallery: [
      "Open living space with dining table",
      "Kitchen run with stone worktop",
      "Bedroom with textile curtains and soft light",
      "Bathroom with large-format tiling",
      "Detail of storage and table lighting",
    ],
    beforeAlt: "Illustrative space before adaptation",
    afterAlt: "Illustrative atmosphere after adaptation",
    beforeAfterCaption:
      "An illustrative comparison of materials and light — demonstration photography, not documentation of a specific build.",
    challenges: [
      "Preserve original ceiling height with a new floor build-up and concealed services.",
      "Open the layout without losing acoustic privacy for the bedroom.",
      "Balance historic building details with contemporary technical standards.",
    ],
    solutions: [
      "Low floor assemblies and carefully routed installations in existing cores.",
      "A sliding door leaf and gentle zoning with furniture instead of heavy partitions.",
      "Restored window reveals and unified surfaces in one calm palette.",
    ],
  },
  "loft-karlin": {
    title: "Karlín Loft",
    district: "Karlín",
    location: "Prague 8 — Karlín",
    summary:
      "An industrial loft with a warm interior, studio light and carefully concealed technical systems.",
    description:
      "A generous loft in Karlín needed a clearer division of zones: work, rest and social living within one open volume. The design works with height, warm textiles and a contrast of smooth surfaces against the industrial character of the building. Services are hidden; light is composed in layers.",
    heroAlt: "Open loft living space in Karlín",
    gallery: [
      "Loft living zone with a high ceiling",
      "Kitchen island in an open layout",
      "Sleeping gallery and textile curtains",
      "Bathroom with a concrete aesthetic",
      "Work nook with daylight",
      "Detail of seating and lighting",
    ],
    challenges: [
      "Tame the acoustics of a large open space.",
      "Create an intimate sleeping zone without closing the loft entirely.",
      "Conceal air-conditioning and power distribution.",
    ],
    solutions: [
      "Textile curtains, rugs and acoustic lining on selected walls.",
      "A semi-open sleeping niche with gently separated light scenes.",
      "A technical shaft and joinery designed as storage at the same time.",
    ],
  },
  "apartman-mala-strana": {
    title: "Malá Strana Apartment",
    district: "Malá Strana",
    location: "Prague 1 — Malá Strana",
    summary:
      "Compact living focused on craft, storage and the atmosphere of a historic house.",
    description:
      "A smaller apartment in the historic centre shows that limited floor area need not mean a compromise in atmosphere. We worked with made-to-measure joinery, light surfaces and a careful rhythm of storage. Every detail has a purpose — and still feels calm.",
    heroAlt: "Compact living room of a Malá Strana apartment",
    gallery: [
      "Living zone with built-in bookshelf",
      "Compact kitchen with storage system",
      "Bedroom with upholstered headboard",
      "Bathroom with soft stone finishes",
    ],
    challenges: [
      "Gain enough storage without visual clutter.",
      "Keep a sense of airiness in a deep plan.",
      "Unify different floor levels in a historic building.",
    ],
    solutions: [
      "Full-height wardrobes matched to the wall colour with concealed handles.",
      "Light surfaces, mirrored planes and continuous flooring.",
      "Levelled floors and a consistent skirting line throughout.",
    ],
  },
  "byt-zizkov": {
    title: "Žižkov Apartment",
    district: "Žižkov",
    location: "Prague 3 — Žižkov",
    summary:
      "A panel-block flat transformed into a bright home with a clear layout and practical kitchen.",
    description:
      "A typical Žižkov apartment received a full renewal: new wet core, kitchen, finishes and lighting. The emphasis was on family daily life, daylight and materials that withstand everyday use. The result is civil, warm and easy to live in.",
    heroAlt: "Living room of a Žižkov apartment after full renovation",
    gallery: [
      "Living zone with sofa and table lamp",
      "Kitchen with dining bar seating",
      "Bedroom with built-in wardrobes",
      "Bathroom with walk-in shower",
      "Hallway with storage furniture",
    ],
    beforeAlt: "Illustrative neutral state before adaptation",
    afterAlt: "Illustrative bright interior after adaptation",
    beforeAfterCaption:
      "Illustrative before/after — stock photography for a demonstration portfolio, not a record of a real FORMA build.",
    challenges: [
      "Modernise the wet core within a panel construction.",
      "Connect kitchen and living room without losing worktop area.",
      "Ensure proper ventilation for bathroom and kitchen.",
    ],
    solutions: [
      "Lightweight partitions and precise surveying of installations.",
      "An island and linear run with a continuous worktop.",
      "Mechanical ventilation connected to the building shafts.",
    ],
  },
  "byt-smichov": {
    title: "Smíchov Apartment",
    district: "Smíchov",
    location: "Prague 5 — Smíchov",
    summary:
      "A focused renewal of wet rooms and kitchen with an emphasis on material and daylight.",
    description:
      "The owners wanted to keep the overall layout, but markedly raise the quality of the kitchen and bathrooms. We designed new material compositions, concealed storage and soft lighting. The intervention is concentrated — yet it changes the feel of the whole flat.",
    heroAlt: "Kitchen in a Smíchov apartment with stone worktop",
    gallery: [
      "Kitchen run with island",
      "Main bathroom with bathtub",
      "Guest bathroom with shower",
      "Dining nook adjoining the kitchen",
      "Detail of tapware and stone cladding",
    ],
    beforeAlt: "Illustrative older kitchen character",
    afterAlt: "Illustrative contemporary kitchen atmosphere",
    beforeAfterCaption:
      "An illustrative kitchen comparison — demonstration images for the portfolio, not proof of a completed commission.",
    challenges: [
      "Renew wet rooms without altering the whole apartment layout.",
      "Gain more kitchen storage within the same footprint.",
      "Unite two bathrooms in one material language.",
    ],
    solutions: [
      "Precise rerouting of services within existing cores.",
      "Floor-to-ceiling cabinets and a deeper island.",
      "A shared palette of stone, wood and matte metal.",
    ],
  },
  "byt-holesovice": {
    title: "Holešovice Apartment",
    district: "Holešovice",
    location: "Prague 7 — Holešovice",
    summary:
      "A contemporary city apartment with an open daytime wing and calm night zones.",
    description:
      "This Holešovice flat connects an open daytime wing with separate bedrooms and a study. The renovation covered new finishes, kitchen, bathrooms and layout adjustments. The result is a balanced interior — urban yet soft, with an emphasis on light and movement.",
    heroAlt: "Daytime wing of a Holešovice apartment with dining table",
    gallery: [
      "Living room with a large window",
      "Open kitchen adjoining the dining area",
      "Main bedroom with textile curtains",
      "Bathroom with double washbasin",
      "Study with bookshelf",
    ],
    challenges: [
      "Separate night-time quiet from social activity.",
      "Improve natural light in a deeper plan.",
      "Keep a coherent character across every room.",
    ],
    solutions: [
      "Clear zoning and door leaves with good acoustics.",
      "Glazed views through and continuous light flooring.",
      "One material axis: wood, plaster, textile, matte metal.",
    ],
  },
};

const ruProjects = {
  "byt-vinohrady": {
    title: "Квартира на Виноградах",
    district: "Vinohrady",
    location: "Прага 2 — Vinohrady",
    summary:
      "Бережное обновление квартиры в историческом доме с открытой гостиной и спокойной палитрой материалов.",
    description:
      "Демонстрационный проект полной реконструкции квартиры в доходном доме на Виноградах. Задача — сохранить характер потолков и окон и создать современный, светлый интерьер для повседневной жизни. Планировка раскрыта к дневному свету, инженерия собрана аккуратно, материалы сдержанны — дуб, камень и мягкая штукатурка.",
    heroAlt: "Светлая гостиная квартиры на Виноградах после реконструкции",
    gallery: [
      "Открытая жилая зона со столом",
      "Кухонная линия с каменной столешницей",
      "Спальня с текстильными шторами и мягким светом",
      "Ванная с крупноформатной облицовкой",
      "Деталь хранения и настольного света",
    ],
    beforeAlt: "Иллюстративное состояние пространства до изменений",
    afterAlt: "Иллюстративная атмосфера после изменений",
    beforeAfterCaption:
      "Иллюстративное сравнение материалов и света — демонстрационные фотографии, а не документация конкретной стройки.",
    challenges: [
      "Сохранить высоту потолков при новой конструкции пола и скрытых коммуникациях.",
      "Открыть планировку без потери акустической приватности спальни.",
      "Совместить исторические детали дома с современным техническим стандартом.",
    ],
    solutions: [
      "Низкие пироги пола и аккуратная прокладка инженерии в существующих шахтах.",
      "Раздвижное полотно и мягкое зонирование мебелью вместо тяжёлых перегородок.",
      "Обновление оконных откосов и единая спокойная палитра поверхностей.",
    ],
  },
  "loft-karlin": {
    title: "Лофт в Карлине",
    district: "Karlín",
    location: "Прага 8 — Karlín",
    summary:
      "Индустриальный лофт с тёплым интерьером, студийным светом и тщательно скрытой техникой.",
    description:
      "Просторный лофт в Карлине требовал нового зонирования: работа, отдых и общая жизнь в одном открытом объёме. Проект работает с высотой, тёплым текстилем и контрастом гладких поверхностей с индустриальным характером дома. Техника скрыта, свет выстроен слоями.",
    heroAlt: "Открытое лофт-пространство в Карлине",
    gallery: [
      "Гостиная зона лофта с высоким потолком",
      "Кухонный остров в открытой планировке",
      "Спальная галерея и текстильные шторы",
      "Ванная в бетонной эстетике",
      "Рабочий уголок с дневным светом",
      "Деталь дивана и освещения",
    ],
    challenges: [
      "Укротить акустику большого открытого пространства.",
      "Создать интимную спальную зону, не закрывая лофт целиком.",
      "Скрыто разместить кондиционирование и силовые сети.",
    ],
    solutions: [
      "Текстильные шторы, ковёр и акустические панели на отдельных стенах.",
      "Полуоткрытая спальная ниша с мягким разделением световых сценариев.",
      "Техническая шахта и мебельные решения, одновременно служащие хранением.",
    ],
  },
  "apartman-mala-strana": {
    title: "Апартаменты на Малой Стране",
    district: "Malá Strana",
    location: "Прага 1 — Malá Strana",
    summary:
      "Компактное жильё с акцентом на ремесло, хранение и атмосферу исторического дома.",
    description:
      "Небольшая квартира в историческом центре показывает: ограниченный метраж не обязан означать компромисс в атмосфере. Мы работали со встроенной мебелью на заказ, светлыми поверхностями и точным ритмом хранения. Каждая деталь функциональна — и при этом спокойна.",
    heroAlt: "Компактная гостиная апартаментов на Малой Стране",
    gallery: [
      "Гостиная зона со встроенной библиотекой",
      "Компактная кухня с системой хранения",
      "Спальня с текстильным изголовьем",
      "Ванная с мягким камнем",
    ],
    challenges: [
      "Получить достаточно хранения без визуальной перегрузки.",
      "Сохранить ощущение воздуха в глубокой планировке.",
      "Выровнять разные уровни пола исторического дома.",
    ],
    solutions: [
      "Шкафы во всю стену в цвет поверхностей и скрытые ручки.",
      "Светлые материалы, зеркальные плоскости и непрерывный пол.",
      "Выравнивание пола и единый плинтус по всей квартире.",
    ],
  },
  "byt-zizkov": {
    title: "Квартира на Жижкове",
    district: "Žižkov",
    location: "Прага 3 — Žižkov",
    summary:
      "Преображение панельной квартиры в светлый дом с ясной планировкой и удобной кухней.",
    description:
      "Типичная квартира на Жижкове прошла полное обновление: новое мокрое ядро, кухня, отделка и свет. Акцент — на семейный быт, дневной свет и материалы, которые выдерживают ежедневную нагрузку. Результат спокойный, тёплый и по-настоящему жилой.",
    heroAlt: "Гостиная квартиры на Жижкове после полной реконструкции",
    gallery: [
      "Жилая зона с диваном и настольным светом",
      "Кухня с барной посадкой",
      "Спальня со встроенными шкафами",
      "Ванная с душевой без поддона",
      "Коридор с системой хранения",
    ],
    beforeAlt: "Иллюстративное нейтральное состояние до изменений",
    afterAlt: "Иллюстративный светлый интерьер после изменений",
    beforeAfterCaption:
      "Иллюстративное до/после — стоковые фотографии для демонстрационного портфолио, а не фиксация реальной стройки FORMA.",
    challenges: [
      "Обновить мокрое ядро в панельной конструкции.",
      "Связать кухню с гостиной без потери рабочих поверхностей.",
      "Обеспечить качественную вентиляцию ванной и кухни.",
    ],
    solutions: [
      "Лёгкие перегородки и точная съёмка инженерных сетей.",
      "Остров и линейная кухня с непрерывной столешницей.",
      "Принудительная вентиляция, подключённая к существующим шахтам.",
    ],
  },
  "byt-smichov": {
    title: "Квартира на Смихове",
    district: "Smíchov",
    location: "Прага 5 — Smíchov",
    summary:
      "Точечное обновление мокрых зон и кухни с акцентом на материал и дневной свет.",
    description:
      "Владельцы хотели сохранить общую планировку, но заметно повысить качество кухни и ванных. Мы предложили новые материалы, скрытое хранение и мягкий свет. Вмешательство локальное — но меняет ощущение всей квартиры.",
    heroAlt: "Кухня квартиры на Смихове с каменной столешницей",
    gallery: [
      "Кухонная линия с островом",
      "Главная ванная с ванной",
      "Гостевая ванная с душем",
      "Обеденный уголок рядом с кухней",
      "Деталь смесителя и каменной облицовки",
    ],
    beforeAlt: "Иллюстративный более старый характер кухни",
    afterAlt: "Иллюстративная современная атмосфера кухни",
    beforeAfterCaption:
      "Иллюстративное сравнение кухни — демонстрационные кадры для портфолио, а не доказательство выполненного заказа.",
    challenges: [
      "Обновить мокрые зоны без вмешательства во всю планировку.",
      "Увеличить кухонное хранение в той же площади.",
      "Объединить две ванные в одном материальном языке.",
    ],
    solutions: [
      "Точная перекладка коммуникаций в существующих ядрах.",
      "Высокие шкафы до потолка и более глубокий остров.",
      "Общая палитра камня, дерева и матового металла.",
    ],
  },
  "byt-holesovice": {
    title: "Квартира в Голешовице",
    district: "Holešovice",
    location: "Прага 7 — Holešovice",
    summary:
      "Современная городская квартира с открытым дневным трактом и спокойными ночными зонами.",
    description:
      "Квартира в Голешовице соединяет открытый дневной тракт с отдельными спальнями и кабинетом. Реконструкция включала новые поверхности, кухню, ванные и корректировку планировки. Результат — уравновешенный интерьер: городской, но мягкий, со вниманием к свету и движению.",
    heroAlt: "Дневной тракт квартиры в Голешовице со столом",
    gallery: [
      "Гостиная с большим окном",
      "Открытая кухня, связанная со столовой",
      "Главная спальня с текстильными шторами",
      "Ванная с двойной раковиной",
      "Кабинет с библиотекой",
    ],
    challenges: [
      "Отделить ночной покой от общественной жизни квартиры.",
      "Улучшить естественное освещение глубокой планировки.",
      "Сохранить единый характер во всех комнатах.",
    ],
    solutions: [
      "Ясное зонирование и дверные полотна с хорошей акустикой.",
      "Стеклянные проёмы и светлый непрерывный пол.",
      "Одна материальная ось: дерево, штукатурка, текстиль, матовый металл.",
    ],
  },
};

function stripBeforeAfter(project, hasBeforeAfter) {
  if (hasBeforeAfter) return project;
  const rest = { ...project };
  delete rest.beforeAlt;
  delete rest.afterAlt;
  delete rest.beforeAfterCaption;
  return rest;
}

function withProjects(source) {
  const out = {};
  for (const [slug, meta] of Object.entries(projectMeta)) {
    out[slug] = stripBeforeAfter(source[slug], meta.beforeAfter);
  }
  return out;
}

const cs = {
  Meta: {
    homeTitle: "FORMA. — Rekonstrukce bytů v Praze",
    homeDescription:
      "Studio kompletních rekonstrukcí bytů. Od návrhu po předání na klíč — Praha a okolí.",
    homeOgDescription:
      "Prostor, ve kterém chcete žít. Kompletní rekonstrukce bytů od návrhu po předání.",
    portfolioTitle: "Realizace — FORMA.",
    portfolioDescription:
      "Ukázkové projekty rekonstrukcí bytů v Praze. Demonstrační portfolio studia FORMA.",
    inquiryTitle: "Poptávka — FORMA.",
    inquiryDescription:
      "Nezávazná poptávka rekonstrukce bytu. Popište projekt a ozveme se vám s dalším postupem.",
    projectTitle: "{title} — FORMA.",
    notFoundTitle: "Stránka nenalezena — FORMA.",
  },
  Common: {
    brandHome: "FORMA. Domů",
    consultation: "Konzultace",
    consultationLong: "Nezávazná konzultace",
    demoNotice:
      "Demonstrační obsah: fotografie jsou licencované stock snímky interiérů. Nejde o dokumentaci skutečných zakázek studia FORMA.",
    optional: "volitelné",
    requiredMark: "*",
    backToPortfolio: "Zpět na realizace",
    viewAllProjects: "Všechny realizace",
    openMenu: "Otevřít menu",
    closeMenu: "Zavřít menu",
    mainNav: "Hlavní navigace",
    mobileNav: "Mobilní navigace",
    languageSwitcher: "Volba jazyka",
    currentLanguage: "aktuální jazyk",
  },
  Nav: {
    about: "O nás",
    services: "Služby",
    portfolio: "Realizace",
    process: "Proces",
    contact: "Kontakt",
  },
  Languages: { cs: "CZ", ru: "RU", en: "EN" },
  Hero: {
    headline: "Prostor, ve kterém chcete žít.",
    subhead:
      "Kompletní rekonstrukce bytů v Praze a okolí — od citlivého návrhu po řemeslné provedení na klíč.",
    ctaPrimary: "Domluvit schůzku",
    ctaSecondary: "Prohlédnout realizace",
    scrollDown: "Posunout dolů",
    imageAlt:
      "Světlý obývací pokoj po rekonstrukci s velkým oknem a přírodními materiály",
  },
  About: {
    eyebrow: "O společnosti",
    title: "Ateliér rekonstrukcí s důrazem na celek.",
    intro:
      "FORMA. vznikla z přesvědčení, že kvalitní rekonstrukce bytu není jen součet prací — je to kompozice světla, materiálů a každodenního pohybu.",
    p1: "Navrhujeme a realizujeme rekonstrukce městských bytů v Praze a Středočeském kraji. Spojujeme architektonický cit s přesnou stavební koordinací, aby výsledek působil přirozeně — a vydržel.",
    p2: "Každý projekt vedeme osobně. Od prvního zaměření po předání klíčů máte jedno studio, jeden tým a jasný plán.",
    caption:
      "Pracujeme s autentickými materiály a klidnou paletou, která respektuje charakter domu i život jeho obyvatel.",
    imageAlt:
      "Moderní obývací prostor s dřevěnými povrchy a měkkým denním světlem",
    stats: {
      projects: { value: "120+", label: "realizací" },
      years: { value: "12", label: "let zkušeností" },
      contact: { value: "1", label: "kontaktní místo" },
    },
  },
  Services: {
    eyebrow: "Služby",
    title: "Rekonstrukce vedená od první skici po poslední detail.",
    description:
      "Čtyři oblasti, ve kterých držíme celý proces — návrh, materiál, řemeslo i termín.",
    items: {
      kompletni: {
        title: "Kompletní rekonstrukce",
        description:
          "Od prvního zaměření po předání bytu na klíč. Koordinujeme řemesla, termíny i detaily, abyste měli klidný průběh stavby.",
      },
      koupelny: {
        title: "Kuchyně a koupelny",
        description:
          "Prostorově chytrá řešení s důrazem na materiál, světlo a každodenní komfort. Navrhujeme i realizujeme.",
      },
      dispozice: {
        title: "Dispoziční změny",
        description:
          "Otevřené dispozice, nové průhledy a lepší tok denního světla. Pracujeme s architekturou bytu, ne proti ní.",
      },
      design: {
        title: "Design a materiály",
        description:
          "Výběr povrchů, barev a ateliérových detailů, které drží celek pohromadě — od podlah po úchytky.",
      },
    },
  },
  HomePortfolio: {
    eyebrow: "Realizace",
    title: "Prostory, které už žijí svým vlastním životem.",
    description:
      "Tři ukázkové projekty — různé velikosti, stejný přístup k detailu a atmosféře.",
    detailLink: "Detail projektu",
  },
  Process: {
    eyebrow: "Proces",
    title: "Čtyři kroky od první schůzky po předání bytu.",
    description:
      "Přehledný postup bez zbytečné administrativy. Vždy víte, co se děje a proč.",
    steps: {
      "01": {
        title: "Konzultace",
        description:
          "Projednáme vaše představy, dispozici bytu a realistický rozpočet. Společně nastavíme směr projektu.",
      },
      "02": {
        title: "Návrh",
        description:
          "Připravíme dispozici, materiálové řešení a přesný plán prací. Vše schvalujete před zahájením stavby.",
      },
      "03": {
        title: "Realizace",
        description:
          "Řemeslné týmy pracují podle harmonogramu. Máte jedno kontaktní místo a průběžné fotografie postupu.",
      },
      "04": {
        title: "Předání",
        description:
          "Dokončíme detaily, provedeme kontrolu a předáme byt připravený k životu — včetně dokumentace.",
      },
    },
  },
  Contact: {
    eyebrow: "Kontakt",
    title: "Pojďme navrhnout prostor, který bude sedět právě vám.",
    description:
      "Nezávazná konzultace u vás doma nebo v našem studiu. Probereme dispozici, rozpočet i možné termíny zahájení.",
    ctaPrimary: "Odeslat poptávku",
    ctaSecondary: "Napsat e-mail",
    studioLabel: "Studio",
    studioAddress1: "Vodičkova 28",
    studioAddress2: "110 00 Praha 1",
    phoneLabel: "Telefon",
    emailLabel: "E-mail",
  },
  Footer: {
    tagline:
      "Studio kompletních rekonstrukcí bytů. Praha a okolí — návrh, realizace a dohled nad každým detailem.",
    navLabel: "Navigace",
    studioLabel: "Studio",
    hours: "Po–Pá 9:00–18:00",
    rights: "© 2026 FORMA. Všechna práva vyhrazena.",
    fictional: "Fiktivní studio pro demonstrační účely.",
  },
  PortfolioPage: {
    eyebrow: "Portfolio",
    title: "Naše realizace",
    intro:
      "Výběr demonstračních projektů rekonstrukcí bytů napříč Prahou — od secesních činžáků po soudobé loftové dispozice. Každý příběh ukazuje jiný typ zásahu, stejný důraz na celek, světlo a detail.",
  },
  ProjectPage: {
    back: "Zpět na realizace",
    about: "O projektu",
    gallery: "Galerie",
    galleryTitle: "Interiéry a detaily",
    beforeAfterEyebrow: "Před / po",
    beforeAfterTitle: "Ilustrativní srovnání atmosféry",
    beforeLabel: "Před — ilustrace",
    afterLabel: "Po — ilustrace",
    challengesEyebrow: "Výzvy",
    challengesTitle: "Co bylo potřeba vyřešit",
    solutionsEyebrow: "Řešení",
    solutionsTitle: "Jak jsme k tomu přistoupili",
    ctaEyebrow: "Konzultace",
    ctaTitle: "Chcete podobný přístup jako u projektu {title}?",
    ctaDescription:
      "Domluvte si nezávaznou konzultaci. Probereme dispozici, možnosti materiálů i realistický rámec rozpočtu — bez závazku.",
    ctaPrimary: "Nezávazná konzultace",
    ctaSecondary: "Zpět na realizace",
    relatedEyebrow: "Další projekty",
    relatedTitle: "Pokračujte v prohlížení",
    metaLocation: "Lokalita",
    metaType: "Typ zásahu",
    metaArea: "Podlahová plocha",
    metaYear: "Rok (demo)",
    yearDemo: "{year} · demo data",
    showPhoto: "Zobrazit fotografii {index}: {alt}",
  },
  ProjectTypes: {
    complete: "Kompletní rekonstrukce",
    layout: "Dispoziční změny",
    kitchen_bath: "Kuchyně a koupelny",
    design: "Design a materiály",
  },
  Projects: withProjects(csProjects),
  InquiryPage: {
    eyebrow: "Poptávka",
    title: "Nezávazná konzultace rekonstrukce",
    intro:
      "Stručně popište byt a záměr. Ozveme se s návrhem dalšího kroku — bez tlaku a bez závazku. Čím přesnější údaje, tím lépe připravíme první schůzku.",
    stepsTitle: "Co se stane po odeslání",
    steps: {
      "01": {
        title: "Kontrola poptávky",
        text: "Projdeme dispozici, typ zásahu a rámec rozpočtu.",
      },
      "02": {
        title: "Krátká odpověď",
        text: "Ozveme se e-mailem nebo telefonicky s návrhem schůzky.",
      },
      "03": {
        title: "Konzultace",
        text: "U vás nebo ve studiu projdeme možnosti a další postup.",
      },
    },
    preferContact: "Preferujete přímý kontakt?",
    demoBanner:
      "Demonstrační režim: e-mailové odesílání není nakonfigurováno. Formulář ověříte včetně validace, ale poptávka se neodešle.",
  },
  InquiryForm: {
    renovationType: "Typ rekonstrukce",
    renovationTypePlaceholder: "Vyberte možnost",
    area: "Podlahová plocha (m²)",
    areaPlaceholder: "např. 72",
    location: "Lokalita projektu",
    locationPlaceholder: "např. Praha 2 — Vinohrady",
    budget: "Orientační rozpočet",
    budgetPlaceholder: "např. 1,2–1,5 mil. Kč",
    startDate: "Předpokládaný termín zahájení",
    startDatePlaceholder: "např. jaro 2027",
    description: "Popis projektu",
    descriptionPlaceholder:
      "Stručně popište stav bytu, cíle rekonstrukce a důležité detaily.",
    fullName: "Jméno a příjmení",
    email: "E-mail",
    phone: "Telefon",
    phonePlaceholder: "+420 …",
    consent:
      "Souhlasím se zpracováním osobních údajů za účelem vyřízení této poptávky. Údaje neukládáme do databáze — slouží pouze k odpovědi na váš dotaz.",
    consentHint: "Souhlas je povinný pro odeslání formuláře.",
    honeypot: "Webová stránka",
    requiredNote: "Pole označená * jsou povinná. Odesláním nevzniká žádný závazek.",
    submit: "Odeslat poptávku",
    submitting: "Odesílám…",
    types: {
      complete: "Kompletní rekonstrukce",
      partial: "Částečná rekonstrukce",
      kitchen_bath: "Koupelna / kuchyně",
      other: "Jiné",
    },
  },
  InquiryErrors: {
    renovationType: "Vyberte typ rekonstrukce.",
    area: "Zadejte kladné číslo plochy v m².",
    areaMax: "Zadejte realistickou plochu bytu (max. 2000 m²).",
    location: "Zadejte lokalitu projektu.",
    fullName: "Zadejte jméno a příjmení.",
    email: "Zadejte platný e-mail.",
    phone: "Zadejte platné telefonní číslo, nebo pole nechte prázdné.",
    description: "Popis je příliš dlouhý (max. 4000 znaků).",
    budget: "Rozpočet je příliš dlouhý.",
    startDate: "Termín je příliš dlouhý.",
    consent: "Pro odeslání je nutný souhlas se zpracováním údajů.",
    invalidRequest: "Neplatný formát požadavku.",
    missingData: "Chybí data formuláře.",
    checkFields: "Zkontrolujte prosím zvýrazněná pole.",
    submitFailed:
      "Poptávku se nepodařilo odeslat. Zkuste to prosím znovu, nebo napište na ahoj@forma.studio.",
    networkError:
      "Nepodařilo se spojit se serverem. Zkontrolujte připojení a zkuste to znovu.",
    form: "Odeslání selhalo.",
  },
  InquiryStatus: {
    ignored: "Děkujeme. Pokud je vše v pořádku, ozveme se vám e-mailem.",
    demo: "Formulář funguje v demonstračním režimu. E-mailové odesílání není nakonfigurováno — poptávka nebyla odeslána.",
    error:
      "Poptávku se nepodařilo odeslat. Zkuste to prosím znovu, nebo napište na ahoj@forma.studio.",
    sent: "Poptávka byla odeslána. Ozveme se vám co nejdříve e-mailem.",
  },
  Demo: {
    notice:
      "Demonstrační obsah: fotografie jsou licencované stock snímky interiérů. Nejde o dokumentaci skutečných zakázek studia FORMA.",
  },
};

const en = {
  Meta: {
    homeTitle: "FORMA. — Apartment renovations in Prague",
    homeDescription:
      "A studio for complete apartment renovations. From concept to turnkey handover — Prague and surroundings.",
    homeOgDescription:
      "A space you want to live in. Complete apartment renovations from design to handover.",
    portfolioTitle: "Projects — FORMA.",
    portfolioDescription:
      "Demonstration apartment renovation projects in Prague. FORMA. studio portfolio.",
    inquiryTitle: "Enquiry — FORMA.",
    inquiryDescription:
      "A no-obligation renovation enquiry. Describe your project and we will follow up with next steps.",
    projectTitle: "{title} — FORMA.",
    notFoundTitle: "Page not found — FORMA.",
  },
  Common: {
    brandHome: "FORMA. Home",
    consultation: "Consultation",
    consultationLong: "No-obligation consultation",
    demoNotice:
      "Demonstration content: photographs are licensed stock interiors. They are not documentation of completed FORMA commissions.",
    optional: "optional",
    requiredMark: "*",
    backToPortfolio: "Back to projects",
    viewAllProjects: "All projects",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    languageSwitcher: "Language selection",
    currentLanguage: "current language",
  },
  Nav: {
    about: "About",
    services: "Services",
    portfolio: "Projects",
    process: "Process",
    contact: "Contact",
  },
  Languages: { cs: "CZ", ru: "RU", en: "EN" },
  Hero: {
    headline: "A space you want to live in.",
    subhead:
      "Complete apartment renovations in Prague and beyond — from thoughtful design to craftsmanship delivered turnkey.",
    ctaPrimary: "Book a meeting",
    ctaSecondary: "Browse projects",
    scrollDown: "Scroll down",
    imageAlt:
      "Bright living room after renovation with a large window and natural materials",
  },
  About: {
    eyebrow: "About the studio",
    title: "A renovation atelier focused on the whole.",
    intro:
      "FORMA. began from a simple conviction: a good apartment renovation is more than a list of works — it is a composition of light, materials and everyday movement.",
    p1: "We design and deliver renovations of city apartments in Prague and the Central Bohemian Region. Architectural sensitivity meets precise construction coordination so the result feels natural — and lasts.",
    p2: "Every project is led personally. From the first survey to handover you have one studio, one team and a clear plan.",
    caption:
      "We work with authentic materials and a calm palette that respects both the building and the lives of its residents.",
    imageAlt:
      "Modern living space with timber surfaces and soft daylight",
    stats: {
      projects: { value: "120+", label: "projects" },
      years: { value: "12", label: "years of experience" },
      contact: { value: "1", label: "point of contact" },
    },
  },
  Services: {
    eyebrow: "Services",
    title: "Renovation led from the first sketch to the final detail.",
    description:
      "Four areas in which we hold the whole process — design, material, craft and schedule.",
    items: {
      kompletni: {
        title: "Complete renovation",
        description:
          "From the first survey to turnkey handover. We coordinate trades, timing and details so the build stays calm.",
      },
      koupelny: {
        title: "Kitchens and bathrooms",
        description:
          "Spatially intelligent solutions with an emphasis on material, light and everyday comfort. Designed and built.",
      },
      dispozice: {
        title: "Layout changes",
        description:
          "Open plans, new sightlines and a better flow of daylight. We work with the apartment’s architecture, not against it.",
      },
      design: {
        title: "Design and materials",
        description:
          "Surfaces, colour and atelier-level details that hold the whole together — from floors to handles.",
      },
    },
  },
  HomePortfolio: {
    eyebrow: "Projects",
    title: "Spaces that already live their own life.",
    description:
      "Three demonstration projects — different sizes, the same care for detail and atmosphere.",
    detailLink: "Project details",
  },
  Process: {
    eyebrow: "Process",
    title: "Four steps from the first meeting to handover.",
    description:
      "A clear sequence without unnecessary administration. You always know what is happening and why.",
    steps: {
      "01": {
        title: "Consultation",
        description:
          "We discuss your ideas, the apartment layout and a realistic budget. Together we set the project direction.",
      },
      "02": {
        title: "Design",
        description:
          "We prepare the layout, materials and a precise works plan. Everything is approved before construction begins.",
      },
      "03": {
        title: "Construction",
        description:
          "Craft teams work to schedule. You have one point of contact and ongoing progress photos.",
      },
      "04": {
        title: "Handover",
        description:
          "We finish the details, carry out checks and hand over an apartment ready to live in — including documentation.",
      },
    },
  },
  Contact: {
    eyebrow: "Contact",
    title: "Let’s shape a space that fits you.",
    description:
      "A no-obligation consultation at your home or in our studio. We will discuss layout, budget and possible start dates.",
    ctaPrimary: "Send an enquiry",
    ctaSecondary: "Write an email",
    studioLabel: "Studio",
    studioAddress1: "Vodičkova 28",
    studioAddress2: "110 00 Prague 1",
    phoneLabel: "Phone",
    emailLabel: "Email",
  },
  Footer: {
    tagline:
      "A studio for complete apartment renovations. Prague and surroundings — design, delivery and oversight of every detail.",
    navLabel: "Navigation",
    studioLabel: "Studio",
    hours: "Mon–Fri 9:00–18:00",
    rights: "© 2026 FORMA. All rights reserved.",
    fictional: "A fictional studio for demonstration purposes.",
  },
  PortfolioPage: {
    eyebrow: "Portfolio",
    title: "Our projects",
    intro:
      "A selection of demonstration apartment renovations across Prague — from period tenements to contemporary loft layouts. Each story shows a different type of intervention, with the same focus on the whole, light and detail.",
  },
  ProjectPage: {
    back: "Back to projects",
    about: "About the project",
    gallery: "Gallery",
    galleryTitle: "Interiors and details",
    beforeAfterEyebrow: "Before / after",
    beforeAfterTitle: "An illustrative comparison of atmosphere",
    beforeLabel: "Before — illustration",
    afterLabel: "After — illustration",
    challengesEyebrow: "Challenges",
    challengesTitle: "What needed solving",
    solutionsEyebrow: "Solutions",
    solutionsTitle: "How we approached it",
    ctaEyebrow: "Consultation",
    ctaTitle: "Would you like a similar approach to {title}?",
    ctaDescription:
      "Book a no-obligation consultation. We will discuss layout, materials and a realistic budget frame — with no commitment.",
    ctaPrimary: "No-obligation consultation",
    ctaSecondary: "Back to projects",
    relatedEyebrow: "More projects",
    relatedTitle: "Continue browsing",
    metaLocation: "Location",
    metaType: "Intervention type",
    metaArea: "Floor area",
    metaYear: "Year (demo)",
    yearDemo: "{year} · demo data",
    showPhoto: "Show photo {index}: {alt}",
  },
  ProjectTypes: {
    complete: "Complete renovation",
    layout: "Layout changes",
    kitchen_bath: "Kitchens and bathrooms",
    design: "Design and materials",
  },
  Projects: withProjects(enProjects),
  InquiryPage: {
    eyebrow: "Enquiry",
    title: "No-obligation renovation consultation",
    intro:
      "Briefly describe the apartment and your intentions. We will reply with a proposed next step — without pressure and without obligation. The clearer the details, the better we can prepare the first meeting.",
    stepsTitle: "What happens after you send the form",
    steps: {
      "01": {
        title: "Enquiry review",
        text: "We review the layout, type of intervention and budget frame.",
      },
      "02": {
        title: "A short reply",
        text: "We get back by email or phone with a suggested meeting.",
      },
      "03": {
        title: "Consultation",
        text: "At your home or in the studio we discuss options and next steps.",
      },
    },
    preferContact: "Prefer direct contact?",
    demoBanner:
      "Demo mode: email sending is not configured. You can test the form and validation, but the enquiry will not be sent.",
  },
  InquiryForm: {
    renovationType: "Renovation type",
    renovationTypePlaceholder: "Select an option",
    area: "Floor area (m²)",
    areaPlaceholder: "e.g. 72",
    location: "Project location",
    locationPlaceholder: "e.g. Prague 2 — Vinohrady",
    budget: "Indicative budget",
    budgetPlaceholder: "e.g. CZK 1.2–1.5 million",
    startDate: "Expected start",
    startDatePlaceholder: "e.g. spring 2027",
    description: "Project description",
    descriptionPlaceholder:
      "Briefly describe the apartment condition, renovation goals and key details.",
    fullName: "Full name",
    email: "Email",
    phone: "Phone",
    phonePlaceholder: "+420 …",
    consent:
      "I agree to the processing of personal data for the purpose of handling this enquiry. We do not store the data in a database — it is used only to reply to your request.",
    consentHint: "Consent is required to submit the form.",
    honeypot: "Website",
    requiredNote: "Fields marked * are required. Submitting creates no obligation.",
    submit: "Send enquiry",
    submitting: "Sending…",
    types: {
      complete: "Complete renovation",
      partial: "Partial renovation",
      kitchen_bath: "Bathroom / kitchen",
      other: "Other",
    },
  },
  InquiryErrors: {
    renovationType: "Please select a renovation type.",
    area: "Enter a positive floor area in m².",
    areaMax: "Enter a realistic apartment area (max. 2000 m²).",
    location: "Enter the project location.",
    fullName: "Enter your full name.",
    email: "Enter a valid email address.",
    phone: "Enter a valid phone number, or leave the field empty.",
    description: "The description is too long (max. 4000 characters).",
    budget: "The budget text is too long.",
    startDate: "The start date text is too long.",
    consent: "Consent to data processing is required to submit.",
    invalidRequest: "Invalid request format.",
    missingData: "Form data is missing.",
    checkFields: "Please check the highlighted fields.",
    submitFailed:
      "The enquiry could not be sent. Please try again, or write to ahoj@forma.studio.",
    networkError:
      "Could not reach the server. Check your connection and try again.",
    form: "Submission failed.",
  },
  InquiryStatus: {
    ignored: "Thank you. If everything looks fine, we will get back by email.",
    demo: "The form is running in demonstration mode. Email sending is not configured — the enquiry was not sent.",
    error:
      "The enquiry could not be sent. Please try again, or write to ahoj@forma.studio.",
    sent: "The enquiry has been sent. We will get back to you by email as soon as possible.",
  },
  Demo: {
    notice:
      "Demonstration content: photographs are licensed stock interiors. They are not documentation of completed FORMA commissions.",
  },
};

const ru = {
  Meta: {
    homeTitle: "FORMA. — Реконструкция квартир в Праге",
    homeDescription:
      "Студия полной реконструкции квартир. От концепции до сдачи под ключ — Прага и окрестности.",
    homeOgDescription:
      "Пространство, в котором хочется жить. Полная реконструкция квартир от проекта до сдачи.",
    portfolioTitle: "Реализации — FORMA.",
    portfolioDescription:
      "Демонстрационные проекты реконструкции квартир в Праге. Портфолио студии FORMA.",
    inquiryTitle: "Заявка — FORMA.",
    inquiryDescription:
      "Необязательная заявка на реконструкцию квартиры. Опишите проект — мы предложим следующий шаг.",
    projectTitle: "{title} — FORMA.",
    notFoundTitle: "Страница не найдена — FORMA.",
  },
  Common: {
    brandHome: "FORMA. На главную",
    consultation: "Консультация",
    consultationLong: "Необязательная консультация",
    demoNotice:
      "Демонстрационный контент: фотографии — лицензированные стоковые интерьеры. Это не документация реальных заказов студии FORMA.",
    optional: "необязательно",
    requiredMark: "*",
    backToPortfolio: "Назад к реализациям",
    viewAllProjects: "Все реализации",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    mainNav: "Основная навигация",
    mobileNav: "Мобильная навигация",
    languageSwitcher: "Выбор языка",
    currentLanguage: "текущий язык",
  },
  Nav: {
    about: "О нас",
    services: "Услуги",
    portfolio: "Реализации",
    process: "Процесс",
    contact: "Контакты",
  },
  Languages: { cs: "CZ", ru: "RU", en: "EN" },
  Hero: {
    headline: "Пространство, в котором хочется жить.",
    subhead:
      "Полная реконструкция квартир в Праге и окрестностях — от продуманного проекта до ремесленного исполнения под ключ.",
    ctaPrimary: "Назначить встречу",
    ctaSecondary: "Смотреть реализации",
    scrollDown: "Листать вниз",
    imageAlt:
      "Светлая гостиная после реконструкции с большим окном и природными материалами",
  },
  About: {
    eyebrow: "О студии",
    title: "Ателье реконструкций с вниманием к целому.",
    intro:
      "FORMA. появилась из убеждения: качественная реконструкция квартиры — это не сумма работ, а композиция света, материалов и повседневного движения.",
    p1: "Мы проектируем и реализуем реконструкции городских квартир в Праге и Среднечешском крае. Архитектурное чутьё соединяем с точной строительной координацией, чтобы результат ощущался естественно — и служил долго.",
    p2: "Каждый проект ведём лично. От первого обмера до передачи ключей у вас одна студия, одна команда и понятный план.",
    caption:
      "Мы работаем с подлинными материалами и спокойной палитрой, которая уважает характер дома и жизнь его обитателей.",
    imageAlt:
      "Современное жилое пространство с деревянными поверхностями и мягким дневным светом",
    stats: {
      projects: { value: "120+", label: "реализаций" },
      years: { value: "12", label: "лет опыта" },
      contact: { value: "1", label: "точка контакта" },
    },
  },
  Services: {
    eyebrow: "Услуги",
    title: "Реконструкция от первого эскиза до финальной детали.",
    description:
      "Четыре направления, в которых мы удерживаем весь процесс — проект, материал, ремесло и сроки.",
    items: {
      kompletni: {
        title: "Полная реконструкция",
        description:
          "От первого обмера до сдачи квартиры под ключ. Координируем подрядчиков, сроки и детали, чтобы стройка шла спокойно.",
      },
      koupelny: {
        title: "Кухни и ванные",
        description:
          "Пространственно точные решения с акцентом на материал, свет и ежедневный комфорт. Проектируем и реализуем.",
      },
      dispozice: {
        title: "Изменение планировки",
        description:
          "Открытые пространства, новые видовые оси и лучший поток дневного света. Работаем с архитектурой квартиры, а не против неё.",
      },
      design: {
        title: "Дизайн и материалы",
        description:
          "Подбор поверхностей, цвета и ателье-деталей, которые собирают целое — от пола до ручек.",
      },
    },
  },
  HomePortfolio: {
    eyebrow: "Реализации",
    title: "Пространства, которые уже живут своей жизнью.",
    description:
      "Три демонстрационных проекта — разный метраж, одинаковое внимание к детали и атмосфере.",
    detailLink: "Подробнее о проекте",
  },
  Process: {
    eyebrow: "Процесс",
    title: "Четыре шага от первой встречи до сдачи квартиры.",
    description:
      "Понятный порядок без лишней бюрократии. Вы всегда знаете, что происходит и почему.",
    steps: {
      "01": {
        title: "Консультация",
        description:
          "Обсуждаем ваши ожидания, планировку квартиры и реалистичный бюджет. Вместе задаём направление проекта.",
      },
      "02": {
        title: "Проект",
        description:
          "Готовим планировку, материалы и точный план работ. Всё утверждается до начала строительства.",
      },
      "03": {
        title: "Реализация",
        description:
          "Бригады работают по графику. У вас одна точка контакта и регулярные фото хода работ.",
      },
      "04": {
        title: "Сдача",
        description:
          "Завершаем детали, проводим проверку и передаём квартиру, готовую к жизни — вместе с документацией.",
      },
    },
  },
  Contact: {
    eyebrow: "Контакты",
    title: "Давайте спроектируем пространство, которое подойдёт именно вам.",
    description:
      "Необязательная консультация у вас дома или в нашей студии. Обсудим планировку, бюджет и возможные сроки старта.",
    ctaPrimary: "Отправить заявку",
    ctaSecondary: "Написать email",
    studioLabel: "Студия",
    studioAddress1: "Vodičkova 28",
    studioAddress2: "110 00 Praha 1",
    phoneLabel: "Телефон",
    emailLabel: "Email",
  },
  Footer: {
    tagline:
      "Студия полной реконструкции квартир. Прага и окрестности — проект, реализация и контроль каждой детали.",
    navLabel: "Навигация",
    studioLabel: "Студия",
    hours: "Пн–Пт 9:00–18:00",
    rights: "© 2026 FORMA. Все права защищены.",
    fictional: "Вымышленная студия для демонстрационных целей.",
  },
  PortfolioPage: {
    eyebrow: "Портфолио",
    title: "Наши реализации",
    intro:
      "Подборка демонстрационных проектов реконструкции квартир по Праге — от сецессионных доходных домов до современных лофтов. Каждый сюжет показывает свой тип вмешательства при одинаковом внимании к целому, свету и детали.",
  },
  ProjectPage: {
    back: "Назад к реализациям",
    about: "О проекте",
    gallery: "Галерея",
    galleryTitle: "Интерьеры и детали",
    beforeAfterEyebrow: "До / после",
    beforeAfterTitle: "Иллюстративное сравнение атмосферы",
    beforeLabel: "До — иллюстрация",
    afterLabel: "После — иллюстрация",
    challengesEyebrow: "Задачи",
    challengesTitle: "Что нужно было решить",
    solutionsEyebrow: "Решения",
    solutionsTitle: "Как мы к этому подошли",
    ctaEyebrow: "Консультация",
    ctaTitle: "Хотите похожий подход, как в проекте {title}?",
    ctaDescription:
      "Запишитесь на необязательную консультацию. Обсудим планировку, материалы и реалистичные рамки бюджета — без обязательств.",
    ctaPrimary: "Необязательная консультация",
    ctaSecondary: "Назад к реализациям",
    relatedEyebrow: "Другие проекты",
    relatedTitle: "Продолжить просмотр",
    metaLocation: "Локация",
    metaType: "Тип работ",
    metaArea: "Площадь",
    metaYear: "Год (демо)",
    yearDemo: "{year} · демо-данные",
    showPhoto: "Показать фото {index}: {alt}",
  },
  ProjectTypes: {
    complete: "Полная реконструкция",
    layout: "Изменение планировки",
    kitchen_bath: "Кухни и ванные",
    design: "Дизайн и материалы",
  },
  Projects: withProjects(ruProjects),
  InquiryPage: {
    eyebrow: "Заявка",
    title: "Необязательная консультация по реконструкции",
    intro:
      "Кратко опишите квартиру и задачу. Мы ответим с предложением следующего шага — без давления и обязательств. Чем точнее данные, тем лучше подготовим первую встречу.",
    stepsTitle: "Что происходит после отправки",
    steps: {
      "01": {
        title: "Проверка заявки",
        text: "Смотрим планировку, тип работ и рамки бюджета.",
      },
      "02": {
        title: "Короткий ответ",
        text: "Свяжемся по email или телефону с предложением встречи.",
      },
      "03": {
        title: "Консультация",
        text: "У вас или в студии обсудим возможности и дальнейший порядок.",
      },
    },
    preferContact: "Предпочитаете прямой контакт?",
    demoBanner:
      "Демонстрационный режим: отправка email не настроена. Форму и валидацию можно проверить, но заявка не будет отправлена.",
  },
  InquiryForm: {
    renovationType: "Тип реконструкции",
    renovationTypePlaceholder: "Выберите вариант",
    area: "Площадь (м²)",
    areaPlaceholder: "напр. 72",
    location: "Локация проекта",
    locationPlaceholder: "напр. Praha 2 — Vinohrady",
    budget: "Ориентировочный бюджет",
    budgetPlaceholder: "напр. 1,2–1,5 млн Kč",
    startDate: "Предполагаемый старт",
    startDatePlaceholder: "напр. весна 2027",
    description: "Описание проекта",
    descriptionPlaceholder:
      "Кратко опишите состояние квартиры, цели реконструкции и важные детали.",
    fullName: "Имя и фамилия",
    email: "Email",
    phone: "Телефон",
    phonePlaceholder: "+420 …",
    consent:
      "Соглашаюсь на обработку персональных данных для обработки этой заявки. Мы не сохраняем данные в базе — они нужны только для ответа на ваш запрос.",
    consentHint: "Согласие обязательно для отправки формы.",
    honeypot: "Веб-сайт",
    requiredNote: "Поля, отмеченные *, обязательны. Отправка не создаёт обязательств.",
    submit: "Отправить заявку",
    submitting: "Отправляем…",
    types: {
      complete: "Полная реконструкция",
      partial: "Частичная реконструкция",
      kitchen_bath: "Ванная / кухня",
      other: "Другое",
    },
  },
  InquiryErrors: {
    renovationType: "Выберите тип реконструкции.",
    area: "Укажите положительную площадь в м².",
    areaMax: "Укажите реалистичную площадь квартиры (макс. 2000 м²).",
    location: "Укажите локацию проекта.",
    fullName: "Укажите имя и фамилию.",
    email: "Укажите корректный email.",
    phone: "Укажите корректный телефон или оставьте поле пустым.",
    description: "Описание слишком длинное (макс. 4000 символов).",
    budget: "Текст бюджета слишком длинный.",
    startDate: "Текст срока слишком длинный.",
    consent: "Для отправки необходимо согласие на обработку данных.",
    invalidRequest: "Неверный формат запроса.",
    missingData: "Отсутствуют данные формы.",
    checkFields: "Проверьте, пожалуйста, выделенные поля.",
    submitFailed:
      "Не удалось отправить заявку. Попробуйте ещё раз или напишите на ahoj@forma.studio.",
    networkError:
      "Не удалось связаться с сервером. Проверьте соединение и попробуйте снова.",
    form: "Отправка не удалась.",
  },
  InquiryStatus: {
    ignored: "Спасибо. Если всё в порядке, мы свяжемся с вами по email.",
    demo: "Форма работает в демонстрационном режиме. Отправка email не настроена — заявка не была отправлена.",
    error:
      "Не удалось отправить заявку. Попробуйте ещё раз или напишите на ahoj@forma.studio.",
    sent: "Заявка отправлена. Мы свяжемся с вами по email как можно скорее.",
  },
  Demo: {
    notice:
      "Демонстрационный контент: фотографии — лицензированные стоковые интерьеры. Это не документация реальных заказов студии FORMA.",
  },
};

for (const [locale, data] of [
  ["cs", cs],
  ["en", en],
  ["ru", ru],
]) {
  writeFileSync(join(root, "messages", `${locale}.json`), JSON.stringify(data, null, 2), "utf8");
  console.log(`wrote messages/${locale}.json`);
}
