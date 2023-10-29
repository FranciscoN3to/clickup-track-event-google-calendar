type IBody = {
    children: React.ReactNode
}

function Body({children}: IBody) {
  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      {children}
    </div>
  )
}

export default Body