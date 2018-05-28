import * as React from 'react';
import { withStyles, StyleRulesCallback } from '@material-ui/core/styles';
import { compose, withHandlers } from 'recompose';
import { FormControl, InputLabel, Input, Button, Avatar } from '@material-ui/core';
import { PasswordInput } from 'common/PasswordInput';
import { observer } from 'mobx-react';
import { isEmail } from 'validator';
import { isEmpty, isEqual } from 'lodash';
import { User } from 'models/User';
import { Apis } from 'Apis';

const styles: StyleRulesCallback = (theme: any) => ({
  input: {
    marginTop: '5px',
    marginBottom: '10px'
  },
  bigAvatar: {
    width: 100,
    height: 100,
    margin: 'auto'
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
    <br />
    <Avatar
      alt="No Photo"
      src={currentUser.base64Image ? currentUser.base64Image : `${Apis.BASE_URL}/storage/noprofile.jpeg`}
      className={classes.bigAvatar}
    />
    <FormControl className={classes.input} fullWidth={true}>

      <Button
        variant="raised"
        size="large"
        color="secondary"
        fullWidth={true}
        onClick={() => document.getElementById('ImageUpload')!.click()}
      >
        Upload Photo
      </Button>
      <input
        id="ImageUpload"
        type="file"
        style={{ 'display': 'none' }}
        onChange={(e) => currentUser.setBase64Image(e.target.files)}
      />
    </FormControl>
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
      Register
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