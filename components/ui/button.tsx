export const Button = (props: any) => {
  return (
    <button
      type="button"
      className="mb-2 mr-2 rounded-lg bg-lime-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-lime-800 focus:outline-none focus:ring-4 focus:ring-lime-300 dark:bg-lime-400 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
      {...props}
    >
      {props.children}
    </button>
  )
}
