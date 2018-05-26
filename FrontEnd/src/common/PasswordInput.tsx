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
  error?: boolean;
  onChange?: (e: any) => void;
  value?: string | null;
  label: string;
}

interface PaswordInputInternalProps extends PaswordInputExternalProps {
  classes: any;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
}

const PaswordInputComponent = ({ label,
  classes,
  showPassword,
  setShowPassword,
  value,
  error,
  onChange }: PaswordInputInternalProps) => (
    <FormControl className={classes.input} fullWidth={true}>
      <InputLabel >{label}</InputLabel>
      <Input
        error={error!}
        onChange={(e) => onChange ? onChange(e) : undefined}
        type={showPassword ? 'text' : 'password'}
        value={value!}
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
