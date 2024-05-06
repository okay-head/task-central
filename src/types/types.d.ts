type TPayload = {
  title: string
  description: string
}

type TMongoObject = TPayload & MongoObject

type MongoObject = {
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}

type TUser = {
  id: string
  username: string
}

type TUserMongo = MongoObject & Omit<TUser, 'id'>
