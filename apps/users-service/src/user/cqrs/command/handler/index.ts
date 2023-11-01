import { ChangePasswordWhenLoginHandler } from './change-password-when-login.handler';
import { ChangePasswordHandler } from './change-password.handler';
import { CreateAdminHandler } from './create-admin.handler';
import { LockOrUnLockUserHandler } from './lock-or-unLock-user.handler';
import { LoginOrCreateHandler } from './login-or-create.handler';
import { RegisterUserHandler } from './register-user.handler';
import { UpdateAvatarUserHandler } from './update-avatar-user.handler';
import { UpdateProfileHandler } from './update-profile.handler';
import { VerifyPhoneHandler } from './verify-phone.handler';
export const UsersCommandHandlers = [
  CreateAdminHandler,
  RegisterUserHandler,
  VerifyPhoneHandler,
  LoginOrCreateHandler,
  ChangePasswordHandler,
  UpdateProfileHandler,
  UpdateAvatarUserHandler,
  ChangePasswordWhenLoginHandler,
  LockOrUnLockUserHandler,
];
