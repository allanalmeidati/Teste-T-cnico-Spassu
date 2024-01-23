import Button from 'react-bootstrap/Button';
import { AiFillBook } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { MdSubject } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="d-grid gap-2 m-sm-auto mt-lg-5" >
            <Button variant="primary" size="lg" onClick={() => navigate('/livro')}>
                <span style={{marginRight:10}}>Livros</span><BsBook />
            </Button>
            <Button variant="success" size="lg" onClick={() => navigate('/assunto')}>
                <span style={{marginRight:10}}>Assuntos</span><MdSubject />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/autor')}>
                <span style={{marginRight:10}}>Autores</span><TfiWrite />
            </Button>
        </div>
    );
}

export default Home;