import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import { login, getOrgs } from '../actions';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidLogin: false,
      username: '',
      password: '',
      name: '',
      role_id: '',
      org_id: '',
      phone: '',
      email: ''
    };
  }

  componentDidMount() {
    this.props.getOrgs();
  }

  changeHandler = ({ target: { name, value } }) => {
    console.log(value);
    this.setState({ [name]: value });
  };

  submitHandler = ev => {
    ev.preventDefault();
    // const credentials = {
    //   username: this.state.username,
    //   password: this.state.password
    // };
    const accountInfo = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
      role_id: this.state.role_id,
      org_id: this.state.org_id,
      phone: this.state.phone,
      email: this.state.email
    }

    console.log(accountInfo);

    Promise.resolve(this.props.login(accountInfo)).then(() => {
      // if (this.props.isLoggedIn) {
      //   this.props.closeLoginModal(ev);
      // } else {
      console.log('this.props.isLoggedIn() = ', this.props.isLoggedIn);
      this.setState({ invalidLogin: true });
      // }
    });
  };

  render() {
    if(!this.props.orgsFetched) {
      return <h1>Loading...</h1>
    }
    return (
        <Form onSubmit={ev => this.submitHandler(ev)}>
          <h2>Register</h2>
          <FormGroup>
            <Label for="username-input">Username:</Label>
            <Input
              type='text'
              name='username'
              id="username-input"
              onChange={this.changeHandler}
            />
            <Label for='password-input'>Password:</Label>
            <Input
              id='password-input'
              type='password'
              name='password'
              onChange={this.changeHandler}
            />
          </FormGroup>
          <FormGroup>
          <Label for="select-org">Select</Label>
          <Input type="select" name="org_id" id="select-org" onChange={this.changeHandler}>
            {this.props.orgs.map( (item, index) => {
              return <option key={index} value={item}>{item}</option>
            })}
          </Input>
          </FormGroup>
          <FormGroup>
            <Label for='name-input'>Name:</Label>
            <Input
              id='name-input'
              type='text'
              name='name'
              onChange={this.changeHandler}
            />
            <Label for='phone-input'>Phone Number (optional):</Label>
            <Input
              id='phone-input'
              type='text'
              name='phone'
              onChange={this.changeHandler}
            />
            <Label for='email-input'>Email (optional):</Label>
            <Input
              id='email-input'
              type='email'
              name='email'
              onChange={this.changeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label check>
              <Input 
                type="radio" 
                name="role_id"
                value={1}
                onClick={this.changeHandler}
              />{''}
              School Administrator
            </Label>
            <Label check>
              <Input 
              type="radio" 
              name="role_id"
              value={2}
              onClick={this.changeHandler}
              />{''}
              Board Member
            </Label>
          </FormGroup>
          <FormGroup>
            <Button
              className='login-btn'
              color="primary"
              type='submit'
              placeholder='Login'
              value='Log In'
            >Register </Button>
            <p failedLogin={this.state.invalidLogin.toString()}>
              Invalid Username/Password
            </p>
          </FormGroup>
        </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    orgs: state.orgs,
    orgsFetched: state.orgsFetched
  }
};

export default connect(
  mapStateToProps,
  { login, getOrgs }
)(RegisterForm);