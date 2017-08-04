/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Revue 02/08 - Testé.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var outils_1 = __webpack_require__(1);
var Unite;
(function (Unite) {
    Unite[Unite["un"] = 0] = "un";
})(Unite = exports.Unite || (exports.Unite = {}));
// Types formats JSON : FormatX par convention
// Format ::= { (etiquette : Format)*} | { [x : string] : Format }
// Modèle générique d'une enveloppe d'un document JSON
// TEX : type de sortie (souvent format JSON en lecture seulement)
// TIN : type d'entrée pour l'état en format JSON ou non (confiné, permettant des modifications)
// E : étiquettes utiles pour une représentation (cf. méthode net)
// La différence entre TIN et TEX permet de gérer la mutabilité et la visibilité de la structure 
//   de données, souvent au format JSON.
// Une fonction de conversion de TIN ves TEX est requise.
var Enveloppe = (function () {
    function Enveloppe(inEnEx, etat) {
        this.etat = etat;
        this.inEnEx = inEnEx;
    }
    ;
    Enveloppe.prototype.ex = function () {
        return this.inEnEx(this.etat);
    };
    // transformation brute du json de type TIN en string
    Enveloppe.prototype.brut = function () {
        return JSON.stringify(this.etat);
    };
    ;
    return Enveloppe;
}());
exports.Enveloppe = Enveloppe;
var ModuleTable = (function () {
    function ModuleTable() {
    }
    ModuleTable.prototype.pourChaque = function (f, t) {
        for (var c_1 in t.table) {
            f(c_1, t.table[c_1], t.table);
        }
    };
    ModuleTable.prototype.valeur = function (t, cle) {
        return t.table[cle];
    };
    ModuleTable.prototype.contient = function (t, cle) {
        if (t.table[cle]) {
            return true;
        }
        return false;
        ;
    };
    ModuleTable.prototype.image = function (t) {
        var tab = [];
        this.pourChaque(function (c, v) {
            tab.push(v);
        }, t);
        return tab;
    };
    ModuleTable.prototype.domaine = function (t) {
        var tab = [];
        this.pourChaque(function (c, v) {
            tab.push(c);
        }, t);
        return tab;
    };
    ModuleTable.prototype.taille = function (t) {
        var n = 0;
        this.pourChaque(function (c, v) {
            n++;
        }, t);
        return n;
    };
    ModuleTable.prototype.foncteur = function (t, f) {
        var r = {};
        this.pourChaque(function (c, v) {
            r[c] = f(v);
        }, t);
        return r;
    };
    ModuleTable.prototype.selectionCle = function (t) {
        // sélection d'une clé
        for (var c_2 in t.table) {
            return c_2;
        }
        throw new Error("[Exception : selectionCle() non défini.]");
    };
    ModuleTable.prototype.ajouter = function (t, cle, x) {
        t.table[cle] = x;
    };
    ModuleTable.prototype.retirer = function (t, cle) {
        delete t.table[cle];
    };
    return ModuleTable;
}());
exports.ModuleTable = ModuleTable;
exports.MODULE_TABLE = new ModuleTable();
function conversionFormatTable(conv) {
    return (function (t) {
        var r = {};
        exports.MODULE_TABLE.pourChaque(function (c, v) {
            r[c] = conv(v);
        }, t);
        return { table: r };
    });
}
exports.conversionFormatTable = conversionFormatTable;
var TableImmutable = (function (_super) {
    __extends(TableImmutable, _super);
    function TableImmutable(etat) {
        return _super.call(this, function (x) { return x; }, etat) || this;
    }
    TableImmutable.prototype.net = function (e) {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'domaine': return this.domaine().toString();
            case 'image': return this.image().map(function (v, i, t) { return JSON.stringify(v); }).toString();
            case 'graphe': return this.brut();
        }
        return outils_1.jamais(e);
    };
    TableImmutable.prototype.representer = function () {
        return this.net('graphe');
    };
    TableImmutable.prototype.image = function () {
        return exports.MODULE_TABLE.image(this.ex());
    };
    TableImmutable.prototype.domaine = function () {
        return exports.MODULE_TABLE.domaine(this.ex());
    };
    TableImmutable.prototype.taille = function () {
        return exports.MODULE_TABLE.taille(this.ex());
    };
    TableImmutable.prototype.foncteur = function (f) {
        return creerTableImmutable({ table: exports.MODULE_TABLE.foncteur(this.ex(), f) });
    };
    return TableImmutable;
}(Enveloppe));
exports.TableImmutable = TableImmutable;
function creerTableImmutable(t) {
    return new TableImmutable(t);
}
exports.creerTableImmutable = creerTableImmutable;
var Table = (function (_super) {
    __extends(Table, _super);
    function Table(valInVersEx, etat) {
        return _super.call(this, conversionFormatTable(valInVersEx), etat) || this;
    }
    Table.prototype.net = function (e) {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'domaine': return this.domaine().toString();
            case 'image': return this.image().map(function (v, i, t) { return JSON.stringify(v); }).toString();
            case 'graphe': return this.brut();
        }
        return outils_1.jamais(e);
    };
    Table.prototype.representer = function () {
        return this.net('graphe');
    };
    Table.prototype.image = function () {
        return exports.MODULE_TABLE.image(this.ex());
    };
    Table.prototype.domaine = function () {
        return exports.MODULE_TABLE.domaine(this.etat);
    };
    Table.prototype.selectionCle = function () {
        return exports.MODULE_TABLE.selectionCle(this.etat);
    };
    Table.prototype.taille = function () {
        return exports.MODULE_TABLE.taille(this.etat);
    };
    Table.prototype.estVide = function () {
        return this.taille() === 0;
    };
    Table.prototype.ajouter = function (cle, x) {
        exports.MODULE_TABLE.ajouter(this.etat, cle, x);
    };
    Table.prototype.retirer = function (cle) {
        exports.MODULE_TABLE.retirer(this.etat, cle);
    };
    return Table;
}(Enveloppe));
exports.Table = Table;
function creerTableVide(valInVersEx) {
    return new Table(valInVersEx, { table: {}, mutable: Unite.un });
}
exports.creerTableVide = creerTableVide;
var IdentificationParCompteur = (function () {
    function IdentificationParCompteur(prefixe) {
        this.prefixe = prefixe;
        this.compteur = 0;
    }
    IdentificationParCompteur.prototype.identifier = function (s) {
        var id = this.prefixe + this.compteur;
        this.compteur++;
        return { val: id, sorte: s };
    };
    return IdentificationParCompteur;
}());
exports.IdentificationParCompteur = IdentificationParCompteur;
function creerIdentificationParCompteur(prefixe) {
    return new IdentificationParCompteur(prefixe);
}
exports.creerIdentificationParCompteur = creerIdentificationParCompteur;
/*
* Table utilisant des identificateurs comme clé.
* Remarque : les tables précédentes fondées sur les tables en JSON utilisent nécessdairemetn le type string pour les clés.
*/
var TableIdentification = (function (_super) {
    __extends(TableIdentification, _super);
    function TableIdentification(sorte, valInVersEx, pop) {
        if (pop === void 0) { pop = { table: {} }; }
        var _this = _super.call(this, conversionFormatTable(valInVersEx), { table: pop.table, mutable: Unite.un }) || this;
        _this.sorte = sorte;
        return _this;
    }
    TableIdentification.prototype.net = function (e) {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'domaine': return this.domaine().map(function (v, i, t) { return JSON.stringify(v); }).toString();
            case 'image': return this.image().map(function (v, i, t) { return JSON.stringify(v); }).toString();
            case 'graphe': return JSON.stringify(this.ex().table);
        }
        return outils_1.jamais(e);
    };
    TableIdentification.prototype.representer = function () {
        return this.net('graphe');
    };
    TableIdentification.prototype.valeurIN = function (ID_sorte) {
        return exports.MODULE_TABLE.valeur(this.etat, ID_sorte.val);
    };
    TableIdentification.prototype.valeur = function (ID_sorte) {
        return exports.MODULE_TABLE.valeur(this.ex(), ID_sorte.val);
    };
    TableIdentification.prototype.contient = function (ID_sorte) {
        return exports.MODULE_TABLE.contient(this.ex(), ID_sorte.val);
    };
    TableIdentification.prototype.image = function () {
        return exports.MODULE_TABLE.image(this.ex());
    };
    TableIdentification.prototype.domaine = function () {
        var _this = this;
        return exports.MODULE_TABLE.domaine(this.ex()).
            map(function (s) { return { val: s, sorte: _this.sorte }; });
    };
    TableIdentification.prototype.selectionCle = function () {
        return {
            val: exports.MODULE_TABLE.selectionCle(this.etat),
            sorte: this.sorte
        };
    };
    TableIdentification.prototype.taille = function () {
        return exports.MODULE_TABLE.taille(this.etat);
    };
    TableIdentification.prototype.estVide = function () {
        return this.taille() === 0;
    };
    TableIdentification.prototype.ajouter = function (ID_sorte, x) {
        exports.MODULE_TABLE.ajouter(this.etat, ID_sorte.val, x);
    };
    TableIdentification.prototype.retirer = function (ID_sorte) {
        exports.MODULE_TABLE.retirer(this.etat, ID_sorte.val);
    };
    return TableIdentification;
}(Enveloppe));
exports.TableIdentification = TableIdentification;
function creerTableIdentificationVide(sorte, valInVersEx) {
    return new TableIdentification(sorte, valInVersEx);
}
exports.creerTableIdentificationVide = creerTableIdentificationVide;
function creerTableIdentification(sorte, valInVersEx, pop) {
    return new TableIdentification(sorte, valInVersEx, pop);
}
exports.creerTableIdentification = creerTableIdentification;
//# sourceMappingURL=types.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function dateFr(d) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return (new Date(d)).toLocaleString("fr-FR", options);
}
exports.dateFr = dateFr;
function dateFrLog(d) {
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return (new Date(d)).toLocaleString("fr-FR", options);
}
exports.dateFrLog = dateFrLog;
function jamais(x) {
    throw new Error("* Erreur impossible : " + x);
}
exports.jamais = jamais;
//# sourceMappingURL=outils.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function recupererElementHTML(id) {
    var r = document.getElementById(id);
    if (typeof r === "undefined") {
        throw new Error("[Erreur : elementParId(" + id + ") non d\u00E9fini.]");
    }
    return r;
}
function elementParId(id) {
    return recupererElementHTML(id);
}
exports.elementParId = elementParId;
function entreeParId(id) {
    return recupererElementHTML(id);
}
exports.entreeParId = entreeParId;
function recupererEntree(id) {
    return entreeParId(id).value;
}
exports.recupererEntree = recupererEntree;
function initialiserEntree(id, val) {
    entreeParId(id).value = val;
}
exports.initialiserEntree = initialiserEntree;
function initialiserDocument(contenu) {
    document.write(contenu);
}
exports.initialiserDocument = initialiserDocument;
function contenuBalise(champ) {
    var r = recupererElementHTML(champ);
    return r.innerHTML;
}
exports.contenuBalise = contenuBalise;
function poster(id, val) {
    var r = recupererElementHTML(id);
    r.innerHTML += val;
}
exports.poster = poster;
function posterNL(id, val) {
    poster(id, val + "<br>");
}
exports.posterNL = posterNL;
function gererEvenementDocument(type, gestionnaire) {
    console.log("- Document : enregistrement d'un gestionnaire pour l'événement " + type);
    document.addEventListener(type, gestionnaire);
}
exports.gererEvenementDocument = gererEvenementDocument;
function gererEvenementElement(id, type, gestionnaire) {
    var r = recupererElementHTML(id);
    r.addEventListener(type, gestionnaire);
}
exports.gererEvenementElement = gererEvenementElement;
function elementSaisieEnvoi(idSaisie, idBoutonEnvoi, msg) {
    return '<input type="text" id="' + idSaisie + '">'
        + '<input class="button" type="button" id="' + idBoutonEnvoi + '" value="' + msg + '" >';
}
exports.elementSaisieEnvoi = elementSaisieEnvoi;
//# sourceMappingURL=vueClient.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var CanalClient = (function () {
    function CanalClient(adresse) {
        this.adresse = adresse;
        this.lienServeur = new WebSocket('ws://' + this.adresse, 'echo-protocol');
    }
    ;
    // Effet : send(String)
    CanalClient.prototype.envoyerMessage = function (msg) {
        this.lienServeur.send(msg.brut());
    };
    ;
    // Effet: enregistrement comme écouteur
    CanalClient.prototype.enregistrerTraitementMessageRecu = function (traitement) {
        this.lienServeur.addEventListener("message", function (e) {
            var msg = JSON.parse(e.data);
            if (msg.configurationInitiale !== undefined) {
                return;
            }
            if (msg.erreurRedhibitoire !== undefined) {
                return;
            }
            traitement(msg);
        });
    };
    ;
    // Effet: enregistrement comme écouteur
    CanalClient.prototype.enregistrerTraitementConfigurationRecue = function (traitement) {
        this.lienServeur.addEventListener("message", function (e) {
            var contenuJSON = JSON.parse(e.data);
            if (contenuJSON.configurationInitiale === undefined) {
                return;
            }
            traitement(contenuJSON);
        });
    };
    ;
    // Effet: enregistrement comme écouteur
    CanalClient.prototype.enregistrerTraitementErreurRecue = function (traitement) {
        this.lienServeur.addEventListener("message", function (e) {
            var contenuJSON = JSON.parse(e.data);
            if (contenuJSON.erreurRedhibitoire === undefined) {
                return;
            }
            traitement(contenuJSON);
        });
    };
    ;
    return CanalClient;
}());
exports.CanalClient = CanalClient;
;
function creerCanalClient(adresse) {
    return new CanalClient(adresse);
}
exports.creerCanalClient = creerCanalClient;
//# sourceMappingURL=client.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var types_1 = __webpack_require__(0);
;
var Message = (function (_super) {
    __extends(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Message;
}(types_1.Enveloppe));
exports.Message = Message;
var Configuration = (function (_super) {
    __extends(Configuration, _super);
    function Configuration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Configuration;
}(types_1.Enveloppe));
exports.Configuration = Configuration;
var ErreurRedhibitoire = (function (_super) {
    __extends(ErreurRedhibitoire, _super);
    function ErreurRedhibitoire() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ErreurRedhibitoire;
}(types_1.Enveloppe));
exports.ErreurRedhibitoire = ErreurRedhibitoire;
/*
- réseau ::= noeud*
- noeud ::= (sommet, sommet*)
- sommet ::= {identifiant, ...}

- Serveur : agrégation d'un réseau
- Client : agrégation d'un noeud du réseau

- Remarque : compatibilité ES3 pour les objets.
*/
// - sommet ::= {identifiant, ...}
// La sorte pour les identifiants de sommets est 'sommet'. 
var Sommet = (function (_super) {
    __extends(Sommet, _super);
    function Sommet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Sommet;
}(types_1.Enveloppe));
exports.Sommet = Sommet;
// - réseau ::= noeud*
// Hypothèse : le réseau ne modifie ni les sommets ni les neouds. 
//   Conséquence : un seul format est utilisé, pour les sommets et pour les noeuds respectivement.
var Reseau = (function (_super) {
    __extends(Reseau, _super);
    function Reseau() {
        return _super.call(this, 'sommet', function (x) { return x; }) || this;
    }
    Reseau.prototype.representer = function () {
        return "réseau de " + this.net('taille') + " noeuds : "
            + this.net('graphe');
    };
    // (simple renommmage)
    Reseau.prototype.possedeNoeud = function (ID_sommet) {
        return this.contient(ID_sommet);
    };
    // Précondition : id1 et id2 sont deux noeuds du réseau.
    Reseau.prototype.sontVoisins = function (ID_sommet1, ID_sommet2) {
        return types_1.MODULE_TABLE.contient(this.valeurIN(ID_sommet1).voisins, ID_sommet2.val);
    };
    Reseau.prototype.ajouterNoeud = function (n) {
        this.ajouter(n.centre.ID, n);
    };
    Reseau.prototype.retirerNoeud = function (n) {
        this.retirer(n.centre.ID);
    };
    return Reseau;
}(types_1.TableIdentification));
exports.Reseau = Reseau;
function creerReseauVide() {
    return new Reseau();
}
exports.creerReseauVide = creerReseauVide;
function conversionFormatNoeud(n) {
    return { centre: n.centre, voisins: types_1.conversionFormatTable(function (s) { return s; })(n.voisins) };
}
var NoeudIN = (function (_super) {
    __extends(NoeudIN, _super);
    function NoeudIN(etat) {
        return _super.call(this, conversionFormatNoeud, etat) || this;
    }
    NoeudIN.prototype.aPourVoisin = function (ID_sommet) {
        return types_1.MODULE_TABLE.contient(this.etat.voisins, ID_sommet.val);
    };
    NoeudIN.prototype.ajouterVoisin = function (v) {
        return types_1.MODULE_TABLE.ajouter(this.etat.voisins, v.ID.val, v);
    };
    return NoeudIN;
}(types_1.Enveloppe));
exports.NoeudIN = NoeudIN;
var NoeudEX = (function (_super) {
    __extends(NoeudEX, _super);
    function NoeudEX(etat) {
        return _super.call(this, conversionFormatNoeud, etat) || this;
    }
    NoeudEX.prototype.aPourVoisin = function (ID_sommet) {
        return types_1.MODULE_TABLE.contient(this.etat.voisins, ID_sommet.val);
    };
    NoeudEX.prototype.foncteurProceduralSurVoisins = function (proc) {
        types_1.MODULE_TABLE.pourChaque(function (c, v) {
            proc(v);
        }, this.etat.voisins);
    };
    return NoeudEX;
}(types_1.Enveloppe));
exports.NoeudEX = NoeudEX;
var AssemblageReseauEnAnneau = (function () {
    function AssemblageReseauEnAnneau(taille, fabriqueNoeud) {
        this.fabriqueNoeud = fabriqueNoeud;
        console.log("* Construction d'un réseau en anneau de " + taille + " éléments.");
        this.sommets = [];
        this.taille = taille;
    }
    AssemblageReseauEnAnneau.prototype.ajouterSommet = function (s) {
        if (this.sommets.length < this.taille) {
            this.sommets.push(s);
        }
        else {
            console.log("- Impossible d'ajouter un sommet : le réseau en anneau est complet.");
        }
    };
    AssemblageReseauEnAnneau.prototype.assembler = function () {
        var _this = this;
        var restant = this.taille - this.sommets.length;
        if (restant > 0) {
            console.log("- Impossible d'assembler un réseau en anneau de la taille donnée : ajouter " + restant + " sommets.");
            throw new Error("[Exception : AssemblageReseau.assembler non défini.]");
        }
        // Définition du réseau
        var reseau = creerReseauVide();
        this.sommets.forEach(function (s, i, tab) {
            var n = _this.fabriqueNoeud({ centre: s, voisins: { table: {}, mutable: types_1.Unite.un } });
            n.ajouterVoisin(tab[(i + 1) % _this.taille]);
            n.ajouterVoisin(tab[(i + (_this.taille - 1)) % _this.taille]);
            reseau.ajouterNoeud(n.ex());
        });
        return reseau;
    };
    return AssemblageReseauEnAnneau;
}());
exports.AssemblageReseauEnAnneau = AssemblageReseauEnAnneau;
function creerAssemblageReseauEnAnneau(taille, fabriqueNoeud) {
    return new AssemblageReseauEnAnneau(taille, fabriqueNoeud);
}
exports.creerAssemblageReseauEnAnneau = creerAssemblageReseauEnAnneau;
//# sourceMappingURL=communication.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var types_1 = __webpack_require__(0);
var vueClient_1 = __webpack_require__(2);
var client_1 = __webpack_require__(3);
var tchat_1 = __webpack_require__(6);
console.log("* Chargement du script");
var adresseServeur = tchat_1.hote + ":" + tchat_1.port2;
// A initialiser
var canal;
var noeud;
function envoyerMessage(texte, ID_destinataire) {
    var msg = tchat_1.creerMessageCommunication(noeud.ex().centre.ID, ID_destinataire, texte);
    console.log("- Envoi du message brut : " + msg.brut());
    console.log("- Envoi du message net : " + msg.representer());
    canal.envoyerMessage(msg);
}
// A exécuter après chargement de la page
// - pas d'interruption de la fonction
function initialisation() {
    console.log("* Initialisation après chargement du DOM");
    console.log("- du canal de communication avec le serveur d'adresse " + adresseServeur);
    canal = client_1.creerCanalClient(adresseServeur);
    console.log("- du traitement des messages");
    canal.enregistrerTraitementMessageRecu(function (m) {
        var msg = new tchat_1.MessageTchat(m);
        console.log("* Réception");
        console.log("- du message brut : " + msg.brut());
        console.log("- du message net : " + msg.representer());
        vueClient_1.posterNL('logChats', msg.representer());
    });
    console.log("- du traitement de la configuration");
    canal.enregistrerTraitementConfigurationRecue(function (c) {
        var config = tchat_1.creerConfigurationTchat(c);
        console.log("* Réception");
        console.log("- de la configuration brute : " + config.brut());
        console.log("- de la configuration nette : " + config.representer());
        console.log("* Initialisation du noeud du réseau");
        noeud = tchat_1.creerNoeudTchatEX(tchat_1.decomposerConfiguration(config));
        voir();
    });
    console.log("- du traitement d'une erreur rédhibitoire");
    canal.enregistrerTraitementErreurRecue(function (err) {
        var erreur = tchat_1.creerErreurTchat(err);
        console.log("* Réception");
        console.log("- de l'erreur rédhibitoire brute : " + erreur.brut());
        console.log("- de l'erreur rédhibitoire nette : " + erreur.representer());
        console.log("* Initialisation du document");
        vueClient_1.initialiserDocument(erreur.representer());
    });
}
function voir() {
    console.log("* Consolidation de la vue");
    console.log("- adresse, centre, voisins");
    vueClient_1.poster("adresseServeur", adresseServeur);
    vueClient_1.poster("centre", tchat_1.creerSommetTchat(noeud.ex().centre).representer());
    vueClient_1.poster("voisins", types_1.creerTableImmutable(noeud.ex().voisins).representer());
    console.log("- formulaire");
    var contenuFormulaire = "";
    noeud.foncteurProceduralSurVoisins(function (v) {
        var ID_v = v.ID;
        vueClient_1.poster("formulaire", vueClient_1.elementSaisieEnvoi("message_" + ID_v.val, "boutonEnvoi_" + ID_v.val, "Envoyer un message à " + tchat_1.creerSommetTchat(v).representer() + "."));
    });
    var type = "click";
    noeud.foncteurProceduralSurVoisins(function (v) {
        var ID_v = v.ID;
        console.log("- Element " + ID_v.val + " : enregistrement d'un gestionnaire pour l'événement " + type);
        vueClient_1.gererEvenementElement("boutonEnvoi_" + ID_v.val, type, function (e) {
            var entree = vueClient_1.recupererEntree("message_" + ID_v.val);
            vueClient_1.initialiserEntree("message_" + ID_v.val, "");
            console.log("* Entree : " + entree);
            envoyerMessage(entree, ID_v);
        });
    });
    /*
      <input type="text" id="message_id1">
      <input class="button" type="button" id="boutonEnvoi_id1" value="Envoyer un message à {{nom id1}}."
         onClick="envoyerMessage(this.form.message.value, "id1")">
    */
}
// Gestion des événements pour le document
console.log("* Enregistrement de l'initialisation au chargement");
vueClient_1.gererEvenementDocument('DOMContentLoaded', initialisation);
/*
<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', initialisation());
</script>

*/
//# sourceMappingURL=clientTchat.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var communication_1 = __webpack_require__(4);
var types_1 = __webpack_require__(0);
var outils_1 = __webpack_require__(1);
exports.hote = "merite"; // hôte local via TCP/IP - DNS : cf. /etc/hosts - IP : 127.0.0.1
exports.port1 = 3000; // port de la essource 1 (serveur d'applications)
exports.port2 = 1110; // port de la ressouce 2 (serveur de connexions)
// La structure JSON décrivant le sommet est en lecture seulement. 
var SommetTchat = (function (_super) {
    __extends(SommetTchat, _super);
    function SommetTchat(etat) {
        return _super.call(this, function (x) { return x; }, etat) || this;
    }
    SommetTchat.prototype.net = function (e) {
        var s = this.ex();
        switch (e) {
            case 'nom': return s.pseudo;
            case 'ID': return s.ID.val;
        }
        return outils_1.jamais(e);
    };
    SommetTchat.prototype.representer = function () {
        return this.net('nom') + " (" + this.net('ID') + ")";
    };
    return SommetTchat;
}(communication_1.Sommet));
exports.SommetTchat = SommetTchat;
function creerSommetTchat(s) {
    return new SommetTchat(s);
}
exports.creerSommetTchat = creerSommetTchat;
var NoeudTchatIN = (function (_super) {
    __extends(NoeudTchatIN, _super);
    function NoeudTchatIN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoeudTchatIN.prototype.net = function (e) {
        var s = this.ex();
        switch (e) {
            case 'centre': return creerSommetTchat(s.centre).representer();
            case 'voisins':
                return types_1.creerTableImmutable(s.voisins).representer();
        }
        return outils_1.jamais(e);
    };
    NoeudTchatIN.prototype.representer = function () {
        return "(centre : " + this.net('centre') + " ; voisins : " + this.net('voisins') + ")";
    };
    return NoeudTchatIN;
}(communication_1.NoeudIN));
exports.NoeudTchatIN = NoeudTchatIN;
function creerNoeudTchatIN(n) {
    return new NoeudTchatIN(n);
}
exports.creerNoeudTchatIN = creerNoeudTchatIN;
var NoeudTchatEX = (function (_super) {
    __extends(NoeudTchatEX, _super);
    function NoeudTchatEX() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoeudTchatEX.prototype.net = function (e) {
        var s = this.ex();
        switch (e) {
            case 'centre': return creerSommetTchat(s.centre).representer();
            case 'voisins':
                return types_1.creerTableImmutable(s.voisins).representer();
        }
        return outils_1.jamais(e);
    };
    NoeudTchatEX.prototype.representer = function () {
        return "(centre : " + this.net('centre') + " ; voisins : " + this.net('voisins') + ")";
    };
    return NoeudTchatEX;
}(communication_1.NoeudEX));
exports.NoeudTchatEX = NoeudTchatEX;
function creerNoeudTchatEX(n) {
    return new NoeudTchatEX(n);
}
exports.creerNoeudTchatEX = creerNoeudTchatEX;
var ReseauTchat = (function (_super) {
    __extends(ReseauTchat, _super);
    function ReseauTchat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ReseauTchat;
}(communication_1.Reseau));
exports.ReseauTchat = ReseauTchat;
var TypeMessageTchat;
(function (TypeMessageTchat) {
    TypeMessageTchat[TypeMessageTchat["COM"] = 0] = "COM";
    TypeMessageTchat[TypeMessageTchat["TRANSIT"] = 1] = "TRANSIT";
    TypeMessageTchat[TypeMessageTchat["AR"] = 2] = "AR";
    TypeMessageTchat[TypeMessageTchat["ERREUR_CONNEXION"] = 3] = "ERREUR_CONNEXION";
    TypeMessageTchat[TypeMessageTchat["ERREUR_EMET"] = 4] = "ERREUR_EMET";
    TypeMessageTchat[TypeMessageTchat["ERREUR_DEST"] = 5] = "ERREUR_DEST";
    TypeMessageTchat[TypeMessageTchat["ERREUR_TYPE"] = 6] = "ERREUR_TYPE";
    TypeMessageTchat[TypeMessageTchat["INTERDICTION"] = 7] = "INTERDICTION";
})(TypeMessageTchat = exports.TypeMessageTchat || (exports.TypeMessageTchat = {}));
// Structure immutable
var MessageTchat = (function (_super) {
    __extends(MessageTchat, _super);
    function MessageTchat(etat) {
        return _super.call(this, function (x) { return x; }, etat) || this;
    }
    MessageTchat.prototype.net = function (e) {
        var msg = this.ex();
        switch (e) {
            case 'type': return TypeMessageTchat[msg.type];
            case 'date': return outils_1.dateFr(msg.date);
            case 'ID_de': return msg.ID_emetteur.val;
            case 'ID_à': return msg.ID_destinataire.val;
            case 'contenu': return msg.contenu;
        }
        return outils_1.jamais(e);
    };
    MessageTchat.prototype.representer = function () {
        var dem = this.net('ID_de');
        var am = this.net('ID_à');
        var typem = this.net('type');
        var datem = this.net('date');
        var cm = this.net('contenu');
        return datem + ", de " + dem + " à " + am + " (" + typem + ") - " + cm;
    };
    MessageTchat.prototype.transit = function () {
        var msg = this.ex();
        return new MessageTchat({
            "ID_emetteur": msg.ID_emetteur,
            "ID_destinataire": msg.ID_destinataire,
            "type": TypeMessageTchat.TRANSIT,
            "contenu": msg.contenu,
            "date": msg.date
        });
    };
    MessageTchat.prototype.avecAccuseReception = function () {
        var msg = this.ex();
        return new MessageTchat({
            "ID_emetteur": msg.ID_emetteur,
            "ID_destinataire": msg.ID_destinataire,
            "type": TypeMessageTchat.AR,
            "contenu": msg.contenu,
            "date": msg.date
        });
    };
    return MessageTchat;
}(communication_1.Message));
exports.MessageTchat = MessageTchat;
function creerMessageErreurConnexion(idEmetteur, messageErreur) {
    return new MessageTchat({
        "ID_emetteur": idEmetteur,
        "ID_destinataire": idEmetteur,
        "type": TypeMessageTchat.ERREUR_CONNEXION,
        "contenu": messageErreur,
        "date": new Date()
    });
}
exports.creerMessageErreurConnexion = creerMessageErreurConnexion;
function creerMessageCommunication(idEmetteur, idDestinataire, texte) {
    return new MessageTchat({
        "ID_emetteur": idEmetteur,
        "ID_destinataire": idDestinataire,
        "type": TypeMessageTchat.COM,
        "contenu": texte,
        "date": new Date()
    });
}
exports.creerMessageCommunication = creerMessageCommunication;
function creerMessageRetourErreur(original, codeErreur, messageErreur) {
    return new MessageTchat({
        "ID_emetteur": original.ex().ID_emetteur,
        "ID_destinataire": original.ex().ID_destinataire,
        "type": codeErreur,
        "contenu": messageErreur,
        "date": original.ex().date
    });
}
exports.creerMessageRetourErreur = creerMessageRetourErreur;
var ConfigurationTchat = (function (_super) {
    __extends(ConfigurationTchat, _super);
    function ConfigurationTchat(c) {
        return _super.call(this, function (x) { return x; }, c) || this;
    }
    ConfigurationTchat.prototype.net = function (e) {
        var config = this.ex();
        switch (e) {
            case 'centre': return creerSommetTchat(config.centre).representer();
            case 'voisins': return types_1.creerTableImmutable(config.voisins).representer();
            case 'date': return outils_1.dateFr(config.date);
        }
        return outils_1.jamais(e);
    };
    ConfigurationTchat.prototype.representer = function () {
        var cc = this.net('centre');
        var vc = this.net('voisins');
        var dc = this.net('date');
        return "(centre : " + cc + " ; voisins : " + vc + ") créée " + dc;
    };
    return ConfigurationTchat;
}(communication_1.Configuration));
exports.ConfigurationTchat = ConfigurationTchat;
function creerConfigurationTchat(c) {
    return new ConfigurationTchat(c);
}
exports.creerConfigurationTchat = creerConfigurationTchat;
function composerConfigurationTchat(n, date) {
    return new ConfigurationTchat({
        "configurationInitiale": types_1.Unite.un,
        "centre": n.centre,
        "voisins": n.voisins,
        "date": date
    });
}
exports.composerConfigurationTchat = composerConfigurationTchat;
function decomposerConfiguration(c) {
    var centre = c.ex().centre;
    var voisins = c.ex().voisins;
    return { "centre": centre, "voisins": voisins };
}
exports.decomposerConfiguration = decomposerConfiguration;
var ErreurTchat = (function (_super) {
    __extends(ErreurTchat, _super);
    function ErreurTchat(err) {
        return _super.call(this, function (x) { return x; }, err) || this;
    }
    ErreurTchat.prototype.net = function (e) {
        var erreur = this.ex();
        switch (e) {
            case 'messageErreur': return erreur.messageErreur;
            case 'date': return outils_1.dateFr(erreur.date);
        }
        return outils_1.jamais(e);
    };
    ErreurTchat.prototype.representer = function () {
        return "[" + this.net('date') + " : " + this.net('messageErreur') + "]";
    };
    return ErreurTchat;
}(communication_1.ErreurRedhibitoire));
exports.ErreurTchat = ErreurTchat;
function creerErreurTchat(err) {
    return new ErreurTchat(err);
}
exports.creerErreurTchat = creerErreurTchat;
function composerErreurTchat(msg, date) {
    return new ErreurTchat({
        "erreurRedhibitoire": types_1.Unite.un,
        "messageErreur": msg,
        "date": date
    });
}
exports.composerErreurTchat = composerErreurTchat;
function creerAnneauTchat(noms) {
    var assembleur = communication_1.creerAssemblageReseauEnAnneau(noms.length, creerNoeudTchatIN);
    var identification = types_1.creerIdentificationParCompteur("S-");
    noms.forEach(function (nom, i, tab) {
        var s = { ID: identification.identifier('sommet'), pseudo: tab[i] };
        assembleur.ajouterSommet(s);
    });
    return assembleur.assembler();
}
exports.creerAnneauTchat = creerAnneauTchat;
//# sourceMappingURL=tchat.js.map

/***/ })
/******/ ]);