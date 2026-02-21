import React from "react";
import StaffRegistry from "./Forms/StaffRegistry";


// let linkform = 
const LogIn = () => {
    return (
        <div className="bg-dark">

            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <header className="mb-auto">
                    <div>
                        <h3 className="float-md-start mb-0">
                            Alopeke HHRR
                        </h3>
                        <nav className="nav nav-masthead justify-content-center float-md-end mx-2">
                            <a className="nav-link fw-bold py-1 px-0 active" aria-current="page" href="#">
                                Inicio
                            </a>
                            <a className="nav-link fw-bold py-1 px-0 mx-2" href="#">
                                Contact
                            </a>
                        </nav>
                    </div>
                </header>
                <main className="px-3">
                    <h1>Control de Recursos Humanos</h1>
                    <div className="container">
                    <p className="lead">
                        La intención es que tengamos todo lo referente a recursos humanos registrado en esata web
                        y que quede todo automatizado de forma que podamos optimizar y reducir el margen de console.error();
                        </p>
                    </div>
                    <p className="lead">
                        <a href={<StaffRegistry/>} className="btn btn-lg btn-light fw-bold border-white bg-white">
                            Este podría ser el boton llenar formularios, podemos tener varios
                        </a>
                    </p>
                </main>
                <footer className="mt-auto text-white-50">
                    <p>
                        Cover template for
                        <a href="https://www.bing.com/ck/a?!&&p=9a9fc3ac1902d9e56a5fc3c06b25c1f0d764ec7ff58b9607e75f5bef7847def8JmltdHM9MTc3MTYzMjAwMA&ptn=3&ver=2&hsh=4&fclid=3dbb9fc4-3ce1-6ac4-029e-8a583d556bb5&psq=alopeke+centro+infantil&u=a1aHR0cHM6Ly9tdW5kb2Fsb3Bla2UuY29tLw" className="text-white">
                            MundoAlopeke
                        </a>
                        .
                    </p>
                </footer>
            </div>
        </div>

    )
}

export default LogIn;