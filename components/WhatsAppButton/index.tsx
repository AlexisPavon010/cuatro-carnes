import { BsWhatsapp } from 'react-icons/bs';
import { Button, Tooltip } from 'antd';

import styles from './styles.module.scss';

export const WhatsAppButton = () => {
  return (
    <Tooltip title='¿Necesitas Ayuda?'>
      <Button
        aria-label="Boton de Whatsapp"
        onClick={() => window.open('https://api.whatsapp.com/send?phone=5491167478945')}
        className={styles.button__whatsapp}
        icon={<BsWhatsapp size='26px' />}
        type="primary"
        shape="circle"
      />
    </Tooltip>
  )
}