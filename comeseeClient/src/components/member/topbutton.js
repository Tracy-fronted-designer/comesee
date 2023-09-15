import React, { useEffect, useState } from "react";
import member from "../../css/member/member.module.css";
import Order from "./order";
import CancelOrder from "./cancelorder";
import Axios from "axios";

const Topbutton = () => {
  const [activeTab, setActiveTab] = useState("訂購紀錄");
  const toggleHandler = (tabName) => {
    setActiveTab(tabName);
  };

  const [orderdetail, setOrderdetail] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);

  useEffect(() => {
    refreshData();
  }, []);

  const handleCancelOrder = async (canceledOrder) => {
    try {
      const datatoServer = {
        orderID: canceledOrder.orderID,
      };

      const response = await Axios.patch(
        `http://localhost:2407/orderlist/orders/${canceledOrder.orderID}`,
        datatoServer
      );

      if (response.status === 202) {
        const updatedData = response.data;
        setCanceledOrders(updatedData.orderdetail);
        console.log("取消成功");
      }
    } catch (error) {
      console.error("取消失敗123", error);
    }
    refreshData();
  };

  const refreshData = () => {
    Axios.get("http://localhost:2407/orderlist/1")
      .then((response) => {
        const comfirmorder = response.data;
        const orderdetail = comfirmorder.filter((order) => order.status === 1);
        setOrderdetail(orderdetail);
      })
      .catch((error) => {
        console.log(error);
      });

    Axios.get("http://localhost:2407/orderlist/0")
      .then((response) => {
        const allOrders = response.data;
        const canceledOrders = allOrders.filter((order) => order.status === 0);
        setCanceledOrders(canceledOrders);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={member.contentdetail}>
      <div className={member.topbutton}>
        <div
          className={`${member.togglebutton} ${
            activeTab === "訂購紀錄" ? member.togglebuttontoggled : ""
          }`}
          onClick={() => toggleHandler("訂購紀錄")}
        >
          訂購紀錄
        </div>
        <div
          className={`${member.togglebutton} ${
            activeTab === "訂單取消" ? member.togglebuttontoggled : ""
          }`}
          onClick={() => toggleHandler("訂單取消")}
        >
          訂單取消
        </div>
      </div>
      {activeTab === "訂購紀錄" ? (
        <div>
          {orderdetail.map((order) => (
            <Order
              key={order.orderID}
              orderdetail={order}
              onCancelOrder={handleCancelOrder}
            />
          ))}
          {console.log(orderdetail)}
        </div>
      ) : (
        <div>
          {canceledOrders.map((order) => (
            <CancelOrder
              key={order.orderID}
              orderdetail={order}
              onCancelOrder={handleCancelOrder}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Topbutton;
