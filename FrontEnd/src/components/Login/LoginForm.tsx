import * as React from 'react';
import { withStyles, StyleRulesCallback } from '@material-ui/core/styles';
import { compose, withHandlers } from 'recompose';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { PasswordInput } from 'common/PasswordInput';
import { User } from 'models/User';
import { observer } from 'mobx-react';

const styles: StyleRulesCallback = (theme: any) => ({
  input: {
    marginTop: '5px',
    marginBottom: '10px'
  }
});
interface LoginFormExternalProps {
  onLogin?: () => void;
  currentUser: typeof User.Type;
}

interface LoginFormInternalProps extends LoginFormExternalProps {
  login: () => void;
  classes: any;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
  location: any;
}

const LoginFormComponent = ({ classes, currentUser, showPassword, 
  setShowPassword, login, location }: LoginFormInternalProps) => 
(
  <div>
    <FormControl className={classes.input} fullWidth={true}>
      <InputLabel htmlFor="username">UserName</InputLabel>
      <Input
        value={currentUser.username}
        onChange={(e) => currentUser.setUsername(e.target.value)}
        type="text"
      />
    </FormControl>
    <PasswordInput
      value={currentUser.password}
      onChange={(e) => currentUser.setPassword(e.target.value)}
      label="Password"
    />
    <br />
    <Button
      disabled={currentUser.loginValidatie === false}
      variant="raised"
      size="large"
      color="primary"
      fullWidth={true}
      onClick={(e) => login()}
    >
      Login
    </Button>
  </div>
);
const enhance = compose<LoginFormInternalProps, LoginFormExternalProps>(
  withStyles(styles),
  withHandlers<LoginFormInternalProps, {}>({
    login: ({ currentUser, onLogin}) => () => {
      if (currentUser.login() && onLogin) {
        onLogin();
      } 
    }
  }),
  observer
);

export const LoginForm = enhance(LoginFormComponent);
