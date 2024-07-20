import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button} from "@chakra-ui/react";

const Home = () => {


    return (
        <div>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}>
                <div className="row">
                            <div style={{ textAlign: 'center' }}> {/* Centre les éléments dans le conteneur parent */}
                                <h4 style={{ marginBottom:'20px'
                                }}>Welcome to SA coaching</h4>

                                <Button 
                                    style={{ marginBottom:'20px'
                                    }}>
                                <Link to="/registration" > s'inscrire à SA coaching</Link></Button>

                                <div>
                                    <p>
                                        J'ai déjà un compte
                                    </p>
                                    <Link to="/login" style={{ marginLeft: '6px' }}>
                                        <button style={{ color: 'red' }}>se connecter</button>
                                    </Link>
                                </div>                            
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default Home;
