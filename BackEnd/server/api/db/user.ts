import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface UserModelI extends mongoose.Document {
    name: string;
    username: string;
    password: string;
    createdAt: Date;
    modifiedAt: Date;
}

let UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: false
    },
    updatedAt: {
        type: Date,
        required: false
    }
}).pre('save', function <UserModelI>(next) {

    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    this.modifiedAt = now;

    next();
    return this;
});


UserSchema.pre('save', function<UserModelI>(next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

export let User = mongoose.model<UserModelI>('hero', UserSchema, 'heroes', true);