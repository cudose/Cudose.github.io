function payWithPaystack() {
    let payButton = document.getElementById("payButton");
    payButton.innerHTML = "Processing...";
    payButton.disabled = true;

    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("emailAddress").value;
    let phone = document.getElementById("phoneNumber").value;

    if (!fullName || !email || !phone) {
        alert("Please fill in all required fields before proceeding.");
        payButton.innerHTML = "Pay 5,000 NGN";
        payButton.disabled = false;
        return;
    }

    let handler = PaystackPop.setup({
        // key: 'pk_test_59fdf3cb0cd1428a5bef4455cbbff302caa38f4d',
        key: 'pk_live_65837f2f37e61a8a415626d10a6ee421fafee84a',
        email: email,
        amount: 500000, 
        currency: "NGN",
        ref: 'TXN_' + Math.floor((Math.random() * 1000000000) + 1), 
        metadata: {
            custom_fields: [
                { display_name: "Full Name", variable_name: "full_name", value: fullName },
                { display_name: "Phone Number", variable_name: "phone_number", value: phone }
            ]
        },
        callback: function(response) {
            document.getElementById("paymentForm").innerHTML = `
                <div class="alert alert-success text-center">
                    <h4>🎉 Payment Successful!</h4>
                    <p>Transaction Reference: <strong>${response.reference}</strong></p>
                    <p>Check your email for confirmation.</p>
                    <a href="index.html" class="btn btn-primary mt-3">Go to Home</a>
                </div>
            `;

            // Redirect to the Thank You page with the transaction reference
            window.location.href = "thank-you.html?ref=" + response.reference;
        },
        onClose: function() {
            document.getElementById("paymentForm").innerHTML += `
                <div class="alert alert-danger text-center">
                    <h4>⚠️ Payment Not Completed</h4>
                    <p>You closed the payment window. Try again.</p>
                    <button class="btn btn-danger" onclick="payWithPaystack()">Retry Payment</button>
                </div>
            `;

            payButton.innerHTML = "Pay 5,000 NGN";
            payButton.disabled = false;
        }
    });

    handler.openIframe();
}
