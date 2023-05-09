export interface IOption {
  item?: IItem;
  _id: string,
  name: string,
  quantity: number,
  status: boolean,
  items: IItem[],
  createdAt: string,
  updatedAt: string,
}

export interface IItem {
  item: any;
  name: string,
  price: number,
  status: boolean,
  _id: string
}