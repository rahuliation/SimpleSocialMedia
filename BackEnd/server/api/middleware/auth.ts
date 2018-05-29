import userService from "../services/user.service";
import L from '../../common/logger';

export const athenticate = function(req, res , next) {
    const token = req.get('_token');
    userService.getProfile(token).then((res) => {
        req.theuser = res;
        next();
    }).catch(err => {
        L.error(err);
        res.json({
            error: 'token varification failed'
        })
    } );


}