/// <reference types="react-scripts" />

import { string } from "prop-types";

type Bartering = {
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

type User = {
  id: number;
  email: string;
  nickname: string;
  phone: string;
  address: string;
  password: string;
  repassword: string;
};

type Photo = {
  id: number;
  item_id: number;
  image: string;
};

type Address = {
  시도: string;
  시군구: string;
  읍면동: string;
};

type Action_Auth = { type: "SET_AUTH"; payload: boolean };
type Action_Token = { type: "SET_TOKEN"; payload: string };
