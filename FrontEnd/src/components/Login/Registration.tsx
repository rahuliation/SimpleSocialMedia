import * as React from 'react';
import { withStyles, StyleRulesCallback } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { FormControl, InputLabel, Input,  Button } from '@material-ui/core';
import { PasswordInput } from 'common/PasswordInput';

const styles: StyleRulesCallback = (theme: any) => ({
  input: {
    marginTop: '5px',
    marginBottom: '10px'
  }
});

interface RegistrationFormInternalProps {
  classes: any;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
}

const RegistrationFormComponent = ({ classes  }: RegistrationFormInternalProps) => (
  <div>
    <FormControl className={classes.input} fullWidth={true}>
      <InputLabel htmlFor="username">UserName</InputLabel>
      <Input
        id="username"
        type="text"
      />
    </FormControl>
    <FormControl className={classes.input} fullWidth={true}>
      <InputLabel htmlFor="adornment-password">Email</InputLabel>
      <Input
        id="email"
        type="Email"
      />
    </FormControl>
    <PasswordInput
      label="Password"
    />
    <PasswordInput
      label="Retype Password"
    />

    <br/>
    <Button variant="raised"  size="large" color="primary" fullWidth={true}>
      Login
    </Button>
  </div>
);
const enhance = compose<RegistrationFormInternalProps, {}>(
  withStyles(styles)
);

export const RegistrationForm = enhance(RegistrationFormComponent);