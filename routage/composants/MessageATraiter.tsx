import * as React from 'react';
import {MessageCases} from './MessageCases';
import {TraiterMessage} from './TraiterMessage';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { EnvoyePar } from './EnvoyePar'
import { MessageJeu1, TypeMessageJeu1 } from '../commun/communRoutage'
import { Identifiant } from '../../bibliotheque/types/identifiant'
import { Mot } from '../../bibliotheque/binaire';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import LockClose from 'material-ui/svg-icons/action/lock-outline';
import { FormatSommetJeu1 } from '../commun/communRoutage';

const styles = {
  root: {
    display: "flex" as 'flex',
    flexWrap: "wrap" as 'wrap',
    justifyContent: "center" as 'center',
    flexDirection: "column" as "column",
    alignItems : "stretch" as "stretch",
    margin: '30px'
  },
  container: {
    display: "flex" as 'flex',
    flexWrap: "wrap" as 'wrap',
    justifyContent: "space-between" as 'space-between',
    margin: '30px',
    alignItems: 'baseline' as 'baseline'
  },
  margin: {
    margin: '15px'
  },
  btn: {
    margin: '10px',
    alignSelf: "flex-end" as "flex-end"
  }
};
interface MessageProps {
  message: MessageJeu1,
  voisinFst: FormatSommetJeu1,
  voisinSnd: FormatSommetJeu1,
  validation: (contenu: Mot, msg: MessageJeu1) => void,
  envoyerMessage: (dest: Identifiant<'sommet'>, id: Identifiant<'message'>, contenu: Mot) => void,
  detruireMessage: (msg: MessageJeu1) => void,
  verrou: (idMessage : Identifiant<'message'>, contenu : Mot) => void,
  deverrouiller: (idMessage: Identifiant<'message'>, contenu: Mot) => void,
}

interface MessageState {
  locked: boolean
}


export class MessageATraiter extends React.Component<MessageProps, MessageState> {
  
  constructor(props: any){
      super(props);
  }

  source = () => {
    if (this.props.message.val().ID_origine.val == this.props.voisinFst.ID.val) {
      return this.props.voisinFst;
    }
    return this.props.voisinSnd;
  }

  verrou = () => {
    this.props.verrou(this.props.message.val().ID, this.props.message.val().contenu);
  }

  deverrouiller = () => {
    this.props.deverrouiller(this.props.message.val().ID, this.props.message.val().contenu);
  }

  public render() {
    return (
      <div style={styles.root}>
       <Paper zDepth={2}>
        <EnvoyePar source={this.source()}/>
        <MessageCases message={this.props.message.val().contenu} locked={true}/>
        <div style={styles.container}>
            {this.props.message.val().type === TypeMessageJeu1.ACTIF || this.props.message.val().type === TypeMessageJeu1.INACTIF ? <LockClose/> : <LockOpen/>}
          <RaisedButton 
            label={this.props.message.val().type === TypeMessageJeu1.ACTIF ? "Déverrouiller" : "Verrouiller"}
            style={styles.btn}
              onClick={this.props.message.val().type === TypeMessageJeu1.ACTIF ? this.deverrouiller : this.verrou} 
            primary={true}
            disabled={this.props.message.val().type === TypeMessageJeu1.INACTIF}
          />
          <TraiterMessage 
            message={this.props.message}
            voisinFst={this.props.voisinFst}
            voisinSnd={this.props.voisinSnd}
            validation={this.props.validation}
            detruireMessage={this.props.detruireMessage}
            locked={this.props.message.val().type === TypeMessageJeu1.ACTIF}
            envoyerMessage={this.props.envoyerMessage}/>
        </div>
       </Paper>
        
      </div>
    );
  }
}
