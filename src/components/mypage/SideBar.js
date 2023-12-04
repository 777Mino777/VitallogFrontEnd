import { useEffect, useState } from "react";
import RunningMan2 from "../RunningMan2";
import { Link } from "react-router-dom";
import { Menu, MenuItem, menuClasses } from "react-pro-sidebar";

const SideBar = ({ page }) => {
  const [data, setData] = useState();
  const [userdata, setUserData] = useState();
  const [menuitems, setMenuitems] = useState();

  const menulist = [
    ["mypage", "오늘의 로그보기"],
    ["today", "오늘의 로그 기록하기"],
    ["total", "전체 로그보기"],
    ["period", "기간별 로그보기"],
  ];

  const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + (date.getDate())).slice(-2);
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const menuItem = menulist.map((menu) => {
      if (menu[0] === page)
        return (
          <MenuItem
            key={`${menu}MenuItem`}
            active={true}
            className="text-center text-xl"
            component={<Link to={`/${menu[0]}`} />}
          >
            {menu[1]}
          </MenuItem>
        );
      else
        return (
          <MenuItem
            key={`${menu}MenuItem`}
            className="text-center"
            component={<Link to={`/${menu[0]}`} />}
          >
            {menu[1]}
          </MenuItem>
        );
    });
    setMenuitems(menuItem);


    fetch(`http://10.125.121.216:8080/api/vitallog/mypage/user1?date=${getDate()}`, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        Authorization: localStorage.getItem("token")
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        setData(data);

        let todayTotalLog = (
          <ul className="text-center">
            <li className="text-2xl">{getDate()}</li>
            <li>{data.totalExerTime === null ? 0 : data.totalExerTime} min </li>
            <li>{data.totalKcal.toFixed(2)} kcal</li>
          </ul>
        );
        setUserData(todayTotalLog);
        if (!localStorage.getItem("name"))
          localStorage.setItem("name", data.name);
      })
      .catch((err) => console.log("err"));
  }, []);
  return (
    <aside className="p-5 w-[350px] flex flex-col gap-3 border-2 border-[#363636] bg-[#EBEBEB] rounded-lg  items-center">
      <div className="mt-7 border-2 rounded-full p-2 border-black bg-white">
        <RunningMan2 width={100} height={100} />
      </div>
      <div className="mt-2 text-2xl text-center font-semibold">
        {localStorage.getItem("name")}님의 VitalLog
      </div>
      <div className="flex flex-col h-[130px] bg-white rounded-md w-full mt-3 leading-9 justify-center">
        {data && userdata}
      </div>
      <Menu
        rootStyles={{
          [`.${menuClasses.active}`]: {
            color: "#0085C9",
            fontWeight: "bold",
          },
        }}
      >
        {menuitems}
      </Menu>
    </aside>
  );
};

export default SideBar;