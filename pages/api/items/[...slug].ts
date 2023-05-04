import type { NextApiRequest, NextApiResponse } from 'next'

import '../../../database/db'
import Option from '@/models/Options'
import { isValidObjectId } from 'mongoose'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  switch (req.method) {
    case 'GET':
      return getItemOptionById(req, res);
    case 'POST':
      return createItemOption(req, res);
    case 'PUT':
      return updateItemOptionById(req, res)
    case 'DELETE':
      return deleteItemOptionById(req, res)
    default:
      return res.status(400).json({ message: 'Bad Request' })
  }
}

const createItemOption = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const [id] = req.query.slug!
  const { name, price, status } = req.body;

  try {
    // Buscar la opción por su ID
    const option = await Option.findById(id);

    if (!option) {
      return res.status(404).json({ message: 'Opción no encontrada' });
    }

    // Crear el nuevo item y agregarlo a la opción
    const newItem = { name, price, status };
    option.items.push(newItem);

    // Guardar la opción actualizada en la base de datos
    const updatedOption = await option.save();

    // Devolver la opción actualizada como respuesta
    return res.status(200).json(updatedOption);
  } catch (error: any) {
    return res.status(400).json(error);
  }
}

const updateItemOptionById = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const [id, itemId] = req.query.slug!
  const { name, price, status } = req.body;

  try {
    const option = await Option.findById(id).lean();
    const itemIndex = option.items.findIndex((item: any) => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found' });
    }

    option.items[itemIndex] = {
      ...option.items[itemIndex],
      name: name || option.items[itemIndex].name,
      price: price || option.items[itemIndex].price,
      status: status || option.items[itemIndex].status,
    };

    const updatedOption = await Option.findByIdAndUpdate(
      id,
      { $set: { items: option.items } },
      { new: true }
    ).lean();

    return res.status(200).json(updatedOption);
  } catch (error: any) {
    return res.status(400).json(error.details);
  }
}

const deleteItemOptionById = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const [id, itemId] = req.query.slug!


  console.log(req.query.slug)

  try {
    const option = await Option.findById(id)
    const newItems = option.items.filter((item: any) => item._id != itemId);
    option.items = newItems;
    await option.save()
    return res.status(200).json(option)
  } catch (error: any) {
    return res.status(400).json(error.details)
  }
}

const getItemOptionById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const [id, itemId] = req.query.slug!

  if (!isValidObjectId(id)) return res.status(400).json({ message: 'the id is not mongo id valid' })
  const options = await Option.findById(id)
  if (!options) return res.status(404).json({ message: 'option by id not found' })
  const item = options.items.find((item: any) => item._id == itemId);

  return res.status(200).json(item)
}