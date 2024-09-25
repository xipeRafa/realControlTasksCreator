import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';




function App() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [usuarioState, setUsuarioState]=useState()
  const [usuarioClaveState, setClaveState]=useState()

  let uno = 'koko'
  let dos = 'lima'
  let tres = 'lona'


  const saveToLocalStorage = () => {

    if(localStorage.user === undefined){

      if(usuarioState === 'usuario1'){
          if(usuarioClaveState === 'koko'){
              localStorage.setItem('user', usuarioState)
              handleClose()
          }else{
            alert('Clave Incorrecta')
          }
      }

      if(usuarioState === 'usuario2'){
          if(usuarioClaveState === 'lima'){
              localStorage.setItem('user', usuarioState)
              handleClose()
          }else{
            alert('Clave Incorrecta')
          }
      }
      
      if(usuarioState === 'usuario3'){
          if(usuarioClaveState === 'lona'){
              localStorage.setItem('user', usuarioState)
              handleClose()
          }else{
            alert('Clave Incorrecta')
          }
      }

    }else{
      localStorage.removeItem('user')
      setTimeout(()=>{
          location.reload()
        },600)
    
    }

  }

  console.log(usuarioClaveState)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
          {localStorage.user ? 'Salir' : 'Entrar'}
      </Button>

      <Modal show={show} onHide={handleClose}>

          <Modal.Header closeButton>
              <Modal.Title> {localStorage.user ? localStorage.user : 'Entrar'}</Modal.Title>
          </Modal.Header>

            {!localStorage.user ? 
          <Modal.Body>

              <Form.Label>Usuarios:</Form.Label>
              <Form.Select
                  value={usuarioState}
                  name="usuario"
                  onChange={(e)=>setUsuarioState(e.target.value)}>

                  <option></option>
                  <option value="usuario1">Usuario 1</option>
                  <option value="usuario2">Usuario 2</option>
                  <option value="usuario3">Usuario 3</option>
              </Form.Select>

              <Form.Label>Clave:</Form.Label>
              <Form.Control type="password" onChange={(e)=>setClaveState(e.target.value)} />
            
          </Modal.Body>

          : ''}

          <Modal.Footer>
              <Button variant="primary" onClick={saveToLocalStorage}>{localStorage.user ? 'Salir' : 'Entrar'}</Button>
          </Modal.Footer>

      </Modal>


    </>
  )
}

export default App
