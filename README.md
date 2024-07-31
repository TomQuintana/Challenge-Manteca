# Challenge Manteca

Este proyecto implementa una solución utilizando apiREST en vez de un Homebankin permitiendo realizar transferencias utilizando alias o CBU y manejando balances en ARS y USD.

## Funcionalidades Implementadas

1. **Creación de Usuarios y Cuentas Bancarias:**
    - Se crean usuarios con el nombre "user".
    - Se hashea el password del usuario.
    - Se crean las cuentas bancarias de los usuarios bajo el modelo "userAccounts".
    - Al momento de crear un `user` tambien se crea un `userAccount`.
    - Cada cuenta bancaria guarda un `userId` que hace referencia al usuario creado.
    - Por cada request se valida el token, el mismo es generado mediante el endpoint login.
    - Se puede obtener la informacion del user y userAccount

2. **Realización de Transferencias:**
    - Las transferencias se pueden realizar utilizando alias o CBU.
    - Las transferencias se pueden realizar en ARS o USD.
    - La verificación de los usuarios destino se realiza mediante alias o CBU.
    - Se alude por hecho que las transferencia se realizan entre cuentas del mismo banco.
    - En caso de que una transferencia supere el monto x, se retorna un pin el cual el cliente debe ingresar en una proxima peticion con el campo `pinToken`.

3. **Registro de Transferencias:**
    - Cada transferencia se guarda en una entidad `transfers`.
    - Cada registro de transferencia hace referencia al `userId` del usuario que realiza la transferencia, identificándolo como el "origin".


## Estructura del Proyecto

### Modelos

- **User:**
    ```javascript
     name: string;
     lastname: string;
     password: string;
     email: string;
     nationality: string;
     age: number;
     civilStatus: string;
     dni: number;
     status: string;
     createdAt: Date;
    ```

- **UserAccount:**
    ```javascript
     userId: string;
     name: string;
     email: string;
     dni: number;
     cbu: string;
     alias: String;
     balance_usd: Number;
     balance_ars: Number;
    ```


- **Transfer Model:**
```javascript
userId: string;
origin: string;
destination: string;
amount: string;
status: string;
```

### Funciones Principales

- **Crear Usuario y Cuenta Bancaria:**

```bash
    curl --location 'http://localhost:3000/api/userAccount/create' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "Tom",
        "lastname": "Quintana",
        "email": "email@example.com",
        "password":"test",
        "nationality": "Argentinian",
        "age": 25,
        "civilStatus": "single",
        "dni": 12345678
    }'
```

- **Login**
```bash
curl --location 'http://localhost:3000/api/userAccount/login' \
--header 'Content-Type: application/json' \
--data-raw '{
        "email": "email@example.com",
        "password": "test"
     }'
```

- **Obtener informacion de User y UserAccount**
```bash
curl --location 'http://localhost:3000/api/userAccount/data' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGV4YW1wbGUuY29tIiwibmFtZSI6IlRvbSIsImlhdCI6MTcyMjQ1NTY1MiwiZXhwIjoxNzIyNDU5MjUyfQ.YJWrZDU4Oggob0ICnk-ABvmB0XUmxp3FZcwAHZlUVHc'
```

- **Hacer una transferencia**
- Las transferencia se pueden realizar en ARS o USD y tambien por alias o CBU.
```bash 
curl --location 'http://localhost:3000/api/transfers/make' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGV4YW1wbGUuY29tIiwibmFtZSI6IlRvbSIsImlhdCI6MTcyMjM4ODcxMywiZXhwIjoxNzIyMzkyMzEzfQ.z3gA62wqYb_L7CZR7kGTip6hmJeib75UOOhJpE6Q738' \
--data '{
    "origin": "tom.origin",
    "destination": "319695331710",
    "amount": 100,
    "currency": "usd",
    "destinationType": "cbu"
}'
```
- Cuando la transferencia supere el monto x, lo defini como $1000 pesos y $1000 dolares, se retorna un pin el cual el cliente debe ingresar en una proxima peticion con el campo `pinToken`.

```bash
curl --location 'http://localhost:3000/api/transfers/make' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGV4YW1wbGUuY29tIiwibmFtZSI6IlRvbSIsImlhdCI6MTcyMjM4ODcxMywiZXhwIjoxNzIyMzkyMzEzfQ.z3gA62wqYb_L7CZR7kGTip6hmJeib75UOOhJpE6Q738' \
--data '{
    "origin": "tom.origin",
    "destination": "319695331710",
    "amount": 1000,
    "pinToken": 9095,
    "currency": "usd",
    "destinationType": "cbu"
}'
```

- Aclaracion:
    - Las variables `userAccount` hacen referencia a la cuenta bancaria del usario
    - Las variables `user` hacen referencia al usuario, se utilizan para obtener el `id` el cual luego se usa buscar el `userAccount` mediante el `userId` que es el `id` del usuario.


- **Lista de transferencias**
```bash
curl --location 'http://localhost:3000/api/transfers/transfer-history' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGV4YW1wbGUuY29tIiwibmFtZSI6IlRvbSIsImlhdCI6MTcyMjQ1MTg4NCwiZXhwIjoxNzIyNDU1NDg0fQ.rwy-viT2e283t04dijHu7jLH_Vt4sDkcx4pd0fhA2ug'
```


## Instalación
1. Clonar el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/challenge-manteca.git
    cd challenge-manteca
    ```

2. Instalar dependencias:
    ```sh
    npm install
    ```

3. Configurar las variables de entorno usando el archivo `.env.example`.

4. Ejecutar la aplicación:
    ```sh
    npm run dev 
    ```
