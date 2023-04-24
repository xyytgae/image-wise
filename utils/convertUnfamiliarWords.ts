import { FormInput } from '../types/formInput'

export const convertUnfamiliarWords = (formInput: FormInput): string => {
  const { unfamiliarWords, metaphor } = formInput
  const joinedWords = unfamiliarWords.map((word) => word.value).join('と')
  return `${joinedWords}の違いを${metaphor}で例えて`
}
