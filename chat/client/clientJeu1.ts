import { Individu, Message } from "./typesInterface";
import { Identifiant} from "../../bibliotheque/types/identifiant";
import { creerTableImmutable} from "../../bibliotheque/types/table";
import { CanalClient, creerCanalClient } from "../../bibliotheque/client/canalClient";


//TOOOODOOOOO selon Grall
/*import {
    elementParId, recupererEntree, initialiserEntree, contenuBalise, poster, posterNL,
    gererEvenementDocument, gererEvenementElement,
    elementSaisieEnvoi, initialiserDocument
} from "../../bibliotheque/vueClient"; TODO */

import {
    hote, port2,
    NoeudJeu1EnveloppeImmutable, creerNoeudJeu1Immutable,
    SommetJeu1, FormatSommetJeu1, creerSommetJeu1,
    FormatMessageJeu1, EtiquetteMessageJeu1, MessageJeu1,
    FormatConfigurationJeu1, EtiquetteConfigurationJeu1, creerConfigurationJeu1,
        decomposerConfiguration,        
    FormatErreurJeu1, EtiquetteErreurJeu1,
    ErreurJeu1, creerErreurJeu1,
    PopulationLocaleMutable, creerPopulationLocale, 
    Utilisateur, creerUtilisateur
} from '../commun/jeu1_commun';


console.log("* Chargement du script");

const adresseServeur: string = hote + ":" + port2;

type CanalJeu1 = CanalClient<
    FormatErreurJeu1, 
    FormatConfigurationJeu1, 
    FormatMessageJeu1, FormatMessageJeu1, EtiquetteMessageJeu1>;

// A initialiser
var canal: CanalJeu1;
var noeud: NoeudJeu1EnveloppeImmutable;
var population : PopulationLocaleMutable;
var utilisateur : Utilisateur;



function envoyerMessage(texte: string, destinataire: Identifiant<'sommet'>) {
    /*
    let msg: MessageJeu1 = creerMessageCommunication(noeud.centre().enJSON().id, destinataire, texte);
    console.log("- Envoi du message brut : " + msg.brut());
    console.log("- Envoi du message net : " + representerMessage(msg));
    canal.envoyerMessage(msg);
    */
}

// A exécuter après chargement de la page
// - pas d'interruption de la fonction
function initialisation(): void {
    console.log("* Initialisation après chargement du DOM");

    console.log("- du canal de communication avec le serveur d'adresse " + adresseServeur);
    canal = creerCanalClient(adresseServeur);

    console.log("- du traitement des messages");
    canal.enregistrerTraitementMessageRecu((m: FormatMessageJeu1) => {
        /*let msg = new MessageTchat(m);
        console.log("* Réception");
        console.log("- du message brut : " + msg.brut());
        console.log("- du message net : " + representerMessage(msg));
        posterNL('logChats', representerMessage(msg));
        */
    });

    console.log("- du traitement de la configuration");
    canal.enregistrerTraitementConfigurationRecue((c: FormatConfigurationJeu1) => {
        let config = creerConfigurationJeu1(c);
        console.log("* Réception");
        console.log("- de la configuration brute : " + config.brut());
        console.log("- de la configuration nette : " + config.representation());
        console.log("* Initialisation du noeud du réseau");
        let decConfig = decomposerConfiguration(config);
        //noeud = null; //creerNoeudJeu1Immutable(decConfig[0]);
        population = creerPopulationLocale(decConfig[1]);
        utilisateur = creerUtilisateur(decConfig[2]);
        voir();
    });

    console.log("- du traitement d'une erreur rédhibitoire");
    canal.enregistrerTraitementErreurRecue((err: FormatErreurJeu1) => {
        let erreur = creerErreurJeu1(err);
        console.log("* Réception");
        console.log("- de l'erreur rédhibitoire brute : " + erreur.brut());
        console.log("- de l'erreur rédhibitoire nette : " + erreur.representation());
        console.log("* Initialisation du document");
        //initialiserDocument(erreur.representation());
    });

}

function voir(): void {
    console.log("* Consolidation de la vue");
    console.log("- adresse, domaine, domaines voisins, utilisateur, autres utilisateurs du domaine");
    /*poster("adresseServeur", adresseServeur);
    poster("centre", creerSommetJeu1(noeud.val().centre).representation());
    poster("voisins", creerTableImmutable(noeud.val().voisins).representation());
    poster("utilisateur", utilisateur.representation());
    poster("utilisateursDomaine", population.representation());
    */
    /*
    console.log("- formulaire");
    let voisinsNoeud = noeud.voisins();
    let contenuFormulaire = "";
    for (let idV in voisinsNoeud) {
        poster("formulaire", elementSaisieEnvoi("message_" + idV, "boutonEnvoi_" + idV,
            "Envoyer un message à " + representerSommet(voisinsNoeud[idV]) + "."));
    }
    let type = "click";
    for (const idV in voisinsNoeud) {
        console.log("- Element " + idV + " : enregistrement d'un gestionnaire pour l'événement " + type);
        gererEvenementElement("boutonEnvoi_" + idV, type, e => {
            let entree = recupererEntree("message_" + idV);
            initialiserEntree("message_" + idV, "");
            console.log("* Entree : " + entree);
            envoyerMessage(entree, ID(idV));
        });
    }
    */
    /*
      <input type="text" id="message_id1"> 
      <input class="button" type="button" id="boutonEnvoi_id1" value="Envoyer un message à {{nom id1}}."
         onClick="envoyerMessage(this.form.message.value, "id1")">
    */

}

// Gestion des événements pour le document
console.log("* Enregistrement de l'initialisation au chargement");
//gererEvenementDocument('DOMContentLoaded', initialisation);
/*
<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', initialisation());
</script>

*/
