import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Text } from "@chakra-ui/react";
import home from '../images/home.jpg';

const Home = () => {
  const imageStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    pointerEvents: 'none',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    position: 'relative',
    zIndex: 1,
  };

  const buttonContainerStyle = {
    position: 'absolute',
    top: '50px',
    right: '30px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  };

  const buttonStyle = {
    marginLeft: '10px'
  };

  const boxContainerStyle = {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    // backgroundColor: 'white',
    // borderRadius: '50px',
    width: '700px',
    padding: '20px',
  };

  return (
    <div>
      <img src={home} alt="background" style={imageStyle} />
      <div style={buttonContainerStyle}>
        <Button borderRadius={50} bg='#83d3e1' color={"whitesmoke"}>
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Se connecter</Link>
        </Button>
        <Button style={buttonStyle} borderRadius={50} bg='#83d3e1' color={"whitesmoke"} >
          <Link to="/registration" style={{ textDecoration: 'none', color: 'inherit' }}>S'inscrire</Link>
        </Button>
      </div>
      <div className="container" style={containerStyle}>
        <div className="row">
          <div style={boxContainerStyle}>
            <Text fontWeight={700} fontSize={20} color='#061C60' marginRight="60px" marginBottom="-0.5px">Commencez maintenant avec SA Coaching</Text>
            <Button borderRadius={50} bg='#83d3e1' color={"whitesmoke"}>
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Se connecter</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
