/// <reference types="react-scripts" />
import { string } from "prop-types";

type Bartering_List = {
  address: string;
  category: string;
  contents: string;
  hasNext: boolean;
  date: string;
  id: number;
  images: File[];
  need: string;
  status: string;
  title: string;
  userId: number;
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
type Action_UserID = { type: "SET_USERID"; payload: number };
type Action_Path = { type: "SET_PATH"; payload: string };
