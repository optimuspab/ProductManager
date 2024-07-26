# Comisión 70095 - Programación Backend I: Desarrollo Avanzado de Backend - Primer Entrega

## Descripción del Proyecto

Desarrollar un servidor basado en Node.JS y Express, que escuche en el puerto 8080 y disponga de dos grupos de rutas: `/products` y `/carts`. Dichos endpoints estarán implementados con el router de Express, con las siguientes especificaciones:

## Instalación

Sigue estos pasos para clonar el repositorio, instalar las dependencias y ejecutar el proyecto:

1. Clona el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/tu-repositorio.git
    ```
   
2. Navega al directorio del proyecto:
    ```sh
    cd tu-repositorio
    ```

3. Instala las dependencias:
    ```sh
    npm install
    ```

4. Inicia el servidor:
    ```sh
    npm start
    ```

El servidor se ejecutará en `http://localhost:8080`.

## Rutas de Productos

### Base URL: `/api/products/`

#### 1. Listar Todos los Productos
- **Método:** GET
- **Ruta:** `/`
- **Descripción:** Lista todos los productos de la base.
- **Query Params:**
  - `limit` (opcional): Limita el número de productos devueltos.

#### 2. Obtener Producto por ID
- **Método:** GET
- **Ruta:** `/:pid`
- **Descripción:** Devuelve el producto con el ID proporcionado.

#### 3. Agregar un Nuevo Producto
- **Método:** POST
- **Ruta:** `/`
- **Descripción:** Agrega un nuevo producto con los campos proporcionados.
- **Body:**
  - `title`: String
  - `description`: String
  - `code`: String
  - `price`: Number
  - `status`: Boolean (default: true)
  - `stock`: Number
  - `category`: String
  - `thumbnails`: Array de Strings (opcional)
- **Nota:** El `id` se autogenera y se asegura que nunca se repita.

#### 4. Actualizar un Producto
- **Método:** PUT
- **Ruta:** `/:pid`
- **Descripción:** Actualiza un producto con los campos proporcionados en el body.
- **Body:** Campos del producto a actualizar (excepto el `id`).

#### 5. Eliminar un Producto
- **Método:** DELETE
- **Ruta:** `/:pid`
- **Descripción:** Elimina el producto con el `pid` indicado.

## Rutas de Carritos

### Base URL: `/api/carts/`

#### 1. Crear un Nuevo Carrito
- **Método:** POST
- **Ruta:** `/`
- **Descripción:** Crea un nuevo carrito con la siguiente estructura:
  - `id`: Number/String (autogenerado)
  - `products`: Array de objetos representando cada producto.

#### 2. Listar Productos de un Carrito
- **Método:** GET
- **Ruta:** `/:cid`
- **Descripción:** Lista los productos que pertenecen al carrito con el parámetro `cid` proporcionado.

#### 3. Agregar un Producto al Carrito
- **Método:** POST
- **Ruta:** `/:cid/product/:pid`
- **Descripción:** Agrega el producto al arreglo “products” del carrito seleccionado, en el siguiente formato:
  - `product`: Sólo debe contener el ID del producto.
  - `quantity`: Número de ejemplares del producto (se agrega de uno en uno).

- **Nota:** Si un producto ya existente intenta agregarse al carrito, incrementa el campo `quantity` de dicho producto.

## Persistencia de la Información

La persistencia de la información se implementará utilizando el file system, donde los archivos `productos.json` y `carrito.json` respaldan la información.

## Uso

No es necesario realizar ninguna implementación visual. Todo el flujo se puede realizar por Postman o por el cliente de tu preferencia.

## Ejemplo de Uso con Postman

### Crear un Nuevo Producto

- **Método:** POST
- **URL:** `http://localhost:8080/api/products/`
- **Body:**
  ```json
  {
    "title": "Producto 1",
    "description": "Descripción del Producto 1",
    "price": 100,
    "code": "P001",
    "stock": 10,
    "category": "Categoría 1",
    "thumbnails": ["ruta1.jpg", "ruta2.jpg"]
  }

### Obtener Todos los Productos
- **Método:** GET
- **URL:** http://localhost:8080/api/products/

### Crear un Nuevo Carrito
- **Método:** POST
- **URL:** http://localhost:8080/api/carts/

### Agregar un Producto a un Carrito
- **Método:** POST
- **URL:** http://localhost:8080/api/carts/1/product/1










