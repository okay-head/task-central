type TPayload = {
  name: string
  quantity: number
  price: number
}

type TMongoObject = {
  _id: string
  name: string
  quantity: number
  price: number
  createdAt: string
  updatedAt: string
  __v: number
}
