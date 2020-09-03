import React, { useEffect, useState, useRef } from "react";
import http from "api/http-common";
import jwt_decode from "jwt-decode";

import { Header } from "components/Header";
import { Nav } from "components/Nav";
import { AddressList } from "components/Bartering/AddressList";
import { BarteringList } from "components/Bartering/BarteringList";
import { SearchForm } from "components/Bartering/SearchForm";
import { Bartering_List } from "react-app-env";
import { Category } from "components/Bartering/Category";

const Bartering = () => {
  const sectionRef = useRef<HTMLSelectElement>(null);
  const [itemList, setItemList] = useState<Array<Bartering_List>>();
  const [category, setCategory] = useState<string>();
  const [address, setAddress] = useState<Array<string>>();
  const [idx, setIdx] = useState<number>(0);

  useEffect(() => {
    sessionStorage.setItem("nowPath", "/Bartering");

    http
      .get("/items?idx=" + idx)
      .then(({ data }) => {
        setItemList(data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (itemList) {
      if (sectionRef && sectionRef.current) {
        sectionRef.current.addEventListener("scroll", infinityScroll);
      }
    }
    return () => {
      if (sectionRef && sectionRef.current) {
        sectionRef.current.removeEventListener("scroll", infinityScroll);
      }
    };
  }, [itemList]);

  const infinityScroll = () => {
    if (sectionRef && sectionRef.current) {
      let scrollHeight = sectionRef.current.scrollHeight;
      let scrollTop = sectionRef.current.scrollTop;

      let clientHeight = sectionRef.current.clientHeight;
      if (scrollTop + clientHeight === scrollHeight) {
        if (itemList && itemList[idx] && itemList[idx].hasNext) {
          setIdx(idx + 10);
        }
      }
    }
  };

  useEffect(() => {
    if (idx !== 0) {
      if (address && category) {
        getAddress_CategoryAPI();
      } else {
        getItemAPI();
      }
    }
  }, [idx]);

  const getItemAPI = () => {
    http
      .get("/items?idx=" + idx)
      .then(({ data }) => {
        let arr: any;
        if (itemList) {
          arr = [...itemList];
        }

        data.forEach((v: any) => {
          arr.push(v);
        });

        setItemList(arr);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getAddress_CategoryAPI = () => {
    http
      .post("/item/search", {
        address: address,
        category: category,
        idx: idx
      })
      .then(({ data }) => {
        let arr: any;
        if (itemList) {
          arr = [...itemList];
        }

        data.forEach((v: any) => {
          arr.push(v);
        });

        setItemList(arr);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (category && address) {
      http
        .post("/item/search", {
          address: address,
          category: category,
          idx: idx
        })
        .then(({ data }) => {
          setItemList(data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [category, address]);

  const onCategoryHandle = (category: any) => {
    setCategory(category);
  };

  const onAddressHandle = (address: any) => {
    setAddress(address);
  };

  const onItemHandle = (item: any) => {
    setItemList(item);
  };

  const token: any = sessionStorage.getItem("token");
  const decodedToken = token ? jwt_decode(token) : null;
  const BarteringItem = token ? { itemList, decodedToken } : { itemList };

  return (
    <>
      <Header />
      <section
        className="router-container router-header router-footer"
        ref={sectionRef}
      >
        <SearchForm onItem={onItemHandle} />
        <Category onCategory={onCategoryHandle} />
        <AddressList onAddress={onAddressHandle} />
        <BarteringList props={BarteringItem} />
      </section>
      <Nav />
    </>
  );
};

export default Bartering;
