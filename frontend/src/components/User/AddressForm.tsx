import React, { useEffect, useState } from "react";
import { address } from "utils/address";

export const AddressFrom = (props: any) => {
  const [city, setCity] = useState(-1);
  const [town, setTown] = useState(-1);
  const [village, setVillage] = useState(-1);

  useEffect(() => {
    if (props["token"]) {
      const Address_split = String(Object.values(props["token"])[4]).split(" ");
      const blankFlag = Address_split.length === 4;

      const 시도 = Object.keys(address).findIndex(v =>
        new RegExp(Address_split[0]).test(v)
      );

      const 구군 = Object.keys(Object.values(address)[시도]).findIndex(v =>
        blankFlag
          ? new RegExp(Address_split[1] + " " + Address_split[2]).test(v)
          : new RegExp(Address_split[1]).test(v)
      );
      const 읍면동 = String(Object.values(Object.values(address)[시도])[구군])
        .split(",")
        .findIndex(v =>
          blankFlag
            ? new RegExp(Address_split[3]).test(v)
            : new RegExp(Address_split[2]).test(v)
        );

      setCity(시도);
      setTown(구군);
      setVillage(읍면동);
    }
  }, []);

  const selectChange = (e: any) => {
    if (e.target.value === "") {
      setCity(-1);
      setTown(-1);
      setVillage(-1);
      return;
    }
    if (e.target.className === "시/도") {
      setCity(e.target.value);
      setTown(0);
      setVillage(0);
    } else if (e.target.className === "구/군") {
      setTown(e.target.value);
    } else if (e.target.className === "읍/면/동") {
      setVillage(e.target.value);
    } else {
      return;
    }
  };

  useEffect(() => {
    if (city !== -1 && town !== -1 && village !== -1) {
      props.setState(Object.keys(address)[city], "Address1");

      props.setState(
        Object.keys(Object.values(address)[city])[town],
        "Address2"
      );

      props.setState(
        String(Object.values(Object.values(address)[city])[town]).split(",")[
          village
        ],
        "Address3"
      );
    }
  }, [city, town, village]);

  return (
    <>
      <div className="user-input-area">
        <label>주소</label>
        <div className="address">
          {
            <>
              <select value={city} onChange={selectChange} className="시/도">
                <option value="">시/도 선택</option>
                {Object.keys(address).map((c, i) => {
                  return (
                    <option value={i} label={c} key={c + i}>
                      {c}
                    </option>
                  );
                })}
              </select>
              {city === -1 ? (
                <select>
                  <option value="">구/군 선택</option>
                </select>
              ) : (
                <select value={town} onChange={selectChange} className="구/군">
                  {Object.keys(Object.values(address)[city]).map((c, i) => {
                    return (
                      <option value={i} label={c} key={c + i}>
                        {c}
                      </option>
                    );
                  })}
                </select>
              )}

              {(city === -1 || town === -1) && village === -1 ? (
                <select>
                  <option value="">읍/면/동 선택</option>
                </select>
              ) : (
                <select
                  value={village}
                  onChange={selectChange}
                  className="읍/면/동"
                >
                  {String(Object.values(Object.values(address)[city])[town])
                    .split(",")
                    .map((c, i) => {
                      return (
                        <option value={i} label={c} key={c + i}>
                          {c}
                        </option>
                      );
                    })}
                </select>
              )}
            </>
          }
        </div>
      </div>
    </>
  );
};
