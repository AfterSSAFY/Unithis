/// <reference types="react-scripts" />

type barteringList = {
  id: number;
  user_id: number;
  title: string;
  contents: string;
  category: string;
  need: string;
  status: string;
  date: string;
};

type SigninInfo = {
  email: string;
  password: string;
};

type userInfo = {
  id: number;
  email: string;
  nickname: string;
  phone: number;
  address: string;
  password: string;
  repassword: string;
};
