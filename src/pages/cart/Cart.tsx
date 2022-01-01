import React from 'react';
import orderApi from '../../app/api/orderApi';
import { Order, State } from '../../interfaces/interface';
import { useHistory } from 'react-router-dom';
import './Cart.css';
import socketIo from '../../app/socket';
import { useSelector } from 'react-redux';

interface Props {}

const Cart = (props: Props) => {
  //   const checkAdmin = useCheckAdmin().checkAdmin;
  //   console.log(checkAdmin, 'admin');
  const currentUser = useSelector(
    (state: State) => state.currentUser.currentUser
  );
  const [reRender, setReRender] = React.useState(false);
  console.log(socketIo.id);
  // console.log(socketIo.disconnected);
  // if (socketIo.disconnected) {
  //   if (currentUser) {
  //     socketIo.connect();
  //     console.log(socketIo.id, 'testIo');
  //   }
  // }
  console.log(currentUser);
  React.useEffect(() => {
    if (currentUser) {
      socketIo.emit('addUser', {
        idUser: currentUser?.id,
        rules: currentUser?.rules,
      });
    }
    // return () => {
    //   socketIo.disconnect();
    // };
  }, [currentUser]);
  React.useEffect(() => {
    socketIo.on('reConnected', () => {
      console.log('reCon');
      socketIo.emit('addUser', {
        idUser: currentUser?.id,
        rules: currentUser?.rules,
      });
    });
  }, [currentUser]);
  const history = useHistory();
  const totalPrice = (a: number, b: number) => a * b;
  const [listOrders, setListOrders] = React.useState<Order[]>([]);
  React.useEffect(() => {
    const getMyOrders = async () => {
      const result = await orderApi.getMyOrders();
      console.log(result);
      setListOrders(result.orders);
    };
    getMyOrders();
  }, [reRender, currentUser]);
  const deleteOrder = (idOrder?: string) => {
    socketIo.emit('clientDeleteOrder', idOrder);
    const newListOrders = listOrders.filter((order) => order._id !== idOrder);
    setListOrders(newListOrders);
    const delOrder = async () => {
      const result = await orderApi.deleteOrder(idOrder);
      console.log(result);
      // socketIo.emit('clientDeleteOrder', idOrder);
      // setReRender(!reRender);
    };
    delOrder();
  };
  const acceptOrder = (idOrder?: string, idUser?: string) => {
    const newListOrders = listOrders.map((order) => {
      if (order._id === idOrder) {
        return { ...order, statusOrder: 'accepted' };
      }
      return order;
    });
    setListOrders(newListOrders);
    socketIo.emit('clientAcceptOrder', {
      idOrder: idOrder,
      idUser: idUser,
    });
    const accept = async () => {
      const result = await orderApi.acceptOrder(idOrder);
      console.log(result);
      // setReRender(!reRender);
    };
    accept();
  };
  // socketIo.on('serverDeleteOrder', (idOrder: string) => {
  //   console.log(idOrder);
  //   // const newListOrders = listOrders.filter(
  //   //   (order: Order) => order?._id !== idOrder
  //   // );
  //   // console.log(newListOrders);
  //   // setListOrders(newListOrders);
  // });
  React.useEffect(() => {
    socketIo.on('serverDeleteOrder', (idOrder: string) => {
      console.log(idOrder);
      setListOrders((pre) =>
        pre.filter((order: Order) => order?._id !== idOrder)
      );
    });
  }, []);
  React.useEffect(() => {
    socketIo.on('serverAcceptOrder', (idOrder: string) => {
      console.log(idOrder);
      setListOrders((pre) =>
        pre.map((order: Order) => {
          if (order._id === idOrder) {
            return { ...order, statusOrder: 'accepted' };
          }
          return order;
        })
      );
    });
  }, []);
  React.useEffect(() => {
    socketIo.on('serverCreateOrder', (order: Order) => {
      // setListOrders((pre) => pre.concat([order]));
      if (order) {
        setReRender((pre) => !pre);
      }
      return;
    });
  }, []);
  return (
    <div className="cart">
      <div className="cartForm">
        {listOrders?.map((order) => (
          <div key={order?._id} style={{ position: 'relative' }}>
            <div
              onClick={() => {
                history.push(`/details/${order?.idProduct}`);
              }}
              className="cartDetails"
            >
              <div className="cartHeader">
                <span className="cartProduct">
                  Product: {order?.titleProduct}
                </span>
                <span className="cartUsername">
                  Username: {order?.username}
                </span>
              </div>

              <div className="cartAddress">
                <span>Address: {order?.addressUser}</span>/
                <span>Phone Number:{order?.numberPhoneUser}</span>
              </div>

              <div className="cartFooter">
                <span>
                  <span className="cartNumberProduct">
                    Number: {order?.numberProduct}
                  </span>
                  <span className="cartTotalPrice">
                    Total price:
                    {totalPrice(order?.numberProduct, order?.priceProduct)}.vnd
                  </span>
                </span>
                <span className="cartStatus">Status: {order?.statusOrder}</span>
              </div>
            </div>
            {currentUser?.rules === 'user' && order?.statusOrder === 'waiting' && (
              <div
                className="cartButton"
                onClick={() => {
                  deleteOrder(order?._id);
                }}
              >
                Delete
              </div>
            )}
            {currentUser?.rules === 'admin' &&
              order?.statusOrder === 'waiting' && (
                <div
                  className="cartButton"
                  onClick={() => {
                    acceptOrder(order?._id, order?.idUser);
                  }}
                >
                  Accept
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
