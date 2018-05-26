import * as React from 'react';
import { withStyles, StyleRulesCallback } from '@material-ui/core/styles';
import { compose, withHandlers } from 'recompose';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { PasswordInput } from 'common/PasswordInput';
import { observer } from 'mobx-react';
import { isEmail } from 'validator';
import { isEmpty, isEqual } from 'lodash';
import { User } from 'models/User';

const styles: StyleRulesCallback = (theme: any) => ({
  input: {
    marginTop: '5px',
    marginBottom: '10px'
  }
});

interface RegistrationFormExternalProps {
  onSave?: () => void;
  currentUser: typeof User.Type;
}
interface RegistrationFormInternalProps extends RegistrationFormExternalProps {
  save: () => void;
  classes: any;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
}

const RegistrationFormComponent = ({ classes, currentUser, save }: RegistrationFormInternalProps) => (
  <div>
    <FormControl className={classes.input} fullWidth={true}>
      <InputLabel htmlFor="username">Full name</InputLabel>
      <Input
        value={currentUser.name}
        onChange={(e) => currentUser.setName(e.target.value)}
        id="username"
        type="text"
      />
    </FormControl>

    <FormControl className={classes.input} fullWidth={true}>
      <InputLabel htmlFor="username">UserName</InputLabel>
      <Input
        value={currentUser.username}
        onChange={(e) => currentUser.setUsername(e.target.value)}
        id="username"
        type="text"
      />
    </FormControl>

    <FormControl className={classes.input} fullWidth={true}>
      <InputLabel htmlFor="adornment-password">Email</InputLabel>
      <Input
        error={isEmpty(currentUser.email) === false
          && isEmail(currentUser.email) === false}
        value={currentUser.email}
        onChange={(e) => currentUser.setEmail(e.target.value)}
        id="email"
        type="Email"
      />
    </FormControl>
    <PasswordInput
      error={isEmpty(currentUser.password) === false
        && isEmpty(currentUser.repeatPassword) === false
        && isEqual(currentUser.repeatPassword, currentUser.password) === false
      }
      value={currentUser.password}
      onChange={(e) => currentUser.setPassword(e.target.value)}
      label="Password"
    />
    <PasswordInput
      error={isEmpty(currentUser.password) === false
        && isEmpty(currentUser.repeatPassword) === false
        && isEqual(currentUser.repeatPassword, currentUser.password) === false
      }
      value={currentUser.repeatPassword}
      onChange={(e) => currentUser.setRepeatPassword(e.target.value)}
      label="Retype Password"
    />

    <br />
    <Button
      variant="raised"
      size="large"
      color="primary"
      fullWidth={true}
      onClick={(e) => save()}
      disabled={!currentUser.CreateValidate}
    >
      Login
    </Button>
  </div>
);
const enhance = compose<RegistrationFormInternalProps, RegistrationFormExternalProps>(
  withStyles(styles),
  withHandlers<RegistrationFormInternalProps, {}>({
    save: ({ currentUser, onSave }) => () => {
      if (currentUser.save() && onSave) {
        onSave();
      }
    }
  }),
  observer
);

export const RegistrationForm = enhance(RegistrationFormComponent);