# Nōma Casa Viva

E-commerce editorial para hogar inteligente, decoración y bienestar.

## Desarrollo

```bash
pnpm install
pnpm dev
```

## Producción

```bash
pnpm build
pnpm preview
```

El catálogo vive en `src/data/products.ts`. Para producción comercial real, conecta el botón de checkout con tu proveedor de pagos y sustituye las imágenes remotas de catálogo por archivos propios/CDN.

## Administración

- Ruta: `#/admin`
- Usuario inicial: `admin@noma.mx`
- Contraseña inicial: `admin123`

El panel permite crear, editar y eliminar productos, cargar imágenes, controlar inventario y cambiar el estado de los pagos. Los datos se conservan localmente en el navegador para esta versión autónoma.

## Pagos y lanzamiento

El checkout admite compra como invitado o usuario registrado y genera pedidos verificables desde administración. La opción de transferencia entra como `Pendiente`; el administrador puede marcarla como pagada o cancelada.

El formulario visual de tarjeta está preparado para montar campos cifrados de Stripe o Mercado Pago. No se deben capturar ni guardar números de tarjeta directamente en esta aplicación. Para cobros reales todavía se necesitan las credenciales del proveedor, webhooks y una base de datos de producción.
