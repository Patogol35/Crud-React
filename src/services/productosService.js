const API_URL = "http://127.0.0.1:5000";

export const obtenerProductos = async () => {
  const respuesta = await fetch(`${API_URL}/productos`);

  if (!respuesta.ok) {
    throw new Error("Error al obtener productos");
  }

  return await respuesta.json();
};

export const crearProducto = async (producto) => {
  const respuesta = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...producto,
      precio: Number(producto.precio),
    }),
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.error || "Error al crear el producto");
  }

  return datos;
};

export const actualizarProducto = async (id, producto) => {
  const respuesta = await fetch(`${API_URL}/productos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...producto,
      precio: Number(producto.precio),
    }),
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.error || "Error al actualizar el producto");
  }

  return datos;
};

export const eliminarProducto = async (id) => {
  const respuesta = await fetch(`${API_URL}/productos/${id}`, {
    method: "DELETE",
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.error || "Error al eliminar el producto");
  }

  return datos;
};