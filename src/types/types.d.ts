type TPayload = {
  title: string
  description: string
}

type TMongoObject = TPayload & {
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}
