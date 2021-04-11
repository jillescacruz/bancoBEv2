# BancoBEv2

Proyecto realizado como pruebas para transferencia de dinero entre cuentas de destinatarios.

Fue generado con las librerias de Firebase functions para la versión de TypeScript y que gestionan datos desde Firestore.

Todos los servicios son validados por la misma api de Auth de Firebase, lo que permite validar si el usuario que envió la petición está autorizado y si se encuentra activo ese token.


El componente esta dividido en 2 partes con los siguientes servicios:
-Cliente
  - Servicio que obtiene de un cliente en particular en base a su correo o rut
  - Servicio para agregar destinatarios a un cliente
  - Servicio para obtener la lista de destinatarios de un cliente
  - Servicio de creación de cliente(Este servicio fue construido para inyectar datos de prueeba y no es consumido desde FE)

-Movimientos
  - Servicio de transferencias de dinero: Este servicio realiza la transferencia al destinatario, disminuye el saldo, crea el movimiento en la tabla histórico y luego
                                        si el destinatario existe como Cliente y el nro de cuenta es la misma que se está realizando la transferencia, entonces ese dinero se envía ese destinatario y se le crea un movimiento de transferencia.
  - Servicio de histórico de transferencias
  - Servicio para depositar dinero(Este servicio fue construido para inyectar datos de prueeba y no es consumido desde FE)




Para la ejecución de este servicio en local es necesario realizar siempre primero:
`firebase deploy` y luego `firebase serve`
Siempre debe estar como variable de entorno la cuenta de servicio.
Ej en windows: set GOOGLE_APPLICATION_CREDENTIALS=C:\XXX\credenciales.json



Consideraciones:
   - Faltan pruebas unitarias
   - Falta validar token vs autorización.
   