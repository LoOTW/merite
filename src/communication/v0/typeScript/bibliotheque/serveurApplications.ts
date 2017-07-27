import * as express from 'express';
import * as sysFichier from 'fs';

import {dateFrLog } from "./outils";

/*
Serveur utilisant Express
http://expressjs.com/en/api.html
*/

/*
Classe à développer
*/
export class Interaction {
    private _requete: express.Request;
    private _reponse: express.Response;
    private _suite: express.NextFunction;
    constructor(requete: express.Request, reponse: express.Response, suite: express.NextFunction) {
        this._requete = requete;
        this._reponse = reponse;
        this._suite = suite;
    }

    servirVueDynamiquement(prefixe: string, remplacement: { [cle: string]: string }): void {
        this._reponse.render(prefixe, remplacement);
    }

    servirFichier(chemin : string, fichier: string): void {
        let options = {
            root: chemin,
        };
        this._reponse.sendFile(fichier, options);
    }

    servirContenuSimple(contenu: string) {
        this._reponse.send(contenu);
    }
}

export class ServeurApplications {
    private appli: express.Application;
    private hote: string;
    private port: number;

    constructor(hote: string, port: number) {
        this.appli = express();
        this.hote = hote;
        this.port = port;
    }

    demarrer(): void {
        let ceServeur = this;
        this.appli.listen(this.port, this.hote, () => {
            console.log("* " + dateFrLog(new Date()) + " - Le serveur écoute le port " + this.port + " de l'hôte " + this.hote + ".");
        });
    }
    /*
    Les pages se terminant par suffixe sont paramétrées.
    Attention : le typage de la paramétrisation n'est pas vérifié.
    */
    definirParametrisationVuesDynamique(suffixe: string, rep: string, cles: string[]): void {
        this.appli.engine(suffixe,
            (chemin: string, remplacement: { [cle: string]: string },
                continuation: (err: NodeJS.ErrnoException, rendu?: string) => string) => {
                sysFichier.readFile(chemin, (err: NodeJS.ErrnoException, contenu: Buffer) => {
                    if (err) return continuation(err);
                    let rendu = contenu.toString();
                    cles.forEach((c: string, i: number, tab: string[]) => {
                        rendu = rendu.replace("#" + c + "#", remplacement[c]);
                    });
                    return continuation(null, rendu)
                });
            });
        this.appli.set('view engine', suffixe); // enregistre la paramétrisation
        this.appli.set('views', rep) // spécifie le répertoire des vues dynamiques
    }

    /*    specifierRepertoireVuesStatiques(rep : string) : void {
        TODO ???
    }*/

    specifierRepertoireScriptsEmbarques(rep: string): void {
        this.appli.use(express.static(rep)); // répertoire local visible
    }

    enregistrerReponseARequeteGET(chemin: string, calcul: (i: Interaction) => void): void {
        this.appli.get(chemin,
            (requete: express.Request, reponse: express.Response, suite: express.NextFunction) => {
                calcul(new Interaction(requete, reponse, suite));
            });
    }

}