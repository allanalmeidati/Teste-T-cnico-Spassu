import 'bootstrap/dist/css/bootstrap.min.css';
import Livro from "./pages/livro";
import * as React from "react";
import './App.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import FormLivro from "./pages/livro/Form.tsx";
import {ToastProvider} from "./contexts/ToastContext.tsx";
import Assunto from "./pages/assunto/List.tsx";
import FormAssunto from "./pages/assunto/Form.tsx";
import Autor from "./pages/autor/List.tsx";
import FormAutor from "./pages/autor/Form.tsx";
import Button from "react-bootstrap/Button";
import Home from "./pages/index/Home.tsx";



function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/livro",
            element: <Livro/>,
        },
        {
            path: "/livro/cadastro",
            element: <FormLivro/>,
        },
        {
            path: "/livro/editar/:id",
            element: <FormLivro/>,
        },

        {
            path: "/assunto",
            element: <Assunto/>,
        },
        {
            path: "/assunto/cadastro",
            element: <FormAssunto/>,
        },
        {
            path: "/assunto/editar/:id",
            element: <FormAssunto/>,
        },

        {
            path: "/autor",
            element: <Autor/>,
        },
        {
            path: "/autor/cadastro",
            element: <FormAutor/>,
        },
        {
            path: "/autor/editar/:id",
            element: <FormAutor/>,
        },

    ]);

  return (
      <React.StrictMode>
          <ToastProvider>
              <Container fluid="sm">
                  <RouterProvider router={router}/>
              </Container>
          </ToastProvider>

      </React.StrictMode>
  )
}

export default App
