import * as React from 'react';
import { MessageATraiter } from './MessageATraiter';
import { MessageJeu1, FormatSommetJeu1 } from '../commun/communRoutage';
import {Identifiant} from '../../bibliotheque/types/identifiant';
import { Mot } from '../../bibliotheque/binaire';

const styles = {
  root: {
    display: "flex" as 'flex',
    flexWrap: "wrap" as 'wrap',
    flexDirection: "column" as "column",
    justifyContent: "center" as 'center',
    margin: '30px'
  }
};

interface MessageProps {
  messages: Array<MessageJeu1>,
  voisinFst: FormatSommetJeu1,
  voisinSnd: FormatSommetJeu1,
  validation: (contenu: Mot, msg: MessageJeu1) => void,
  detruireMessage: (msg: MessageJeu1) => void,
  verrou: (idMessage : Identifiant<'message'>, contenu : Mot) => void,
  deverrouiller: (idMessage: Identifiant<'message'>, contenu: Mot) => void,
  envoyerMessage: (dest: Identifiant<'sommet'>, id: Identifiant<'message'>, contenu: Mot) => void,
}

export class MessageBox extends React.Component<MessageProps, any> {
  
  constructor(props: any){
      super(props);
  }

  public render() {
    var voisinFst= this.props.voisinFst;
    var voisinSnd = this.props.voisinSnd;
    var envoyerMessage = this.props.envoyerMessage;
    var verrou = this.props.verrou;
    var deverrouiller = this.props.deverrouiller;
    var validation = this.props.validation;
    var detruireMessage = this.props.detruireMessage;
    var messageList = this.props.messages.map(function(mes){
      return <MessageATraiter
        validation={validation}
        message={mes}
        detruireMessage={detruireMessage}
        voisinFst={voisinFst}
        voisinSnd={voisinSnd}
        envoyerMessage={envoyerMessage}
        verrou={verrou}
        deverrouiller={deverrouiller}/>;
    })
    return (
      <div>
        {(this.props.messages.length == 0) ? (
        <div style={styles.root}>Pas de message a traiter </div>) :
        (<div style={styles.root}>{messageList}</div>)}
      </div>
    );
  }
}
