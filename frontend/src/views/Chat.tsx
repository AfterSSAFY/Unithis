import React, { useEffect } from "react";

const Chat = (props: any) => {
  useEffect(() => {
    // const data = [
    //   "1번방",
    //   "2번방",
    //   "3번방",
    //   "4번방",
    //   "5번방",
    //   "6번방",
    //   "7번방",
    //   "8번방",
    //   "9번방",
    //   "10번방",
    //   "11번방",
    //   "12번방",
    //   "13번방"
    // ];
    // setRoom(data);
  }, []);

  // const [room, setRoom] = useState<Array<string>>([]);

  return (
    <>
      <h1>{props.match.params.id}번방 채팅</h1>
    </>
  );
};

export default Chat;
