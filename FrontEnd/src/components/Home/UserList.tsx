import * as React from 'react';
import { UserStore } from 'models/User';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Avatar } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { compose, lifecycle } from 'recompose';
import { observer } from 'mobx-react';
import { AccountCircle } from '@material-ui/icons';
import { Apis } from 'Apis';

interface UserListPropsExternal {
    userStore: typeof UserStore.Type;
}
export const UserListComponent = ({ userStore }: UserListPropsExternal) => (
    <div>{
        userStore.userList.map((myuser, key) => (
            <ExpansionPanel key={key}>
                <ExpansionPanelSummary expandIcon={< ExpandMoreIcon />}>
                    {myuser.image ?
                        <Avatar
                            alt={myuser.name}
                            src={`${Apis.BASE_URL}${myuser.image}`}
                        />
                        :
                        <AccountCircle />
                    }
                    
                    <Typography variant="title">{myuser.name}</Typography>
                    {myuser.online ? 'online' : 'offline'}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <p>
                        Name: {myuser.name}
                    </p> 
                    
                </ExpansionPanelDetails>
            </ExpansionPanel>
        ))
    }

    </div>
);

export const UserList = compose<UserListPropsExternal, UserListPropsExternal>(
    lifecycle<UserListPropsExternal, {}>({
        componentWillMount() {
            this.props.userStore.loadlist();
        }
    }),
    observer
)(UserListComponent);