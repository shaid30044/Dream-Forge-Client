import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Providers/AuthProvider";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const realAmount = parseFloat(amount.offeredAmount.replace(/[^\d.]/g, ""));
  const fakeAmount = realAmount / 10000;

  useEffect(() => {
    if (fakeAmount) {
      axiosPublic
        .post("/create-payment-intent", {
          price: fakeAmount,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosPublic, fakeAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      return;
    } else {
      if (paymentIntent.status === "succeeded") {
        const date = new Date();

        const formattedNewDate = new Intl.DateTimeFormat("en-US", {
          weekday: "short",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
        })
          .format(date)
          .replace(/(\d+)\/(\d+)\/(\d+),/, "$3/$2/$1");

        const payment = {
          propertyTitle: amount.propertyTitle,
          propertyLocation: amount.propertyLocation,
          buyerEmail: amount.buyerEmail,
          buyerName: amount.buyerName,
          soldPrice: `$${realAmount}`,
          transactionId: paymentIntent.id,
          date: formattedNewDate,
          status: "bought",
        };

        const res = await axiosPublic.post("/payments", payment);

        if (res.data?.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Payment successful!",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate(-1);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "18px",
              color: "#424770",
              "::placeholder": {
                color: "#a1a1a1",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
        className=""
      />

      <div className="text-center text-red pt-8 pb-8">{error}</div>

      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="flex btn normal-case text-dark1 hover:text-white 
        bg-transparent hover:bg-primary border-2 border-dark1 
        hover:border-primary rounded-full duration-300 px-10 m-auto"
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
