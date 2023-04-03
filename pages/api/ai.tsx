import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'
import { ChatCompletionRequestMessageRoleEnum } from 'openai/dist/api'
import { RequestData } from '../types/request'

export default async function generate(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    }),
  )

  const input = req.body as RequestData
  const content = `${input.text}の違いを簡潔に別のものに例えて`

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content,
      },
    ],
  })

  const result = response.data.choices[0]
  res.status(200).json({ result })
}
