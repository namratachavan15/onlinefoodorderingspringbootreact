import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../Config/api";
import { Spinner } from "reactstrap";

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const paymentId = searchParams.get("razorpay_payment_id");
      const orderId = searchParams.get("order_id");
      console.log("💰 Verifying Payment:", paymentId, orderId);

      if (!orderId) {
        alert("Invalid payment callback!");
        navigate("/");
        return;
      }

      try {
        const { data } = await api.get(
          `/api/payments?payment_id=${paymentId}&order_id=${orderId}`
        );

        if (data.status) {
          alert("✅ Payment Successful! Order placed successfully.");
          navigate("/"); // Redirect to home
        } else {
          alert("❌ Payment failed. Please try again.");
          navigate("/payment/failure");
        }
      } catch (error) {
        console.error("❌ Payment verification error:", error);
        alert("Payment verification failed.");
        navigate("/payment/failure");
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "80vh" }}>
      <Spinner color="primary" />
      <h5 className="mt-3 text-light">Verifying your payment...</h5>
    </div>
  );
};

export default PaymentCallback;
