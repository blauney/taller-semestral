import React, { useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import axios from 'axios';



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
  


function Prestamo(){
    const classes = useStyles();

    const { register, handleSubmit, errors,getValues,setValue,reset } = useForm(
        {defaultValues:{persona:"",fecha:"",libro:""}});
      const [prestamo, setPrestamo] = useState([])
    
     
    
      useEffect(() => {
        cargarPrestamos();
      }, []);
    
      
      /*const columns = [
        {
            name: 'Persona',
            field: 'persona'
        },
        {
             name: 'Libro',
             field: 'libro'
        },
        {
            name:'Fecha prestamo',
            field: 'fecha'
        }
        
      ];*/
    
    
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
        if(data.idPersona.length ===0 || data.idPersona.length ===0){
            swal({                                         
                title: "Error",
                text: "Debes llenar los espacios vacios",
                icon: "error",
                button: "Continuar",
            });
        }else{
            const fecha = new Date()
            data['fecha'] = fecha.toISOString()
            axios
            .post("http://localhost:9000/api/prestamo", data)
            .then(
                (response) => {
                  if (response.status == 200) {
                    alert("Registro ok")
                    cargarPrestamos();
                    reset();
                  }
                },
                (error) => {
                 console.log(error);
                },
                swal({                                 
                    title: "Formulario guardado satisfactoriamente",
                    text: "Prestamo registrado correctamente",
                    icon: "success",
                    button: "Continuar",
                })
              )
              .catch((error) => {
                console.log(error);
              });
        }
      }
    
    
      const cargarPrestamos = async () => {
        // const { data } = await axios.get('/api/zona/listar');
        /*const { data } = await axios.get("http://localhost:9000/api/prestamo");
        
        data.filter( item => {
            iterableObject(item)
        })

        function iterableObject(obj) {
            for(prop in obj){
                if(typeof obj[prop] == "object"){
                    iterableObject(obj[prop])
                }else{
                    if(prop == nombre || props == fecha){
                        console.log(prop +':', obj[prop]);
                    }
                }
            }
        }

        //setPrestamo(data.resultado);
       */
      };
      


    return (
        
        <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
       
          <Typography component="h1" variant="h5">
            Registrar Prestamo
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  name="idPersona"
                  variant="outlined"
                  fullWidth
                  label="Persona"
                  autoFocus
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Libro"
                  name="libro"
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
              Generar Prestamo
            </Button>
            
            
    
          
          </form>
  
  
        </div>
  
      </Container>

    )
}
export default Prestamo