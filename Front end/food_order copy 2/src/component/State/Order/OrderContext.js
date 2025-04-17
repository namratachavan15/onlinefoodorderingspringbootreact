import React, { createContext, useContext, useState } from "react";
import { api } from '../../Config/api';
// Create a context for the order
const OrderContext = createContext();

// Custom hook to use the OrderContext

// Create the provider
export const OrderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    // Create order function
    const createOrder = async (reqData) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post("api/order", reqData.order, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            if (data.payment_url) {
                window.location.href = data.payment_url;
            }
            setOrders((prevOrders) => [...prevOrders, data]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    // Get user orders function
    const getUsersOrders = async (jwt) => {

     
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.get(`/api/order/user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            setOrders(data);
         
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    // Get notifications function (if needed)
    const getUsersNotifications = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.get("api/notifications");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    return (
        <OrderContext.Provider
            value={{
                loading,
                orders,
                error,
                createOrder,
                getUsersOrders,
                getUsersNotifications,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};
export const useOrderContext = () => {
    return useContext(OrderContext);
};
