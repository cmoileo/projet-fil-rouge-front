import "./assets/styles/main.scss"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { Input } from "@/components/ui/input.tsx"

function App() {

  return (
    <>
        <h1 className="h1 padding-300 grid">Hello world</h1>
        <Input />
    </>
  )
}

export default App
