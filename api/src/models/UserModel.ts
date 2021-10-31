import { ValidationErrorEnum } from '#/enums/validation';
import bcrypt from 'bcrypt-nodejs';
import { prop, buildSchema, getModelForClass, pre, DocumentType } from '@typegoose/typegoose';

@pre<User>('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(this.password, salt, null, (error, hash) => {
      if (error) {
        return next(error);
      }

      this.password = hash;

      return next(null);
    });
  });
})
export class User {
  @prop({ required: true })
  public firstName: string;

  @prop()
  public lastName?: string;

  @prop({ unique: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  public comparePasswords(candidatePassword: string) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
          return reject(err);
        }

        resolve(isMatch);
      });
    });
  }

  public isPasswordValid(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  public generateHash(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }
}

const userSchema = buildSchema(User);

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

userSchema.path('email').validate(
  (value: string) => {
    if (!emailRegex.test(value)) {
      return false;
    }

    return true;
  },
  'Email is not valid!', // TODO: Localize
  ValidationErrorEnum.NOTVALID,
);

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

const UserModel = getModelForClass(User);
export type IUser = DocumentType<User>;
export default UserModel;
