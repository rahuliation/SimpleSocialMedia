import * as React from 'react';
import { withStyles, StyleRulesCallback } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { PasswordInput } from 'common/PasswordInput';

const styles: StyleRulesCallback = (theme: any) => ({
  input: {
    marginTop: '5px',
    marginBottom: '10px'
  }
});

interface LoginFormInternalProps {
  classes: any;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
}

const LoginFormComponent = ({ classes, showPassword, setShowPassword }: LoginFormInternalProps) => (
  <div>

    <FormControl className={classes.input} fullWidth={true}>
      <InputLabel htmlFor="username">UserName</InputLabel>
      <Input
        id="username"
        type="text"
      />
    </FormControl>
    <PasswordInput
      label="Password"
    />
    <br />
    <Button variant="raised" size="large" color="primary" fullWidth={true}>
      Login
    </Button>
  </div>
);
const enhance = compose<LoginFormInternalProps, {}>(
  withStyles(styles)
);

export const LoginForm = enhance(LoginFormComponent);
