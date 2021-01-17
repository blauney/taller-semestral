import React, { useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import MaterialDatatable from "material-datatable";
import swal from 'sweetalert'


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    
    },
    delete : {
      backgroundColor:"red"
    }
  
  }));
  


function Registrolibro(){
    const classes = useStyles();

    const { register, handleSubmit, errors,getValues,setValue,reset } = useForm(
        {defaultValues:{codigo:"",nombre:"",autor:""}});
      const [libros, setLibros] = useState([])
    
     
    
      useEffect(() => {
        cargarLibro();
      }, []);
    
      
      const columns = [
        {
            name: 'Nombre',
            field: 'nombre'
        },
        {
             name: 'Autor',
             field: 'autor'
        },
        {
            name:'Codigo',
            field: 'codigo'
        }
        
      ];
    
    
      const options={
        selectableRows: false,
        print: false,
        onlyOneRowCanBeSelected: false,
        textLabels: {
          body: {
            noMatch: "Lo sentimos, no se encuentran registros",
            toolTip: "Sort",
          },
          pagination: {
            next: "Siguiente",
            previous: "Página Anterior",
            rowsPerPage: "Filas por página:",
            displayRows: "de",
          },
        },
        download: false,
        pagination: true,
        rowsPerPage: 5,
        usePaperPlaceholder: true,
        rowsPerPageOptions: [5, 10, 25],
        sortColumnDirection: "desc",
      }


      const onSubmit = data => {
        if(data.nombre.length ===0 || data.idautor.length ===0 || data.codigo.length ===0){
          swal({                                         
            title: "Error",
            text: "Debes llenar los espacios vacios",
            icon: "error",
            button: "Continuar",
        });
        }else{
          axios
          .post("http://localhost:9000/api/libro", data)
          .then(
              (response) => {
                if (response.status == 200) {
                  alert("Registro ok")
                  cargarLibro();
                  reset();
                }
              },
              (error) => {
               console.log(error);
              }
            )
            .catch((error) => {
              console.log(error);
            })
            swal({                                 
              title: "Formulario guardado satisfactoriamente",
              text: "Prestamo registrado correctamente",
              icon: "success",
              button: "Continuar",
          })
        }
       
      }
    
    
      const cargarLibro = async () => {
        // const { data } = await axios.get('/api/zona/listar');
        const { data } = await axios.get("http://localhost:9000/api/libro");
        setLibros(data.libroBusqueda);
       
      };
      


    return (
        
        <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
       
          <Typography component="h1" variant="h5">
            Registrar Libro
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  name="nombre"
                  variant="outlined"
                  
                  fullWidth
                  id="firstName"
                  label="Libro"
                  autoFocus
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  
                  fullWidth
                  label="Autor"
                  name="idautor"
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  
                  fullWidth
                  id="Codigo"
                  label="Codigo"
                  name="codigo"
                  inputRef={register}
                />
              </Grid>
              
  
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Guardar Libro
            </Button>
            
            <Grid container spacing={1}>
              <MaterialDatatable
                title={"Lista libros"}
                data={libros}
                columns={columns}
                options={options}
                
              />
            </Grid>
    
          
          </form>
  
  
        </div>
  
      </Container>

    )
}
export default Registrolibro