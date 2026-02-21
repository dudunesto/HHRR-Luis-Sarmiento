import React from "react";

const StaffRegistry = () => {
    return (
        <body className="bg-body-tertiary">

            <svg xmlns="http://www.w3.org/2000/svg" className="d-none">
                <symbol id="check2" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"></path>
                </symbol>

                <symbol id="circle-half" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"></path>
                </symbol>

                <symbol id="moon-stars-fill" viewBox="0 0 16 16">
                    <path d="M6 .278a.768.768 0 0 1 .08.858..."></path>
                    <path d="M10.794 3.148a.217.217 0 0 1 .412 0..."></path>
                </symbol>

                <symbol id="sun-fill" viewBox="0 0 16 16">
                    <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z..."></path>
                </symbol>
            </svg>

            <div className="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
                <button className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
                    id="bd-theme"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    aria-label="Toggle theme (light)">
                    <svg className="bi my-1 theme-icon-active" aria-hidden="true">
                        <use href="#sun-fill"></use>
                    </svg>
                    <span className="visually-hidden" id="bd-theme-text">Toggle theme</span>
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
                    <li>
                        <button type="button"
                            className="dropdown-item d-flex align-items-center active"
                            data-bs-theme-value="light"
                            aria-pressed="true">
                            <svg className="bi me-2 opacity-50">
                                <use href="#sun-fill"></use>
                            </svg>
                            Light
                            <svg className="bi ms-auto d-none">
                                <use href="#check2"></use>
                            </svg>
                        </button>
                    </li>

                    <li>
                        <button type="button"
                            className="dropdown-item d-flex align-items-center"
                            data-bs-theme-value="dark"
                            aria-pressed="false">
                            <svg className="bi me-2 opacity-50">
                                <use href="#moon-stars-fill"></use>
                            </svg>
                            Dark
                            <svg className="bi ms-auto d-none">
                                <use href="#check2"></use>
                            </svg>
                        </button>
                    </li>

                    <li>
                        <button type="button"
                            className="dropdown-item d-flex align-items-center"
                            data-bs-theme-value="auto"
                            aria-pressed="false">
                            <svg className="bi me-2 opacity-50">
                                <use href="#circle-half"></use>
                            </svg>
                            Auto
                            <svg className="bi ms-auto d-none">
                                <use href="#check2"></use>
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>

            <div className="container">
                <main>

                    <div className="py-5 text-center">
                        <img className="d-block mx-auto mb-4"
                            src="/docs/5.3/assets/brand/bootstrap-logo.svg"
                            alt=""
                            width="72"
                            height="57"></img>
                        <h1 className="h2">Checkout form</h1>
                        <p className="lead">
                            Below is an example form built entirely with Bootstrap’s form controls.
                        </p>
                    </div>

                    <div className="row g-5">

                        {/* <!-- CART --> */}
                        <div className="col-md-5 col-lg-4 order-md-last">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-primary">Your cart</span>
                                <span className="badge bg-primary rounded-pill">3</span>
                            </h4>

                            <ul className="list-group mb-3">
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Total (USD)</span>
                                    <strong>$20</strong>
                                </li>
                            </ul>

                            <form className="card p-2">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Promo code"></input>
                                    <button type="submit" className="btn btn-secondary">Redeem</button>
                                </div>
                            </form>
                        </div>

                        {/* <!-- BILLING --> */}
                        <div className="col-md-7 col-lg-8">
                            <h4 className="mb-3">Billing address</h4>

                            <form className="needs-validation" novalidate>
                                <div className="row g-3">

                                    <div className="col-sm-6">
                                        <label for="firstName" className="form-label">First name</label>
                                        <input type="text" className="form-control" id="firstName" required></input>
                                        <div className="invalid-feedback">
                                            Valid first name is required.
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <label for="lastName" className="form-label">Last name</label>
                                        <input type="text" className="form-control" id="lastName" required></input>
                                        <div className="invalid-feedback">
                                            Valid last name is required.
                                        </div>
                                    </div>

                                </div>

                                <hr className="my-4"></hr>

                                <h4 className="mb-3">Payment</h4>

                                <div className="my-3">
                                    <div className="form-check">
                                        <input id="credit" name="paymentMethod" type="radio" className="form-check-input" checked required></input>
                                        <label className="form-check-label" for="credit">Credit card</label>
                                    </div>
                                </div>

                                <hr className="my-4"></hr>

                                <button className="w-100 btn btn-primary btn-lg" type="submit">
                                    Continue to checkout
                                </button>

                            </form>
                        </div>

                    </div>

                </main>

            </div>

            <script src="/docs/5.3/dist/js/bootstrap.bundle.min.js"></script>
            <script src="checkout.js"></script>

        </body>
    )
}

export default StaffRegistry