import * as React from 'react';
import { withStyles, StyleRulesCallback } from '@material-ui/core/styles';
import { compose, withState } from 'recompose';
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles: StyleRulesCallback = (theme: any) => ({
  input: {
    marginTop: '5px',
    marginBottom: '10px'
  }
});
interface PaswordInputExternalProps {
  label: string;
}
  
interface PaswordInputInternalProps extends PaswordInputExternalProps {
  classes: any;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
}

const PaswordInputComponent = ({ label , classes, showPassword, setShowPassword }: PaswordInputInternalProps) => (
    <FormControl className={classes.input} fullWidth={true}>
      <InputLabel >{label}</InputLabel>
      <Input
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => showPassword ? setShowPassword(false) : setShowPassword(true)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
);
const enhance = compose<PaswordInputInternalProps, PaswordInputExternalProps>(
  withState('showPassword', 'setShowPassword', false),
  withStyles(styles)
);

export const PasswordInput = enhance(PaswordInputComponent);
