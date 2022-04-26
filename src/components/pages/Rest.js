import '../styles/indexBackground.css';
import videoBack from '../../assets/videos/planeta.mp4';
//se agrega la depedencia de axios para hacer los solicitudes GET,POST,PUS,DELETE
import axios from 'axios';
import { Component } from 'react';
import '../styles/Estilos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


//importando componentes

//Las Url donde se conectaran la api
const url ="http://localhost:1010/api/users"
const url2 = "http://localhost:1010/api/created"
const url3 = "http://localhost:1010/api/update/"
const url4 = "http://localhost:1010/api/delete/"
//Se comienza una clase para poder utilizar el estado
class App extends Component
  {
    //Aca se almacena toda nuestra data
    state=
    {
      data:[],
      modalInsertar: false,
      form:
        {
          id: '',
          nombre: '',
          apellido: '',
          tipoModal:''
        }
      }
      //aca utilizamos el metodo get 
      peticionGet=()=>
      {
        //aca se utila el axios para poder accceder a los metodos (GET,POST,PUT,DELETE), si la peticion es exitosa 
        //se lo guardar en el estado o si no nos dara un error.
        axios.get(url).then(response=>
        {
          this.setState({data: response.data}); 
        })
        .catch(error=>
          {
            console.log(error.message);
          })
      }
      peticionPost=async()=>
      {     
        await axios.post(url2,this.state.form).then(response=>
          {
            this.insertar();
            this.peticionGet();
          })
          .catch(error=>
            {
              console.log(error.message);
            })
      }
      peticionPut=()=>
      {
        axios.put(url3+this.state.form.id, this.state.form).then(response=>
          {
            this.insertar();
            this.peticionGet();
          })
      }
      peticionDelete=()=>
        {
          axios.delete(url4+this.state.form.id).then(response=>
            {
              this.peticionGet();
            })
        }
      //cuando se precione agregar usuario desplagara una ventada para introducir usuarios nuevos 
      modalInsertar=()=>
      {
        this.setState({modalInsertar: !this.state.modalInsertar});
        this.peticionGet();
      }
      
      seleccionarUsuario=(user)=>
      {
        this.setState({
        tipoModal: 'actualizar',
        form:
          {
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido
          }
        })
      }
      handleChange=async e=>
      {
        e.persist();
        await this.setState({
        form:
          {
            ...this.state.form,
            [e.target.name]: e.target.value
          }
        });
          console.log(this.state.form)
      }
        //Primera peticion que se hara en este caso es la peticion GET
        componentDidMount()
        {
          this.peticionGet();
        }

        render()
        {
          const {form} = this.state;
          return(
              <div className="App">
                <video autoPlay loop muted src={videoBack}></video>
                <div className='container'>
                    <table className="table">
                      <thead>
                        <tr className='th'>
                          <th>Id</th>
                          <th>nombre</th>
                          <th>apellido</th>
                          <th>Eliminar</th>
                          <th>Editar</th>
                        </tr>
                      </thead>
                        <tbody>
                          {
                            this.state.data.map(user =>
                              {
                                return(
                                  <tr className='td'>
                                    <td>{user.id}</td>
                                    <td>{user.nombre}</td>
                                    <td>{user.apellido}</td>
                                    <td><button className="btn btn-primary" onClick={()=>{this.seleccionarUsuario(user); this.peticionDelete()}}>Eliminar</button></td>
                                    <td><button className="btn btn-danger" onClick={()=>{this.seleccionarUsuario(user); this.modalInsertar()}}>Editar</button></td>
                                  </tr>
                                )
                              })
                          }
                        </tbody>
                    </table>
                  </div>
                  <div className='buttonInsert'>
                    <button className="insertar" onClick={()=>{this.setState({tipoModal:'insertar'});this.modalInsertar()}}>
                      <span id="span1"></span>
                      <span id="span2"></span>
                      <span id="span3"></span>
                      <span id="span4"></span>
                      Agregar Usuario</button>
                  </div>  
              <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                <span style={{float: 'right'}} ><button onClick={this.modalInsertar}>x</button></span>
                  </ModalHeader>   
                    <ModalBody>
                      <div className="form-group">
                        <label htmlFor='id'>Id</label>
                        <input type="text" name="id" id="id" onChange={this.handleChange} value={form?form.id: form.id} /> <br/>
                        <label htmlFor='nombre'>Nombre</label>
                        <input type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form?form.nombre:form.nombre}/><br/>
                        <label htmlFor='apellido'>Apellido</label>
                        <input type="text" name="apellido" id="apellido" onChange={this.handleChange} value={form?form.apellido:form.apellido}/>
                      </div> 
                        <ModalFooter>
                          {
                            this.state.tipoModal === 'insertar'?
                            <button onClick={()=>this.peticionPost()}>Insertar</button>:
                            <button onClick={()=>this.peticionPut()}>Actualizar</button>
                          }
                          <button onClick={()=>this.modalInsertar()}>Cancelar</button>    
                        </ModalFooter>
                    </ModalBody>
              </Modal>
               </div> 
              );
        }
  } 
export default App;
