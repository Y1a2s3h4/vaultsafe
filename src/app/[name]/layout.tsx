export default function SecuredTabslayout({children}:{children:React.ReactNode}) {
  return (
    <div className="flex flex-col gap-5 items-center h-screen px-5">{children}</div>
  )
}
