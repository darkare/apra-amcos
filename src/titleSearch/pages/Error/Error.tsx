
type propsType = {
  message: string
}

const ErrorPage = (p: propsType) => {
  return (
    <>
      <div>{p.message}</div>
    </>
  )
}

export default ErrorPage;
