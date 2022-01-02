import React from 'react';
import { useParams } from 'react-router-dom';
import productApi from '../../app/api/productApi';
import './Details.css';
// import SubmitButton from '../../common/button/SubmitButton';
import { FaShoppingCart } from 'react-icons/fa';
import { Order, State } from '../../interfaces/interface';
import { useSelector } from 'react-redux';
// import { FiLoader } from 'react-icons/fi';
// import { getProduct } from '../detailsProductSlice';
import orderApi from '../../app/api/orderApi';
import SubmitButton from '../../common/button/SubmitButton';
import checkAdmin from '../../helpers/checkAdmin';
import { useHistory, useRouteMatch } from 'react-router-dom';
import socketIo from '../../app/socket';

interface Props {}
interface Params {
  id: string;
}

const Details = (props: Props) => {
  // const details = useSelector((state: State) => state.detailsProduct.product);
  // console.log(details, 'details');
  // const isLoading = useSelector(
  //   (state: State) => state.detailsProduct.isLoading
  // );
  // const dispatch = useDispatch();
  const match = useRouteMatch();
  console.log(match);
  const history = useHistory();
  const currentUser = useSelector(
    (state: State) => state.currentUser.currentUser
  );
  console.log(currentUser?.id, 'xxxxxxxxxxxxxxxxxxxx');
  const checkRulesAdmin = checkAdmin(currentUser);
  console.log(checkRulesAdmin);
  const [addressUser, setAddressUser] = React.useState<string>('');
  const [phoneNumberUser, setPhoneNumberUser] = React.useState<string>('');
  // console.log(addressUser);
  // console.log(phoneNumberUser);
  const [note, setNote] = React.useState('');
  // console.log({ addressUser, phoneNumberUser });
  const [turnOnAddress, setTurnOnAddress] = React.useState<boolean>(false);
  const [number, setNumber] = React.useState<number>(1);
  const params: Params = useParams();
  const id = params.id;
  // console.log(id);
  const [product, setProduct] = React.useState<any>({});
  React.useEffect(() => {
    const fetchDetails = async (id: string) => {
      const result = await productApi.getDetailsProduct(id);
      setProduct(result.product);
    };
    fetchDetails(id);
  }, [id]);
  console.log(product);
  const complete = () => {
    let order: Order = {
      idProduct: product?._id,
      idUser: currentUser.id,
      numberPhoneUser: phoneNumberUser.trim(),
      numberProduct: number,
      titleProduct: product?.title,
      addressUser: addressUser.trim(),
      priceProduct: +product?.price,
      username: currentUser?.username,
    };
    if (order.addressUser === '') {
      setNote('Your address Incorrect!');
      return;
    }
    if (order.numberPhoneUser === '') {
      setNote('Your phone number Incorrect!');
      return;
    }
    console.log(order);
    const createNewOrder = async () => {
      const result = await orderApi.createOrder(order);
      console.log(result, 'result');
      setNote(result?.message);
      socketIo.emit('clientCreateOrder', order);
      history.push('/cart');
    };
    createNewOrder();
  };
  const deleteProduct = (idProduct: string) => {
    console.log(idProduct);
    const del = async () => {
      const result = await productApi.deleteProduct(idProduct);
      console.log(result, 'result');
      history.push('/allProducts');
    };
    del();
  };

  return (
    <div className="details">
      {/* {isLoading && (
        <div>
          <FiLoader />
          Loading.......
        </div>
      )} */}
      <div className="detailsForm">
        <div className="detailsImage">
          <img src={product?.imageUrl} alt="" />
        </div>
        <div className="detailsDesc">
          <h2 className="detailsTitle">{product?.title}</h2>
          <p className="detailsDescription">
            Description : <span>{product?.desc}</span>
          </p>
          <p className="detailsPrice">
            Price : <span>{product?.price}.vnd</span>
          </p>
          <p className="detailsCategory">
            Category : <span>{product?.category}</span>
          </p>
          <div className="detailsNumber">
            <button
              onClick={() => {
                if (number > 1) {
                  setNumber(number - 1);
                }
              }}
            >
              -
            </button>
            <span>{number}</span>
            <button
              onClick={() => {
                setNumber(number + 1);
              }}
            >
              +
            </button>
          </div>
          <div>
            <button
              className="detailsButton"
              onClick={() => {
                if (!currentUser) {
                  history.push({
                    pathname: '/signIn',
                    state: { from: match?.url },
                  });
                  return;
                }
                setTurnOnAddress(!turnOnAddress);
                // dispatch(getProduct(id));
              }}
            >
              {/* <SubmitButton title="Buy" /> */}
              Buy NOW ! <FaShoppingCart />
            </button>
            {turnOnAddress && (
              <div className="addressAndPhone">
                <div className="addressUser">
                  <label>Enter your name and address:</label>
                  <textarea
                    placeholder="Enter your name and address"
                    onChange={(e) => {
                      setAddressUser(e.target.value);
                    }}
                    value={addressUser}
                  />
                </div>
                <div className="phoneNumberUser">
                  <label>Enter your name phone number:</label>
                  <input
                    type="number"
                    placeholder="Enter your name phone number"
                    onChange={(e) => {
                      setPhoneNumberUser(e.target.value);
                    }}
                    value={phoneNumberUser}
                  />
                </div>
                <div style={{ color: 'red' }}>{note}</div>
                <button onClick={() => complete()}>Complete !</button>
              </div>
            )}
          </div>
          {checkRulesAdmin && (
            <div
              style={{ marginTop: '20px' }}
              onClick={() => {
                deleteProduct(product?._id);
              }}
            >
              <SubmitButton title="Delete" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
