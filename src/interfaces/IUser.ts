export interface IUser {
  title: any;
  _id: string;
  name: string;
  email: string;
  password: string;
  mobile:Number;
  salt: string;
  token: string
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
  mobile:Number;
  newPassword: string;
  oldPassword: string;
}


