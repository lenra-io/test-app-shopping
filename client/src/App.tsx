import React, { useState } from 'react';
import './App.css'
import { AddProductForm } from './components/AddProductForm.tsx'
import { ProductListItem } from './components/ProductListItem.tsx';
import { Product } from './data/Product.ts';
import { User } from './data/User.ts';
import { UserSelectionModal } from './components/UserSelectionModal.tsx';
import { LoginForm } from './components/LoginForm.tsx';


export const UserListContext = React.createContext<User[] | undefined>(undefined);
export const UserContext = React.createContext<User | undefined>(undefined);


const currentUser = new User("1");
const otherUser = new User("2");

export default function App() {
  const [
    user,
    _setUser
  ] = useState<User>(currentUser);
  const [
    userList,
    // _setUserList
  ] = useState<User[]>([currentUser, otherUser]);
  const [
    selectUserForProduct,
    setSelectUserForProduct
  ] = useState<Product>();

  const [products, setProducts] = useState([
    new Product("1", currentUser, "Product 1"),
    new Product("2", otherUser, "Product 2", "2Kg"),
    new Product("3", currentUser, "Product 3"),
    new Product("4", otherUser, "Product 4", undefined, true),
    new Product("5", currentUser, "Product 5", "2", true),
  ]);

  if (!user)
    return (
      <LoginForm onLogin={(username, password) => {
        // TODO: Implement login if needed
        if (username === "user" && password === "password") {
          _setUser(currentUser);
          return Promise.resolve();
        }
        return Promise.reject(new Error("The login method is not implemented"));
      }} />
    );

  return (
    <>
      <AddProductForm onSave={(product, quantity) => {
        setProducts([...products, new Product((Math.random() * 1000).toString(), user, product, quantity)]);
        return Promise.resolve();
      }} />
      <UserListContext.Provider value={userList}>
        <UserContext.Provider value={user}>
          <UserSelectionModal
            open={selectUserForProduct !== undefined}
            onUserSelected={(user) => {
              selectUserForProduct!.assignee = user;
              setSelectUserForProduct(undefined);
            }}
            onClose={() => setSelectUserForProduct(undefined)}
          />
          <ul className="products">
            {
              products
                .filter(p => !p.ckecked)
                .map(p => mapProductItem(p))
            }
          </ul>
          <details>
            <summary>Checked</summary>
            <ul className="products">
              {
                products
                  .filter(p => p.ckecked)
                  .map(p => mapProductItem(p))
              }
            </ul>
          </details>
        </UserContext.Provider>
      </UserListContext.Provider>
    </>
  )

  function mapProductItem(product: Product) {
    return <ProductListItem
      key={product.id}
      product={product}
      onCheckChange={_checked => {
        setProducts([...products]);
        return Promise.resolve();
      }}
      onSelectAssignee={() => setSelectUserForProduct(product)}
    />;
  }
}
