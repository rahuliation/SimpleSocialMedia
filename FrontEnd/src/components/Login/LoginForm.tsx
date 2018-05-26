import * as React from 'react';
import { withStyles, StyleRulesCallback } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { PasswordInput } from 'common/PasswordInput';
import { User } from 'models/User';

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
  save: () => void;
  classes: any;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
}

const LoginFormComponent = ({ classes, currentUser, showPassword, setShowPassword }: LoginFormInternalProps) => (
  <div>
    <FormControl className={classes.input} fullWidth={true}>
      <InputLabel htmlFor="username">UserName</InputLabel>
      <Input
        value={currentUser.username}
        onChange={(e) => currentUser.setUsername(e.target.value)}
        id="username"
        type="text"
      />
    </FormControl>
    <PasswordInput
      value={currentUser.password}
      onChange={(e) => currentUser.setPassword(e.target.value)}
      label="Password"
    />
    <br />
    <Button variant="raised" size="large" color="primary" fullWidth={true}>
      Login
    </Button>
  </div>
);
const enhance = compose<LoginFormInternalProps, LoginFormExternalProps>(
  withStyles(styles)
);

export const LoginForm = enhance(LoginFormComponent);
