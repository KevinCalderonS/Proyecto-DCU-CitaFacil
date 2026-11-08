# CitaFácil

CitaFácil es una aplicación web de demostración para gestionar citas médicas. Su interfaz permite explorar especialidades y profesionales, seleccionar una fecha y un horario, y recorrer el flujo de confirmación de una cita. También incluye secciones de inicio, próximas citas, perfil y ayuda.

## Tecnologías

- Next.js 16 con React 19
- TypeScript
- Tailwind CSS 4
- npm

## Requisitos

- Node.js compatible con Next.js 16
- pnpm (la versión del proyecto está indicada en `package.json`)

## Instalación y ejecución

Abre una terminal en la raíz del repositorio y ejecuta:

```powershell
cd .\citafacil-proyecto
npm install
npm run dev
```

La carpeta `citafacil-proyecto` es la ruta que contiene `package.json`. Una vez iniciado el servidor, abre [http://localhost:3000](http://localhost:3000) en el navegador.


## Otros comandos

Ejecuta estos comandos desde `citafacil-proyecto`:

```powershell
npm build   # Genera la versión de producción
npm start   # Inicia el servidor de producción (después de npm build)
```

## Nota sobre los datos

La aplicación es actualmente un prototipo de interfaz: los perfiles, médicos, citas y horarios se muestran con datos de ejemplo. No requiere configurar una base de datos ni credenciales para iniciarla.
