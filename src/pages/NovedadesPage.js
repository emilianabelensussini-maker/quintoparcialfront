import { useState, useEffect } from 'react';
import axios from 'axios';

const NovedadesPage = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [fotos, setFotos] = useState([]);

    useEffect(() => {
        const cargarFotos = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/galeria`);
                setFotos(response.data);
            } catch (err) {
                console.log(err);
                setError(true);
            }
            setLoading(false);
        };
        cargarFotos();
    }, []);

    return (
        <main className="holder">
            <h2 style={{ textAlign: 'center' }}>Departamento y Monoambiente</h2>
            <div className="galeria">
                {loading ? (
                    <p>Cargando...</p>
                ) : error ? (
                    <p>No se pudieron cargar las fotos. Intentá de nuevo más tarde.</p>
                ) : fotos.length === 0 ? (
                    <p>Próximamente habrá fotos disponibles.</p>
                ) : (
                    fotos.map(foto => (
                        <img key={foto.id} src={foto.imagen} alt={foto.titulo} style={{ width: '50%', height: 'auto' }} />
                    ))
                )}
            </div>
        </main>
    );
}

export default NovedadesPage;