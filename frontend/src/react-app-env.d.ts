/// <reference types="react-scripts" />

type barteringList = {
  name: string;
  location: string;
  photo: string;
  price: number;
};

type Auth = {
  component: any;
  authenticated: boolean;
};

type memberInfo = {
  email: string;
  password: string;
};
