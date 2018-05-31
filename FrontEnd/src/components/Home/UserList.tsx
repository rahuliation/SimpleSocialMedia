import * as React from 'react';
import { UserStore } from 'models/User';
import {
    ExpansionPanel, ExpansionPanelSummary, Typography,
    ExpansionPanelDetails, Avatar, withStyles, StyleRulesCallback
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { compose, lifecycle } from 'recompose';
import { observer } from 'mobx-react';
import { AccountCircle } from '@material-ui/icons';
import { Apis } from 'Apis';

const styles: StyleRulesCallback = (theme: any) => ({
    online: {
        height: '20px',
    },
    name: {
        marginLeft: '16px',
    },
    details: {
        flexWrap: 'wrap',
        flexDirection: 'column',
    }
    
});
interface UserListPropsExternal {
    userStore: typeof UserStore.Type;
}
interface UserListPropsInternal extends UserListPropsExternal {
    classes: any;
}

export const UserListComponent = ({ userStore, classes }: UserListPropsInternal) => (
    <div>{
        userStore.userList.map((myuser, key) => (
            <ExpansionPanel key={key}>
                <ExpansionPanelSummary  expandIcon={< ExpandMoreIcon />}>
                    {myuser.image ?
                        <Avatar
                            alt={myuser.name}
                            src={`${Apis.BASE_URL}${myuser.image}`}
                        />
                        :
                        <AccountCircle />
                    }
                    <Typography variant="title" className={classes.name}>{myuser.name}</Typography>
                    {myuser.online ? <img className={classes.online} src="/online.png" alt=""/> : undefined}

                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <Typography variant="body2">
                        <b>Name</b>:  {myuser.name}
                    </Typography>
                    <Typography variant="body2">
                    <b>Email Address</b>:  {myuser.email}
                    </Typography>
                    <Typography variant="body2">
                    <b>Username </b>:  {myuser.username}
                    </Typography>

                </ExpansionPanelDetails>
            </ExpansionPanel>
        ))
    }

    </div>
);

export const UserList = compose<UserListPropsExternal, UserListPropsExternal>(
    withStyles(styles),
    lifecycle<UserListPropsExternal, {}>({
        componentWillMount() {
            this.props.userStore.loadlist();
        }
    }),
    observer
)(UserListComponent);