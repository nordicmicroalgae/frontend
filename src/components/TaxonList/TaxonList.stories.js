import React from 'react';
import TaxonList, { GroupedTaxonList } from './';

const data = [
  {
    "scientificName": "Anabaena aequalis",
    "authority": "Borge"
  },
  {
    "scientificName": "Anabaena augstumalis",
    "authority": "Schmidle"
  },
  {
    "scientificName": "Anabaena baltica",
    "authority": "E.J.Schmidt"
  },
  {
    "scientificName": "Anabaena catenula",
    "authority": "(K\u00fctz.) Bornet & Flahault"
  },
  {
    "scientificName": "Aphanocapsa conferta",
    "authority": "(W.West & G.S.West) Kom\u00e1rk.-Legn. & Cronberg"
  },
  {
    "scientificName": "Aphanocapsa delicatissima",
    "authority": "W.West & G.S.West"
  },
  {
    "scientificName": "Aphanocapsa fusco-lutea",
    "authority": "Hansg."
  },
  {
    "scientificName": "Aphanocapsa grevillei",
    "authority": "(Hassall) Rabenh."
  },
  {
    "scientificName": "Aphanocapsa hyalina",
    "authority": "(Lyngb.) Hansg."
  },
  {
    "scientificName": "Aphanocapsa orae",
    "authority": "(Kosinsk.) Kom\u00e1rek & Anagn."
  },
  {
    "scientificName": "Aphanocapsa parallelliformis",
    "authority": "Cronberg"
  },
  {
    "scientificName": "Aphanocapsa parasitica",
    "authority": "(K\u00fctz.) Kom\u00e1rek & Anagn."
  },
  {
    "scientificName": "Aphanocapsa planctonica",
    "authority": "(G.M.Sm.) Kom\u00e1rek & Anagn."
  },
  {
    "scientificName": "Aphanocapsa reinboldii",
    "authority": "(P.G.Richt.) Kom\u00e1rek & Anagn."
  },
  {
    "scientificName": "Aphanocapsa rivularis",
    "authority": "(Carmich.) Rabenh."
  },
  {
    "scientificName": "Aphanocapsa sideroderma",
    "authority": "Naumann"
  },
  {
    "scientificName": "Aphanothece curvata",
    "authority": "Lagerh."
  },
  {
    "scientificName": "Aphanothece floccosa",
    "authority": "(Zalessky) Cronberg & Kom\u00e1rek"
  },
  {
    "scientificName": "Aphanothece nidulans",
    "authority": "P.G.Richt."
  },
  {
    "scientificName": "Bambusina borreri",
    "authority": "(Ralfs) Cleve"
  },
  {
    "scientificName": "Binuclearia tectorum",
    "authority": "(K\u00fctz.) S.Berger ex Wichmann"
  },
  {
    "scientificName": "Blennothrix glutinosa",
    "authority": "(Gomont ex Gomont) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Blennothrix lyngbyaceae",
    "authority": "(K\u00fctz. ex Gomont) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Blidingia chadefaudii",
    "authority": "(Feldmann) Bliding"
  },
  {
    "scientificName": "Blidingia marginata",
    "authority": "(J.Agardh) P.J.L.Dang."
  },
  {
    "scientificName": "Blidingia minima",
    "authority": "(N\u00e4geli ex K\u00fctz.) Kylin"
  },
  {
    "scientificName": "Blidingia ramifera",
    "authority": "(Bliding) Garbary & Barkhouse"
  },
  {
    "scientificName": "Botryococcus braunii",
    "authority": "K\u00fctz., 1849"
  },
  {
    "scientificName": "Botryococcus neglectus",
    "authority": "(W. & G.S. West) Kom\u00e1rek & Marvan"
  },
  {
    "scientificName": "Botryococcus protuberans",
    "authority": "W.& G.S. West"
  },
  {
    "scientificName": "Brachytrichia balani",
    "authority": "Bornet & Flahault"
  },
  {
    "scientificName": "Brachytrichia lloydii",
    "authority": "Thur. ex Bornet & Flahault"
  },
  {
    "scientificName": "Chroococcus aphanocapsoides",
    "authority": "Skuja"
  },
  {
    "scientificName": "Chroococcus cohaerens",
    "authority": "(Br\u00e9b.) N\u00e4geli"
  },
  {
    "scientificName": "Chroococcus cumulatus",
    "authority": "Bachm."
  },
  {
    "scientificName": "Chroococcus dispersus",
    "authority": "(Keissl.) Lemmerm."
  },
  {
    "scientificName": "Chroococcus distans",
    "authority": "(G.M.Sm.) Kom\u00e1rk.-Legn. & Cronberg"
  },
  {
    "scientificName": "Chroococcus limneticus",
    "authority": "Lemmerm."
  },
  {
    "scientificName": "Chroococcus macrococcus",
    "authority": "(K\u00fctz.) Rabenh."
  },
  {
    "scientificName": "Chroococcus microscopicus",
    "authority": "Kom\u00e1rk.-Legn. & Cronberg"
  },
  {
    "scientificName": "Chroococcus minimus",
    "authority": "(Keissl.) Lemmerm."
  },
  {
    "scientificName": "Chroococcus minor",
    "authority": "(K\u00fctz.) N\u00e4geli"
  },
  {
    "scientificName": "Chroococcus minutus",
    "authority": "(K\u00fctz.) N\u00e4geli"
  },
  {
    "scientificName": "Chroococcus pallidus",
    "authority": "(N\u00e4geli) N\u00e4geli"
  },
  {
    "scientificName": "Chroococcus planctonicus",
    "authority": "Bethge"
  },
  {
    "scientificName": "Chroococcus prescottii",
    "authority": "F.E.Drouet & W.A.Daily"
  },
  {
    "scientificName": "Dichothrix baueriana",
    "authority": "(Grunow) Bornet & Flahault"
  },
  {
    "scientificName": "Dichothrix gypsophila",
    "authority": "(K\u00fctz.) Bornet & Flahault"
  },
  {
    "scientificName": "Dichothrix nordstedtii",
    "authority": "Bornet & Flahault"
  },
  {
    "scientificName": "Dichothrix orsiniana",
    "authority": "Bornet & Flahault"
  },
  {
    "scientificName": "Dolichospermum affine",
    "authority": "(Lemmerm.) Wacklin, L.Hoffm. & Kom\u00e1rek"
  },
  {
    "scientificName": "Dolichospermum circinale",
    "authority": "(Rabenh. ex Bornet & Flahault) Wacklin, L.Hoffm. & Kom\u00e1rek"
  },
  {
    "scientificName": "Dolichospermum mucosum",
    "authority": "(Kom\u00e1rk.-Legn. & Eloranta) Wacklin, L.Hoffm. & Kom\u00e1rek"
  },
  {
    "scientificName": "Dolichospermum planctonicum",
    "authority": "(Brunnth.) Wacklin, L.Hoffm. & Kom\u00e1rek"
  },
  {
    "scientificName": "Dolichospermum sigmoideum",
    "authority": "(Nygaard) Wacklin, L.Hoffm. & Kom\u00e1rek"
  },
  {
    "scientificName": "Dolichospermum smithii",
    "authority": "(Kom\u00e1rek) Wacklin, L.Hoffm. & Kom\u00e1rek"
  },
  {
    "scientificName": "Dolichospermum solitarium",
    "authority": "(Kleb.) Wacklin, L.Hoffm. & Kom\u00e1rek"
  },
  {
    "scientificName": "Dolichospermum spiroides",
    "authority": "(Kleb.) Wacklin, L.Hoffm. & Kom\u00e1rek"
  },
  {
    "scientificName": "Dolichospermum viguieri",
    "authority": "(Denis & Fr\u00e9my) Wacklin, L.Hoffm. & Kom\u00e1rek"
  },
  {
    "scientificName": "Entophysalis granulosa",
    "authority": "K\u00fctz."
  },
  {
    "scientificName": "Epigloeosphaera glebulenta",
    "authority": "(Zalessky) Kom\u00e1rk.-Legn."
  },
  {
    "scientificName": "Euastrum affine",
    "authority": "Ralfs"
  },
  {
    "scientificName": "Euastrum ansatum",
    "authority": "Ralfs"
  },
  {
    "scientificName": "Euastrum bidentatum",
    "authority": "N\u00e4geli"
  },
  {
    "scientificName": "Euastrum binale",
    "authority": "Ehrenb. ex Ralfs"
  },
  {
    "scientificName": "Euastrum bipapillatum",
    "authority": "Gr\u00f6nblad"
  },
  {
    "scientificName": "Euastrum crassum",
    "authority": "(Br\u00e9b.) K\u00fctz."
  },
  {
    "scientificName": "Euastrum denticulatum",
    "authority": "F. Gay"
  },
  {
    "scientificName": "Euastrum didelta",
    "authority": "Ralfs"
  },
  {
    "scientificName": "Euastrum dubium",
    "authority": "N\u00e4geli"
  },
  {
    "scientificName": "Euastrum elegans",
    "authority": "(Br\u00e9b.) K\u00fctz. ex Ralfs"
  },
  {
    "scientificName": "Euastrum insulare",
    "authority": "(Wittrock) Roy, 1883"
  },
  {
    "scientificName": "Eucapsis alpina",
    "authority": "Clements & Shantz"
  },
  {
    "scientificName": "Eucapsis minor",
    "authority": "(Skuja) Elenkin"
  },
  {
    "scientificName": "Eucapsis minuta",
    "authority": "Fritsch, 1912"
  },
  {
    "scientificName": "Fischerella ambigua",
    "authority": "(K\u00fctz. ex Bornet & Flahault) Gomont"
  },
  {
    "scientificName": "Fortiea rugulosa",
    "authority": "Skuja"
  },
  {
    "scientificName": "Fortiea striatula",
    "authority": "(Hy) De Toni"
  },
  {
    "scientificName": "Fortiea tenuissima",
    "authority": "(W.West & G.S.West) De Toni"
  },
  {
    "scientificName": "Fragilidium subglobosum",
    "authority": "(von Stosch) Loeblich III"
  },
  {
    "scientificName": "Franceia armata",
    "authority": "(Lemmerm.) Korshikov"
  },
  {
    "scientificName": "Franceia droescheri",
    "authority": "(Lemmerm.) G.M. Sm., 1933"
  },
  {
    "scientificName": "Franceia echidna",
    "authority": "(Bohlin) Bourrelly, 1948"
  },
  {
    "scientificName": "Franceia elongata",
    "authority": "Korshikov"
  },
  {
    "scientificName": "Franceia ovalis",
    "authority": "(Franc\u00e9) Lemmerm., 1898"
  },
  {
    "scientificName": "Gloeocapsa aeruginosa",
    "authority": "K\u00fctz."
  },
  {
    "scientificName": "Gloeocapsa alpina",
    "authority": "(N\u00e4geli) Brand"
  },
  {
    "scientificName": "Gloeocapsa atrata",
    "authority": "K\u00fctz."
  },
  {
    "scientificName": "Gloeocapsopsis crepidinum",
    "authority": "(Thur.) Geitler ex Kom\u00e1rek"
  },
  {
    "scientificName": "Gloeocapsopsis magma",
    "authority": "(Br\u00e9b.) Kom\u00e1rek & Anagn."
  },
  {
    "scientificName": "Gloeothece confluens",
    "authority": "N\u00e4geli"
  },
  {
    "scientificName": "Gloeothece fusco-lutea",
    "authority": "N\u00e4geli"
  },
  {
    "scientificName": "Gloeothece incerta",
    "authority": "Skuja"
  },
  {
    "scientificName": "Gloeothece linearis",
    "authority": "N\u00e4geli"
  },
  {
    "scientificName": "Gloeothece palea",
    "authority": "(K\u00fctz.) Rabenh."
  },
  {
    "scientificName": "Gloeothece rupestris",
    "authority": "(Lyngb.) Bornet in Wittr.& Nordst."
  },
  {
    "scientificName": "Gloeothece tepidariorum",
    "authority": "(A.Braun) Lagerh."
  },
  {
    "scientificName": "Gomphosphaeria aponina",
    "authority": "K\u00fctz."
  },
  {
    "scientificName": "Gomphosphaeria multiplex",
    "authority": "(Nygaard) Kom\u00e1rek"
  },
  {
    "scientificName": "Gomphosphaeria salina",
    "authority": "Kom\u00e1rek & Hind\u00e1k"
  },
  {
    "scientificName": "Gomphosphaeria virieuxii",
    "authority": "Kom\u00e1rek & Hind\u00e1k"
  },
  {
    "scientificName": "Hapalosiphon flexuosus",
    "authority": "Borz\u00ed"
  },
  {
    "scientificName": "Hapalosiphon fontinalis",
    "authority": "(C.Agardh) Bornet"
  },
  {
    "scientificName": "Hapalosiphon hibernicus",
    "authority": "W.West & G.S.West"
  },
  {
    "scientificName": "Hapalosiphon intricatus",
    "authority": "W.West & G.S.West"
  },
  {
    "scientificName": "Hassallia bouteillei",
    "authority": "Bornet & Flahault"
  },
  {
    "scientificName": "Hassallia byssoidea",
    "authority": "Hassall ex Bornet & Flahault"
  },
  {
    "scientificName": "Hassallia pulvinata",
    "authority": "Fr\u00e9my"
  },
  {
    "scientificName": "Heteroleibleinia kuetzingii",
    "authority": "(Schmidle) Comp\u00e8re"
  },
  {
    "scientificName": "Hydrococcus cesatii",
    "authority": "Rabenh."
  },
  {
    "scientificName": "Hydrococcus rivularis",
    "authority": "K\u00fctz."
  },
  {
    "scientificName": "Hydrocoryne spongiosa",
    "authority": "Schwabe ex Bornet & Flahault"
  },
  {
    "scientificName": "Hyella caespitosa",
    "authority": "Bornet & Flahault"
  },
  {
    "scientificName": "Imantonia rotunda",
    "authority": "Reynolds, 1974"
  },
  {
    "scientificName": "Isactis plana",
    "authority": "Thur. ex Bornet & Flahault"
  },
  {
    "scientificName": "Isochrysis galbana",
    "authority": "Parke"
  },
  {
    "scientificName": "Isochrysis litoralis",
    "authority": "Billard & Gayral"
  },
  {
    "scientificName": "Isocystis minutissima",
    "authority": "(K\u00fctz. ex Bornet & Flahault) Kom\u00e1rek & Anagn."
  },
  {
    "scientificName": "Isoselmis obconica",
    "authority": "Butcher, 1967"
  },
  {
    "scientificName": "Isthmia enervis",
    "authority": "Ehrenberg, 1838"
  },
  {
    "scientificName": "Isthmia nervosa",
    "authority": "K\u00fctzing, 1844"
  },
  {
    "scientificName": "Isthmochloron lobulatum",
    "authority": "(N\u00e4geli) Skuja"
  },
  {
    "scientificName": "Isthmochloron trispinatum",
    "authority": "(W.West & G.S.West) Skuja"
  },
  {
    "scientificName": "Isthmoplea sphaerophora",
    "authority": "(Carm.) Kjellm."
  },
  {
    "scientificName": "Jaaginema geminatum",
    "authority": "(Menegh. ex Gomont) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Jaaginema minimum",
    "authority": "(Gickelh.) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Jaaginema neglectum",
    "authority": "(Lemmerm.) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Jaaginema pseudogeminatum",
    "authority": "(G.Schmid) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Jaaginema subtilissimum",
    "authority": "(K\u00fctz. ex Forti in De Toni) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Jakoba libera",
    "authority": "(Ruinen) Patterson, 1990"
  },
  {
    "scientificName": "Klebsormidium flaccidum",
    "authority": "(K\u00fctz.) P.C.Silva, Mattox & W.H.Blackw."
  },
  {
    "scientificName": "Klebsormidium montanum",
    "authority": "(Hansg.) Shin Watan."
  },
  {
    "scientificName": "Klebsormidium oedogonioides",
    "authority": "(Skuja) H.Ettl & G.G\u00e4rtner"
  },
  {
    "scientificName": "Klebsormidium rivulare",
    "authority": "(K\u00fctz.) M.O.Morison & Sheath"
  },
  {
    "scientificName": "Klebsormidium subtile",
    "authority": "(K\u00fctz.) Tracanna ex Tell"
  },
  {
    "scientificName": "Koliella longiseta",
    "authority": "(Vischer) Hind\u00e1k"
  },
  {
    "scientificName": "Komvophoron constrictum",
    "authority": "(Szafer) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Komvophoron minutum",
    "authority": "(Skuja) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Komvophoron pallildum",
    "authority": "(Skuja) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Komvophoron schmidlei",
    "authority": "(Jaag) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Komvophoron siderophilum",
    "authority": "(Skuja) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Kornmannia leptoderma",
    "authority": "(Kjellm.) Bliding"
  },
  {
    "scientificName": "Leptolyngbya benthonica",
    "authority": "(Skuja) Anagn."
  },
  {
    "scientificName": "Leptolyngbya calotrichoides",
    "authority": "(Gomont) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Leptolyngbya crassior",
    "authority": "(Skuja) Anagn."
  },
  {
    "scientificName": "Leptolyngbya ectocarpi",
    "authority": "(Gomont) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Leptolyngbya foveolarum",
    "authority": "(Rabenh. ex Gomont) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Leptolyngbya fragilis",
    "authority": "(Gomont) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Leptolyngbya gracilis",
    "authority": "(W.West & G.S.West) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Leptolyngbya lagerheimii",
    "authority": "(Gomont) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Leptolyngbya minuta",
    "authority": "(A.Lindst.) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Leptolyngbya norvegica",
    "authority": "(Gomont) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Leptolyngbya notata",
    "authority": "(Schmidle) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Leptolyngbya perforans",
    "authority": "(Geitler) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Leptolyngbya protospira",
    "authority": "(Skuja) Anagn."
  },
  {
    "scientificName": "Leptolyngbya rivulariarum",
    "authority": "(Gomont) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Leptolyngbya subtilis",
    "authority": "(W.West) Anagn."
  },
  {
    "scientificName": "Leptolyngbya tenuis",
    "authority": "(Gomont) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Leptolyngbya terebrans",
    "authority": "(Bornet & Flahault ex Gomont) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Leptolyngbya valderiana",
    "authority": "(Gomont) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Limnothrix planctonica",
    "authority": "\"(Wol&#322;osz.) M.-E.Meffert\""
  },
  {
    "scientificName": "Merismopedia elegans",
    "authority": "A.Braun in K\u00fctz."
  },
  {
    "scientificName": "Merismopedia glauca",
    "authority": "(Ehrenb.) K\u00fctz."
  },
  {
    "scientificName": "Merismopedia insignis",
    "authority": "Skorbatov"
  },
  {
    "scientificName": "Merismopedia mediterranea",
    "authority": "N\u00e4geli"
  },
  {
    "scientificName": "Merismopedia punctata",
    "authority": "Meyen"
  },
  {
    "scientificName": "Merismopedia tenuissima",
    "authority": "Lemmerm."
  },
  {
    "scientificName": "Merismopedia warmingiana",
    "authority": "Lagerh."
  },
  {
    "scientificName": "Microcrocis geminata",
    "authority": "(Lagerh.) Geitler"
  },
  {
    "scientificName": "Microcrocis irregularis",
    "authority": "(Lagerh.) Geitler"
  },
  {
    "scientificName": "Microcrocis marina",
    "authority": "(Lagerh.) Kom\u00e1rek & Anagn."
  },
  {
    "scientificName": "Microcrocis sabulicola",
    "authority": "(Lagerh.) Geitler"
  },
  {
    "scientificName": "Microcystis aeruginosa",
    "authority": "(K\u00fctz.) K\u00fctz."
  },
  {
    "scientificName": "Microcystis botrys",
    "authority": "Teiling"
  },
  {
    "scientificName": "Microcystis firma",
    "authority": "(K\u00fctz.) Schmidle"
  },
  {
    "scientificName": "Microcystis flos-aquae",
    "authority": "(Wittr.) Kirchn."
  },
  {
    "scientificName": "Microcystis holsatica",
    "authority": "Lemmerm."
  },
  {
    "scientificName": "Nodularia baltica",
    "authority": "Kom\u00e1rek, H\u00fcbel & M.H\u00fcbel"
  },
  {
    "scientificName": "Nodularia harveyana",
    "authority": "Thuret ex Bornet & Flahault"
  },
  {
    "scientificName": "Nodularia litorea",
    "authority": "(K\u00fctz.) Thur. ex Kom\u00e1rek, H\u00fcbel & M.H\u00fcbel"
  },
  {
    "scientificName": "Nodularia sphaerocarpa",
    "authority": "Bornet & Flahault"
  },
  {
    "scientificName": "Nodularia spumigena",
    "authority": "Mert. ex Bornet & Flahault"
  },
  {
    "scientificName": "Nostoc calcicola",
    "authority": "Br\u00e9b. ex Bornet & Flahault"
  },
  {
    "scientificName": "Nostoc carneum",
    "authority": "C.Agardh ex Bornet & Flahault"
  },
  {
    "scientificName": "Nostoc coeruleum",
    "authority": "Lyngb."
  },
  {
    "scientificName": "Nostoc commune",
    "authority": "Vaucher ex Bornet & Flahault"
  },
  {
    "scientificName": "Nostoc cuticulare",
    "authority": "(Br\u00e9b.) Bornet et Flahault"
  },
  {
    "scientificName": "Nostoc entophytum",
    "authority": "Bornet & Flahault"
  },
  {
    "scientificName": "Nostoc flagelliforme",
    "authority": "Berkeley & Curtis"
  },
  {
    "scientificName": "Nostoc foliaceum",
    "authority": "Moug. ex Bornet & Flahault"
  },
  {
    "scientificName": "Nostoc humifusum",
    "authority": "Carmich. ex Bornet & Flahault"
  },
  {
    "scientificName": "Nostoc linckia",
    "authority": "Bornet ex Bornet & Flahault"
  },
  {
    "scientificName": "Nostoc macrosporum",
    "authority": "Menegh. ex Bornet & Flahault"
  },
  {
    "scientificName": "Nostoc microscopicum",
    "authority": "Carmich. ex Bornet & Flahault"
  },
  {
    "scientificName": "Oscillatoria annae",
    "authority": "Goor"
  },
  {
    "scientificName": "Oscillatoria bonnemaisonii",
    "authority": "(P.Crouan & H.Crouan) P.Crouan & H.Crouan"
  },
  {
    "scientificName": "Oscillatoria chlorina",
    "authority": "K\u00fctz. ex Gomont"
  },
  {
    "scientificName": "Oscillatoria curviceps",
    "authority": "C.Agardh ex Gomont"
  },
  {
    "scientificName": "Oscillatoria grossegranulata",
    "authority": "Skuja"
  },
  {
    "scientificName": "Oscillatoria jenensis",
    "authority": "G.Schmid"
  },
  {
    "scientificName": "Oscillatoria limosa",
    "authority": "C.Agardh ex Gomont"
  },
  {
    "scientificName": "Oscillatoria major",
    "authority": "Vaucher ex Hansg."
  },
  {
    "scientificName": "Oscillatoria margaritifera",
    "authority": "K\u00fctz. ex Gomont"
  },
  {
    "scientificName": "Oscillatoria princeps",
    "authority": "Vaucher ex Gomont"
  },
  {
    "scientificName": "Oscillatoria proboscidea",
    "authority": "Gomont"
  },
  {
    "scientificName": "Oscillatoria pseudominima",
    "authority": "Skuja"
  },
  {
    "scientificName": "Oscillatoria pulchra",
    "authority": "A.Lindst."
  },
  {
    "scientificName": "Oscillatoria putrida",
    "authority": "Schmidle"
  },
  {
    "scientificName": "Oscillatoria quasiperforata",
    "authority": "Skuja"
  },
  {
    "scientificName": "Oscillatoria rupicola",
    "authority": "Hansg."
  },
  {
    "scientificName": "Oscillatoria sancta",
    "authority": "K\u00fctz. ex Gomont"
  },
  {
    "scientificName": "Oscillatoria subsalsa",
    "authority": "C.Agardh ex Gomont"
  },
  {
    "scientificName": "Paracapsa siderophila",
    "authority": "Naumann"
  },
  {
    "scientificName": "Petalonema alatum",
    "authority": "Berk. ex Kirchn."
  },
  {
    "scientificName": "Petalonema crustaceum",
    "authority": "C.Agardh ex Kirchn."
  },
  {
    "scientificName": "Petalonema velutinum",
    "authority": "(Rabenh.) Mig."
  },
  {
    "scientificName": "Planktolyngbya bipunctata",
    "authority": "(Lemmerm.) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Planktolyngbya brevicellularis",
    "authority": "Cronberg & Kom\u00e1rek"
  },
  {
    "scientificName": "Planktolyngbya capillaris",
    "authority": "(Hind\u00e1k) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Planktolyngbya circumcreta",
    "authority": "(G.S.West) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Planktolyngbya contorta",
    "authority": "(Lemmerm.) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Planktolyngbya crassa",
    "authority": "Kom\u00e1rk.-Legn. & Cronberg"
  },
  {
    "scientificName": "Planktolyngbya lacustris",
    "authority": "(Lemmerm.) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Planktolyngbya limnetica",
    "authority": "(Lemmerm.) Kom\u00e1rk.-Legn. & Cronberg"
  },
  {
    "scientificName": "Pleurocapsa fuliginosa",
    "authority": "Hauck"
  },
  {
    "scientificName": "Pleurocapsa minuta",
    "authority": "Geitler"
  },
  {
    "scientificName": "Pulvinularia suecica",
    "authority": "Borz\u00ed"
  },
  {
    "scientificName": "Quadricilia rotundata",
    "authority": "(Skuja) V\u00f8rs, 1992"
  },
  {
    "scientificName": "Quadricoccus ellipticus",
    "authority": "Hortob., 1973"
  },
  {
    "scientificName": "Quadricoccus euryhalinicus",
    "authority": "Kuylenstierna & Karlson, 1998"
  },
  {
    "scientificName": "Quadricoccus verrucosus",
    "authority": "Fott, 1948"
  },
  {
    "scientificName": "Quadrigula closterioides",
    "authority": "(Bohlin) Printz"
  },
  {
    "scientificName": "Quadrigula korsikovii",
    "authority": "Kom\u00e1rek"
  },
  {
    "scientificName": "Quadrigula lacustris",
    "authority": "(Chodat) G.M. Sm."
  },
  {
    "scientificName": "Quadrigula pfitzeri",
    "authority": "(Schr\u00f6d.) G.M. Sm."
  },
  {
    "scientificName": "Radiocystis geminata",
    "authority": "Skuja"
  },
  {
    "scientificName": "Raphidiopsis mediterranea",
    "authority": "Skuja"
  },
  {
    "scientificName": "Rhabdoderma compositum",
    "authority": "(G.M.Sm.) Fedorov"
  },
  {
    "scientificName": "Richelia intracellularis",
    "authority": "J.Schmidt"
  },
  {
    "scientificName": "Rivularia atra",
    "authority": "Roth ex Bornet & Flahault"
  },
  {
    "scientificName": "Rivularia beccariana",
    "authority": "(De Not.) Bornet & Flahault"
  },
  {
    "scientificName": "Rivularia biasolettiana",
    "authority": "Menegh. ex Bornet & Flahault"
  },
  {
    "scientificName": "Rivularia borealis",
    "authority": "P.G.Richt."
  },
  {
    "scientificName": "Rivularia dura",
    "authority": "Roth ex  Bornet & Flahault"
  },
  {
    "scientificName": "Rivularia haematites",
    "authority": "C.Agardh ex  Bornet & Flahault"
  },
  {
    "scientificName": "Rivularia minutula",
    "authority": "(K\u00fctz.) Bornet & Flahault"
  },
  {
    "scientificName": "Rivularia nitida",
    "authority": "C.Agardh ex Bornet & Flahault"
  },
  {
    "scientificName": "Romeria elegans",
    "authority": "\"(Wol&#322;osz.) Koczw. in Geitler\""
  },
  {
    "scientificName": "Romeria gracilis",
    "authority": "Koczw. ex Geitler"
  },
  {
    "scientificName": "Siphonema polonicum",
    "authority": "(Racib.) Geitler"
  },
  {
    "scientificName": "Snowella atomus",
    "authority": "Kom\u00e1rek & Hind\u00e1k"
  },
  {
    "scientificName": "Snowella fennica",
    "authority": "Kom\u00e1rek & Kom\u00e1rk.-Legn."
  },
  {
    "scientificName": "Snowella lacustris",
    "authority": "(Chodat) Kom\u00e1rek & Hind\u00e1k"
  },
  {
    "scientificName": "Snowella litoralis",
    "authority": "(H\u00e4yr\u00e9n) Kom\u00e1rek & Hind\u00e1k"
  },
  {
    "scientificName": "Snowella rosea",
    "authority": "(Snow) Elenkin"
  },
  {
    "scientificName": "Snowella septentrionalis",
    "authority": "Kom\u00e1rek & Hind\u00e1k"
  },
  {
    "scientificName": "Spirulina versicolor",
    "authority": "Cohn ex Gomont"
  },
  {
    "scientificName": "Stainieria sublitoralis",
    "authority": "(A.Lindst.) Anagn. & Pantaz."
  },
  {
    "scientificName": "Stainieria suecica",
    "authority": "(Kylin) Kom\u00e1rek & Anagn."
  },
  {
    "scientificName": "Stigonema mamillosum",
    "authority": "(C.Agardh) ex Bornet & Flahault"
  },
  {
    "scientificName": "Stigonema mesentericum",
    "authority": "Geitler"
  },
  {
    "scientificName": "Stigonema minutum",
    "authority": "Hassall ex Bornet & Flahault"
  },
  {
    "scientificName": "Synechocystis sallensis",
    "authority": "Skuja"
  },
  {
    "scientificName": "Tolypothrix distorta",
    "authority": "K\u00fctz. ex Bornet & Flahault"
  },
  {
    "scientificName": "Tolypothrix lanata",
    "authority": "Wartm. ex Bornet & Flahault"
  },
  {
    "scientificName": "Tolypothrix limbata",
    "authority": "Thur. ex Bornet & Flahault"
  },
  {
    "scientificName": "Tolypothrix penicillata",
    "authority": "Thur. ex Bornet & Flahault"
  },
  {
    "scientificName": "Tolypothrix rivularis",
    "authority": "Hansg."
  },
  {
    "scientificName": "Tolypothrix saviczii",
    "authority": "Kossinsk."
  },
  {
    "scientificName": "Tolypothrix tenuis",
    "authority": "K\u00fctz. ex Bornet & Flahault"
  },
  {
    "scientificName": "Trichocoleus tenerrimus",
    "authority": "(Gomont) Anagn."
  },
  {
    "scientificName": "Trichodesmium erythraeum",
    "authority": "Ehrenb. ex Gomont"
  },
  {
    "scientificName": "Trichodesmium lacustre",
    "authority": "Kleb."
  },
  {
    "scientificName": "Trichormus catenula",
    "authority": "(K\u00fctz. ex Bornet & Flahault) Kom\u00e1rek & Anagn."
  },
  {
    "scientificName": "Trichormus variabilis",
    "authority": "(K\u00fctz. ex Bornet & Flahault) Kom\u00e1rek & Anagn."
  },
  {
    "scientificName": "Tychonema bornetii",
    "authority": "(Zukal) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Tychonema bourrellyi",
    "authority": "(J.W.G.Lund) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Tychonema exposirum",
    "authority": "(Skuja) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Tychonema tenue",
    "authority": "(Skuja) Anagn. & Kom\u00e1rek"
  },
  {
    "scientificName": "Ulothrix flacca",
    "authority": "(Dillwyn) Thur. in Le Jol."
  },
  {
    "scientificName": "Ulothrix implexa",
    "authority": "(K\u00fctz.) K\u00fctz."
  },
  {
    "scientificName": "Ulothrix oscillarina",
    "authority": "K\u00fctz."
  },
  {
    "scientificName": "Ulothrix speciosa",
    "authority": "(Carmich.) K\u00fctz."
  },
  {
    "scientificName": "Ulothrix subflaccida",
    "authority": "Wille"
  },
  {
    "scientificName": "Ulothrix tenerrima",
    "authority": "(K\u00fctz.) K\u00fctz."
  },
  {
    "scientificName": "Ulothrix tenuissima",
    "authority": "K\u00fctz."
  },
  {
    "scientificName": "Ulothrix zonata",
    "authority": "(F.Weber & D.Mohr) K\u00fctz."
  },
  {
    "scientificName": "Ulvella lens",
    "authority": "P.Crouan & H.Crouan"
  },
  {
    "scientificName": "Urospora bangioides",
    "authority": "(Harv.) Holmes & Batters"
  },
  {
    "scientificName": "Urospora neglecta",
    "authority": "(Kornmann) Lokhorst & Trask"
  },
  {
    "scientificName": "Urospora penicilliformis",
    "authority": "(Roth) Aresch."
  },
  {
    "scientificName": "Urospora wormskioldii",
    "authority": "(Mertens ex Hornem.) Rosenv."
  },
  {
    "scientificName": "Vaucheria aversa",
    "authority": "Hassall"
  },
  {
    "scientificName": "Vaucheria borealis",
    "authority": "Hirn"
  },
  {
    "scientificName": "Vaucheria frigida",
    "authority": "(Roth) C.Agardh"
  },
  {
    "scientificName": "Vaucheria intermedia",
    "authority": "Nordst."
  },
  {
    "scientificName": "Vaucheria islandica",
    "authority": "(B\u00f8rgesen) Cedergr."
  },
  {
    "scientificName": "Vaucheria litorea",
    "authority": "C.Agardh"
  },
  {
    "scientificName": "Vaucheria medusa",
    "authority": "T.A.Chr."
  },
  {
    "scientificName": "Vaucheria mulleola",
    "authority": "Skuja"
  },
  {
    "scientificName": "Vaucheria sescuplicaria",
    "authority": "T.A.Chr."
  },
  {
    "scientificName": "Vaucheria walzii",
    "authority": "Rothert"
  },
  {
    "scientificName": "Volvox aureus",
    "authority": "Ehrenb."
  },
  {
    "scientificName": "Volvox globator",
    "authority": "Linnaeus"
  },
  {
    "scientificName": "Volvox tertius",
    "authority": "Meyer"
  },
  {
    "scientificName": "Warnowia parva",
    "authority": "(Lohmann) Lindemann, 1928"
  },
  {
    "scientificName": "Warnowia polyphemus",
    "authority": "(Pouchet) Schiller, 1933"
  },
  {
    "scientificName": "Warnowia rosea",
    "authority": "(Pouchet) Kofoid & Swezy, 1921"
  },
  {
    "scientificName": "Westella botryoides",
    "authority": "(W. West) De Wild."
  },
  {
    "scientificName": "Westella linearis",
    "authority": "G.M. Sm."
  },
  {
    "scientificName": "Willea irregularis",
    "authority": "(Wille) Schmidle"
  },
  {
    "scientificName": "Willea vilhelmii",
    "authority": "(Fott) Kom\u00e1rek"
  },
  {
    "scientificName": "Woloszynskia coronata",
    "authority": "R.H. Thomps."
  },
  {
    "scientificName": "Woloszynskia halophila",
    "authority": "(Biecheler) Elbr\u00e4chter & Kremp, 2005"
  },
  {
    "scientificName": "Woronichinia compacta",
    "authority": "(Lemmerm.) Kom\u00e1rek & Hind\u00e1k"
  },
  {
    "scientificName": "Woronichinia delicatula",
    "authority": "(Skuja) Kom\u00e1rek & Hind\u00e1k"
  },
  {
    "scientificName": "Woronichinia elorantae",
    "authority": "Kom\u00e1rek & Kom\u00e1rk.-Legn."
  },
  {
    "scientificName": "Woronichinia fusca",
    "authority": "(Skuja) Kom\u00e1rek & Hind\u00e1k"
  },
  {
    "scientificName": "Woronichinia karelica",
    "authority": "Kom\u00e1rek & Kom\u00e1rk.-Legn."
  },
  {
    "scientificName": "Woronichinia naegeliana",
    "authority": "(Unger) Elenkin"
  },
  {
    "scientificName": "Xanthidium antilopaeum",
    "authority": "(Br\u00e9b.) K\u00fctz."
  },
  {
    "scientificName": "Xanthidium armatum",
    "authority": "Rabenh. ex Ralfs"
  },
  {
    "scientificName": "Xanthidium concinnum",
    "authority": "W. Archer"
  },
  {
    "scientificName": "Xanthidium cristatum",
    "authority": "Br\u00e9b. ex Ralfs"
  },
  {
    "scientificName": "Xanthidium octocorne",
    "authority": "Ehrenb. ex Ralfs, 1848"
  },
  {
    "scientificName": "Xanthidium subhastiferum",
    "authority": "W. West"
  },
  {
    "scientificName": "Xanthidium tetracentrotum",
    "authority": "Wolle"
  },
  {
    "scientificName": "Xenococcus minimus",
    "authority": "Geitler"
  },
  {
    "scientificName": "Xenococcus schousboei",
    "authority": "Thur."
  },
  {
    "scientificName": "Xenotholos kerneri",
    "authority": "(Hansg.) Gold-Morgan, Montejano & Kom\u00e1rek"
  },
  {
    "scientificName": "Xenotholos starmachi",
    "authority": "(Geitler) Gold-Morgan, Montejano & Kom\u00e1rek"
  },
  {
    "scientificName": "Zygabikodinium lenticulatum",
    "authority": "Loeblich Jr & Loeblich III, 1970"
  },
  {
    "scientificName": "Zygnema conspicuum",
    "authority": "(Hassall) Transeau"
  },
  {
    "scientificName": "Zygnema cruciatum",
    "authority": "(Vaucher) C.Agardh"
  },
  {
    "scientificName": "Zygnema cyanosporum",
    "authority": "Cleve"
  },
  {
    "scientificName": "Zygnema decussatum",
    "authority": "(Vaucher) C.Agardh"
  },
  {
    "scientificName": "Zygnema melanosporum",
    "authority": "Lagerh."
  },
  {
    "scientificName": "Zygnema pectinatum",
    "authority": "(Vaucher) C.Agardh"
  },
  {
    "scientificName": "Zygnema peliosporum",
    "authority": "Wittr."
  },
  {
    "scientificName": "Zygnema stellinum",
    "authority": "(Vaucher) C.Agardh"
  },
  {
    "scientificName": "Zygnema tenue",
    "authority": "K\u00fctz."
  },
  {
    "scientificName": "Zygnema vaginatum",
    "authority": "G.A.Klebs"
  },
  {
    "scientificName": "Zygnemopsis spiralis",
    "authority": "(F.E.Fritsch) Transeau"
  },
  {
    "scientificName": "Zygogonium ericetorum",
    "authority": "K\u00fctz."
  }
].map(t => Object.assign(t, {'thumbnail': `${t.scientificName}.jpg`}));


export default { title: 'Taxon List' };

export const basic = () => (
  <TaxonList data={data} />
);

export const grouped = () => (
  <GroupedTaxonList data={data} />
);
