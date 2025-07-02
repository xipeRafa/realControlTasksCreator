import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




 import { firestoreDB, storageDocs } from './firebase/firebaseConfig';

 import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  where,
  query,
} from 'firebase/firestore';



 const msecToDateNumbers =(milliseconds)=>{ // '16/8/2024, 12:00:00 a.m.'
      return new Date(milliseconds).toLocaleString()
  }







function App() {


  const [items, setItems] = useState([]);


  const itemCollection = query(
      collection(firestoreDB, 'tasksRealControl'),
      where('asignadoPara', '==', localStorage.getItem('user'))
  )

  const [toggle, setToggle] = useState(true)

  useEffect(() => {

      getDocs(itemCollection).then((resp) => {

          if (resp.size === 0) {
              console.log('No results!');
          }

          const documents = resp.docs.map((doc) => (
              { id: doc.id, ...doc.data() }
          ))

          setItems(documents);

      }).catch((err) => {
          console.log('Error searching items', err)
      })

  }, [toggle])



  const updateById = async (id, obj) => {

    if (confirm("Marcar como Servicio Iniciado")) {

        obj.completed = true
        obj.completedTime = Date.now()
        delete obj.id

        const aDoc = doc(firestoreDB, 'tasksRealControl', id)

        try {
            await updateDoc(aDoc, obj);
        } catch (error) {
            console.error(error);
        }

        setToggle(!toggle)

    }

  }



   const updateById2 = async (id, obj) => {

    if (confirm("Firmar como Servicio Realizado")) {

        obj.signedCustomer = true
        obj.signedCustomerTime = Date.now()
        delete obj.id


        const aDoc = doc(firestoreDB, 'tasksRealControl', id)

        try {
            await updateDoc(aDoc, obj);
        } catch (error) {
            console.error(error);
        }

        setToggle(!toggle)

    }

  }




  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [usuarioState, setUsuarioState]=useState()
  const [usuarioClaveState, setClaveState]=useState()

  let admin = 'admin'
  let uno = 'koko'
  let dos = 'lima'
  let tres = 'lona'


  const saveToLocalStorage = () => {

    if(localStorage.user === undefined){

      if(usuarioState === 'admin'){
          if(usuarioClaveState === 'admin'){
              localStorage.setItem('user', usuarioState)
              handleClose()
              setTimeout(()=>{ location.reload() },600)
          }else{
              alert('Clave Incorrecta')
          }
      }

      if(usuarioState === 'usuario1'){
          if(usuarioClaveState === 'koko'){
              localStorage.setItem('user', usuarioState)
              handleClose()
              setTimeout(()=>{ location.reload() },1600)
          }else{
              alert('Clave Incorrecta')
          }
      }

      if(usuarioState === 'usuario2'){
          if(usuarioClaveState === 'lima'){
              localStorage.setItem('user', usuarioState)
              handleClose()
              setTimeout(()=>{ location.reload() },1600)
          }else{
              alert('Clave Incorrecta')
          }
      }
      
      if(usuarioState === 'usuario3'){
          if(usuarioClaveState === 'lona'){
              localStorage.setItem('user', usuarioState)
              handleClose()
              setTimeout(()=>{ location.reload() },1600)
          }else{
              alert('Clave Incorrecta')
          }
      }

    }else{
        localStorage.removeItem('user')
        setTimeout(()=>{ location.reload() },1600)
    }

  }




  const[taskState, setTaskState]=useState({
    asignadoPara:"",
    comentarios:"",
    consumibles:"",
    direccionCliente:"",
    fechaMeta:"",
    nombreCliente:"",
    servicioDescripcion:"",
    tipoDeServicio:"",
    correoCliente:"",
    telefonoCliente:""
  })



  const {
    asignadoPara,
    comentarios,
    consumibles,
    direccionCliente,
    fechaMeta,
    nombreCliente,
    servicioDescripcion,
    tipoDeServicio,
    correoCliente,
    telefonoCliente
  } = taskState


  const handlerTaskState=({target})=>{
      const {name, value} = target
      setTaskState({...taskState, [name]:value})
  }



  const postCollection = collection(firestoreDB, 'tasksRealControl');

  const guardar =()=>{

      if (asignadoPara.trim() === '' ||
          correoCliente.trim() === '' ||
          telefonoCliente.trim() === '' ||
          comentarios.trim() === '' ||
          consumibles.trim() === '' ||
          direccionCliente.trim() === '' ||
          fechaMeta.trim() === '' ||
          nombreCliente.trim() === '' ||
          servicioDescripcion.trim() === '' ||
          tipoDeServicio.trim() === '' ){
              alert('Algun Campo esta Vacio')
              return
          }

      if (confirm("Crear Servicio")) {
          taskState.createdAt = Date.now()
          taskState.completed = false
          taskState.signedCustomer = false
          addDoc(postCollection, taskState)
          setTaskState({
              asignadoPara:"",
              correoCliente:"",
              telefonoCliente:"",
              comentarios:"",
              consumibles:"",
              direccionCliente:"",
              fechaMeta:"",
              nombreCliente:"",
              servicioDescripcion:"",
              tipoDeServicio:""
          })
      }

  }




    const [doneState, setDoneState]=useState(false)

    const[sliceState, setSliceState]=useState(0)
    let prodByPage = 4;
    const[sliceAlert, setSliceAlert]=useState('')


 let today = new Date().toISOString().slice(0, 10); // 2025-06-18


    const [DateMS, setDateMS]=useState()

console.log(DateMS)
    const setDate=(e)=>{
        let DateToCero = Date.parse(e.target.value.replace('-', '/').replace('-', '/'))
        setDateMS(DateToCero)
    }













  return (
    <>
      <Button variant="primary" onClick={handleShow} className='botonEntrar'>
          {localStorage.user} {localStorage.user ? '➪' : 'Entrar'} 
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
                  <option value="admin">Admin</option>
                  <option value="usuario1">Usuario 1</option>
                  <option value="usuario2">Usuario 2</option>
                  <option value="usuario3">Usuario 3</option>
              </Form.Select>

              <Form.Label>Clave:</Form.Label>
              <Form.Control type="password" onChange={(e)=>setClaveState(e.target.value)} />
            
          </Modal.Body>

          : ''}

          <Modal.Footer>
              <Button variant="primary" onClick={saveToLocalStorage}>{localStorage.user ? 'Salir ➪' : 'Entrar'}</Button>
          </Modal.Footer>

      </Modal>

    {localStorage.user === 'admin' ? 
      <Container>
      <h2>Creador de Servicios</h2>
        <Row>
        <Col>

      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Nombre de Cliente</Form.Label>
        <Form.Control type="text" name='nombreCliente' value={nombreCliente} onChange={(e)=>handlerTaskState(e)} />

        <Form.Label>Direccion de Cliente</Form.Label>
        <Form.Control type="text" name='direccionCliente' value={direccionCliente} onChange={(e)=>handlerTaskState(e)}/>

        <Form.Label>Telefono de Cliente</Form.Label>
        <Form.Control type="text" name='telefonoCliente' value={telefonoCliente} onChange={(e)=>handlerTaskState(e)}/>

        <Form.Label>Correo de Cliente</Form.Label>
        <Form.Control type="mail" name='correoCliente' value={correoCliente} placeholder='@' onChange={(e)=>handlerTaskState(e)}/>

        <Form.Label>Descripción del Servicio</Form.Label>
        <Form.Control type="text" name='servicioDescripcion' value={servicioDescripcion} onChange={(e)=>handlerTaskState(e)}/>

        <Form.Label>Fecha y Hora</Form.Label>
        <Form.Control type="text" name='fechaMeta' value={fechaMeta} onChange={(e)=>handlerTaskState(e)}/>

        <Form.Label>Tipo de Servicio</Form.Label>
        <Form.Select
              value={tipoDeServicio}
              name='tipoDeServicio' 
              onChange={(e)=>handlerTaskState(e)}>

              <option></option>
              <option value="domestica chica">Domestica Chica</option>
              <option value="comercial chica">Comercial Chica</option>
              <option value="industrial chica">Industrial Chica</option>

              <hr />
              <option value="domestica mediana">Domestica Mediana</option>
              <option value="comercial mediana">Comercial Mediana</option>
              <option value="industrial mediana">Industrial Mediana</option>

              <hr />
              <option value="domestica grande">Domestica Grande</option>
              <option value="comercial grande">Comercial Grande</option>
              <option value="industrial grande">Industrial Grande</option>
        </Form.Select>

      {/*  <Form.Label>Consumibles a Utilizar</Form.Label>
        <Form.Control as="textarea" name='consumibles' value={consumibles} onChange={(e)=>handlerTaskState(e)} />*/}










        <Form.Label>Consumibles a Utilizar</Form.Label>
        <Form.Select
              value={consumibles}
              name='consumibles' 
              onChange={(e)=>handlerTaskState(e)}>

              <option></option>

              <option value="Cipermetrina - ELegy">Cipermetrina - ELegy</option>
              
              <option value="Pybuthrin">Pybuthrin</option>
              <option value="Biothrine">Biothrine</option>
              <option value="Ficam w">Ficam w</option>

              <hr />
              <option value="Max force">Max force</option>
              <option value="Starycide">Starycide</option>
              <option value="Demand 2.5 CS">Demand 2.5 CS</option>

              <hr />
              <option value="Termidor Duo">Termidor Duo</option>
              <option value="Racumid">Racumid</option>
              <option value="Contrac Blox">Contrac Blox</option>

              <hr />
              <option value="Vastrap Pegamento">Vastrap Pegamento</option>
              <option value="Trampa para ratones con pedal">Trampa para ratones con pedal</option>
              <option value="Trampa De Captura Múltiple">Trampa De Captura Múltiple</option>
        </Form.Select>

















        <Form.Label>Asignar a:</Form.Label>
        <Form.Select
              value={asignadoPara}
              name='asignadoPara' 
              onChange={(e)=>handlerTaskState(e)}>

              <option></option>
              <option value="usuario1">Usuario 1</option>
              <option value="usuario2">Usuario 2</option>
              <option value="usuario3">Usuario 3</option>
        </Form.Select>

      
        </Form.Group>



        <Form.Label>Comentarios</Form.Label>
        <Form.Control as="textarea"  name='comentarios' value={comentarios} onChange={(e)=>handlerTaskState(e)} />


      </Form>

      <Button variant="primary" onClick={guardar}>
          GUARDAR
      </Button>

      <br />
       <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />



        </Col>
        </Row>
      </Container>

          : 



      <Container>
        {localStorage.user !== 'admin' && localStorage.user !== undefined ?

          <div>
            <Col>
            <Form.Label htmlFor="inputPassword5">Selecciona una Fecha y Busca en Pendientes</Form.Label>
                <Form.Control type="date" onChange={(e)=>setDate(e)}/>
            </Col>

            <Col>
                <Button  className='mb-1 w-100' variant="dark" onClick={()=>{setDoneState(!doneState),setSliceState(0)}}>
                    {doneState ? 'INICIADOS' : 'PENDIENTES'}
                </Button>
            </Col> 
          </div>:''}

        <Row>
                   <Col>
              {items?.slice(sliceState, sliceState + prodByPage)
                      .filter(el=>el.createdAt > DateMS)
                      .filter(el=>el.createdAt < DateMS + 86400000)
                      // .sort((a, b) => b.createdAt - a.createdAt)
                      .filter(el => el.completed === doneState)
                      .map((el, i)=>(

                  <div key={i} className='item'>

                    <hr />
                    <p><span>Cliente:</span> {el.nombreCliente}</p>
                    <p><span>Direccion:</span> {el.direccionCliente}</p>
                    <p><span>Correo:</span> {el.correoCliente}</p>
                    <p><span>Telefono:</span> {el.telefonoCliente}</p>
                    <p><span>Servicio:</span> {el.servicioDescripcion}</p>
                    <p><span>Hora:</span> {el.fechaMeta}</p>
                    <p><span>Tipo:</span> {el.tipoDeServicio}</p>
                    <p><span>Consumibles:</span> {el.consumibles}</p>
                    <p><span>Comentarios:</span> {el.comentarios}</p>
                    <p><span>Tarea Creada el:</span> {msecToDateNumbers(el.createdAt)}</p>

                    <Button disabled={el.completed} variant="primary" className={el.completed ? '' : 'red'} onClick={()=>updateById(el.id, el)}>
                        {el.completed ? 'Iniciado' : 'Pendiente'}
                    </Button>

                    <p className={!el?.completedTime ? 'd-none' : 'warning'}>
                        Iniciado el: {msecToDateNumbers(el?.completedTime)}
                    </p>


                    <Button disabled={el.signedCustomer} variant="primary" className={el.signedCustomer ? '' : 'red'} onClick={()=>updateById2(el.id, el)}>
                        {!el.signedCustomer ? 'Firmar' : 'Firmado'}
                    </Button>

                    <p className={!el?.signedCustomerTime ? 'd-none' : 'warning'}>
                        Firmado el: {msecToDateNumbers(el?.signedCustomerTime)}
                    </p>


                    <hr />
                  </div>
                ))}
          </Col>
        </Row>


         {localStorage.user !== 'admin' && localStorage.user !== undefined ? 
          <div>


                <div className='sliceButtons'>

            <button className={sliceState === 0 ? 'd-none' : 'button'} 
                    onClick={()=>{
                        if(sliceState > 0){
                            setSliceState(sliceState - prodByPage)
                            window.scrollTo(0,0)
                        }
                    }}>
                    ⇦ Anterior
            </button>  



            <button className={sliceState === prodByPage || sliceState === 0 ? 'd-none' : 'button'} 
                    onClick={()=>{ 
                        setSliceState(0)
                        window.scrollTo(0,0) 
                    }}>
                    0
            </button>   



            <button className='button my-5' onClick={()=>{ 
                                    if(items.filter(el=>el.createdAt > DateMS)
                                            .filter(el=>el.createdAt < DateMS + 86400000)
                                            .filter(el => el.completed === doneState).length > sliceState + prodByPage){

                                                  setSliceState(sliceState + prodByPage) 
                                                  window.scrollTo(0,0) 
                                    }else{
                                                  setSliceAlert(' No Hay Mas Servicios En Esta Lista')
                                                  setTimeout(()=>{
                                                      setSliceAlert('')
                                                  },2500)
                                    }
                                }
                    }>
                        Siguiente ⇨ 
            </button>  


            <span className='sliceAlert'>{sliceAlert}</span>

{/*
            <p className='sliceButtonsP'>De: {sliceState + 1} a: {items.filter(el=>el.createdAt > DateMS).filter(el=>el.createdAt < DateMS + 86400000).length > sliceState + prodByPage ? sliceState + prodByPage : items.length}</p>
            <p className='sliceButtonsP'>Paginas de {prodByPage} Servicios </p>*/}

        </div>


          </div>:''}



      </Container>






        }


    </>
  )
}

export default App
