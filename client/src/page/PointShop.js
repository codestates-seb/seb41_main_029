import { useEffect, useState } from "react";
import styled from "styled-components";

import { initialState } from "./data/state";
import theme from "../Theme";
import { Cookies } from "react-cookie";
import { getUser } from "../api/userAPI";

const ShopContainer = styled.div`
  width: 100%;
  padding: 3rem;
`;
const ShopBody = styled.div`
  width: 100%;
`;
const ShopMypoint = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: ${theme.fontSizes.fs18};
`;
const ShoptBuy = styled.div`
  width: 92%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  white-space: nowrap;
`;
const ShopItem = styled.div`
  width: 230px;
  height: 310px;
  border: 1px solid ${theme.colors.main};
  margin: 0.5rem;
  display: inline-block;
  &:hover {
    background-color: ${theme.colors.container};
  }
  @media screen and (max-width: 610px) {
  }
`;

const ItemImg = styled.img`
  width: 210px;
  height: 210px;
  margin: 0.5rem;
  display: flex;
  border: 1px solid ${theme.colors.gray_01};
`;
const ItemName = styled.span`
  margin-left: 1rem;
`;
const ItemPrice = styled.span`
  float: right;
  margin-right: 1rem;
  font-weight: 700;
`;
const ItemBtn = styled.button`
  border: none;
  border-radius: 10px;
  padding: 3px;
  width: 110px;
  color: white;
  margin-top: 10px;
  background-color: ${theme.colors.main};

  &:hover {
    background-color: ${theme.colors.main_hover};
  }
`;
const ItemBasket = styled.div`
  display: flex;
  justify-content: center;
`;
export const Basket = styled.a`
  cursor: pointer;
  text-decoration: none;
  font-size: ${theme.fontSizes.fs16};
  color: ${({ theme }) => theme.colors.main};
  display: flex;
  align-items: center;
  /* margin-right: 5rem; */
  &:hover {
    color: ${theme.colors.main_hover};
  }
`;

const PointShop = () => {
  const cookie = new Cookies();
  const Token = cookie.get("token");

  const [items] = useState(initialState.items);
  // 나의 포인트
  const [userInfo, setUserInfo] = useState([]);
  // 장바구니
  const [basket, setBasket] = useState([]);
  useEffect(() => {
    async function getUserInfo() {
      const res = await getUser(Token);
      setUserInfo(res.data.body.user);
    }
    getUserInfo();
  }, []);
  const onClick = (e) => {
    setBasket([...basket]);
  };
  console.log(basket);
  return (
    <ShopContainer>
      <ShopBody>
        <ShopMypoint>
          <div>나의 포인트 : {userInfo.point}</div>
        </ShopMypoint>
        <ShoptBuy>
          <h1>구입 가능한 상품</h1>
          <Basket>장바구니</Basket>
        </ShoptBuy>
        {items.map((item, id) => (
          <ShopItem key={item.id}>
            <ItemImg src={item.img} alt={item.name}></ItemImg>
            <ItemName>{item.name}</ItemName>
            <ItemPrice>{item.price}</ItemPrice>
            <ItemBasket>
              <ItemBtn value={item.id} onClick={() => onClick()}>
                장바구니 담기
              </ItemBtn>
            </ItemBasket>
          </ShopItem>
        ))}
      </ShopBody>
    </ShopContainer>
  );
};
export default PointShop;
