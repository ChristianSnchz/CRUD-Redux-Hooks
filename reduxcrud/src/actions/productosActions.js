import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITOSA,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    OBTENER_PRODUCTO_EXITO,
    OBTENER_PRODUCTO_ERROR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR

} from '../types';

import clienteAxios from '../config/axios';

//crear un nuevo producto

export function crearNuevoProductoAction(producto) {
    return (dispatch) => {
        dispatch(nuevoProducto())

        //insertar en la API
        clienteAxios.post('/libros', producto)
            .then(respuesta => {

                //
                dispatch(agregarProductoExito(producto))
            })
            .catch(error => {
                dispatch(agregarProductoError(true))
            })
    }
}

export const nuevoProducto = () => ({
    type: AGREGAR_PRODUCTO
});

export const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

export const agregarProductoError = error => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: error
});

export function obtenerProductosActions() {
    return (dispatch) => {

        dispatch(obtenerProductosComienzo());

        //consultar la API
        clienteAxios.get('/libros')
        .then(respuesta => {
            dispatch(descargaProductosExitosa(respuesta.data));
        })
        .catch(error => {
            dispatch(descargaProductosError());
        })
    }
}

export const obtenerProductosComienzo = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS
})

export const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITOSA,
    payload : productos
})

export const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR
})

export function borrarProductoAction( id) {
    return (dispatch) => {

        dispatch(obtenerProductoEliminar())

        clienteAxios.delete(`/libros/${id}`)
        .then(respuesta => {
            dispatch( eliminarProductoExito(id));
        })
        .catch(error => {
            dispatch( eliminarProductoError());
        })

    }
}

export const obtenerProductoEliminar = () => ({
     type: OBTENER_PRODUCTO_ELIMINAR
 })

export const eliminarProductoExito = id => ({
    type: PRODUCTO_ELIMINADO_EXITO,
    payload : id
})

export const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    error : true
})

export function obtenerProductoEditarAction(id){
    return(dispatch) => {
        dispatch(obtenerProductoAction());

        clienteAxios.get(`/libros/${id}`)
        .then(respuesta => {
            dispatch(obtenerProductoEditarExito(respuesta.data));
        })
        .catch(error => {
            dispatch(obtenerProductoEditarError());
        })
    }
} 

export const obtenerProductoAction = () => ({
    type: OBTENER_PRODUCTO_EDITAR
})

export const obtenerProductoEditarExito = producto => ({
    type : OBTENER_PRODUCTO_EXITO,
    payload : producto
})

export const obtenerProductoEditarError = () => ({
    type: OBTENER_PRODUCTO_ERROR
})

export function editarProductoActions(producto) {
    return (dispatch) => {
        dispatch(comenzarEdicionProducto());

        clienteAxios.put(`/libros/${producto.id}`,producto)
        .then(respuesta => {
            dispatch(editarProductoExito(respuesta.data));
        })
        .catch(error => {
            dispatch(editarProductoError());
        })
    }
}

export const comenzarEdicionProducto = () => ({
    type:COMENZAR_EDICION_PRODUCTO
})

export const editarProductoExito = producto => ({
    type : PRODUCTO_EDITADO_EXITO,
    payload : producto 
})

export const editarProductoError = () => ({
    type : PRODUCTO_EDITADO_ERROR
})





