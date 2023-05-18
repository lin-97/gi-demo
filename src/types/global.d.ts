

interface AnyObject {
  [key: string]: unknown
}

interface Options {
  value: unknown
  label: string
}

interface NodeOptions extends Options {
  children?: NodeOptions[]
}

type TimeRanger = [string, string]

