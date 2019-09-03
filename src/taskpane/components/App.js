import * as React from 'react';
import { Button, ButtonType } from 'office-ui-fabric-react';
// import Header from './Header';
import Progress from './Progress';

import {getTerms} from '../selectors/getDefinedTerms';
import {toggleHighlight} from '../selectors/linter';
import {getUses} from '../selectors/getTermUses';
import {rangesToText} from '../selectors/rangeHelpers';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      definitions: [],
      termsHighlighted: false,
      uses: [],
      usesHighlighted: false,
      mistakenlyLowerUses: [],
      mistakenlyLowerUsesHighlighted: false,
      bodyTextArray: [],
      definedTerms: [],
      mistakenlyLowerTerms: [],
      termsUsed: []
    };
  }

  componentDidMount() {
    this.setState({
    });
  }

  getDefinedTerms = () => {
    let self = this;
    let terms = getTerms(self.state.definitions).then( (definedTerms) => {
      console.log('printed terms');
      self.setState({definitions: definedTerms})
    });
  }

  getUses = () => {
    let self = this;
    let uses = getUses(this.state.uses, this.state.definitions, false).then ( (uses) => {
      console.log('Saving uses to state');
      self.setState({uses: uses});
    })
  }

  getMistakenlyLowerUses = () => {
    let self = this;
    let mistakenlyLowerUses = getUses(this.state.uses, this.state.definitions, true).then ( (mistakenlyLowerUses) => {
      console.log('Saving mistakenlyLowerUses to state');
      self.setState({mistakenlyLowerUses: mistakenlyLowerUses});
    })
  }

  highlightDefinedTerms = () => {
    this.setState({termsHighlighted: toggleHighlight(this.state.termsHighlighted, this.state.definitions, 'blue')});
  }

  highlightUses = () => {
    this.setState({usesHighlighted: toggleHighlight(this.state.usesHighlighted, this.state.uses, 'gray')});
  }

  highlightMistakenlyLowerUses = () => {
    this.setState({mistakenlyLowerUsesHighlighted: toggleHighlight(this.state.mistakenlyLowerUsesHighlighted, this.state.mistakenlyLowerUses, 'red')});
  }

  getBodyTextArray = () => {
    let self = this;
    return Word.run(
      async (context) => {
        let paragraphs = context.document.body.paragraphs;
        paragraphs.load("text");
        await context.sync();
        self.setState({bodyTextArray: paragraphs.items.map( (item) => {return item.text})});
      }
    )
  }

  render() {
    const {
      title,
      isOfficeInitialized,
    } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress
          title={title}
          logo='assets/logo-filled.png'
          message='Please sideload your addin to see app body.'
        />
      );
    }

    return (
      <div className='ms-welcome'>
          <p className='ms-font-l'><b>Welcome</b>.</p>
          <Button className='ms-welcome__action' buttonType={ButtonType.hero} iconProps={{ iconName: 'ChevronRight' }} onClick={this.getDefinedTerms}>Get Defined Terms</Button>
          <Button className='ms-welcome__action' buttonType={ButtonType.hero} iconProps={{ iconName: 'ChevronRight' }} onClick={this.highlightDefinedTerms}>Highlight Defined Terms</Button>
          <Button className='ms-welcome__action' buttonType={ButtonType.hero} iconProps={{ iconName: 'ChevronRight' }} onClick={this.getUses}>Get Term Uses</Button>
          <Button className='ms-welcome__action' buttonType={ButtonType.hero} iconProps={{ iconName: 'ChevronRight' }} onClick={this.highlightUses}>Highlight Uses</Button>
          <Button className='ms-welcome__action' buttonType={ButtonType.hero} iconProps={{ iconName: 'ChevronRight' }} onClick={this.getMistakenlyLowerUses}>Get Mistakenly Lower Uses</Button>
          <Button className='ms-welcome__action' buttonType={ButtonType.hero} iconProps={{ iconName: 'ChevronRight' }} onClick={this.highlightMistakenlyLowerUses}>Highlight Mistakenly Lower Uses</Button>



          <p><b>Body text</b></p>
          <div>{JSON.stringify(this.state.bodyTextArray)}</div>
          <p>---</p>
          <p><b>New defined terms</b></p>
          <div>{JSON.stringify(this.state.definitions)}</div>
          <p>---</p>
          <p><b>New defined terms text</b></p>
          <div>{JSON.stringify(rangesToText(this.state.definitions))}</div>
          <p>---</p>
          <p><b>Defined terms</b></p>
          <div>{this.state.definedTerms}</div>
          <p>---</p>
          <p><b>Term uses</b></p>
          <div>{JSON.stringify(this.state.uses)}</div>
          <p>---</p>
          <p><b>Mistakenly lower uses</b></p>
          <div>{JSON.stringify(this.state.mistakenlyLowerUses)}</div>


      </div>
    );
  }
}
