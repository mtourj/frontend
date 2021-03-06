import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

class SortIssuesButtons extends React.Component {

  render() { 
    return (
      <ButtonGroup className='sort-issues'>
        <Button onClick={() => this.props.filterIssues(0)}>
          All</Button>
        <Button onClick={() => this.props.filterIssues(1)}>
          Done</Button>
        <Button onClick={() => this.props.filterIssues(2)}>
          Scheduled</Button>
        <Button onClick={() => this.props.filterIssues(3)}>
          Open</Button>
        <Button onClick={() => this.props.filterIssues(4)}>
          Ignored</Button>
      </ButtonGroup>
    )
  }
} 
 
export default SortIssuesButtons;