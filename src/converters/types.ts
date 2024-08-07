export type DefaultConverter = (key: string, value: string, ctx) => string | Promise<string>
export type Converter = (value: string, ctx) => string | Promise<string>
