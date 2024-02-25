type TChildren = {
  children: React.ReactNode
}
export default function Container({ children }: TChildren) {
  return <div className='container-custom px-4 pt-32'>{children}</div>
}
