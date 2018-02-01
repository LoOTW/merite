import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Announcement from 'material-ui/svg-icons/action/announcement';
import RaisedButton from 'material-ui/RaisedButton';
import { Consigne } from '../commun/communRoutage'; 
import { ConsigneDom } from './Consigne';
import { IdentifiantCases } from './IdentifiantCases';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */


interface ReglesProps {
  consigne: Consigne
}

const styles = {
  boutonRegles: {
    margin: '10px'
  }
};

export class Regles extends React.Component<ReglesProps, any> {
  state = {
    open: true,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton 
          label="Regles du jeu" 
          secondary={true}
          style={styles.boutonRegles}
          icon={<Announcement/>}
          onClick={this.handleOpen} />
        <Dialog
          title="Regles du jeu"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Les regles du jeu sont les suivantes ...
          <br/>
          <ConsigneDom consigne={this.props.consigne}/>
        </Dialog>
      </div>
    );
  }
}