import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

export const RequestValidator = async <T extends object>(type: ClassConstructor<T>, body: any)
: Promise<{ errors: boolean | string, input: T }> => {
  const input = plainToClass(type, body)
  const errors = await validate(input, { validationError: { target: true }})

  if (!errors.length) return { errors: false, input }
  const errorMessage = errors.map(error => (Object as any).values(error.constraints)).join(', ')

  return { errors: errorMessage, input}
}
