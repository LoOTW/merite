import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { CanalClient, creerCanalClient } from '../bibliotheque/client';

// Material-UI
import Statistiques from '../routage/composants/Statistiques'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

import { hote, port2, messageConfiguration, MessageJeu1, messageAdmin, TypeMessageJeu1, FormatErreurJeu1, FormatConfigurationJeu1, FormatMessageJeu1, EtiquetteMessageJeu1 } from '../routage/commun/communRoutage';
import { FormatConfigurationChat } from '../chat/commun/configurationChat';
import { RaisedButton } from 'material-ui/RaisedButton';

import { Configuration } from './components/configuration'
import { TEXTE_ERREUR } from '../chat/client/couleur';
import { statistiques}from '../routage/client/clientRoutage'

const styles = {
    container: {
        display: 'flex' as 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'flex-start' as 'flex-start',
        alignContent: 'center' as 'center',
        position: 'absolute' as 'absolute',
        left: '0',
        right: '0'
    },
    appTitle: {
        display: 'flex' as 'flex',
        justifyContent: 'center' as 'center'
    }
};

type CanalAdmin = CanalClient<FormatErreurJeu1, FormatConfigurationJeu1, FormatMessageJeu1, FormatMessageJeu1, EtiquetteMessageJeu1>;


interface AdminState {
   config: boolean,
    message: Array<MessageJeu1>;
}

export class Admin extends React.Component<any, AdminState> {
    private adresseServeur: string;
    private canal: CanalAdmin;
    private messageErreur: string;
    private messages: Array<MessageJeu1>;

    state: AdminState = {
        config: false,
        message: []
    }

    constructor(props: any) {
        super(props);
        this.adresseServeur = hote + ':' + port2;
        this.messageErreur = 'Aucune erreur';
        this.messages=[];
    }

    componentWillMount(): void {
        console.log('* Initialisation après montage du corps');

        // Creation canal de communication 
        this.canal = creerCanalClient(this.adresseServeur);

        // Traitement des messages
        this.canal.enregistrerTraitementMessageRecu((m:FormatMessageJeu1) => {
            let msg = new MessageJeu1(m);
        
            switch (m.type) {
                case TypeMessageJeu1.NONCONF:
                    this.setState({
                        config: false
                    })
                    break;
                case TypeMessageJeu1.STATISTIQUES: 
                    this.state.message.push(msg);
                    this.setState({
                        message: this.state.message,
                        config: true
                    })
            }

            if(this.state.message[this.state.message.length-1].val().stats!= undefined){
                console.log("Stats : "+ this.state.message[this.state.message.length-1].val().stats);
            }else{
                console.log("No stats");
            }
            
        });

        this.canal.enregistrerTraitementAdmin(true);
        console.log("MESSAGES  traitement admin  : "+this.state.message[0])
        console.log('- du traitement de la configuration');  
        
        //demande stats
        //statistiques(this.canal, this.)
    }

    envoiConfiguration = (nDom: number, nUtilDom: Array<number>) => {
        let config = [nDom].concat(nUtilDom);
        this.canal.envoyerMessage(messageConfiguration(config));
    };

    miseAJourStats = () => {
        console.log('maj stats');
        this.canal.envoyerMessage(messageAdmin());
    };

    public render() {
        var component;
        if (this.state.config) {
            component = <Statistiques message={this.state.message[0]} MiseAJourStats={this.miseAJourStats}/>;
        } else {
            component = <Configuration envoiConfiguration={this.envoiConfiguration}/>;
        }
        return (
            <div style={styles.container}>
                <AppBar title="Admin" titleStyle={styles.appTitle} showMenuIconButton={false} />
                {component}
            </div>
        );
    }
}