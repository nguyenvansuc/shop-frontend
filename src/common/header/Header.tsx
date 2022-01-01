import React from 'react';
import Logo2 from '../../assets/images/logo2.jpg';
import { BsClockFill, BsPhoneFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../interfaces/interface';
import { setCurrentUser } from '../../pages/currentUserSlice';
// import checkAdmin from '../../helpers/checkAdmin';
import { getFilter } from '../../pages/filterSlice';
import './Header.css';
import useCheckAdmin from '../../hooks/useCheckAdmin';
// import socketIo from '../../app/socket';

interface Props {}

const Header = (props: Props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: State) => state?.currentUser.currentUser
  );
  const checkRulesAdmin = useCheckAdmin();
  console.log(checkRulesAdmin);
  const isSignedIn = useSelector(
    (state: State) => state?.currentUser?.isSignedIn
  );
  const history = useHistory();
  const handleClickSale = () => {
    dispatch(getFilter({ title: null, category: null, sale: 'sale' }));
    history.push('/allProducts');
  };
  const handleClickSignOut = () => {
    localStorage.clear();
    // socketIo.disconnect();
    dispatch(setCurrentUser({ isSignedIn: false, currentUser: null }));
    history.push('/home');
  };
  return (
    <div className="header">
      <div className="grid-header">
        <div className="infoShop">
          <div className="leftInfoShop">
            <span className="header-icon">
              <BsClockFill />
            </span>
            <span>
              <span>Mon-Fri : 8h00-19h:00</span>
              <span>Sat,Sun : 8h30-17h:00</span>
            </span>
          </div>
          <div
            onClick={() => {
              history.push('/home');
            }}
            style={{ cursor: 'pointer' }}
          >
            <img style={{ height: '85px' }} src={Logo2} alt="Logo" />
          </div>
          <div className="rightInfoShop">
            <span className="header-icon">
              <BsPhoneFill />
            </span>
            <span>
              <span>Phone number : 0342238815</span>
              <span>Email : shop123@gmail.com</span>
            </span>
          </div>
        </div>
        <div className="navbar">
          <div className="leftNavbar">
            <span
              onClick={(): void => {
                history.push('/home');
              }}
            >
              Home
            </span>
            <span
              onClick={() => {
                dispatch(
                  getFilter({ title: null, category: null, sale: 'noSale' })
                );
                history.push('/allProducts');
              }}
            >
              All products
            </span>
            <span
              onClick={() => {
                handleClickSale();
              }}
            >
              Sale
            </span>
            <span
              onClick={() => {
                history.push('/cart');
              }}
            >
              Cart
            </span>
            {checkRulesAdmin && (
              <span
                onClick={() => {
                  history.push('/addProduct');
                }}
              >
                Add new product
              </span>
            )}
          </div>
          <div className="rightNavbar">
            {isSignedIn ? (
              <span style={{ color: 'darkgoldenrod' }}>
                {currentUser.username}
              </span>
            ) : (
              <span
                onClick={(): void => {
                  history.push('/signIn');
                }}
              >
                Sign in
              </span>
            )}
            {isSignedIn && (
              <span
                onClick={() => {
                  handleClickSignOut();
                }}
              >
                Sign out
              </span>
            )}
            {!isSignedIn && (
              <span
                onClick={(): void => {
                  history.push('/signUp');
                }}
              >
                Sign up
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
