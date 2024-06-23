const checkout = async () => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

    const cartProducts = data.map((product) => ({
        productTitle: product?.productId?.productName,
        image: product?.productId?.productImage[0],
        price: product?.productId?.sellingPrice,
        quantity: product?.quantity,
    }));

    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData) {
        console.error("User data is not available in localStorage.");
        return;
    }

    const body = {
        products: cartProducts,
        userId: userData.userId
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/checkout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
        sessionId: session.id,
    });

    if (result.error) {
        console.error("Error al redirigir a Stripe:", result.error.message);
    }
}
