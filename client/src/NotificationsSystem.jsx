/*import React from 'react'
import NotificationsSystem, {atalhoTheme, useNotifications} from 'reapop'


const ATopLevelComponent = () => {
    // 1. Retrieve the notifications to display, and the function used to dismiss a notification.
    const {notifications, dismissNotification} = useNotifications()
    return (
        <div>
            <NotificationsSystem
                // 2. Pass the notifications you want Reapop to display.
                notifications={notifications}
                // 3. Pass the function used to dismiss a notification.
                dismissNotification={(id) => dismissNotification(id)}
                // 4. Pass a builtIn theme or a custom theme.
                theme={atalhoTheme}
            />
        </div>
    )
}
*/
/*
import React from 'react'
import { useAlert } from 'react-alert'

const Notificacion = () => {
  const alert = useAlert()

  return (
    <button
      onClick={() => {
        alert.show('Oh look, an alert!')
      }}
    >
      Show Alert
    </button>
  )
}

export default Notificacion;
*/

import swal from 'sweetalert';

function Alert() {

const mostrarAlert = () => {
    swal({
        title: '',
        text: '',
        icon:'',
        button: ''
    })

}
    return (
        <div>
            <button
            onClick={() =>mostrarAlert()}>
            Mostrar alerta
            

            </button>
        </div>
    )


}

export default Alert;