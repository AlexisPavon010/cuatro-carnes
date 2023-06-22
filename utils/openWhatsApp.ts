import { IOrder } from "@/interfaces/order"

interface IItemsProps {
  quantity: number;
  _id: string;
  title: string;
  price: number;
  image: string;
  q_stock: number;
  category: string;
  status: boolean;
  description: string;
}

export const openWhatsApp = (order: IOrder) => {
  const { username, phone, uniqueID, total, items } = order as IOrder;

  const pedidoDetalle = items.map((item: IItemsProps) => {
    const subtotal = item.price * item.quantity;
    return `${item.quantity} x ${item.title} ($${subtotal.toFixed(2)})`;
  });

  const message = `¡Gracias ${username} por hacer tu pedido en Cuatro Carnes!\n\nNúmero de orden: #${uniqueID}\n\nDetalle del pedido:\n- ${pedidoDetalle.join('\n- ')}\n\nTotal: $${total}.`;

  const urlParams = new URLSearchParams();
  urlParams.set('phone', phone);
  urlParams.set('text', message);

  const url = `https://api.whatsapp.com/send?${urlParams.toString()}`;

  window.open(url)
}